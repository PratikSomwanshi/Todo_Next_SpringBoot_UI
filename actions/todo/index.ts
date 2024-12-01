"use server";

import { GeneralResponse, ITodo } from "@/lib/interfaces";
import { TokenErrorCode } from "@/utils/enums";
import { getSession } from "@/utils/ironSessionConfig";
import axios from "axios";

async function getToken() {
    const { token } = await getSession();
    return token;
}

export async function fetchTodo() {
    // console.log("token " + token);

    try {
        const token = await getToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todo`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw data;
        }

        return data;
    } catch (data) {
        console.log(data);
        return data;
    }
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

        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        return data;
    } catch (data) {
        console.log(data);
        return data;
    }
}

export async function deleteTodo(
    key: string,
    { arg }: { arg: { id: string } }
) {
    try {
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
        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        return data;
    } catch (data) {
        console.log(data);
        return data;
    }
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
        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        return data;
    } catch (err) {
        return err;
    }
}
