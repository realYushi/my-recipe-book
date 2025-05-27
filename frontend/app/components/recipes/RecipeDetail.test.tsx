import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import RecipeDetail from './RecipeDetail';

vi.mock('@milkdown/crepe', () => ({
    Crepe: vi.fn().mockImplementation(() => ({
        create: vi.fn(),
        destroy: vi.fn(),
        setReadonly: vi.fn(),
    })),
}));
// Mock the services with real recipe structure
vi.mock('@/service/recipeService', () => ({

    default: {
        getRecipeById: vi.fn().mockResolvedValue({
            _id: '683547926ee8f00dbf15c9db',
            name: 'Pork Pie',
            portions: 4,
            preparationTime: 30,
            cookingTime: 45,
            ingredients: [
                {
                    ingredient: {
                        _id: '683547406ee8f00dbf15c9c7',
                        name: 'pork',
                        category: 'Meat',
                        price: 12.50,
                        unit: 'kg',
                        user: 'LyejSvUdn4M0sHWbDHcp0px37Nz2',
                        createdAt: '2025-05-27T05:01:52.271Z',
                        __v: 0
                    },
                    quantity: 1,
                    unit: 'kg',
                    _id: '683553096ee8f00dbf15cb11'
                },
                {
                    ingredient: {
                        _id: '682aafd44f901cfdde7d2151',
                        name: 'beef',
                        category: 'Meat',
                        price: 15.00,
                        unit: 'kg',
                        user: 'LyejSvUdn4M0sHWbDHcp0px37Nz2',
                        createdAt: '2025-05-19T04:13:08.314Z',
                        __v: 0
                    },
                    quantity: 500,
                    unit: 'g',
                    _id: '683553096ee8f00dbf15cb12'
                },
                {
                    ingredient: {
                        _id: '682aafd44f901cfdde7d2152',
                        name: 'flour',
                        category: 'Vegetable',
                        price: 2.50,
                        unit: 'kg',
                        user: 'LyejSvUdn4M0sHWbDHcp0px37Nz2',
                        createdAt: '2025-05-19T04:13:08.314Z',
                        __v: 0
                    },
                    quantity: 300,
                    unit: 'g',
                    _id: '683553096ee8f00dbf15cb13'
                }
            ],
            instructions: '### Prepare the filling\n\n* Chop the pork and beef into small pieces\n* Season with salt and pepper\n\n### Make the pastry\n\n* Mix flour with water and fat\n* Roll out the pastry\n\n### Assemble and bake\n\n* Fill the pastry with meat\n* Bake at 180°C for 45 minutes',
            user: 'LyejSvUdn4M0sHWbDHcp0px37Nz2',
            createdAt: new Date('2025-05-27T05:03:14.025Z'),
            __v: 0
        }),
    },
}));

const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('RecipeDetail, testing the page structure', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('displays the prep title', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('Preparation Time')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    it('displays the prep time', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('30')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    it('displays the cook title', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('Cooking Time')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    it('displays the cook time', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('45')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    //portions
    it('displays the portions title', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('Portions')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    it('displays the portions number', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('4')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    //ingredients
    it('displays the ingredients title', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('Ingredients')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    it('displays the ingredients in a table format', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            // Check table headers
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Amount')).toBeInTheDocument();
            expect(screen.getByText('Unit')).toBeInTheDocument();

            // Check ingredient data
            expect(screen.getByText('pork')).toBeInTheDocument();
            expect(screen.getByText('beef')).toBeInTheDocument();
            expect(screen.getByText('flour')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    it('displays correct quantities for each ingredient', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('500')).toBeInTheDocument();
            expect(screen.getByText('300')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    it('displays correct units for each ingredient', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            const kgElements = screen.getAllByText('kg');
            expect(kgElements.length).toBeGreaterThan(0);
        }, { timeout: 1000 });
    });

    it('displays the recipe title', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('Pork Pie')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    it('displays cooking instructions section', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('Cooking Instructions')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    //amount
    it('displays the amount title', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('Amount')).toBeInTheDocument();
        }, { timeout: 1000 });
    });
    it('displays the amount of ingredients', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('300')).toBeInTheDocument();
        }, { timeout: 1000 });
    });
    it('displays the unit title', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('Unit')).toBeInTheDocument();
        }, { timeout: 1000 });
        expect(screen.getAllByText('kg').length).toBeGreaterThan(0);
    });
    it('displays the cooking instructions title', async () => {
        renderWithRouter(<RecipeDetail />);
        await waitFor(() => {
            expect(screen.getByText('Cooking Instructions')).toBeInTheDocument();
        }, { timeout: 1000 });
    });


});

