import { Plus, Search } from "lucide-react"
import { Link } from "react-router"
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"
import type { Recipe } from "@/model/recipe"; 
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import CreateRecipe from "@/components/recipes/createRecipe"
import recipeService from "@/service/recipeService";
import type { RecipeIngredient } from "@/model/ingredient";

export function RecipeList() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await recipeService.getAllRecipes(); 
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching all recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-semibold">Recipes</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Recipe
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        className="max-w-lg w-full max-h-[90vh] p-0 overflow-y-auto"
                        style={{ padding: 0 }}
                    >
                        <div className="h-full overflow-y-auto">
                            <CreateRecipe />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="px-4 pb-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search recipes..." className="pl-8" />
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
                                                {recipe.preparationTime} mins
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Cook: </span>
                                                {recipe.cookingTime} mins
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

                                        <div>
                                            <h4 className="text-sm font-medium mb-1">Main Ingredients:</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {recipe.ingredients
                                                    .slice(0, 3)
                                                    .map((i: RecipeIngredient) => i.ingredient?.name || "Unknown Ingredient")
                                                    .join(", ")}
                                                {recipe.ingredients.length > 3 ? "..." : ""}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

export default RecipeList;