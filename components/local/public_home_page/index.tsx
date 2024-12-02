import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function PublicHomePage() {
    return (
        <div>
            <div className="flex w-full justify-between">
                <div className="flex px-24  justify-center  items-center flex-col w-1/2 space-y-10">
                    <div className="w-[90%] space-y-2">
                        <h1 className="text-6xl font-semibold text-slate-800">
                            Traditional to Modern Todo APP
                        </h1>
                        <h3 className="text-xl font-medium text-slate-500">
                            Take a best experience of todo app
                        </h3>
                    </div>
                    <div className="w-[80%] flex gap-10">
                        <Link className="w-1/2" href="/login">
                            <Button className="w-full">Login</Button>
                        </Link>
                        <Link href="/login" className="w-1/2">
                            <Button className="w-full">Register</Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-[#00bcc1] w-1/2 flex justify-center h-screen">
                    <Image
                        src="/hero.jpeg"
                        alt="Todo App"
                        width={500}
                        height={500}
                        className="bg-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default PublicHomePage;
