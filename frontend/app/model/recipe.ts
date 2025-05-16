import type { RecipeIngredient } from "./ingredient";
export interface Recipe {
    id: string;
    name: string;
    portions: number;
    preparationTime: number;
    cookingTime: number;
    ingredients: RecipeIngredient[];
    instructions: string;
    user?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface RecipeFormData {
    name: string;
    portions: number;
    preparationTime: number;
    cookingTime: number;
    ingredients: RecipeIngredient[];
    instructions: string;
}
