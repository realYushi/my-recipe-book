import authService from "@/service/authService";
import type { User } from "@/model/user";

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
    async getOrCreateUser(userData: User): Promise<User> {
        const existingUser = await this.getUser(userData.id);

        if (existingUser) {
            console.log(`User with id ${userData.id} found.`);
            return existingUser;
        } else {
            console.log(`User with id ${userData.id} not found. Creating new user...`);
            return await this.createUser(userData);
        }
    },
    async updateUser(id: string, user: Partial<User>) {
        const jwtToken = await authService.getJwtToken();
        const response = await fetch(`/api/users/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error("Failed to update user");
        }
        return response.json();
    },

    async deleteAccount(): Promise<void> {
        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmation) return;

        try {
            const idToken = await authService.getJwtToken();
            const userId = (await authService.getCurrentUser())?.uid;
            if (!userId) {
                alert("Unable to retrieve user ID. Please try again.");
                return;
            }

            const response = await fetch(`/api/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`,
                },
            });

            if (response.status === 204) {
                alert("Account deleted successfully.");
                await authService.logout();
                window.location.href = "/";
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                alert(`Error deleting account: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while deleting the account. Please try again later.");
        }
    }
};
export default userService;

