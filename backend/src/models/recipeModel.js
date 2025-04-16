import mongoose from 'mongoose';
import recipeIngredientSchema from './recipeIngredientModel.js';

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructions: { type: String, required: true },
    ingredients: [recipeIngredientSchema],
    portions: { type: Number, required: true },
    preparationTime: { type: Number, required: true },
    cookingTime: { type: Number, required: true },
    user: { type: String, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});


const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
