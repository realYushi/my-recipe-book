import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['**/*.{test,spec}.{js,ts}'],
        exclude: ['node_modules', 'dist', '.git'],
    }
})