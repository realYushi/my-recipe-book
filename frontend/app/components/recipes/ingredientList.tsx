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
    <div>
        <h2 className="text-xl font-bold">Ingredients</h2>
        <ul className= "list-disc pl-5">
            {ingredients.map((item, index) => (
                <li key={index}>
                    {item.quantity} {item.unit} of {item.ingredient}
                </li>
            ))}
        </ul>          
    </div>
);  

export default IngredientList;
