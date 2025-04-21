import { useParams } from "react-router";
import CreateRecipe from "./createRecipe";
import recipeService from "~/service/recipeSerive";
import type { Recipe } from "~/model/recipe";
import { useEffect } from "react";
import { useState } from "react";

function UpdateRecipe() {
    const { id } = useParams();
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
        <CreateRecipe initialData={recipeData} isEditing={true} />
    )
}

export default UpdateRecipe;