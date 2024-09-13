import { Input } from "@/components/ui/input";
import { api } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { Settings } from "lucide-react";
import Image from "next/image";
Image
export default async function Navbar() {
    const { userId } = auth()
    const getUserInfo = userId ? await api.user.getUserInfo({ clerkId: userId }) : null;

    return (
        <>
            <nav className="w-full h-16">
                <div className="w-full flex justify-between h-16 py-4 items-center">
                    <Input type="text" placeholder="Zoek..." className="w-1/4" />
                    <div className="h-full flex items-center gap-4">
                        <button><Settings className="h-6 w-6" /></button>
                        <button>
                            <Image src={getUserInfo?.image || ""} width={500} height={500} alt="Profiel foto" className="w-10 h-10 rounded-full" />
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}
