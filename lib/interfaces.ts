export interface ITodo {
    id: string;
    title: string;
    completed: boolean;
}

export interface GeneralResponse<T> {
    status: boolean;
    message: string;
    data: T;
    error: {
        explanation: string;
    };
}

export interface GlobalContextType {
    isAuthenticationExpired: boolean;
    setIsAuthenticationExpired: (value: boolean) => void;
}

// form interface

export interface FormInput {
    email: string;
    password: string;
}

// session interfaces

export interface SessionData {
    username?: string;
    email?: string;
    token?: string;
    isLoggedIn: boolean;
}

export interface loginData {
    username: string;
    email: string;
    password: string;
}
