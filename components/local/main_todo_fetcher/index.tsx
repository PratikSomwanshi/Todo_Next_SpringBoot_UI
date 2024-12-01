"use client";

import React from "react";
import useSWR from "swr";

import { fetchTodo } from "@/actions/todo";

import SkeletonCard from "@/components/local/skeleton_card";
import TodoCard from "@/components/local/todo_card";
import SessionExpiredModel from "@/components/local/session_expired_model";

import useGlobalContext from "@/hooks/useContext";

function MainTodoFetcher() {
    const { isAuthenticationExpired, setIsAuthenticationExpired } =
        useGlobalContext();

    const {
        data: todos,
        isLoading,
        error,
    } = useSWR("get-all-todo", fetchTodo, {
        onError: (error) => {
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
        return <SessionExpiredModel />;
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
