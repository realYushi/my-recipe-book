
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
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
        const response = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        return response.user;
    },
    async login(credentials: AuthCredentials): Promise<User> {
        const response = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        return response.user;
    },
    async logout() {
        await signOut(auth);
    },
    async getJwtToken() {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not found");
        }
        return await user.getIdToken();
    }

}

