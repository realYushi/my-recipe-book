import type { RecipeIngredient } from "./ingredient";
export interface Recipe {
    id?: string;
    name: string;
    portions: number;
    prepTime: number;
    cookTime: number;
    ingredients: RecipeIngredient[];
    instructions: string;
    user?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

