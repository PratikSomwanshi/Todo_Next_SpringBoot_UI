import React from "react";
import { Loader2 } from "lucide-react";

function Spinner({ size }: { size: number }) {
    return (
        <div>
            <Loader2 size={size} className="animate-spin" />
        </div>
    );
}

export default Spinner;
