import React from 'react';

interface InstructionsProps {
    instructions: string;
}

const Instructions: React.FC<InstructionsProps> = ({ instructions }) => (
    <div>
        <h2 className="text-xl font-bold">Instructions</h2>
        <p className="whitespace-pre-line">{instructions}</p>
    </div>
);

export default Instructions;
