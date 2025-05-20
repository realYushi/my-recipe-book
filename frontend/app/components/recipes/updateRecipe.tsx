import CreateRecipe from "@/components/recipes/createRecipe";
import recipeService from "@/service/recipeSerive";
import type { Recipe } from "@/model/recipe";
import { useEffect } from "react";
import { useState } from "react";

interface UpdateRecipeProps {
    id: string;
}
function UpdateRecipe({ id }: UpdateRecipeProps) {
    const [recipeData, setRecipeData] = useState<Recipe | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                if (!id) {
                    throw new Error("ID is required");
                }
                const data = await recipeService.getRecipeById(id);
                setRecipeData(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error getting recipe by ID:", error);
            }
        };
        fetchRecipeData();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!recipeData) {
        return <div>Recipe not found</div>;
    }

    return (
        <CreateRecipe initialData={recipeData} isEditing={true} hideHeader={true} />
    )
}

export default UpdateRecipe;