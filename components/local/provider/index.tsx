"use client";
import { GlobalContextType } from "@/lib/interfaces";
import React, { createContext, useState } from "react";

export const GlobalContext = createContext<GlobalContextType | null>(null);

function UtilityProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    return (
        <GlobalContext.Provider
            value={{ username, email, setUsername, setEmail }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default UtilityProvider;
