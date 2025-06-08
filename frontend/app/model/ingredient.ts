export enum IngredientUnit {
    KG = "kg",
    G = "g",
    ML = "ml",
    L = "l",
    HUNDRED_G = "100g",
    HUNDRED_ML = "100ml",
    EACH = "each",
    UNKNOWN = "unknown"
}

export enum IngredientCategory {
    VEGETABLE = "Vegetable",
    MEAT = "Meat",
    OTHER = "Other",
    UNKNOWN = "unknown"
}
export interface Ingredient {
    _id: string;
    name: string;
    category: IngredientCategory;
    price: number;
    unit: IngredientUnit;
    stock?: number;
    notes?: string;
    supplier?: string;
}



export interface RecipeIngredient {
    ingredient: Ingredient;
    quantity: number;
}
