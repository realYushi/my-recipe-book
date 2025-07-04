import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertTriangle } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Custom Components
import CreateIngredient from "@/components/ingredient/createIngredient";

// Types
import type { Ingredient, RecipeIngredient } from "@/model/ingredient";
import { IngredientCategory, IngredientUnit } from "@/model/ingredient";
import type { Recipe } from "@/model/recipe";

// Services
import ingredientService from "@/service/ingredientService";
import recipeService from "@/service/recipeService";

// Zod validation schema for recipe
const recipeIngredientSchema = z.object({
    ingredient: z.string().min(1, "Ingredient is required"),
    quantity: z.number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number"
    })
        .min(0.01, "Quantity must be at least 0.01")
        .max(10000, "Quantity cannot exceed 10,000"),
    unit: z.nativeEnum(IngredientUnit, {
        errorMap: () => ({ message: "Unit is required" })
    })
});

const recipeSchema = z.object({
    name: z.string()
        .min(1, "Recipe name is required")
        .max(100, "Recipe name cannot exceed 100 characters"),
    portions: z.number({
        required_error: "Portions is required",
        invalid_type_error: "Portions must be a number"
    })
        .int("Portions must be a whole number")
        .min(1, "Portions must be at least 1")
        .max(50, "Portions cannot exceed 50"),
    preparationTime: z.number({
        required_error: "Preparation time is required",
        invalid_type_error: "Preparation time must be a number"
    })
        .int("Preparation time must be a whole number")
        .min(0, "Preparation time cannot be negative")
        .max(1440, "Preparation time cannot exceed 24 hours (1440 minutes)"),
    cookingTime: z.number({
        required_error: "Cooking time is required",
        invalid_type_error: "Cooking time must be a number"
    })
        .int("Cooking time must be a whole number")
        .min(0, "Cooking time cannot be negative")
        .max(1440, "Cooking time cannot exceed 24 hours (1440 minutes)"),
    ingredients: z.array(recipeIngredientSchema)
        .min(1, "At least one ingredient is required")
        .max(50, "Cannot add more than 50 ingredients"),
    instructions: z.string().optional()
});

// Type inference from the schema
type RecipeFormValues = z.infer<typeof recipeSchema>;
type CreateRecipeProps = {
    initialData?: Recipe;
    isEditing?: boolean;
    hideHeader?: boolean;
    onSuccess?: () => void;
}

// Add this style tag or move to a CSS file
const editorStyles = `
  .milkdown .editor {
    padding-left: 50px !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
`;

