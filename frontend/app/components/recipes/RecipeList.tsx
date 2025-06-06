
import { Plus } from "lucide-react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import CreateRecipe from "@/components/recipes/createRecipe"
import { useEffect, useState } from "react"
import recipeService from "@/service/recipeService"
import type { Recipe } from "@/model/recipe"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function RecipeList() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [filter, setFilter] = useState({ portions: "", prepTime: "", cookingTime: "" });
    const [search, setSearch] = useState("");

    const fetchRecipes = async () => {
        try {
            const hasFilters = filter.portions || filter.prepTime || filter.cookingTime;
            if (search || hasFilters) {
                if (search) {
                    const searched = await recipeService.searchRecipes(search);
                    setRecipes(searched);
                } else {
                    const filtered = await recipeService.fetchFilteredRecipes({
                        portions: filter.portions ? Number(filter.portions) : undefined,
                        prepTime: filter.prepTime ? Number(filter.prepTime) : undefined,
                        cookingTime: filter.cookingTime ? Number(filter.cookingTime) : undefined,
                    });
                    setRecipes(filtered);
                }
            } else {
                const all = await recipeService.getAllRecipes();
                setRecipes(all);
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchRecipes();
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleCreateSuccess = () => {
        setIsCreateOpen(false);
        fetchRecipes();
    }

    const portionOptions = [
        ...Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
        "10+"
    ];
    const timeOptions = Array.from({ length: 24 }, (_, i) => ((i + 1) * 5).toString());

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
                <form onSubmit={handleFilterSubmit} className="flex flex-wrap gap-2 mb-4 items-center">
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border rounded px-2 py-1 flex-1 min-w-[200px]"
                    />

                    <select
                        name="portions"
                        value={filter.portions}
                        onChange={handleFilterChange}
                        className="border rounded px-2 py-1"
                    >
                        <option value="">Portions</option>
                        {portionOptions.map(opt => (
                            <option key={opt} value={opt === "10+" ? 11 : opt}>
                                {opt}
                            </option>
                        ))}
                    </select>

                    <select
                        name="prepTime"
                        value={filter.prepTime}
                        onChange={handleFilterChange}
                        className="border rounded px-2 py-1"
                    >
                        <option value="">Prep Time (min)</option>
                        {timeOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>

                    <select
                        name="cookingTime"
                        value={filter.cookingTime}
                        onChange={handleFilterChange}
                        className="border rounded px-2 py-1"
                    >
                        <option value="">Cooking Time (min)</option>
                        {timeOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>

                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
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
                                            <div><span className="text-muted-foreground">Prep: </span>{recipe.preparationTime}</div>
                                            <div><span className="text-muted-foreground">Cook: </span>{recipe.cookingTime}</div>
                                            <div><span className="text-muted-foreground">Portions: </span>{recipe.portions}</div>
                                            <div><span className="text-muted-foreground">Ingredients: </span>{recipe.ingredients.length}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default RecipeList;
