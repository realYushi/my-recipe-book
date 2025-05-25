import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { HomePage } from './HomePage';

// Mock the services
vi.mock('@/service/ingredientService', () => ({
    default: {
        getIngredients: vi.fn().mockResolvedValue([
            {
                _id: '1',
                name: 'Chicken Breast',
                category: 'Meat',
                price: 12.99,
                unit: 'kg',
            },
            {
                _id: '2',
                name: 'Tomatoes',
                category: 'Vegetable',
                price: 3.50,
                unit: 'kg',
            },
            {
                _id: '3',
                name: 'Beef Steak',
                category: 'Meat',
                price: 25.99,
                unit: 'kg',
            },
        ]),
    },
}));

vi.mock('@/service/recipeSerive', () => ({
    default: {
        getAllRecipes: vi.fn().mockResolvedValue([
            {
                _id: '1',
                name: 'Chicken Stir Fry',
                portions: 4,
                preparationTime: 15,
                cookingTime: 20,
                ingredients: [],
                instructions: 'Cook chicken and vegetables',
                createdAt: new Date('2024-01-15'),
            },
            {
                _id: '2',
                name: 'Quick Pasta',
                portions: 2,
                preparationTime: 5,
                cookingTime: 15,
                ingredients: [],
                instructions: 'Boil pasta and add sauce',
                createdAt: new Date('2024-01-10'),
            },
        ]),
    },
}));

const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the dashboard title', () => {
        renderWithRouter(<HomePage />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('displays stats cards', async () => {
        renderWithRouter(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText('Total Ingredients')).toBeInTheDocument();
            expect(screen.getByText('Total Recipes')).toBeInTheDocument();
        });
    });

    it('displays correct counts', async () => {
        renderWithRouter(<HomePage />);

        await waitFor(() => {
            expect(screen.getByText('3')).toBeInTheDocument(); // ingredients
            expect(screen.getByText('2')).toBeInTheDocument(); // recipes
        });
    });
});