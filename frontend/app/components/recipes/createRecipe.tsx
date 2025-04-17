import { Crepe, CrepeFeature } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

// UI Components
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "~/components/ui/dialog";

// Custom Components
import CreateIngredient from "../ingredient/createIngredient";

// Types
import type { Ingredient, RecipeIngredient } from "~/model/ingredient";
import { IngredientCategory, IngredientUnit } from "~/model/ingredient";
import type { Recipe } from "~/model/recipe";

// Services
import { ingredientService } from "~/service/ingredientService";
import recipeService from "~/service/recipeSerive";

function CreateRecipe() {
    // Editor state
    const editorRef = useRef(null);
    const [crepeInstance, setCrepeInstance] = useState<any>(null);

    // Ingredient dialog state
    const [ingredientDialogOpen, setIngredientDialogOpen] = useState(false);

    // Ingredients state
    const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
    const [loadingIngredients, setLoadingIngredients] = useState(false);

    // Recipe ingredient
    const [recipeIngredient, setRecipeIngredient] = useState<string>("");
    const [currentQuantity, setCurrentQuantity] = useState<number>(1);
    const [currentUnit, setCurrentUnit] = useState<IngredientUnit>(IngredientUnit.G);

    // Form setup
    const recipeForm = useForm<Recipe>({
        defaultValues: {
            name: "",
            portions: 1,
            preparationTime: 0,
            cookingTime: 0,
            ingredients: [],
            instructions: ""
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: recipeForm.control,
        name: "ingredients"
    });

    // Add ingredient to recipe
    const addIngredientToRecipe = () => {
        if (!recipeIngredient) {
            return;
        }
        const selectedIngredient = availableIngredients.find(i => i._id === recipeIngredient);
        if (!selectedIngredient?._id) {
            return;
        }
        append({ ingredient: selectedIngredient._id, quantity: currentQuantity, unit: currentUnit });
        // Reset ingredient selection
        setRecipeIngredient("");
        setCurrentQuantity(1);
        setCurrentUnit(IngredientUnit.G);
    }

    // Form submission
    const onSubmit = async (data: Recipe) => {
        if (crepeInstance) {
            const instructions = crepeInstance.getMarkdown();
            data.instructions = instructions;
        }

        try {
            const response = await recipeService.createRecipe(data);
            console.log(response);
        } catch (error) {
            console.error("Error creating recipe:", error);
        }
    }

    // Initialize editor and fetch ingredients
    useEffect(() => {
        // Initialize editor
        let instance: any = null;
        if (editorRef.current) {
            instance = new Crepe({
                root: editorRef.current,
                defaultValue: "",
            });


            instance.create().then(() => {
                setCrepeInstance(instance);
            });
        }

        // Fetch ingredients
        const fetchIngredients = async () => {
            try {
                setLoadingIngredients(true);
                const ingredients = await ingredientService.getIngredients();
                setAvailableIngredients(ingredients);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            } finally {
                setLoadingIngredients(false);
            }
        }
        fetchIngredients();

        // Cleanup
        return () => {
            if (instance) {
                instance.destroy();
            }
        };
    }, []);

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Create New Recipe</CardTitle>
                    <CardDescription>Share your culinary masterpiece with the world</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={recipeForm.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Recipe Name</Label>
                            <Input id="name" placeholder="Enter recipe name" {...recipeForm.register("name")} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="portions">Portions</Label>
                                <Input id="portions" type="number" min="1" placeholder="Number of servings" {...recipeForm.register("portions", { valueAsNumber: true })} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="preparationTime">Preparation Time (min)</Label>
                                <Input id="preparationTime" type="number" min="0" placeholder="Prep time" {...recipeForm.register("preparationTime", { valueAsNumber: true })} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cookingTime">Cooking Time (min)</Label>
                                <Input id="cookingTime" type="number" min="0" placeholder="Cook time" {...recipeForm.register("cookingTime", { valueAsNumber: true })} />
                            </div>
                        </div>


                        <div>
                            <Label className="text-lg font-medium">Ingredients</Label>
                            <Dialog open={ingredientDialogOpen} onOpenChange={setIngredientDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button type="button" variant="default" className="mt-2">+ Create Ingredient</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <CreateIngredient />
                                </DialogContent>
                            </Dialog>

                            {/* Display added ingredients */}
                            {fields.length > 0 && (
                                <div className="mt-4 mb-4 border rounded-md p-3 bg-gray-50">
                                    <h3 className="text-sm font-medium mb-2">Added Ingredients:</h3>
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                                            <span className="font-medium">{availableIngredients.find(i => i._id === field.ingredient)?.name}</span>
                                            <span>{field.quantity} {field.unit}</span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => remove(index)}
                                            >
                                                ✕
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Ingredient selection controls */}
                            <div className="mt-2 space-y-2">
                                <div className="grid grid-cols-12 gap-2">
                                    <div className="col-span-6">
                                        <Select onValueChange={(value) => setRecipeIngredient(value)} value={recipeIngredient}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select ingredient" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableIngredients.map((ingredient) => (
                                                    <SelectItem key={ingredient._id} value={ingredient._id || ''}>
                                                        {ingredient.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="col-span-3">
                                        <Input type="number" min="0" placeholder="Quantity" value={currentQuantity} onChange={(e) => setCurrentQuantity(Number(e.target.value))} />
                                    </div>
                                    <div className="col-span-3">
                                        <Select onValueChange={(value) => setCurrentUnit(value as IngredientUnit)} value={currentUnit}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Unit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(IngredientUnit).map((unit) => (
                                                    <SelectItem key={unit} value={unit}>
                                                        {unit}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <Button type="button" variant="outline" className="mt-2" onClick={addIngredientToRecipe}>+ Add Ingredient to Recipe</Button>
                        </div>

                        <div>
                            <Label className="text-lg font-medium">Cooking Instructions</Label>
                            <div
                                ref={editorRef}
                                className="mt-2 min-h-[200px] border rounded-md p-4"
                            ></div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={recipeForm.handleSubmit(onSubmit)}>Save Recipe</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CreateRecipe;


