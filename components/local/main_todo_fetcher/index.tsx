"use client";
import React from "react";
import TodoCard from "../todo_card";
import useSWR from "swr";
import { fetchTodo } from "@/actions/todo";
import SkeletonCard from "../skeleton_card";

function MainTodoFetcher() {
    const { data: todos, isLoading, error } = useSWR("get-all-todo", fetchTodo);

    if (isLoading)
        return (
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => {
                    return <SkeletonCard key={i} />;
                })}
            </div>
        );

    if (error) return <div>Error...</div>;

    return (
        <div className="space-y-2">
            {todos?.data.map((todo) => {
                return (
                    <TodoCard
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                    />
                );
            })}
        </div>
    );
}

export default MainTodoFetcher;
