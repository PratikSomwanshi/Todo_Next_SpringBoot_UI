"use client";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormInput, loginData } from "@/lib/interfaces";
import React from "react";
import { set, SubmitHandler, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";

function LoginPage() {
    const [apiError, setApiError] = React.useState<string | null>(null);

    const { data, error, isMutating, trigger } = useSWRMutation(
        "login",
        login,
        {
            onError: (error) => {
                console.log(error.message);
                setApiError(error.message);
            },
        }
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput>();
    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        const loginData: FormInput = {
            email: data.email,
            password: data.password,
        };

        trigger(loginData);
    };

    return (
        <div className="w-full flex justify-center items-center h-screen">
            <Card className="w-1/3 h-1/2">
                <div className="p-4 space-y-4">
                    <h2 className="text-2xl font-semibold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-4">
                            <label>
                                <span>Email</span>
                                <Input
                                    type="email"
                                    className="input"
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                />
                            </label>
                            <label>
                                <span>Password</span>
                                <Input
                                    type="password"
                                    className="input"
                                    {...register("password", {
                                        required: "password is required",
                                    })}
                                />
                            </label>
                            <div className="h-6 w-full flex justify-end px-2">
                                <span className="text-red-500">
                                    {!apiError &&
                                        (errors.password || errors.email) && (
                                            <span>
                                                Email and Password are required
                                            </span>
                                        )}
                                    {apiError && <span>{apiError}</span>}
                                </span>
                            </div>
                            <Button className="btn" type="submit">
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default LoginPage;
