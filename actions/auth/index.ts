"use server";
import { getSession } from "@/utils/ironSessionConfig";

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

    if (response.ok) {
        session.username = res.data[0].username;
        session.token = res.data[0].token;
        session.email = res.data[0].email;
        session.isLoggedIn = true;
        await session.save();
        return res;
    }

    throw new Error(res.error.explanation || "Something went wrong");
};
