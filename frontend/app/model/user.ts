export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
}
export interface UpdateUser {
    email?: string;
    password?: string;
    name?: string;
}

