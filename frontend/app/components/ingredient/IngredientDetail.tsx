import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import UpdateIngredient from "@/components/ingredient/UpdateIngredient";
import { useEffect, useState } from "react";
import ingredientService from "@/service/ingredientService";
import type { Ingredient } from "@/model/ingredient";

export function IngredientDetail() {
    const { id } = useParams<{ id: string }>();
    const [ingredient, setIngredient] = useState<Ingredient | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIngredient = async () => {
            try {
                setLoading(true);
                const response = await ingredientService.getIngredientById(id!);
                setIngredient(response);
            } catch (err) {
                console.error("Error fetching ingredient:", err);
                setError("Failed to load ingredient. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchIngredient();
    }, [id]);

    const deleteIngredient = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ingredient?");
        if (!confirmDelete) return;

        try {
            await ingredientService.deleteIngredient(id!);
            alert("Ingredient deleted successfully.");
            navigate("/app/ingredients");
        } catch (err) {
            console.error("Error deleting ingredient:", err);
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            alert(`Failed to delete ingredient: ${errorMessage}`);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!ingredient) return <p>Ingredient not found.</p>;

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/app/ingredients">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to ingredients</span>
                        </Link>
                    </Button>
                    <h1 className="text-xl font-semibold">{ingredient.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle></DialogTitle>
                            <UpdateIngredient id={id as string} />
                        </DialogContent>
                    </Dialog>
                    <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive"
                        onClick={deleteIngredient}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete ingredient</span>
                    </Button>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-auto">
                <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="py-2">
                                <CardTitle className="text-sm font-medium">Unit</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                                <p className="text-lg font-semibold">{ingredient.unit}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="py-2">
                                <CardTitle className="text-sm font-medium">Price</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                                <p className="text-lg font-semibold">${ingredient.price.toFixed(2)}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="py-2">
                                <CardTitle className="text-sm font-medium">Current Stock</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                                <p className="text-lg font-semibold">
                                    {ingredient.stock ? ingredient.stock : 0} {ingredient.unit}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Additional Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Supplier</p>
                                <p className="font-medium">{ingredient.supplier}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Notes</h2>
                        <p>{ingredient.notes}</p>
                    </div>

                    {/* Optional future section
                    <Separator />
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Used In Recipes</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>...</li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default IngredientDetail;
