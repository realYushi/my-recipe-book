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
                createdAt: new Date(),
            },
        ]),
    },
}));

const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HomePage, testing the cards', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the dashboard title', () => {
        renderWithRouter(<HomePage />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
    //showing total ingredients card
    it('displays total ingredients card', async () => {
        renderWithRouter(<HomePage />);
        expect(screen.getByText('Total Ingredients')).toBeInTheDocument();
    });
    //showing total recipes card
    it('displays total recipes card', async () => {
        renderWithRouter(<HomePage />);
        expect(screen.getByText('Total Recipes')).toBeInTheDocument();
    });
    //showing average cooking time card
    it('displays average cooking time card', async () => {
        renderWithRouter(<HomePage />);
        expect(screen.getByText('Avg Cook Time')).toBeInTheDocument();
    });
    //showing quick recipes card
    it('displays quick recipes card', async () => {
        renderWithRouter(<HomePage />);
        expect(screen.getByText('Quick Recipes')).toBeInTheDocument();
    });
    //showing priciest ingredients card
    it('displays priciest ingredients card', async () => {
        renderWithRouter(<HomePage />);
        expect(screen.getByText('Priciest Ingredients')).toBeInTheDocument();
    });
    //showing random recipe card
    it('displays random recipe card', async () => {
        renderWithRouter(<HomePage />);
        expect(screen.getByText('Surprise me!')).toBeInTheDocument();
    });
})
describe('HomePage, testing the stats numbers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('displays total ingredients number', async () => {
        renderWithRouter(<HomePage />);
        await waitFor(() => {
            expect(screen.getByText('3')).toBeInTheDocument();
        }, { timeout: 1000 });
    });
    it('displays total recipes number', async () => {
        renderWithRouter(<HomePage />);
        await waitFor(() => {
            expect(screen.getByText('2')).toBeInTheDocument();
        }, { timeout: 1000 });
    });
    it('displays average cooking time number', async () => {
        renderWithRouter(<HomePage />);
        await waitFor(() => {
            expect(screen.getByText('28')).toBeInTheDocument();
        }, { timeout: 1000 });
    });
    it('displays quick recipes number', async () => {
        renderWithRouter(<HomePage />);
        await waitFor(() => {
            expect(screen.getByText('1')).toBeInTheDocument();
        }, { timeout: 1000 });
    });
})
describe('HomePage,testing the recent recipes and priciest ingredients', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
    });
    it('displays recent recipes', async () => {
        renderWithRouter(<HomePage />);
        await waitFor(() => {
            expect(screen.getByText('Chicken Stir Fry')).toBeInTheDocument();
        }, { timeout: 1000 });
    });
    it('displays priciest ingredients', async () => {
        renderWithRouter(<HomePage />);
        await waitFor(() => {
            expect(screen.getByText('Beef Steak')).toBeInTheDocument();
        }, { timeout: 1000 });
    });
})
describe('HomePage,testing the random recipe', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
    });
    it('displays random recipe', async () => {
        renderWithRouter(<HomePage />);
        await waitFor(() => {
            const recipes = screen.getAllByText(/Quick Pasta/i);
            expect(recipes).toHaveLength(2);
        }, { timeout: 1000 });
    });
})