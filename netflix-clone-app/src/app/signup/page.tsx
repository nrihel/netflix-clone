"use client";
import { Input } from "@/shared/ui/Input";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async() => {
        if (!name || !email || !password) {
            toast.error("All fields are required")
            return;
        }

        try {
            await axios.post("/api/register", {
                name,
                email,
                password,
            })
        }catch (error) {
            console.log(error);        }
    };

    return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center 
        justify-center bg-black loginContainer"
    >
        <div className="max-w-[480px] w-full bg-[#000000b3] rounded-sm py-12 px-16 font-bold text-[32px]
                        text-white flex flex-col gap-5 z-50">
            <h1>Sign Up</h1>
            <Input
                type="name"
                placeholder="username"
                className="py-6 px-2"
                name={name}
                onChange={(e) => setName(e.target.value)}
                 />
            <Input 
                type="email" 
                placeholder="email" 
                className="py-6 px-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
             />
            <Input 
                type="password" 
                placeholder="password" 
                className="py-6 px-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
             />
            <button className="cursor-pointer w-full bg-[#e50914] text-base font-medium rounded-lg py-2.5"
            onClick={handleSignup}
            >
                Sign Up
            </button>
            <p className="text-base text-[#ffffffb3] text-center">OR</p>
            <div className="flex items-center justify-center gap-4">
                <FcGoogle className="cursor-pointer w-10 h-10" />
                <BsGithub className="cursor-pointer w-10 h-10" />
            </div>
            <div>
                <span className="text-[#ffffffb3] text-base font-normal">
                    Already have an account?  
                </span>
                <Link href="/login"className="font-medium text-base cursor-pointer"> Login</Link>
            </div>
        </div>
    </div>
    );
};

export default signup;