import { ArrowLeft, Clock, Edit, Trash2, Users } from "lucide-react"
import { Link, useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import UpdateRecipe from "@/components/recipes/updateRecipe"
import type { Recipe } from "@/model/recipe";
import recipeService from "@/service/recipeService";

function RecipeDetail() {
    const { id } = useParams<{ id?: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            if (!id) return;
            try {
                const data: Recipe = await recipeService.getRecipeById(id);
                setRecipe(data);
                setIsOwner(data.user === "mock-logged-in-user-id"); 
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleDeleteRecipe = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this recipe? This action cannot be undone.");
        if (!confirmation) return;

        try {
            await recipeService.deleteRecipe(id as string);
            alert("Recipe deleted successfully.");
            navigate("/app/recipes"); 
        } catch (error) {
            console.error("Error deleting recipe:", error);
            alert("Failed to delete the recipe. Please try again later.");
        }
    };

    if (!recipe) {
        return <div>Loading...</div>;
   }

    return (
        <div className="flex flex-col max-w-4xl mx-auto">
            <div className="flex items-center justify-between p-4 border-b mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/app/recipes">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to recipes</span>
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-semibold">{recipe.name}</h1>
                </div>
                {isOwner && (
                <div className="flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-full">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit recipe</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg w-full max-h-[90vh] p-0 overflow-y-auto">
                            <UpdateRecipe id={id as string} />
                        </DialogContent>
                    </Dialog>
                    <Button
                        variant="outline" size="icon"
                        className="text-destructive rounded-full"
                        onClick={handleDeleteRecipe}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete recipe</span>
                    </Button>
                </div>
                )}
            </div>

            <div className="flex-1 p-4 overflow-auto">
                <div className="grid gap-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="p-3">
                                <CardTitle className="text-sm font-medium flex items-center">
                                    <Clock className="mr-2 h-4 w-4" /> Preparation Time
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                            <p className="text-lg font-semibold">{recipe.preparationTime} mins</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="p-3">
                                <CardTitle className="text-sm font-medium flex items-center">
                                    <Clock className="mr-2 h-4 w-4" /> Cooking Time
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                            <p className="text-lg font-semibold">{recipe.cookingTime} mins</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="p-3">
                                <CardTitle className="text-sm font-medium flex items-center">
                                    <Users className="mr-2 h-4 w-4" /> Total Time
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                                <p className="text-lg font-semibold">{recipe.preparationTime + recipe.cookingTime} min</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="p-3">
                                <CardTitle className="text-sm font-medium flex items-center">
                                    <Users className="mr-2 h-4 w-4" /> Serves
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                                <p className="text-lg font-semibold">{recipe.portions} min</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Ingredients</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Unit</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{ingredient.ingredient.name}</TableCell>
                                        <TableCell>{ingredient.quantity}</TableCell>
                                        <TableCell>{ingredient.unit}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <Separator />

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Instructions</h2>
                        <div className="space-y-4">
                        {recipe.instructions.split("\n").map((step: string, index: number) => (
                                <div key={index} className="flex gap-2">
                                    <div className="flex-none w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-semibold text-sm"> 
                                        {index + 1}.
                                    </div>
                                    <div className ="flex-1 pt-1">
                                        {step}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail;


