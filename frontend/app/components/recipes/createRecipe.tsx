import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { Button } from "~/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "~/components/ui/dialog"
import CreateIngredient from "../ingredient/createIngredient";
import { useEffect, useRef, useState } from "react";
import type { Ingredient, RecipeIngredient } from "~/model/ingredient";
import { useFieldArray, useForm } from "react-hook-form";
import { IngredientCategory, IngredientUnit } from "~/model/ingredient";
import type { Recipe } from "~/model/recipe";
import { ingredientService } from "~/service/ingredientService";

function CreateRecipe() {
    // editor
    const editorRef = useRef(null);
    const [ingredientDialogOpen, setIngredientDialogOpen] = useState(false);
    // ingredients
    const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
    const [loadingIngredients, setLoadingIngredients] = useState(false);


    // form
    const recipeForm = useForm<Recipe>({
        defaultValues: {
            name: "",
            portions: 0,
            prepTime: 0,
            cookTime: 0,
            ingredients: [],
            instructions: ""
        }
    });
    const { fields, append, remove } = useFieldArray({
        control: recipeForm.control,
        name: "ingredients"
    });
    // recipe ingredients
    const [currentIngredient, setCurrentIngredient] = useState<string>("");
    const [currentQuantity, setCurrentQuantity] = useState<number>(1);
    const [currentUnit, setCurrentUnit] = useState<IngredientUnit>(IngredientUnit.G);

    const addIngredientToRecipe = () => {
        if (!currentIngredient) {
            return;
        }
        const ingredient = availableIngredients.find(i => i._id === currentIngredient);
        if (!ingredient) {
            return;
        }
        append({ ingredient: ingredient, quantity: currentQuantity, unit: currentUnit });
        setCurrentIngredient("");
        setCurrentQuantity(1);
        setCurrentUnit(IngredientUnit.G);
        console.log(recipeForm.getValues("ingredients"));
    }

    const onSubmit = (data: Recipe) => {
        console.log(data);
    }

    useEffect(() => {
        // editor
        let crepeInstance = null;
        if (editorRef.current) {
            crepeInstance = new Crepe({
                root: editorRef.current,
                defaultValue: "Add your cooking instructions here...",
            });
            crepeInstance.create();
        }
        //ingredients
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
        return () => {
            if (crepeInstance) {
                crepeInstance.destroy();
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
                                <Input id="portions" type="number" min="1" placeholder="Number of servings" {...recipeForm.register("portions")} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="prepTime">Preparation Time (min)</Label>
                                <Input id="prepTime" type="number" min="0" placeholder="Prep time" {...recipeForm.register("prepTime")} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cookTime">Cooking Time (min)</Label>
                                <Input id="cookTime" type="number" min="0" placeholder="Cook time" {...recipeForm.register("cookTime")} />
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
                            <div className="mt-2 space-y-2">
                                <div className="grid grid-cols-12 gap-2">
                                    <div className="col-span-6">
                                        <Select onValueChange={(value) => setCurrentIngredient(value)} value={currentIngredient}>
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
                    <Button>Save Recipe</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CreateRecipe;


