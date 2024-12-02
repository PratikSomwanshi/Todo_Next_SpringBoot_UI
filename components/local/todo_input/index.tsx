"use client";
import { addTodo } from "@/actions/todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGlobalContext from "@/hooks/useContext";
import { isSessionExpired } from "@/utils/isJWTExpired";
import React, { KeyboardEvent } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

function TodoInput() {
    const { setIsAuthenticationExpired, isAuthenticationExpired } =
        useGlobalContext();
    const [title, setTitle] = React.useState("");

    const { isMutating, trigger } = useSWRMutation("add-todo", addTodo, {
        onSuccess: (data) => {
            if (data.message == "fetch failed") {
                toast.error("Failed to add data");
                return;
            }

            if (!data.success && data.error.code) {
                if (isSessionExpired(data.error.code)) {
                    setIsAuthenticationExpired(true);
                    return;
                }

                toast.error(data.error.explanation);
                return;
            } else if (data.success) {
                if (!isAuthenticationExpired) {
                    toast.success("Todo added successfully");
                    mutate("get-all-todo");
                    setTitle("");
                }
            } else {
                toast.error("Failed to add todo");
            }
        },
    });

    async function handleClick() {
        if (!title) {
            return toast.error("Title is required");
        }

        await trigger({ title });
    }

    async function handleEnterClick(e: KeyboardEvent<HTMLInputElement>) {
        if (!title) {
            return toast.error("Title is required");
        }

        if (e.key == "Enter") await handleClick();
    }

    return (
        <div className="py-10 w-full flex justify-center">
            <div className="700:flex w-full  items-center space-y-2 700:space-y-0 700:space-x-2">
                <Input
                    type="text"
                    placeholder="Start typing here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyUp={handleEnterClick}
                />
                <Button
                    type="submit"
                    className="w-full 700:w-[50%]"
                    onClick={handleClick}>
                    Add
                </Button>
            </div>
        </div>
    );
}

export default TodoInput;
