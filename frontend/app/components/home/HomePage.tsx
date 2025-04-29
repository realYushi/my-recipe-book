import { BarChart, LineChart, PieChart } from "lucide-react"
import { Link } from "react-router"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Button } from "~/components/ui/button"

export function HomePage() {
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
                            <div className="text-2xl font-bold">42</div>
                            <p className="text-xs text-muted-foreground">+5 from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
                            <LineChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">18</div>
                            <p className="text-xs text-muted-foreground">+2 from last month</p>
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

                <Tabs defaultValue="ingredients" className="mt-6">
                    <TabsList>
                        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                        <TabsTrigger value="recipes">Recipes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ingredients" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Ingredient Categories</CardTitle>
                                <CardDescription>Distribution of ingredients by category</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px] flex items-center justify-center">
                                <div className="text-center text-muted-foreground">[Ingredient Category Chart]</div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="recipes" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recipe Difficulty</CardTitle>
                                <CardDescription>Distribution of recipes by difficulty level</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px] flex items-center justify-center">
                                <div className="text-center text-muted-foreground">[Recipe Difficulty Chart]</div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default HomePage;
