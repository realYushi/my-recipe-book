import mongoose from 'mongoose';
import { recipeIngredientSchema } from '../models/ingredientModel.js';

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructions: { type: String, required: true },
    ingredients: { type: [recipeIngredientSchema], required: true },
    portions: { type: Number, required: true, min: 1 },
    preparationTime: { type: Number, required: false, min: 0 },
    cookingTime: { type: Number, required: false, min: 0 },
    user: { type: String, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});


const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
