import { fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User, onAuthStateChanged } from "firebase/auth";
import auth from "~/config/firebaseConfig";

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
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user);
            });
        });
    },

    async isAuthenticated(): Promise<boolean> {
        const user = await this.getCurrentUser();
        return user !== null;
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

