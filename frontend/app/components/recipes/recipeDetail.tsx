import React from 'react';
import { Clock, Users } from 'lucide-react';

interface RecipeDetailProps {
    name: string;
    portions: number;
    preparationTime: number;
    cookingTime: number;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ name, portions, preparationTime, cookingTime }) => {
    return (
        <div className = "space-y-6">
            <div className = "space-y-2">
                <h1 className = "text-3xl md:text-4xl font-bold">{name}</h1>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                <div className ="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 mb-1 text-muted-foreground"/>
                    <span className="text-sm font-medium">Preparation Time: </span>
                    <span className="text-sm">{preparationTime} minutes</span>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Clock className="h-5 w-5 mb-1 text-muted-foreground"/>
                <span className="text-sm font-medium">Cooking Time: </span>     
                <span className="text-sm">{cookingTime} minutes</span>           
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Users className="h-5 w-5 mb-1 text-muted-foreground"/>
                <span className="text-sm font-medium">Portions: </span>     
                <span className="text-sm">{portions}</span> 
            </div>
        </div>    
    );
};

export default RecipeDetail;