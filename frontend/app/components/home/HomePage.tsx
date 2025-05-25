import { BarChart, LineChart, PieChart } from "lucide-react"
import { Link } from "react-router"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import ingredientService from "@/service/ingredientService"
import recipeService from "@/service/recipeSerive"

export function HomePage() {
    //get total ingredients
    const [totalIngredients, setTotalIngredients] = useState(0);
    const [totalRecipes, setTotalRecipes] = useState(0);
    useEffect(() => {
        ingredientService.getIngredients().then((ingredients) => {
            setTotalIngredients(ingredients.length);
        });
        recipeService.getAllRecipes().then((recipes) => {
            setTotalRecipes(recipes.length);
        });

    }, []);


    return (
        <div className="flex h-full flex-col w-full">
            <div className="p-4">
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Overview of your kitchen and recipes</p>
            </div>
            <div className="flex-1 p-4 pt-0">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                            <CardTitle className="text-sm font-medium">Recipe for Today</CardTitle>
                            <PieChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold">Chicken Stir Fry</div>
                            <p className="text-xs text-muted-foreground">Quick and healthy</p>
                            <Button variant="link" className="px-0 h-auto mt-1 text-xs" asChild>
                                <Link to="/app/recipes/2">View Recipe</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
