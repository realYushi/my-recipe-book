import { useEffect } from "react";

import { useState } from "react";
import type { Ingredient } from "@/model/ingredient";
import ingredientService from "@/service/ingredientService";
import CreateIngredient from "@/components/ingredient/createIngredient";
import { Link, useNavigate } from "react-router";

interface UpdateIngredientProps {
    id: string;
}
function UpdateIngredient({ id }: UpdateIngredientProps) {
    const [ingredient, setIngredient] = useState<Ingredient | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchIngredient = async () => {
            try {
                const ingredient = await ingredientService.getIngredientById(id);
                setIngredient(ingredient);
            } catch (error) {
                setError(error as string);
            } finally {
                setIsLoading(false);
            }
        };
        fetchIngredient();
    }, [id]);
    let navigate = useNavigate();
    const handleSuccess = () => {
        navigate("/app/ingredients");
    }

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {ingredient && <CreateIngredient ingredientData={ingredient} isUpdate={true} onSuccess={handleSuccess} />}
        </div>
    )
}

export default UpdateIngredient;