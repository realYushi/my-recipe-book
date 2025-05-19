import ingredientService from "@/service/ingredientService"

    const deleteIngredient = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ingredient?");
        if (!confirmDelete) return;

        try {
            await ingredientService.deleteIngredient(id);
            alert("Ingredient deleted successfully.");
        } catch (err) {
            console.error("Error deleting ingredient:", err);
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            alert(`Failed to delete ingredient: ${errorMessage}`);
        }
    }

export default deleteIngredient;


