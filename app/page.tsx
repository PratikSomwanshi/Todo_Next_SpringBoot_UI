import MainTodoFetcher from "@/components/local/main_todo_fetcher";
import PublicHomePage from "@/components/local/public_home_page";
import TodoInput from "@/components/local/todo_input";
import { getSession } from "@/utils/ironSessionConfig";
import React from "react";

async function HomePage() {
    const session = await getSession();

    if (!session.isLoggedIn) {
        return (
            <div>
                <PublicHomePage />
            </div>
        );
    }

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
