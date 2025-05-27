import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { RecipeList } from './RecipeList';
import '@testing-library/jest-dom';


// Mock the services
vi.mock('@/service/recipeService', () => ({
    default: {
        getAllRecipes: vi.fn().mockResolvedValue([
            {
                _id: '1',
                name: 'Chicken Stir Fry',
                portions: 4,
                preparationTime: 15,
                cookingTime: 20,
                ingredients: [
                    {
                        _id: '1',
                        name: 'Chicken',
                        quantity: 1,
                        unit: 'kg',
                    },
                    {
                        _id: '2',
                        name: 'Tomatoes',
                        quantity: 2,
                        unit: 'kg',
                    },
                    {
                        _id: '3',
                        name: 'Onions',
                        quantity: 1,
                        unit: 'kg',
                    },
                ],
                instructions: 'Cook chicken and vegetables',
                createdAt: new Date('2024-01-15'),
            },
            {
                _id: '2',
                name: 'Quick Pasta',
                portions: 2,
                preparationTime: 5,
                cookingTime: 15,
                ingredients: [
                    {
                        _id: '1',
                        name: 'Pasta',
                        quantity: 1,
                        unit: 'kg',
                    },
                    {
                        _id: '2',
                        name: 'Sauce',
                        quantity: 1,
                        unit: 'l',
                    },
                ],
                instructions: 'Boil pasta and add sauce',
                createdAt: new Date(),
            },
        ]),
    },
}));
const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};
describe('Recipes List, testing the cards', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the recipes title', () => {
        renderWithRouter(<RecipeList />);
        expect(screen.getByText('Recipes')).toBeInTheDocument();
    });
    it('displays the recipes', async () => {
        renderWithRouter(<RecipeList />);
        await waitFor(() => {
            expect(screen.getByText('Chicken Stir Fry')).toBeInTheDocument();
            expect(screen.getByText('Quick Pasta')).toBeInTheDocument();
        }, { timeout: 1000 });
    });
    //test the the portions number
    it('displays the portions number', async () => {
        renderWithRouter(<RecipeList />);
        await waitFor(() => {
            expect(screen.getByText((content, element) => {
                return element?.textContent === 'Portions: 4';
            })).toBeInTheDocument();
            expect(screen.getByText((content, element) => {
                return element?.textContent === 'Portions: 2';
            })).toBeInTheDocument();
        }, { timeout: 1000 });
    });
    //test the the preparation time number
    it('displays the preparation time number', async () => {
        renderWithRouter(<RecipeList />);
        await waitFor(() => {
            expect(screen.getByText((content, element) => {
                return element?.textContent === 'Prep: 15';
            })).toBeInTheDocument();
            expect(screen.getByText((content, element) => {
                return element?.textContent === 'Prep: 5';
            })).toBeInTheDocument();
        }, { timeout: 1000 });
    });
    //test the the cooking time number
    it('displays the cooking time number', async () => {
        renderWithRouter(<RecipeList />);
        await waitFor(() => {
            expect(screen.getByText((content, element) => {
                return element?.textContent === 'Cook: 20';
            })).toBeInTheDocument();
            expect(screen.getByText((content, element) => {
                return element?.textContent === 'Cook: 15';
            })).toBeInTheDocument();
        }, { timeout: 1000 });
    });
    //test the the ingredients number
    it('displays the ingredients number', async () => {
        renderWithRouter(<RecipeList />);
        await waitFor(() => {
            expect(screen.getByText((content, element) => {
                return element?.textContent === 'Ingredients: 3';
            })).toBeInTheDocument();
            expect(screen.getByText((content, element) => {
                return element?.textContent === 'Ingredients: 2';
            })).toBeInTheDocument();
        }, { timeout: 1000 });
    });
});