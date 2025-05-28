import { fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User, onAuthStateChanged, updateProfile, updateEmail, updatePassword } from "firebase/auth";

import auth from "@/config/firebaseConfig";
import type { UpdateUser } from "@/model/user";

export interface AuthCredentials {
    email: string;
    password: string;
}
export interface RegisterCredentials extends AuthCredentials {
    username: string;
}

export const authService = {
    async register(credentials: RegisterCredentials): Promise<User> {
        try {
            const response = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            return response.user;
        } catch (error) {
            throw new Error("Failed to register user");
        }
    },
    async login(credentials: AuthCredentials): Promise<User> {
        try {
            const response = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            return response.user;
        } catch (error) {
            throw new Error("Failed to login");
        }
    },
    async getCurrentUser(): Promise<User | null> {
        return auth.currentUser as User | null;
    },
    async updateUser(updatedUser: UpdateUser): Promise<User> {
        try {
            const user = await this.getCurrentUser();
            if (!user) {
                throw new Error("User not found");
            }

            // Update Firebase auth fields
            const { email, password, name } = updatedUser;
            if (email) await updateEmail(user, email);
            if (password) await updatePassword(user, password);
            if (name) await updateProfile(user, { displayName: name });

            // Send the update to your backend API
            const token = await user.getIdToken();
            const response = await fetch(`/api/users/${user.uid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: user.displayName,
                    email: user.email,
                }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            return await this.getCurrentUser() as User;
        } catch (error) {
            console.error("Update user error:", error);
            throw new Error("Failed to update user");
        }
    },

    async logout() {
        await signOut(auth);
    },
    async checkUserExists(email: string): Promise<boolean> {
        try {
            const response = await fetchSignInMethodsForEmail(auth, email);
            return response.length > 0;
        } catch (error) {
            throw new Error("Failed to check user exists");
        }
    },
    async getJwtToken() {
        const user = await this.getCurrentUser();
        if (!user) {
            throw new Error("User not found");
        }
        try {
            return await user.getIdToken();
        } catch (error) {
            throw new Error("Failed to get JWT token");
        }
    }

}
export default authService;
