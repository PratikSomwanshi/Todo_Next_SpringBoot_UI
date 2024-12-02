"use client";

import React from "react";
import useSWR from "swr";

import { fetchTodo } from "@/actions/todo";

import SkeletonCard from "@/components/local/skeleton_card";
import TodoCard from "@/components/local/todo_card";
import SessionExpiredModel from "@/components/local/session_expired_model";

import useGlobalContext from "@/hooks/useContext";
import { toast } from "sonner";
import { isSessionExpired } from "@/utils/isJWTExpired";
import { ITodo } from "@/lib/interfaces";

function MainTodoFetcher() {
    const { isAuthenticationExpired, setIsAuthenticationExpired } =
        useGlobalContext();

    const [error, setError] = React.useState("");

    const {
        data: todos,
        isLoading,
        isValidating,
    } = useSWR("get-all-todo", fetchTodo, {
        onSuccess: (error) => {
            console.log(error);
            if (error.message == "fetch failed") {
                setError("Internal Server Error");
                return;
            }
            if (!error.success && error.error.code) {
                if (isSessionExpired(error.error.code)) {
                    setIsAuthenticationExpired(true);
                    return;
                }

                setError(error.error.message);
                toast.error("Failed to fetch the data");
            } else if (error.success) {
                // mutate("get-all-todo");
            } else {
                setError(error.error.message);
                toast.error("Failed to fetch the data");
            }
        },
        revalidateOnMount: true,
        refreshWhenHidden: false,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        refreshInterval: 0,
    });

    if (isLoading)
        return (
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => {
                    return <SkeletonCard key={i} />;
                })}
            </div>
        );

    if (error) {
        return (
            <div className="flex flex-col text-center justify-center h-56 text-red-400">
                <span className="text-2xl font-semibold">
                    Failed to Fetch the Data
                </span>
                <span className="text-xl">{error}</span>
            </div>
        );
    }

    if (isAuthenticationExpired) {
        return <SessionExpiredModel />;
    }

    return (
        <div className="space-y-2">
            {todos?.data &&
                (todos?.data.length > 0 ? (
                    todos?.data.map((todo: ITodo) => {
                        return (
                            <TodoCard
                                key={todo.id}
                                id={todo.id}
                                title={todo.title}
                                completed={todo.completed}
                            />
                        );
                    })
                ) : !isValidating ? (
                    <div className="text-center mt-40 text-3xl font-medium">
                        No todos
                        {todos?.data.length}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => {
                            return <SkeletonCard key={i} />;
                        })}
                    </div>
                ))}
        </div>
    );
}

export default MainTodoFetcher;
