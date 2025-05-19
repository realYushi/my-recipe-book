import { Plus, Search } from "lucide-react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import CreateRecipe from "@/components/recipes/createRecipe"

// Sample recipe data
const recipes = [
    {
        id: "68086b8bd55d25d7f3f9eaad",
        name: "Spaghetti Bolognese",
        ingredients: [
            { name: "Ground Beef", unit: "g", amount: 500 },
            { name: "Onion", unit: "medium", amount: 1 },
            { name: "Garlic", unit: "cloves", amount: 2 },
            { name: "Tomato Sauce", unit: "can", amount: 1 },
            { name: "Spaghetti", unit: "g", amount: 400 },
        ],
        prepTime: "15 mins",
        cookTime: "45 mins",
        portions: 4,
    },
    {
        id: "2",
        name: "Chicken Stir Fry",
        ingredients: [
            { name: "Chicken Breast", unit: "g", amount: 400 },
            { name: "Bell Peppers", unit: "medium", amount: 2 },
            { name: "Broccoli", unit: "g", amount: 200 },
            { name: "Soy Sauce", unit: "tbsp", amount: 3 },
            { name: "Rice", unit: "g", amount: 300 },
        ],
        prepTime: "10 mins",
        cookTime: "15 mins",
        portions: 2,
    },
    {
        id: "3",
        name: "Vegetable Curry",
        ingredients: [
            { name: "Potatoes", unit: "medium", amount: 2 },
            { name: "Carrots", unit: "medium", amount: 2 },
            { name: "Peas", unit: "g", amount: 100 },
            { name: "Curry Paste", unit: "tbsp", amount: 2 },
            { name: "Coconut Milk", unit: "can", amount: 1 },
        ],
        prepTime: "20 mins",
        cookTime: "30 mins",
        portions: 4,
    },
    {
        id: "4",
        name: "Chocolate Chip Cookies",
        ingredients: [
            { name: "Flour", unit: "g", amount: 250 },
            { name: "Butter", unit: "g", amount: 150 },
            { name: "Sugar", unit: "g", amount: 200 },
            { name: "Eggs", unit: "", amount: 2 },
            { name: "Chocolate Chips", unit: "g", amount: 200 },
        ],
        prepTime: "15 mins",
        cookTime: "12 mins",
        portions: 24,
    },
    {
        id: "5",
        name: "Greek Salad",
        ingredients: [
            { name: "Cucumber", unit: "medium", amount: 1 },
            { name: "Tomatoes", unit: "medium", amount: 2 },
            { name: "Red Onion", unit: "small", amount: 1 },
            { name: "Feta Cheese", unit: "g", amount: 100 },
            { name: "Olives", unit: "g", amount: 50 },
        ],
        prepTime: "15 mins",
        cookTime: "0 mins",
        portions: 2,
    },
    {
        id: "6",
        name: "Beef Tacos",
        ingredients: [
            { name: "Ground Beef", unit: "g", amount: 500 },
            { name: "Taco Seasoning", unit: "packet", amount: 1 },
            { name: "Taco Shells", unit: "", amount: 12 },
            { name: "Lettuce", unit: "g", amount: 100 },
            { name: "Cheese", unit: "g", amount: 200 },
        ],
        prepTime: "15 mins",
        cookTime: "20 mins",
        portions: 4,
    },
]

export function RecipeList() {
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
                    {recipes.map((recipe) => (
                        <Link to={`/app/recipes/${recipe.id}`} key={recipe.id}>
                            <Card className="h-full cursor-pointer hover:bg-muted/50 transition-colors">
                                <CardHeader>
                                    <CardTitle>{recipe.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Prep: </span>
                                                {recipe.prepTime}
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Cook: </span>
                                                {recipe.cookTime}
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
                                                    .map((i) => i.name)
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
    )
}

export default RecipeList;