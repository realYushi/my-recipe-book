import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import RecipeDetail from '@/components/recipes/RecipeDetail'
import recipeService from '@/service/recipeService'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import type { Mock } from 'vitest'

vi.mock('@/service/recipeService', () => ({
       default: {
           getRecipeById: vi.fn(),
       }
   }),
)

const mockRecipe = {
  _id: '1',
  name: 'Test Recipe',
  instructions: 'Step 1. Do this\nStep 2. Do that',
  ingredients: [
    { ingredient: { name: 'Flour' }, quantity: 2, unit: 'cups' },
    { ingredient: { name: 'Salt' }, quantity: 1, unit: 'tsp' },
  ],
  portions: 4,
  preparationTime: 10,
  cookingTime: 20,
  user: 'user-123',
};

describe('RecipeDetail', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        (recipeService.getRecipeById as Mock).mockResolvedValue(mockRecipe);
    })

    it('renders recipe details', async () => {
        render(
            <MemoryRouter initialEntries={['/app/recipes/1']}>
                <Routes>
                    <Route path="/app/recipes/:id" element={<RecipeDetail />} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByText(/Loading/i)).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByText('Test Recipe')).toBeInTheDocument()
            expect(screen.getByText('Step 1. Do this')).toBeInTheDocument()
            expect(screen.getByText('Flour')).toBeInTheDocument()
            expect(screen.getByText('Salt')).toBeInTheDocument()
            expect(screen.getByText('2')).toBeInTheDocument()
            expect(screen.getByText('1')).toBeInTheDocument()
            expect(screen.getByText('cups')).toBeInTheDocument()
            expect(screen.getByText('tsp')).toBeInTheDocument()
            expect(screen.getByText(/10\s*mins/)).toBeInTheDocument()
            expect(screen.getByText(/20\s*mins/)).toBeInTheDocument()
            expect(screen.getByText(/4\s*people/)).toBeInTheDocument()
        })
    })
})


