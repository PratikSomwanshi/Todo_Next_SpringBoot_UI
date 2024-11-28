"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { ITodo } from "../../../lib/interfaces";
import Spinner from "../spinner";
// import { updateTodo } from "@/actions/todo";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { deleteTodo, updateTodo } from "@/actions/todo";
import { toast } from "sonner";

function TodoCard({ title, completed, id }: ITodo) {
    const [checked, setChecked] = useState<boolean>(completed);

    const { trigger, isMutating, data, error } = useSWRMutation(
        "update-todo",
        updateTodo
    );

    const { trigger: deleteTrigger } = useSWRMutation(
        "delete-todo",
        deleteTodo
    );

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

    if (error) {
        toast.error("An error occured");
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
                            <input
                                type="checkbox"
                                id="completed"
                                name="completed"
                                checked={checked}
                                onChange={handleCheck}
                                className="peer h-4 w-4 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent"
                            />
                            {/* <Spinner size={14} /> */}
                            {/* TODO: onclick completed*/}
                            <label
                                htmlFor="completed"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Completed
                            </label>
                        </div>
                        {/* <div className="h-[2px] bg-gray-400"></div> */}
                        <div className="flex justify-end w-full 300:w-1/2">
                            {/* TODO: onclick delete */}
                            <Button
                                variant="destructive"
                                className="w-full 700:w-[75%]"
                                onClick={handleDelete}>
                                <X color="white" size={100} />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default TodoCard;
