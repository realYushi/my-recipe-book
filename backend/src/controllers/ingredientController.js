import ingredientService from '../services/ingredientService.js';

const IngredientController = {
    async createIngredient(req, res) {
        try {
            const userID = req.user.uid;
            const ingredientData = {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                unit: req.body.unit,
                user: userID,
            }
            const ingredient = await ingredientService.createIngredient(ingredientData);
            res.status(201).json(ingredient);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default IngredientController;