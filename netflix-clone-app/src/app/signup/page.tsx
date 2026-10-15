import { Input } from "@/shared/ui/Input";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const signup = () => {
    return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center 
        justify-center bg-black loginContainer"
    >
        <div className="max-w-[480px] w-full bg#000000b3 rounded-sm py-12 px-16 font-bold text-[32px]
                        text-white flex flex-col gap-5 z-50">
            <h1>Sign Up</h1>
            <Input type="name" placeholder="username" />
            <Input type="email" placeholder="email" />
            <Input type="password" placeholder="password" />
            <button className="cursor-pointer w-full bg-[#e50914] text-base font-medium rounded-lg py-2.5">Sign Up</button>
            <p className="text-base text-[#ffffffb3] text-center">OR</p>
            <div className="flex items-center justify-center gap-4">
                <FcGoogle className="cursor-pointer w-10 h-10" />
                <BsGithub className="cursor-pointer w-10 h-10" />
            </div>
        </div>
    </div>
    );
};

export default signup;