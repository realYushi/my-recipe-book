import { IngredientCategory, IngredientUnit, type Ingredient } from "~/model/ingredient"
import { Button } from "../ui/button"
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
import { ingredientService } from "~/service/ingredientService"
import { useState } from "react"
import { Alert, AlertDescription } from "../ui/alert"
import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../ui/dialog"

// Add onSuccess prop to allow notifying parent component
export function CreateIngredient({ onSuccess }: { onSuccess?: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<Ingredient>({
        defaultValues: {
            name: "",
            category: undefined,
            price: 0,
            unit: undefined
        }
    });

    const onSubmit = async (data: Ingredient) => {
        setIsLoading(true);
        setError(null);

        try {
            await ingredientService.createIngredient(data);
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            setError("Failed to create ingredient. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <DialogHeader className="p-5">
                <DialogTitle>Create New Ingredient</DialogTitle>
                <DialogDescription>Add a new ingredient to your recipe.</DialogDescription>
            </DialogHeader>
            <div className="p-4 pt-0">
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <form id="create-ingredient-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Name of your ingredient"
                                {...register("name", {
                                    required: "Name is required"
                                })}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="category">Category</Label>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: "Category is required" }}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
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
                                <p className="text-sm text-red-500">{errors.category.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                placeholder="Leave empty for unknown"
                                {...register("price", {
                                    valueAsNumber: true,
                                    required: "Price is required",
                                    min: {
                                        value: 0,
                                        message: "Price cannot be negative"
                                    }
                                })}
                                className={errors.price ? "border-red-500" : ""}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-500">{errors.price.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="unit">Unit</Label>
                            <Controller
                                name="unit"
                                control={control}
                                rules={{ required: "Unit is required" }}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger id="unit" className={errors.unit ? "border-red-500" : ""}>
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
                                <p className="text-sm text-red-500">{errors.unit.message}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={onSuccess}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </div>
        </>
    )
}

export default CreateIngredient;

