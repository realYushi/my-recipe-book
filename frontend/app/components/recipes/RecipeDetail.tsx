import { ArrowLeft, Clock, Edit, Trash2, Users } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import UpdateRecipe from "@/components/recipes/updateRecipe"
import { useEffect, useState } from "react"

type Recipe = {
    id: string;
    name: string;
    prepTime: string;
    cookTime: string;
    portions: number;
    ingredients: { name: string; amount: string; unit: string }[];
    instructions: string;
};

function RecipeDetail() {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/recipes/${id}`);
                const fetchRecipe = await response.json();
                setRecipe(fetchRecipe);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!recipe) return <p>Recipe not found.</p>;
    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/app/recipes">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to recipes</span>
                        </Link>
                    </Button>
                    <h1 className="text-xl font-semibold">{recipe.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent
                            className="max-w-lg w-full max-h-[90vh] p-0 overflow-y-auto"
                            style={{ padding: 0 }}
                        >
                            <div className="h-full overflow-y-auto">
                                <UpdateRecipe id={id as string} />
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete recipe</span>
                    </Button>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-auto">
                <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="w-full md:w-auto">
                            <CardHeader className="py-2">
                                <CardTitle className="text-sm font-medium flex items-center">
                                    <Clock className="mr-2 h-4 w-4" /> Preparation Time
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                                <p className="text-lg font-semibold">{recipe.prepTime}</p>
                            </CardContent>
                        </Card>
                        <Card className="w-full md:w-auto">
                            <CardHeader className="py-2">
                                <CardTitle className="text-sm font-medium flex items-center">
                                    <Clock className="mr-2 h-4 w-4" /> Cooking Time
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                                <p className="text-lg font-semibold">{recipe.cookTime}</p>
                            </CardContent>
                        </Card>
                        <Card className="w-full md:w-auto">
                            <CardHeader className="py-2">
                                <CardTitle className="text-sm font-medium flex items-center">
                                    <Users className="mr-2 h-4 w-4" /> Portions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                                <p className="text-lg font-semibold">{recipe.portions}</p>
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
                                        <TableCell className="font-medium">{ingredient.name}</TableCell>
                                        <TableCell>{ingredient.amount}</TableCell>
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
                            {recipe.instructions.split("\n").map((step, index) => (
                                <div key={index} className="flex gap-2">
                                    <div className="flex-none">{step.split(".")[0]}.</div>
                                    <div>{step.split(".").slice(1).join(".").trim()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetail;