import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { Link, NavLink, useParams } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import deleteIngredientService from "@/components/ingredient/deleteIngredient"
import ingredientService from "@/service/ingredientService"

type Ingredient = {
    id: string;
    name: string;
    unit: string;
    price: number;
};

export function deleteIngredientComponent(id: string) {
    const deleteIngredient = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ingredient?");
        if (!confirmDelete) return;

        try {
            await ingredientService.deleteIngredient(id);
            setIngredients((prev) => prev.filter((ingredient: { id: string }) => ingredient.id !== id));
            alert("Ingredient deleted successfully.");
        } catch (err) {
            console.error("Error deleting ingredient:", err);
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            alert(`Failed to delete ingredient: ${errorMessage}`);
        }
    }
}

function setIngredients(arg0: (prev: any) => any) {
    throw new Error("Function not implemented.")
}

export default deleteIngredientComponent;


