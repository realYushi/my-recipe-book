import { Plus } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState, useRef } from "react";
import recipeService from "@/service/recipeService";
import type { Recipe } from "@/model/recipe";

import { Button } from "@components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import CreateRecipe from "@/components/recipes/createRecipe";
import SearchBar from "@/components/recipes/RecipeSearchBar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function RecipeList() {
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [cookingTime, setCookingTime] = useState<string>("");
    const [portions, setPortions] = useState<string>("");
    const [prepTime, setPrepTime] = useState<string>("");

    const fetchRecipes = () => {
        recipeService.getAllRecipes()
            .then(setAllRecipes)
            .catch((error) => {
                console.error("Error fetching recipes:", error);
            });
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleCreateSuccess = () => {
        setIsCreateOpen(false);
        fetchRecipes();
    };


    const filteredRecipes = allRecipes.filter((recipe) => {
        const matchesCookingTime = cookingTime === "" || (() => {
            const maxTime = Number(cookingTime);
            return recipe.cookingTime <= maxTime;
        })();

        const matchesPortions = portions === "" || (() => {
            if (portions === "8+") {
                return recipe.portions >= 8;
            }
            return recipe.portions >= Number(portions);
        })();

        const matchesPrepTime = prepTime === "" || (() => {
            const maxPrepTime = Number(prepTime);
            return recipe.preparationTime <= maxPrepTime;
        })();

        return matchesCookingTime && matchesPortions && matchesPrepTime;
    });


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
                    <DialogContent className="max-w-lg w-full max-h-[90vh] p-0 overflow-y-auto">
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
                <SearchBar />
            </div>
            <div className="px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="cookingTime" className="block text-sm font-medium mb-1.5 text-muted-foreground">
                            Max Cooking Time
                        </label>
                        <select
                            id="cookingTime"
                            value={cookingTime}
                            onChange={(e) => setCookingTime(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="">Any</option>
                            <option value="15">Under 15 min</option>
                            <option value="30">Under 30 min</option>
                            <option value="45">Under 45 min</option>
                            <option value="60">Under 1 hour</option>
                            <option value="90">Under 1.5 hours</option>
                            <option value="120">Under 2 hours</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="prepTime" className="block text-sm font-medium mb-1.5 text-muted-foreground">
                            Max Prep Time
                        </label>
                        <select
                            id="prepTime"
                            value={prepTime}
                            onChange={(e) => setPrepTime(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="">Any</option>
                            <option value="10">Under 10 min</option>
                            <option value="15">Under 15 min</option>
                            <option value="30">Under 30 min</option>
                            <option value="45">Under 45 min</option>
                            <option value="60">Under 1 hour</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="portions" className="block text-sm font-medium mb-1.5 text-muted-foreground">
                            Minimum Portions
                        </label>
                        <select
                            id="portions"
                            value={portions}
                            onChange={(e) => setPortions(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="4">4+</option>
                            <option value="6">6+</option>
                            <option value="8">8+</option>
                        </select>
                    </div>
                </div>

                {(cookingTime || prepTime || portions) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        <span className="text-sm text-muted-foreground">Active filters:</span>
                        {cookingTime && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                                Cook: ≤{cookingTime}min
                                <button
                                    onClick={() => setCookingTime("")}
                                    className="hover:bg-primary/20 rounded-sm p-0.5"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {prepTime && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                                Prep: ≤{prepTime}min
                                <button
                                    onClick={() => setPrepTime("")}
                                    className="hover:bg-primary/20 rounded-sm p-0.5"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {portions && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                                Portions: {portions === "8" ? "8+" : `${portions}+`}
                                <button
                                    onClick={() => setPortions("")}
                                    className="hover:bg-primary/20 rounded-sm p-0.5"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        <button
                            onClick={() => {
                                setCookingTime("");
                                setPrepTime("");
                                setPortions("");
                            }}
                            className="text-xs text-muted-foreground hover:text-foreground underline"
                        >
                            Clear all
                        </button>
                    </div>
                )}

                <div className="mt-2 text-sm text-muted-foreground">
                    {`${filteredRecipes.length} of ${allRecipes.length} recipes`}
                </div>
            </div>



            <ScrollArea className="flex-1 px-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredRecipes.map((recipe: Recipe) => (
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
                                                {recipe.preparationTime} min
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Cook: </span>
                                                {recipe.cookingTime} min
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
                </div>
            </ScrollArea>
        </div>
    );
}