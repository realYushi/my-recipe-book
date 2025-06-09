import { describe, it, expect, vi, beforeEach } from 'vitest';
import IngredientService from './ingredientService.js';
import ingredientRepository from '../repositories/ingredientRepository.js';
import Recipe from '../models/recipeModel.js';

vi.mock('../repositories/ingredientRepository.js', () => ({
    default: {
        findUnknownIngredient: vi.fn(),
        createIngredient: vi.fn(),
        deleteIngredient: vi.fn(),
        getIngredientById: vi.fn()
    }
}));

vi.mock('../models/recipeModel.js', () => ({
    default: {
        updateMany: vi.fn()
    }
}));

describe('Ingredient Service - deleteIngredient', () => {
    const testIngredientId = '123456789';
    const unknownIngredientId = '987654321';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should replace deleted ingredient with unknown ingredient and delete it', async () => {
        ingredientRepository.findUnknownIngredient.mockResolvedValue({
            _id: unknownIngredientId,
            name: 'Unknown Ingredient',
            category: 'Unknown'
        });

        ingredientRepository.deleteIngredient.mockResolvedValue({
            _id: testIngredientId,
            name: 'Test Ingredient',
            category: 'Test'
        });

        const result = await IngredientService.deleteIngredient(testIngredientId);

        expect(ingredientRepository.findUnknownIngredient).toHaveBeenCalledTimes(1);
        expect(Recipe.updateMany).toHaveBeenCalledWith(
            { "ingredients.ingredient": testIngredientId },
            { $set: { "ingredients.$.ingredient": unknownIngredientId } }
        );
        expect(ingredientRepository.deleteIngredient).toHaveBeenCalledWith(testIngredientId);
        expect(result).toEqual(expect.objectContaining({
            _id: testIngredientId,
            name: 'Test Ingredient'
        }));
    });

    it('should create unknown ingredient if it does not exist', async () => {
        ingredientRepository.findUnknownIngredient.mockResolvedValue(null);
        ingredientRepository.createIngredient.mockResolvedValue({
            _id: unknownIngredientId,
            name: 'Unknown Ingredient',
            category: 'Unknown',
            price: 0,
            unit: 'g',
            user: 'system'
        });

        ingredientRepository.deleteIngredient.mockResolvedValue({
            _id: testIngredientId,
            name: 'Test Ingredient'
        });

        await IngredientService.deleteIngredient(testIngredientId);

        expect(ingredientRepository.findUnknownIngredient).toHaveBeenCalledTimes(1);
        expect(ingredientRepository.createIngredient).toHaveBeenCalledWith({
            name: 'Unknown Ingredient',
            category: 'Unknown',
            price: 0,
            unit: 'g',
            user: 'system'
        });
    });

    it('should throw an error if ingredient not found', async () => {
        ingredientRepository.findUnknownIngredient.mockResolvedValue({
            _id: unknownIngredientId
        });
        ingredientRepository.deleteIngredient.mockResolvedValue(null);

        await expect(IngredientService.deleteIngredient(testIngredientId))
            .rejects
            .toThrow('Failed to delete ingredient: Ingredient not found');
    });

    it('should handle errors during deletion', async () => {
        ingredientRepository.findUnknownIngredient.mockRejectedValue(new Error('Database error'));

        await expect(IngredientService.deleteIngredient(testIngredientId))
            .rejects
            .toThrow('Failed to delete ingredient: Database error');
    });

});