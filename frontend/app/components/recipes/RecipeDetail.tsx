import { AlertTriangle, ArrowLeft, Clock, Edit, Trash2, Users } from "lucide-react"
import { Link, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import UpdateRecipe from "@/components/recipes/updateRecipe"
import { useEffect, useRef, useState } from "react";
import type { Recipe } from "@/model/recipe"
import recipeService from "@/service/recipeService"
import type { RecipeIngredient } from "@/model/ingredient"
import { Crepe } from "@milkdown/crepe";
import html2canvas from "html2canvas";
import { toJpeg } from "html-to-image";
import { Link, useParams } from "react-router-dom"

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Editor state
  const editorRef = useRef(null);
  const [crepeInstance, setCrepeInstance] = useState<any>(null);
  const recipeRef = useRef<HTMLDivElement>(null);

  // Separate useEffect for fetching recipe data
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const fetchedRecipe = await recipeService.getRecipeById(id as string);
        setRecipe(fetchedRecipe);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Separate useEffect for initializing the editor AFTER recipe is loaded
  useEffect(() => {
    if (!recipe || !editorRef.current) return;

    const instance = new Crepe({
      root: editorRef.current,
      defaultValue: recipe.instructions || "",
    });
    instance.setReadonly(true);
    instance.create();
    setCrepeInstance(instance);

    // Cleanup function
    return () => {
      if (instance) {
        instance.destroy();
      }
    };
  }, [recipe]); // This runs when recipe data is available

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  const handleScreenshot = async () => {
    console.log("handleScreenshot called");
    if (recipeRef.current) {
      try {
        const dataUrl = await toJpeg(recipeRef.current, {
          backgroundColor: "#ffffff",
          quality: 0.95,
          skipFonts: true,
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${recipe?.name || "recipe"}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("Error saving image:", err);
      }
    }
  }

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
        <div ref={recipeRef} className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="w-full md:w-auto">
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Clock className="mr-2 h-4 w-4" /> Preparation Time
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-lg font-semibold">{recipe.preparationTime}</p>
              </CardContent>
            </Card>
            <Card className="w-full md:w-auto">
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Clock className="mr-2 h-4 w-4" /> Cooking Time
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-lg font-semibold">{recipe.cookingTime}</p>
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
                {recipe.ingredients?.map((ingredient: RecipeIngredient, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{ingredient.ingredient.name}</TableCell>
                    <TableCell>{ingredient.quantity}</TableCell>
                    <TableCell>{ingredient.ingredient.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator />

          <div className="mt-8 flex justify-end">
            <Button
              onClick={() => {
                console.log("Button clicked");
                handleScreenshot();
              }}
              className="text-black"
              variant="outline"
            >
              Screen Shot
            </Button>
          </div>

          <div>
            <div className="text-lg font-medium">Cooking Instructions</div>
            <div
              ref={editorRef} className="flex h-full flex-col">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail;