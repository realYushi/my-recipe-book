import React from 'react';

interface InstructionsProps {
    instructions: string;
}

const Instructions: React.FC<InstructionsProps> = ({ instructions }) => (
    <div className="space-y-4">
        <h2 className="text-xl font-bold">Instructions</h2>
        <ol className="space-y-2">
            {instructions.split('\n').map((instruction, index) => (
                <li key={index} className="text-sm">{instruction}</li>
            ))}
        </ol>
    </div>
);

export default Instructions;
