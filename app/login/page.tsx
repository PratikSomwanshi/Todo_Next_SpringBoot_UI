"use client";
import { login } from "@/actions/auth";
import Spinner from "@/components/local/spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useGlobalContext from "@/hooks/useContext";
import { FormInput } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";

function LoginPage() {
    const router = useRouter();

    const { setIsAuthenticationExpired } = useGlobalContext();
    const [apiError, setApiError] = React.useState<string | null>(null);

    const { isMutating, trigger } = useSWRMutation("login", login, {
        onError: (error) => {
            setApiError(error.message);
        },
        onSuccess: (data) => {
            if (data.success) {
                setIsAuthenticationExpired(false);
                router.push("/");
            }
        },
    });

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
                                {isMutating ? <Spinner size={20} /> : "Login"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default LoginPage;
