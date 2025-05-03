"use client"

import { Plus, Search } from "lucide-react"
import { Link } from "react-router"
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import CreateIngredient from "@/components/ingredient/createIngredient"
import ingredientService from "@/service/ingredientService";

export function IngredientList() {
    const [ingredients, setIngredients] = useState<{ _id: string; name: string; quantity: string; unit: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const data = await ingredientService.getIngredients();
                setIngredients(data);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIngredients();
    }, []);

    const handleRemoveIngredient = async (id: string) => {
        if (!window.confirm("Are you sure you want to remove this ingredient?")) return;

        try {
            await ingredientService.deleteIngredient(id);
            setIngredients((prev) => prev.filter((ingredient) => ingredient._id !== id));
        } catch (error) {
            console.error("Error removing ingredient:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-semibold">Your Ingredients</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Ingredient
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <CreateIngredient />
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
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ingredients.map((ingredient) => (
                            <TableRow key={ingredient._id}>
                                <TableCell>{ingredient.name}</TableCell>
                                <TableCell>{ingredient.quantity}</TableCell>
                                <TableCell>{ingredient.unit}</TableCell>                           
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveIngredient(ingredient._id)}
                                    >
                                        Remove
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
