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
    }
}

