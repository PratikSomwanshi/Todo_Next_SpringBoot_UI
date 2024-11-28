"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function TodoInput() {
    return (
        <div className="py-10 w-full flex justify-center">
            <div className="700:flex w-full  items-center space-y-2 700:space-y-0 700:space-x-2">
                <Input type="text" placeholder="Start typing here..." />
                <Button type="submit" className="w-full 700:w-[50%]">
                    Add
                </Button>
            </div>
        </div>
    );
}

export default TodoInput;
