import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import SearchBar from './SearchBar';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock authService
vi.mock('@/service/authService', () => ({
    default: {
        getJwtToken: vi.fn(() => Promise.resolve('mock-token')),
        getCurrentUser: vi.fn(() => Promise.resolve({ uid: 'mock-user-id' })),
    },
}));

// Mock global fetch
global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve([
                {
                    _id: '123',
                    name: 'Spaghetti Bolognese',
                },
                {
                    _id: '456',
                    name: 'Spaghetti Carbonara',
                },
            ]),
    })
) as unknown as typeof fetch;

describe('SearchBar Component', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Reset mocks between tests
    });

    it('renders without crashing', () => {
        render(<SearchBar />);
        expect(screen.getByPlaceholderText('Search for recipes...')).toBeInTheDocument();
    });

    it('fetches and displays search results based on input', async () => {
        render(<SearchBar />);

        // Simulate user typing into input
        const input = screen.getByPlaceholderText('Search for recipes...');
        fireEvent.change(input, { target: { value: 'Spaghetti' } });

        // Wait for results to be rendered
        await waitFor(() => {
            expect(screen.getByText('Spaghetti Bolognese')).toBeInTheDocument();
            expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
        });

        // Optional: check fetch call was made correctly
        expect(global.fetch).toHaveBeenCalledWith('/api/recipes/search?name=Spaghetti', {
            headers: {
                Authorization: 'Bearer mock-token',
            },
        });
    });
});
