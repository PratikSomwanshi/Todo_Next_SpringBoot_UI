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
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}?id=${arg.id}`,
            {
                completed: arg.completed,
            }
        );
        return response.data;
    } catch (error) {
        throw new Error("Error updating todo");
    }
}

export async function deleteTodo(
    key: string,
    { arg }: { arg: { id: string } }
) {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}?id=${arg.id}`);
}

export async function addTodo(
    url: string,
    { arg }: { arg: { title: string } }
) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(arg),
        });
        return await response.json();
    } catch (err) {
        throw new Error("Error adding todo");
    }
}
