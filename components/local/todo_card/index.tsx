"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { ITodo } from "../../../lib/interfaces";
import Spinner from "../spinner";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { deleteTodo, updateTodo } from "@/actions/todo";
import { toast } from "sonner";

function TodoCard({ title, completed, id }: ITodo) {
    const [checked, setChecked] = useState<boolean>(completed);

    const { trigger, isMutating } = useSWRMutation("update-todo", updateTodo, {
        onError: (error) => {
            toast.error("Failed to update todo");
            setChecked(checked);
        },
        onSuccess: (data) => {
            mutate("get-all-todo");
            toast.success("Todo updated");
        },
    });

    const { trigger: deleteTrigger, isMutating: deleteMutating } =
        useSWRMutation("delete-todo", deleteTodo);

    async function handleCheck(e: ChangeEvent<HTMLInputElement>) {
        setChecked(!checked);

        trigger({
            id,
            completed: !checked,
        });
    }

    async function handleDelete() {
        await deleteTrigger({
            id,
        });

        await mutate("get-all-todo");
        toast.success("Todo deleted");
    }

    return (
        <div className="w-full">
            <Card className="h-auto 700:h-20  py-2 w-full">
                <div className="700:flex justify-between px-2 300:px-4 h-full space-y-4 300:space-y-0 w-full">
                    <div className="h-full 300:flex items-center w-full">
                        <h2 className="text:lg 300:text-xl font-medium w-full">
                            {title}
                        </h2>
                    </div>
                    <div className="300:flex  items-center h-full w-full  py-2 space-y-2 300:space-y-0 space-x-0 300:space-x-2  ">
                        <div className="flex justify-center items-center  400:h-full h-1/2 space-x-1 w-full 300:w-1/2">
                            {isMutating ? (
                                <Spinner size={14} />
                            ) : (
                                <input
                                    type="checkbox"
                                    id="completed"
                                    name={id}
                                    checked={checked}
                                    onChange={handleCheck}
                                    className={`peer h-4 w-4 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent cursor-pointer`}
                                />
                            )}
                            <label
                                htmlFor={id}
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}>
                                Completed
                            </label>
                        </div>
                        {/* <div className="h-[2px] bg-gray-400"></div> */}
                        <div className="flex justify-end w-full 300:w-1/2">
                            {/* TODO: onclick delete */}
                            <Button
                                variant="destructive"
                                disabled={deleteMutating}
                                className="w-full 700:w-[75%] cursor-pointer"
                                onClick={handleDelete}>
                                {deleteMutating ? (
                                    <Spinner size={14} />
                                ) : (
                                    <X color="white" size={100} />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default TodoCard;
