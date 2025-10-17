export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    managerId?: number;
    password?: string;
    photo?: string;
    children?: User[];
    isOpen?: boolean;
}