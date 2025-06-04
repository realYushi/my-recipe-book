import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './RecipeSearchBar';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router';

vi.mock('@/service/authService', () => ({
    default: {
        getJwtToken: vi.fn(() => Promise.resolve('mock-token')),
        getCurrentUser: vi.fn(() => Promise.resolve({ uid: 'mock-user-id' })),
    },
}));

global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve([
                { _id: '123', name: 'Spaghetti Bolognese' },
                { _id: '456', name: 'Spaghetti Carbonara' },
            ]),
    })
) as unknown as typeof fetch;

const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('SearchBar Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders without crashing', () => {
        renderWithRouter(<SearchBar />);
        expect(screen.getByPlaceholderText('Search for recipes...')).toBeInTheDocument();
    });

    it('fetches and displays search results based on input', async () => {
        renderWithRouter(<SearchBar />);

        const input = screen.getByPlaceholderText('Search for recipes...');
        fireEvent.change(input, { target: { value: 'Spaghetti' } });

        await waitFor(() => {
            expect(screen.getByText('Spaghetti Bolognese')).toBeInTheDocument();
            expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
        });

        expect(global.fetch).toHaveBeenCalledWith('/api/recipes/search?name=Spaghetti', {
            headers: {
                Authorization: 'Bearer mock-token',
                'Content-Type': 'application/json',
            },
        });
    });

    it('clears results when input is empty', async () => {
        renderWithRouter(<SearchBar />);

        const input = screen.getByPlaceholderText('Search for recipes...');
        fireEvent.change(input, { target: { value: 'Spaghetti' } });

        await waitFor(() => {
            expect(screen.getByText('Spaghetti Bolognese')).toBeInTheDocument();
        });

        fireEvent.change(input, { target: { value: '' } });

        await waitFor(() => {
            const resultsList = screen.queryByText('Spaghetti Bolognese');
            expect(resultsList).not.toBeInTheDocument();
        });
    });
});
