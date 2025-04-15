const Recipe = require('../models/recipeModel');

class RecipeRepository {

    async deleteRecipesByUser(userId) {
        return await Recipe.deleteMany({ createdBy: userId });
    }
}

module.exports = new RecipeRepository();