function CreateRecipe({ initialData, isEditing = false, hideHeader = false, onSuccess }: CreateRecipeProps) {
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

    // Form error state
    const [formError, setFormError] = useState<string | null>(null);
    const [showValidationSummary, setShowValidationSummary] = useState(false);

    // Success message state
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form setup
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm<RecipeFormValues>({
        resolver: zodResolver(recipeSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            portions: initialData.portions,
            preparationTime: initialData.preparationTime,
            cookingTime: initialData.cookingTime,
            ingredients: initialData.ingredients.map((ingredient: RecipeIngredient) => ({
                ingredient: ingredient.ingredient._id,
                quantity: ingredient.quantity,
                unit: ingredient.ingredient.unit
            })),
            instructions: initialData.instructions
        } : {
            name: "",
            portions: 1,
            preparationTime: 0,
            cookingTime: 0,
            ingredients: [],
            instructions: ""
        },
        mode: "onChange"
    });

    const { fields, append, remove } = useFieldArray({
        control,
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
    const onSubmit = async (data: RecipeFormValues) => {
        setFormError(null);
        setSuccessMessage(null);
        setShowValidationSummary(false);

        if (crepeInstance) {
            const instructions = crepeInstance.getMarkdown();
            console.log(instructions);

            // Just clean up the instructions without validation
            const cleanInstructions = instructions.replace(/<br\s*\/?>/gi, '').trim();
            data.instructions = cleanInstructions;
        }

        try {
            if (isEditing && initialData?._id) {
                await recipeService.updateRecipe(initialData._id, data as unknown as Recipe);
                setSuccessMessage("Recipe updated successfully!");
            } else {
                await recipeService.createRecipe(data as unknown as Recipe);
                setSuccessMessage("Recipe created successfully!");
            }
            onSuccess?.();
        } catch (error) {
            console.error(`Error ${isEditing ? "updating" : "creating"} recipe:`, error);
            setFormError(`Failed to ${isEditing ? "update" : "create"} recipe. Please try again.`);
        }
    }

    // Form validation error handler
    const onError = () => {
        setShowValidationSummary(true);
    }

    // Get all validation error messages
    const errorMessages = Object.entries(errors).map(([field, error]) => {
        if (field === 'ingredients' && error?.message) {
            return { field, message: error.message };
        }
        if (field === 'ingredients' && error?.root?.message) {
            return { field, message: error.root.message };
        }
        return { field, message: error?.message };
    }).filter(error => error.message);

    // Refresh ingredients
    const refreshIngredients = async () => {
        try {
            setLoadingIngredients(true);
            const ingredients = await ingredientService.getIngredients();
            setAvailableIngredients(ingredients);
            // Close the dialog when successful
            setIngredientDialogOpen(false);
        } catch (error) {
            console.error("Error fetching ingredients:", error);
        } finally {
            setLoadingIngredients(false);
        }
    };

    // Initialize editor and fetch ingredients
    useEffect(() => {
        // Initialize editor
        let instance: any = null;
        if (editorRef.current) {
            instance = new Crepe({
                root: editorRef.current,
                defaultValue: initialData?.instructions || "",
            });
            instance.create();
            setCrepeInstance(instance);
        }

        // Fetch ingredients
        refreshIngredients();

        // Cleanup
        return () => {
            if (instance) {
                instance.destroy();
            }
        };
    }, []);

    return (
        <>
            <style>{editorStyles}</style>
            <Card className="w-full mx-auto">
                {!hideHeader && (
                    <CardHeader>
                        <CardTitle>Create New Recipe</CardTitle>
                        <CardDescription>{isEditing
                            ? "Update your culinary masterpiece"
                            : "Share your culinary masterpiece with the world"}</CardDescription>
                    </CardHeader>
                )}
                <CardContent>
                    {successMessage && (
                        <Alert className="mb-4 bg-green-50 border-green-400 text-green-800">
                            <AlertDescription>{successMessage}</AlertDescription>
                        </Alert>
                    )}

                    {formError && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{formError}</AlertDescription>
                        </Alert>
                    )}

                    {showValidationSummary && errorMessages.length > 0 && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            <AlertTitle>Validation Errors</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc pl-5 mt-2">
                                    {errorMessages.map((error, index) => (
                                        <li key={index}>{error.message}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name" className={errors.name ? "text-red-500 font-medium" : ""}>Recipe Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter recipe name"
                                maxLength={100}
                                {...register("name")}
                                className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
                                aria-invalid={errors.name ? "true" : "false"}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 font-medium flex items-center mt-1">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="portions" className={errors.portions ? "text-red-500 font-medium" : ""}>Portions</Label>
                                <Input
                                    id="portions"
                                    type="number"
                                    min="1"
                                    max="50"
                                    placeholder="Number of servings"
                                    {...register("portions", { valueAsNumber: true })}
                                    className={errors.portions ? "border-red-500 focus:ring-red-500" : ""}
                                    aria-invalid={errors.portions ? "true" : "false"}
                                />
                                {errors.portions && (
                                    <p className="text-sm text-red-500 font-medium flex items-center mt-1">
                                        <AlertTriangle className="h-3 w-3 mr-1" />
                                        {errors.portions.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="preparationTime" className={errors.preparationTime ? "text-red-500 font-medium" : ""}>Prep Time (min)</Label>
                                <Input
                                    id="preparationTime"
                                    type="number"
                                    min="0"
                                    max="1440"
                                    placeholder="Prep time (minutes)"
                                    {...register("preparationTime", { valueAsNumber: true })}
                                    className={errors.preparationTime ? "border-red-500 focus:ring-red-500" : ""}
                                    aria-invalid={errors.preparationTime ? "true" : "false"}
                                />
                                {errors.preparationTime && (
                                    <p className="text-sm text-red-500 font-medium flex items-center mt-1">
                                        <AlertTriangle className="h-3 w-3 mr-1" />
                                        {errors.preparationTime.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cookingTime" className={errors.cookingTime ? "text-red-500 font-medium" : ""}>Cooking Time (min)</Label>
                                <Input
                                    id="cookingTime"
                                    type="number"
                                    min="0"
                                    max="1440"
                                    placeholder="Cook time (minutes)"
                                    {...register("cookingTime", { valueAsNumber: true })}
                                    className={errors.cookingTime ? "border-red-500 focus:ring-red-500" : ""}
                                    aria-invalid={errors.cookingTime ? "true" : "false"}
                                />
                                {errors.cookingTime && (
                                    <p className="text-sm text-red-500 font-medium flex items-center mt-1">
                                        <AlertTriangle className="h-3 w-3 mr-1" />
                                        {errors.cookingTime.message}
                                    </p>
                                )}
                            </div>
                        </div>


                        <div>
                            <Label className={`text-lg font-medium ${errors.ingredients ? "text-red-500" : ""}`}>Ingredients</Label>
                            <Dialog open={ingredientDialogOpen} onOpenChange={setIngredientDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button type="button" variant="default" className="mt-2">+ Create Ingredient</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                    <DialogTitle>Create New Ingredient</DialogTitle>
                                    <DialogDescription>Add a new ingredient to your collection</DialogDescription>
                                    <div className="py-2">
                                        <CreateIngredient onSuccess={refreshIngredients} hideHeader={true} />
                                    </div>
                                </DialogContent>
                            </Dialog>

                            {/* Display added ingredients */}
                            <div className={`mt-4 mb-4 border rounded-md p-3 bg-gray-50 ${errors.ingredients ? "border-red-500" : ""}`}>
                                {fields.length > 0 ? (
                                    <>
                                        <h3 className="text-sm font-medium mb-2">Added Ingredients:</h3>
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 py-2 border-b last:border-b-0">
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
                                    </>
                                ) : (
                                    <p className="text-gray-500 text-sm py-2">No ingredients added yet</p>
                                )}
                            </div>
                            {errors.ingredients && (
                                <p className="text-sm text-red-500 font-medium flex items-center mt-1">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    {errors.ingredients.message || "At least one ingredient is required"}
                                </p>
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
                                        <Input
                                            type="number"
                                            min="0.01"
                                            max="10000"
                                            step="0.01"
                                            placeholder="Quantity"
                                            value={currentQuantity || ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setCurrentQuantity(value === "" ? 0 : Number(value));
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <Select onValueChange={(value) => setCurrentUnit(value as IngredientUnit)} value={currentUnit}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Unit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[IngredientUnit.G, IngredientUnit.KG, IngredientUnit.ML, IngredientUnit.L, IngredientUnit.EACH].map((unit) => (
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
                                className={`mt-2 min-h-[200px] border rounded-md p-1`}
                            ></div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button
                        onClick={handleSubmit(onSubmit, onError)}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : isEditing ? "Update Recipe" : "Save Recipe"}
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default CreateRecipe;


