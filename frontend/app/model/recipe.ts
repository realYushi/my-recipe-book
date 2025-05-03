import type { Ingredient, IngredientUnit } from "./ingredient";

export interface RecipeIngredient {
    ingredient: Ingredient; 
    quantity: number;
    unit: IngredientUnit;
}

export interface Recipe {
    _id?: string;
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
