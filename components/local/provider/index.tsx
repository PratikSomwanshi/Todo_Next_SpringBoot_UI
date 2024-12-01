"use client";
import { GlobalContextType } from "@/lib/interfaces";
import React, { createContext, useState } from "react";

export const GlobalContext = createContext<GlobalContextType | null>(null);

function UtilityProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticationExpired, setIsAuthenticationExpired] =
        useState(false);

    return (
        <GlobalContext.Provider
            value={{ isAuthenticationExpired, setIsAuthenticationExpired }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default UtilityProvider;
