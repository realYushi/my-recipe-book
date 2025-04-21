import { IngredientCategory, IngredientUnit, type Ingredient } from "~/model/ingredient"
import { Button } from "../ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ingredientService } from "~/service/ingredientService"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { AlertTriangle } from "lucide-react"

// Zod validation schema for ingredient
const ingredientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.nativeEnum(IngredientCategory, {
        errorMap: () => ({ message: "Category is required" })
    }),
    price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number"
    }).nonnegative("Price cannot be negative"),
    unit: z.nativeEnum(IngredientUnit, {
        errorMap: () => ({ message: "Unit is required" })
    })
});

// Type inference from the schema
type CreateIngredientProps = {
    onSuccess?: () => void;
    hideHeader?: boolean;
    isUpdate?: boolean;
    ingredientData?: Ingredient;
}
type IngredientFormValues = z.infer<typeof ingredientSchema>;

export function CreateIngredient({ onSuccess, hideHeader, isUpdate, ingredientData }: CreateIngredientProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showValidationSummary, setShowValidationSummary] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitted }
    } = useForm<IngredientFormValues>({
        resolver: zodResolver(ingredientSchema),
        defaultValues: isUpdate ? {
            name: ingredientData?.name || "",
            category: ingredientData?.category,
            price: ingredientData?.price,
            unit: ingredientData?.unit
        } : {
            name: "",
            category: undefined,
            price: 0,
            unit: undefined
        },
        mode: "onChange"
    });

    const onSubmit = async (data: IngredientFormValues) => {
        setIsLoading(true);
        setError(null);
        setShowValidationSummary(false);

        try {
            if (isUpdate) {
                await ingredientService.updateIngredient(ingredientData?.id as string, data as Ingredient);
            } else {
                await ingredientService.createIngredient(data as Ingredient);
            }
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            setError(isUpdate
                ? "Failed to update ingredient. Please try again."
                : "Failed to create ingredient. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const onError = () => {
        setShowValidationSummary(true);
    };

    // Get all validation error messages
    const errorMessages = Object.entries(errors).map(([field, error]) => ({
        field,
        message: error?.message
    }));

    return (
        <Card className="w-[350px] border-0 shadow-none">
            {!hideHeader && (
                <CardHeader>
                    <CardTitle>{isUpdate ? "Update Ingredient" : "Create New Ingredient"}</CardTitle>
                    <CardDescription>
                        {isUpdate ? "Update your ingredient details." : "Add a new ingredient to your recipe."}
                    </CardDescription>
                </CardHeader>
            )}
            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
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

                <form id="create-ingredient-form" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name" className={errors.name ? "text-red-500 font-medium" : ""}>Name</Label>
                            <Input
                                id="name"
                                placeholder="Name of your ingredient"
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
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="category" className={errors.category ? "text-red-500 font-medium" : ""}>Category</Label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger
                                            id="category"
                                            className={errors.category ? "border-red-500 ring-red-500" : ""}
                                            aria-invalid={errors.category ? "true" : "false"}
                                        >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value={IngredientCategory.VEGETABLE}>Vegetable</SelectItem>
                                            <SelectItem value={IngredientCategory.MEAT}>Meat</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && (
                                <p className="text-sm text-red-500 font-medium flex items-center mt-1">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    {errors.category.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="price" className={errors.price ? "text-red-500 font-medium" : ""}>Price</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                placeholder="Enter price"
                                {...register("price", {
                                    valueAsNumber: true
                                })}
                                className={errors.price ? "border-red-500 focus:ring-red-500" : ""}
                                aria-invalid={errors.price ? "true" : "false"}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-500 font-medium flex items-center mt-1">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    {errors.price.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="unit" className={errors.unit ? "text-red-500 font-medium" : ""}>Unit</Label>
                            <Controller
                                name="unit"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger
                                            id="unit"
                                            className={errors.unit ? "border-red-500 ring-red-500" : ""}
                                            aria-invalid={errors.unit ? "true" : "false"}
                                        >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value={IngredientUnit.KG}>kg</SelectItem>
                                            <SelectItem value={IngredientUnit.G}>g</SelectItem>
                                            <SelectItem value={IngredientUnit.ML}>ml</SelectItem>
                                            <SelectItem value={IngredientUnit.L}>l</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.unit && (
                                <p className="text-sm text-red-500 font-medium flex items-center mt-1">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    {errors.unit.message}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-between mt-4">
                            <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading
                                    ? (isUpdate ? "Updating..." : "Creating...")
                                    : (isUpdate ? "Update" : "Create")}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default CreateIngredient;

