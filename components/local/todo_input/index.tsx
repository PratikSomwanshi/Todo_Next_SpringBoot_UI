"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function TodoInput() {
    return (
        <div className="py-10 w-full flex justify-center">
            <div className="300:flex w-full  items-center space-y-2 300:space-y-0 300:space-x-2">
                <Input type="text" placeholder="Start typing here..." />
                <Button type="submit" className="w-full">
                    Add
                </Button>
            </div>
        </div>
    );
}

export default TodoInput;
