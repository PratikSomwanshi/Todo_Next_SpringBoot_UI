"use client";
import React from "react";
import TodoCard from "../todo_card";
import axios from "axios";
import useSWR from "swr";
import { GeneralResponse, ITodo } from "@/lib/interfaces";
import { fetchTodo } from "@/actions/todo";

function MainTodoFetcher() {
    const { data: todos, isLoading, error } = useSWR("get-all-todo", fetchTodo);

    if (isLoading) return <div>Loading...</div>;

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
