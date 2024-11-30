import { GlobalContext } from "@/components/local/provider";
import { useContext } from "react";

function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error(
            "useGlobalContext must be used within a UtilityProvider"
        );
    }
    return context;
}

export default useGlobalContext;
