import React from 'react';
import RecipeDetail from '@/components/recipes/RecipeDetail';
import { useParams } from 'react-router';

const RecipePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <div>Recipe ID is required</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <RecipeDetail id={id} />
        </div>
    );
};

export default RecipePage;
