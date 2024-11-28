"use server";

import { GeneralResponse, ITodo } from "@/lib/interfaces";
import axios from "axios";

export async function fetchTodo(): Promise<GeneralResponse<ITodo[]>> {
    return (await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}`)).data;
}

export async function updateTodo(
    key: string,
    { arg }: { arg: { id: string; completed: boolean } } // We now expect `arg` to contain the data
) {
    await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}?id=${arg.id}`, {
        completed: arg.completed,
    });
}

export async function deleteTodo(
    key: string,
    { arg }: { arg: { id: string } }
) {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}?id=${arg.id}`);
}
