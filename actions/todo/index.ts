"use server";

import { GeneralResponse, ITodo } from "@/lib/interfaces";
import { getSession } from "@/utils/ironSessionConfig";
import axios from "axios";

async function getToken() {
    const { token } = await getSession();
    return token;
}

export async function fetchTodo(): Promise<GeneralResponse<ITodo[]>> {
    // console.log("token " + token);

    console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todo`);

    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todo`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        const apiError = JSON.stringify(data.error);

        throw new Error(apiError);
    }

    console.log(data);
    return data;
}

export async function updateTodo(
    key: string,
    { arg }: { arg: { id: string; completed: boolean } } // We now expect `arg` to contain the data
) {
    try {
        const token = await getToken();

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/todo?id=${arg.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ completed: arg.completed }),
            }
        );

        if (!response.ok) {
            throw new Error("Error updating todo");
        }

        const data = await response.json();

        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteTodo(
    key: string,
    { arg }: { arg: { id: string } }
) {
    const token = await getToken();

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/todo?id=${arg.id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Error deleting todo");
    }

    const data = await response.json();

    return data;
}

export async function addTodo(
    url: string,
    { arg }: { arg: { title: string } }
) {
    try {
        const token = await getToken();

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/todo`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(arg),
            }
        );
        return await response.json();
    } catch (err) {
        throw new Error("Error adding todo");
    }
}
