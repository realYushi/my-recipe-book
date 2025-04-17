const Recipe = require('../models/recipeModel');

class RecipeRepository {
    async deleteRecipesByUser(userId) {
        try {
            return await Recipe.deleteMany({ createdBy: userId });
        } catch (error) {
            throw new Error(`Failed to delete recipes for user ${userId}: ${error.message}`);
        }
    }
}

module.exports = new RecipeRepository();