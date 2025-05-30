import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';

// Mock authService
vi.mock('@/service/authService', () => ({
    default: {
        getJwtToken: vi.fn(() => Promise.resolve('mock-token')),
        getCurrentUser: vi.fn(() => Promise.resolve({ uid: 'mock-user-id' })),
    },
}));

// Mock recipeService
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});


// Mock global fetch
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
    return render(<MemoryRouter>{component}</MemoryRouter>);
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

    it('navigates to recipe page on result click', async () => {
        renderWithRouter(<SearchBar />);

        const input = screen.getByPlaceholderText('Search for recipes...');
        fireEvent.change(input, { target: { value: 'Spaghetti' } });

        await waitFor(() => {
            expect(screen.getByText('Spaghetti Bolognese')).toBeInTheDocument();
        });

        const resultItem = screen.getByText('Spaghetti Bolognese');
        fireEvent.click(resultItem);

    });
});
