import React, { useEffect, useState } from 'react';
import RecipeDetail from '~/components/recipes/recipeDetail';
import IngredientList from '~/components/recipes/ingredientList';
import Instructions from '~/components/recipes/instructions';
import Separator from '../../components/ui/separator';


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
                {recipe && (
                    <>
                        <RecipeDetail 
                            name={recipe.name}
                            portions={recipe.portions}
                            preparationTime={recipe.preparationTime}
                            cookingTime={recipe.cookingTime}
                        />
                        <Separator />
                        <IngredientList ingredients={recipe.ingredients} />
                        <Separator />   
                        <Instructions instructions={recipe.instructions} />
                    </>
                )}
            </div>
        </div>
    );
};           

export default RecipePage;
