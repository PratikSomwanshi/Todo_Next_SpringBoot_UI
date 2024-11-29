"use client";
import { addTodo } from "@/actions/todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

function TodoInput() {
    const [title, setTitle] = React.useState("");

    const { data, isMutating, trigger } = useSWRMutation("add-todo", addTodo, {
        onSuccess: (data) => {
            console.log(data);
            mutate("get-all-todo");
            toast.success("Todo added successfully");
            setTitle("");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Failed to add todo");
            setTitle("");
        },
    });

    async function handleClick() {
        if (!title) {
            return toast.error("Title is required");
        }

        await trigger({ title });
    }

    return (
        <div className="py-10 w-full flex justify-center">
            <div className="700:flex w-full  items-center space-y-2 700:space-y-0 700:space-x-2">
                <Input
                    type="text"
                    placeholder="Start typing here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
