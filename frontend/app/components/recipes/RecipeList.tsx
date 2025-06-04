import { Plus } from "lucide-react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import CreateRecipe from "@/components/recipes/createRecipe"
import SearchBar from "@/components/SearchBar"
import { useEffect, useState } from "react"
import recipeService from "@/service/recipeService"
import type { Recipe } from "@/model/recipe"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
export function RecipeList() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [filter, setFilter] = useState({ portions: "", prepTime: "", cookingTime: "" });

    const fetchRecipes = async () => {
        try {
            const hasFilters = filter.portions || filter.prepTime || filter.cookingTime;
            if (hasFilters) {
                const filtered = await recipeService.fetchFilteredRecipes({
                    portions: filter.portions ? Number(filter.portions) : undefined,
                    prepTime: filter.prepTime ? Number(filter.prepTime) : undefined,
                    cookingTime: filter.cookingTime ? Number(filter.cookingTime) : undefined,
                });
                setRecipes(filtered);
            } else {
                const all = await recipeService.getAllRecipes();
                setRecipes(all);
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchRecipes(); // refetch with filters
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleCreateSuccess = () => {
        setIsCreateOpen(false);
        fetchRecipes();
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-semibold">Recipes</h1>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsCreateOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Recipe
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        className="max-w-lg w-full max-h-[90vh] p-0 overflow-y-auto"
                        style={{ padding: 0 }}
                    >
                        <VisuallyHidden asChild>
                            <DialogTitle>Create Recipe</DialogTitle>
                        </VisuallyHidden>
                        <div className="h-full overflow-y-auto">
                            <CreateRecipe onSuccess={handleCreateSuccess} />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="px-4 pb-4">
                <div className="relative">
                    <SearchBar />
                </div>
            </div>
            <ScrollArea className="flex-1 px-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {recipes.map((recipe: Recipe) => (
                        <Link to={`/app/recipes/${recipe._id}`} key={recipe._id}>
                            <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                                <CardHeader>
                                    <CardTitle>{recipe.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Prep: </span>
                                                {recipe.preparationTime}
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Cook: </span>
                                                {recipe.cookingTime}
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Portions: </span>
                                                {recipe.portions}
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Ingredients: </span>
                                                {recipe.ingredients.length}
                                            </div>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                    <div className="px-4 pb-4">
                        <form onSubmit={handleFilterSubmit} className="flex gap-2 mb-4">
                            <input
                                type="number"
                                name="portions"
                                placeholder="Portions"
                                min={1}
                                value={filter.portions}
                                onChange={handleFilterChange}
                                className="border rounded px-2 py-1"
                            />
                            <input
                                type="number"
                                name="prepTime"
                                placeholder="Prep Time (min)"
                                min={1}
                                value={filter.prepTime}
                                onChange={handleFilterChange}
                                className="border rounded px-2 py-1"
                            />
                            <input
                                type="number"
                                name="cookingTime"
                                placeholder="Cooking Time (min)"
                                min={1}
                                value={filter.cookingTime}
                                onChange={handleFilterChange}
                                className="border rounded px-2 py-1"
                            />
                            <button type="submit" className="btn btn-primary">Filter</button>
                        </form>
                        <div className="relative">
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default RecipeList;