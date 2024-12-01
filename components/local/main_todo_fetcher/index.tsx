"use client";
import React from "react";
import TodoCard from "../todo_card";
import useSWR from "swr";
import { fetchTodo } from "@/actions/todo";
import SkeletonCard from "../skeleton_card";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import useGlobalContext from "@/hooks/useContext";
import { GlobalContext } from "../provider";
import Link from "next/link";

function MainTodoFetcher() {
    const { isAuthenticationExpired, setIsAuthenticationExpired } =
        useGlobalContext();

    const {
        data: todos,
        isLoading,
        error,
    } = useSWR("get-all-todo", fetchTodo, {
        onError: (error) => {
            // console.log("error " + JSON.stringify(error.info));

            const parsedError: {
                code: string;
            } = JSON.parse(error.message);

            if (
                parsedError.code === "TOKEN_EXPIRED" ||
                parsedError.code === "TOKEN_INVALID" ||
                parsedError.code === "TOKEN_NOT_FOUND"
            ) {
                setIsAuthenticationExpired(true);
            }
        },
    });

    if (isLoading)
        return (
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => {
                    return <SkeletonCard key={i} />;
                })}
            </div>
        );

    if (error && !isAuthenticationExpired)
        return <div>{JSON.stringify(error)}</div>;

    if (isAuthenticationExpired) {
        return (
            <Drawer open>
                <DrawerContent className="h-1/2 w-full">
                    <div className="mx-auto w-1/2">
                        <DrawerHeader>
                            <DrawerTitle className="text-3xl">
                                Session Expired
                            </DrawerTitle>
                            <DrawerDescription className="text-xl space-y-4">
                                <span>
                                    Your session has expired. Please login again
                                </span>
                                <span className="block w-1/2">
                                    <Link href="/login">
                                        <Button className="w-1/2">Login</Button>
                                    </Link>
                                </span>
                            </DrawerDescription>
                        </DrawerHeader>
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <div className="space-y-2">
            {todos?.data && todos?.data.length > 0 ? (
                todos?.data.map((todo) => {
                    return (
                        <TodoCard
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                        />
                    );
                })
            ) : (
                <div className="text-center mt-40 text-3xl font-medium">
                    No todos
                </div>
            )}
        </div>
    );
}

export default MainTodoFetcher;
