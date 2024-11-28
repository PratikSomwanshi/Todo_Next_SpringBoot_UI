"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import React from "react";
import { TodoCardProps } from "../../../lib/interfaces";

function TodoCard(todoCardProps: TodoCardProps) {
    return (
        <div className="w-full">
            <Card className="h-auto 300:h-20 400:h-16 py-3 w-full">
                <div className="300:flex justify-between px-2 300:px-10 h-full space-y-4 300:space-y-0 w-full ">
                    <div className="h-full 300:flex items-center w-full">
                        <h2 className="text:lg 300:text-xl font-medium w-full">
                            {todoCardProps.title}
                        </h2>
                    </div>
                    <div className="400:flex  justify-between items-center h-full w-auto 400:w-40 py-2 space-y-2 300:space-y-0">
                        <div className="flex justify-center 300:justify-end 400:h-full h-1/2 space-x-1 ">
                            <Checkbox id="completed" />
                            {/* TODO: onclick completed*/}
                            <label
                                htmlFor="completed"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Completed
                            </label>
                        </div>
                        {/* <div className="h-[2px] bg-gray-400"></div> */}
                        <div className="flex justify-end">
                            {/* TODO: onclick delete */}
                            <Button variant="destructive" className="w-full">
                                <X color="white" size={100} />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default TodoCard;
