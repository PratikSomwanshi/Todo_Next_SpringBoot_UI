"use server";
import { getSession } from "@/utils/ironSessionConfig";
import { redirect } from "next/navigation";

export const login = async (
    key: string,
    { arg }: { arg: { email: string; password: string } }
) => {
    const session = await getSession();

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: arg.email,
                password: arg.password,
            }),
        }
    );

    const res = await response.json();

    console.log(res);
    if (response.ok) {
        session.username = res.username;
        session.token = res.data[0].token;
        session.isLoggedIn = true;
        await session.save();
        return res;
    }

    throw new Error(res.error.explanation || "Something went wrong");
};
