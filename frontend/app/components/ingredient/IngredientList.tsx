import { useEffect, useState } from "react";
import { Link } from "react-router";
import ingredientService from "@/service/ingredientService";
import type { Ingredient } from "@/model/ingredient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search, ArrowLeft } from "lucide-react";
import CreateIngredient from "@/components/ingredient/createIngredient";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DialogTitle } from "@radix-ui/react-dialog";
import scrapeService from "@/service/scrapeService";

export function IngredientList() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isScrapePage, setIsScrapePage] = useState(false);
    const [selectedIngredientForAdd, setSelectedIngredientForAdd] = useState<Ingredient | null>(null);

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
            setIsScrapePage(true);
            const data = await scrapeService.scrapePaknSave(searchTerm);

            const scrapedItems = data.data.map((item: Ingredient) => ({
                ...item,
                _id: item.name + item.price
            }));

            setIngredients(scrapedItems);
        } catch (err) {
            console.error("Pak'nSave fetch error:", err);
            setError("Could not load Pak'nSave items. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBackToIngredients = () => {
        setIsScrapePage(false);
        setSelectedIngredientForAdd(null);
        fetchIngredients();
    };

    const handleIngredientAdded = () => {
        if (isScrapePage) {
            setIsScrapePage(false);
        }
        fetchIngredients();
        setSelectedIngredientForAdd(null);
        setSearchTerm("");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleAddIngredient = (ingredient?: Ingredient) => {
        if (isScrapePage && ingredient) {
            setSelectedIngredientForAdd(ingredient);
        } else {
            setSelectedIngredientForAdd(null);
        }

    };

    const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4 gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                    {isScrapePage && (
                        <Button variant="outline" size="sm" onClick={handleBackToIngredients}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    )}
                    <h1 className="text-xl font-semibold">{isScrapePage ? "Scrape" : "Ingredients"}</h1>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {!isScrapePage && (
                        <Button onClick={fetchPaknsaveIngredients}>Load Pak'nSave</Button>
                    )}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button onClick={() => handleAddIngredient()}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Ingredient
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Create Ingredient</DialogTitle>
                            <CreateIngredient
                                onSuccess={handleIngredientAdded}
                                hideHeader={true}
                                ingredientData={selectedIngredientForAdd || undefined}
                                isUpdate={false}
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
                        placeholder={isScrapePage ? "Search scraped ingredients..." : "Search ingredients..."}
                        className="pl-8"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <ScrollArea className="flex-1">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Price</TableHead>
                            {isScrapePage && <TableHead>Action</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredIngredients.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={isScrapePage ? 4 : 3} className="text-center text-muted-foreground">
                                    {ingredients.length === 0
                                        ? (isScrapePage ? "No scraped ingredients available." : "No ingredients available.")
                                        : "No results found for your search."}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredIngredients.map((ingredient) => (
                                <TableRow key={ingredient._id} className="hover:bg-muted/50">
                                    <TableCell className="font-medium">
                                        {isScrapePage ? (
                                            ingredient.name
                                        ) : (
                                            <Link to={`/app/ingredients/${ingredient._id}`}>
                                                {ingredient.name}
                                            </Link>
                                        )}
                                    </TableCell>
                                    <TableCell>{ingredient.unit}</TableCell>
                                    <TableCell>${ingredient.price.toFixed(2)}</TableCell>
                                    {isScrapePage && (
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" onClick={() => handleAddIngredient(ingredient)}>
                                                        Add
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle>Create Ingredient</DialogTitle>
                                                    <CreateIngredient
                                                        onSuccess={handleIngredientAdded}
                                                        hideHeader={true}
                                                        ingredientData={ingredient}
                                                        isUpdate={false}
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    )}
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
