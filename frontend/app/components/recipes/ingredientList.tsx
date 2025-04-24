import React from 'react';

interface Ingredient{
    quantity: number;
    unit: string;
    ingredient: string;
}

interface IngredientListProps {
    ingredients: Ingredient[];
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients }) => (
    <div className="space-y-4">
        <h2 className="text-xl font-bold">Ingredients</h2>
        <ul className="space-y-2">
            {ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm">{`${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}`}
                </li>
            ))}
        </ul>
    </div>
);  

export default IngredientList;
