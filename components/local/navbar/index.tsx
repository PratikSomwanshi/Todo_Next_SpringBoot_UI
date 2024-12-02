import { getSession } from "@/utils/ironSessionConfig";
import React from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";

async function Navbar() {
    const session = await getSession();

    if (!session.isLoggedIn) {
        return <></>;
    }

    return (
        <div className="w-screen  h-12 shadow-sm">
            <nav className="h-full">
                <ul className="flex justify-between container px-16 items-center h-full">
                    <span>Logo</span>
                    <Popover>
                        <PopoverTrigger>
                            <span className="hover:underline hover:underline-offset-4">
                                {" "}
                                hello, {session.username}
                            </span>
                        </PopoverTrigger>
                        <PopoverContent className="w-36">
                            <div className="w-full">
                                <Button className="w-full" onClick={logout}>
                                    logout
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
