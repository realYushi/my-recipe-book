export enum IngredientUnit {
    KG = "kg",
    G = "g",
    ML = "ml",
    L = "l"
}

export enum IngredientCategory {
    VEGETABLE = "Vegetable",
    MEAT = "Meat",
}
export interface Ingredient {
    id?: string;
    name: string;
    category: IngredientCategory;
    price: number;
    unit: IngredientUnit;
}



export interface RecipeIngredient {
    ingredient: string;
    quantity: number;
    unit: IngredientUnit;
}
