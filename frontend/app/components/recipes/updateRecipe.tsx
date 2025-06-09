import CreateRecipe from "@/components/recipes/createRecipe";
import recipeService from "@/service/recipeService";
import type { Recipe } from "@/model/recipe";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
interface UpdateRecipeProps {
    id: string;
}
function UpdateRecipe({ id }: UpdateRecipeProps) {
    const [recipeData, setRecipeData] = useState<Recipe | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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

    const handleUpdateSuccess = () => {
        navigate(0);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!recipeData) {
        return <div>Recipe not found</div>;
    }
    return (
        <CreateRecipe
            initialData={recipeData}
            isEditing={true}
            hideHeader={true}
            onSuccess={handleUpdateSuccess}
        />
    )
}

export default UpdateRecipe;