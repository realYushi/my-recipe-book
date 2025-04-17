import { authService } from "./authService";

interface User {
    id: string;
    username: string;
    email: string;
}
export const userService = {
    async createUser(user: User) {
        const jwtToken = await authService.getJwtToken();
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        return response.json();
    },
    async getUser(id: string) {
        try {
            const jwtToken = await authService.getJwtToken();
            const response = await fetch(`/api/users/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                },
            })
            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }
            return response.json();
        } catch (error) {
            throw new Error("Failed to fetch user");
        }
    },
}

