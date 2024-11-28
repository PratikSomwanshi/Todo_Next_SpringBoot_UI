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
