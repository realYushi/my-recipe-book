import React, { useEffect, useState } from 'react';
import RecipeDetail from '~/components/recipes/recipeDetail';
import IngredientList from '~/components/recipes/ingredientList';
import Instructions from '~/components/recipes/instructions';
import { Clock, Users } from 'lucide-react';
import { Separator } from '~/components/ui/separator';


interface Recipe {
    name: string;
    portions: number;
    preparationTime: number;
    cookingTime: number;
    ingredients: Array<{
        quantity: number;
        unit: string;
        ingredient: string;
    }>;
    instructions: string;
}

const RecipePage: React.FC <{ params: {slug: string}}> =({params})=> {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`/api/recipes/${params.slug}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Faided to fetch recipe');
                }
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                setError('Failed to load recipe');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, []);

    if(loading) {
        return <p>Loading...</p>;
    }
    if(error) {
        return <p>{error}</p>;
    }   
    
    return (
        <div className = "container mx-auto px-4 py-8 max-w-4x1">
            <div className = "space-y-6">
                <div className = "space-y-2">
                    <h1 className = "text-3xl md:text-4xl font-bold">{recipe?.name}</h1>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                    <div className ="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                        <Clock className="h-5 w-5 mb-1 text-muted-foreground"/>
                        <span className="text-sm font-medium">Preparation Time: </span>
                        <span className="text-sm">{recipe?.preparationTime} minutes</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 mb-1 text-muted-foreground"/>
                    <span className="text-sm font-medium">Cooking Time: </span>     
                    <span className="text-sm">{recipe?.cookingTime} minutes</span>           
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                    <Users className="h-5 w-5 mb-1 text-muted-foreground"/>
                    <span className="text-sm font-medium">Portions: </span>     
                    <span className="text-sm">{recipe?.portions}</span> 
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Ingredients</h2>
                    <ul className="space-y-2">
                        {recipe?.ingredients.map((ingredient, index) => (
                            <li key={index} className="text-sm">{`${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}`}
                            </li>
                        ))}
                    </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Instructions</h2>
                    <ol className="space-y-2">
                        {recipe?.instructions.split('\n').map((instruction, index) => (
                            <li key={index} className="text-sm">{instruction}</li>
                        ))}
                    </ol>
                </div>
                <Separator />
            </div>
        </div>    
    )
}

export default RecipePage;
