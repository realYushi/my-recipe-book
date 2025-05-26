import { BarChart, LineChart, PieChart, Clock, ChefHat, TrendingUp, Calendar, Badge } from "lucide-react"
import { Link } from "react-router"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import ingredientService from "@/service/ingredientService"
import recipeService from "@/service/recipeSerive"
import type { Recipe } from "@/model/recipe"
import type { Ingredient } from "@/model/ingredient"

export function HomePage() {
    const [totalIngredients, setTotalIngredients] = useState(0);
    const [totalRecipes, setTotalRecipes] = useState(0);
    const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
    const [quickRecipes, setQuickRecipes] = useState<Recipe[]>([]);
    const [expensiveIngredients, setExpensiveIngredients] = useState<Ingredient[]>([]);
    const [avgCookingTime, setAvgCookingTime] = useState(0);
    const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch ingredients
                const ingredients = await ingredientService.getIngredients();
                setTotalIngredients(ingredients.length);

                // Find most expensive ingredients
                const sortedByPrice = [...ingredients].sort((a, b) => b.price - a.price);
                setExpensiveIngredients(sortedByPrice.slice(0, 3));

                // Fetch recipes
                const recipes = await recipeService.getAllRecipes();
                setTotalRecipes(recipes.length);

                // Get recent recipes (last 3)
                const sortedByDate = [...recipes].sort((a, b) =>
                    new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
                );
                setRecentRecipes(sortedByDate.slice(0, 3));

                // Get quick recipes (cooking time <= 30 mins)
                const quick = recipes.filter(recipe =>
                    (recipe.preparationTime + recipe.cookingTime) <= 30
                ).slice(0, 3);
                setQuickRecipes(quick);

                // Calculate average cooking time
                if (recipes.length > 0) {
                    const totalTime = recipes.reduce((sum, recipe) =>
                        sum + recipe.preparationTime + recipe.cookingTime, 0
                    );
                    setAvgCookingTime(Math.round(totalTime / recipes.length));
                }
                // Get random recipe
                const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
                setRandomRecipe(randomRecipe);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex h-full flex-col w-full">
            <div className="p-4">
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Overview of your kitchen and recipes</p>
            </div>
            <div className="flex-1 p-4 pt-0 space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Ingredients</CardTitle>
                            <BarChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalIngredients}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
                            <LineChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalRecipes}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Cook Time</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{avgCookingTime}</div>
                            <p className="text-xs text-muted-foreground">minutes</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Quick Recipes</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{quickRecipes.length}</div>
                            <p className="text-xs text-muted-foreground">≤ 30 mins</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                Recent Recipes
                            </CardTitle>
                            <CardDescription>Your latest creations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {recentRecipes.length > 0 ? (
                                recentRecipes.map((recipe) => (
                                    <div key={recipe._id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{recipe.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {recipe.preparationTime + recipe.cookingTime} mins • {recipe.portions} portions
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link to={`/app/recipes/${recipe._id}`}>View</Link>
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No recipes yet</p>
                            )}
                            <Button variant="outline" className="w-full mt-3" asChild>
                                <Link to="/app/recipes">View All Recipes</Link>
                            </Button>
                        </CardContent>
                    </Card>



                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Priciest Ingredients
                            </CardTitle>
                            <CardDescription>Your most expensive ingredients</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {expensiveIngredients.length > 0 ? (
                                expensiveIngredients.map((ingredient) => (
                                    <div key={ingredient._id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{ingredient.name}</p>
                                            <p className="text-xs text-muted-foreground capitalize">
                                                {ingredient.category?.toLowerCase() || 'uncategorized'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">${ingredient.price}</p>
                                            <p className="text-xs text-muted-foreground">per {ingredient.unit}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No ingredients yet</p>
                            )}
                            <Button variant="outline" className="w-full mt-3" asChild>
                                <Link to="/app/ingredients">Manage Ingredients</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <ChefHat className="mr-2 h-4 w-4" />
                            Suprise me!
                        </CardTitle>
                        <CardDescription>Get a random recipe</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">{randomRecipe?.name}</h3>
                                <p className="text-sm text-muted-foreground">{(randomRecipe?.preparationTime || 0) + (randomRecipe?.cookingTime || 0)} mins • {randomRecipe?.portions} portions</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" asChild>
                                    <Link to="/app/recipes">Browse Recipes</Link>
                                </Button>
                                <Button asChild>
                                    <Link to="/app/recipes/create">Create New Recipe</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default HomePage;
