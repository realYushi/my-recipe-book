<<<<<<< HEAD
import mongoose from 'mongoose';
import { recipeIngredientSchema } from '../models/ingredientModel.js';
=======
const mongoose = require('mongoose');
>>>>>>> feature/view-profile

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructions: { type: String, required: true },
<<<<<<< HEAD
    ingredients: { type: [recipeIngredientSchema], required: true },
    portions: { type: Number, required: true, min: 1 },
    preparationTime: { type: Number, required: false, min: 0 },
    cookingTime: { type: Number, required: false, min: 0 },
    user: { type: String, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});


const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
=======
    ingredients: [
        {
            ingredient: {
                id: { type: String, required: true },
                name: { type: String, required: true },
                category: { type: String, required: true },
                price: { type: Number, required: true },
                unit: { type: String, required: true },
            },
            quantity: { type: Number, required: true },
            unit: { type: String, required: true },
        },
    ],
    metadata: {
        portions: { type: Number, required: true },
        preparationTime: { type: Number, required: true },
        cookingTime: { type: Number, required: true },
        createdBy: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
>>>>>>> feature/view-profile
