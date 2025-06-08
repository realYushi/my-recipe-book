import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Meat", "Vegetable", "Unknown", "Other"],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    required: true,
    enum: ["kg", "g", "100g", "ml", "100ml", "l", "each", "unknown"],
  },
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const recipeIngredientSchema = new mongoose.Schema({
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    required: true,
    enum: ["kg", "g", "100g", "ml", "100ml", "l", "each", "unknown"],
  },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
const RecipeIngredient = mongoose.model(
  "RecipeIngredient",
  recipeIngredientSchema
);

export {
  Ingredient,
  RecipeIngredient,
  ingredientSchema,
  recipeIngredientSchema,
};
