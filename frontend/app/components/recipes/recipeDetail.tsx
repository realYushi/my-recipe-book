import React from 'react';

interface RecipeDetailProps {
    name: string;
    portions: number;
    preparationTime: number;
    cookingTime: number;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ name, portions, preparationTime, cookingTime }) => {
    return (
        <div className="text-2xl font-bold">
            <h2>{name}</h2>
            <p><strong>Portions:</strong> {portions}</p>
            <p><strong>Preparation Time:</strong> {preparationTime} minutes</p>
            <p><strong>Cooking Time:</strong> {cookingTime} minutes</p>
        </div>
    );
};

export default RecipeDetail;