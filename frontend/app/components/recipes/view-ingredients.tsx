import React from 'react';
import { RecipeIngredient } from '~/model/ingredient';

interface ViewIngredientsProps{
    ingredients: RecipeIngredient[];
}

const ViewIngredients: React.FC<ViewIngredientsProps> = ({ ingredients }) => {
    return (
        <div className="recipe-ingredients">
            <h2 className= "text-ti font-bold mb-4">Ingredients</h2>
            <ul className = "list-disc pl-5">
                {ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.quantity} {ingredient.unit} {ingredient.ingredient}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewIngredients;
