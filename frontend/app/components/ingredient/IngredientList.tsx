import { Plus, Search, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import CreateIngredient from "@/components/ingredient/createIngredient";
import ingredientService from "@/service/ingredientService";
import type { Ingredient } from "@/model/ingredient";
import { getAuth } from "firebase/auth";

export function IngredientList() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        fetchIngredients();
    }, []);

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

    const fetchPaknsaveIngredients = async () => {
        try {
            setLoading(true);
            const user = getAuth().currentUser;
            if (!user) throw new Error("User not authenticated");

            const token = await user.getIdToken();
            const res = await fetch("/api/scrape/paknsave", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch Pak'nSave data");
            const data = await res.json();
            setIngredients(data.ingredients);
        } catch (err) {
            console.error("Pak'nSave fetch error:", err);
            setError("Could not load Pak'nSave items. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const deleteIngredient = async (id: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this ingredient?"
        );
        if (!confirmDelete) return;

        try {
            await ingredientService.deleteIngredient(id);
            alert("Ingredient deleted successfully.");
            setIngredients((prev) => prev.filter((ingredient) => ingredient._id !== id));
            setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
        } catch (err) {
            console.error("Error deleting ingredient:", err);
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            alert(`Failed to delete ingredient: ${errorMessage}`);
        }
    };

    const handleBulkDelete = async () => {
        const confirm = window.confirm(
            `Are you sure you want to delete ${selectedIds.length} ingredient(s)?`
        );
        if (!confirm) return;

        try {
            await Promise.all(
                selectedIds.map((id) => ingredientService.deleteIngredient(id))
            );
            alert("Selected ingredients deleted.");
            setIngredients((prev) => prev.filter((i) => !selectedIds.includes(i._id)));
            setSelectedIds([]);
        } catch (err) {
            console.error("Bulk delete failed:", err);
            alert("Failed to delete some ingredients. Please try again.");
        }
    };

    const handleIngredientAdded = () => {
        fetchIngredients();
    };

    const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    const allSelected =
        filteredIngredients.length > 0 &&
        filteredIngredients.every((i) => selectedIds.includes(i._id));

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4 gap-4 flex-wrap">
                <h1 className="text-xl font-semibold">Ingredients</h1>
                <div className="flex gap-2 flex-wrap">
                    <Button onClick={fetchPaknsaveIngredients}>Load Pak'nSave</Button>
                    <Button
                        variant="destructive"
                        onClick={handleBulkDelete}
                        disabled={selectedIds.length === 0}
                    >
                        Delete Selected
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Ingredient
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Create Ingredient</DialogTitle>
                            <CreateIngredient
                                onSuccess={handleIngredientAdded}
                                hideHeader={true}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="px-4 pb-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search ingredients..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <ScrollArea className="flex-1">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedIds(filteredIngredients.map((i) => i._id));
                                        } else {
                                            setSelectedIds([]);
                                        }
                                    }}
                                />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredIngredients.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    {ingredients.length === 0
                                        ? "No ingredients available."
                                        : "No results found for your search."}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredIngredients.map((ingredient) => (
                                <TableRow
                                    key={ingredient._id}
                                    className="cursor-pointer hover:bg-muted/50"
                                >
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(ingredient._id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedIds((prev) => [...prev, ingredient._id]);
                                                } else {
                                                    setSelectedIds((prev) =>
                                                        prev.filter((id) => id !== ingredient._id)
                                                    );
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <Link to={`/app/ingredients/${ingredient._id}`} className="block w-full">
                                            {ingredient.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/app/ingredients/${ingredient._id}`} className="block w-full">
                                            {ingredient.unit}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/app/ingredients/${ingredient._id}`} className="block w-full">
                                            ${ingredient.price.toFixed(2)}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => deleteIngredient(ingredient._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    );
}

export default IngredientList;
