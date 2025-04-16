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
    name: string;
    category: IngredientCategory;
    price: number;
    unit: IngredientUnit;
}



export interface RecipeIngredient {
    ingredient: Ingredient;
    quantity: number;
    unit: IngredientUnit;
}
