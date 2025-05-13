"use client"

import { Plus, Search, Trash2 } from "lucide-react"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import CreateIngredient from "@/components/ingredient/createIngredient"
import ingredientService from "@/service/ingredientService";

type Ingredient = {
    id: string;
    name: string;
    unit: string;
    price: number;
};

export function IngredientList() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                setLoading(true);
                const fetchedIngredients = await ingredientService.getIngredients();
                setIngredients(fetchedIngredients);
            } catch (err) {
                console.error("Error fetching ingredients:", err);
                setError("Failed to load ingredients. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchIngredients();
    }, []);

    const deleteIngredient = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ingredient?");
        if (!confirmDelete) return;

        try {
            await ingredientService.deleteIngredient(id);
            setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
            alert("Ingredient deleted successfully.");
        } catch (err) {
            console.error("Error deleting ingredient:", err);
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            alert(`Failed to delete ingredient: ${errorMessage}`);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-semibold">Ingredients</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Ingredient
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <CreateIngredient onSuccess={() => window.location.reload()} />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="px-4 pb-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search ingredients..." className="pl-8" />
                </div>
            </div>
            <ScrollArea className="flex-1">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ingredients.map((ingredient) => (
                            <TableRow key={ingredient.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell className="font-medium">
                                    <Link to={`/app/ingredients/${ingredient.id}`} className="block w-full">
                                        {ingredient.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/app/ingredients/${ingredient.id}`} className="block w-full">
                                        {ingredient.unit}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/app/ingredients/${ingredient.id}`} className="block w-full">
                                        ${ingredient.price.toFixed(2)}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => deleteIngredient(ingredient.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}

export default IngredientList;