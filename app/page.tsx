import MainTodoFetcher from "@/components/local/main_todo_fetcher";
import TodoCard from "@/components/local/todo_card";
import TodoInput from "@/components/local/todo_input";
import React from "react";

function HomePage() {
    return (
        <div>
            <div className="py-4 flex justify-center text-2xl 350:text-4xl sm:text-6xl  font-semibold underline underline-offset-3">
                <h1>Organize Your Todo</h1>
            </div>
            <div className="w-[80%] 500:w-[50%] mx-auto">
                <TodoInput />
            </div>
            <div className="w-[75%] mx-auto">
                <MainTodoFetcher />
            </div>
        </div>
    );
}

export default HomePage;
