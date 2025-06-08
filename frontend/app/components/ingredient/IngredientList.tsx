import { Plus, Search, Trash2 } from "lucide-react"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import CreateIngredient from "@/components/ingredient/createIngredient"
import ingredientService from "@/service/ingredientService";
import type { Ingredient } from "@/model/ingredient";

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
                        <DialogTitle>Create Ingredient</DialogTitle>
                        <CreateIngredient onSuccess={() => window.location.reload()} hideHeader={true} />
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ingredients.map((ingredient) => (
                            <TableRow key={ingredient._id} className="cursor-pointer hover:bg-muted/50">
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}

export default IngredientList;
