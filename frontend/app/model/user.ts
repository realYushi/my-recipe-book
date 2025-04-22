export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}
export interface UpdateUser {
    email?: string;
    password?: string;
    name?: string;
}

