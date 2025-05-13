import ingredientService from "../services/ingredientService.js";

const IngredientController = {
  async createIngredient(req, res) {
    try {
      const ingredientData = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        unit: req.body.unit,
        user: req.user.uid,
      };
      const ingredient = await ingredientService.createIngredient(
        ingredientData
      );
      res.status(201).json(ingredient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getIngredients(req, res) {
    try {
      const ingredients = await ingredientService.getIngredients(req.user.uid);
      res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateIngredient(req, res) {
    try {

      const ingredientId = req.params.id;
      console.log("ingredientId:", ingredientId);
      const ingredientData = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        unit: req.body.unit,
      };
      const updatedIngredient = await ingredientService.updateIngredient(
        ingredientId,
        ingredientData
      );
      if (!updatedIngredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }
      res.status(200).json(updatedIngredient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getIngredientById(req, res) {
    try {
      const ingredientId = req.params.id;
      const ingredient = await ingredientService.getIngredientById(ingredientId);
      if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }
      res.status(200).json(ingredient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteIngredient(req, res) {
    try {
      const ingredientId = req.params.id;
      await ingredientService.deleteIngredient(ingredientId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default IngredientController;
