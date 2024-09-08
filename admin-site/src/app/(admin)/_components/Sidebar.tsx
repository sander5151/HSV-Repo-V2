import Image from "next/image"
import Link from "next/link"
import { BadgeEuro, BotMessageSquare, Calendar, Group, House, PanelsTopLeft, Users } from "lucide-react"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function Sidebar() {
    return (
        <>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-20 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <div className="flex flex-col h-full w-full">
                        <div className="w-full h-auto aspect-square">
                            <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg roup">
                                <Image src="https://chibisafe.sandervddussen.nl/bpNr4FspbCfO.png" width={1000} height={1000} alt="Logo" className="w-16 h-auto" />
                            </Link>
                        </div>
                        <div className="flex h-full flex-col w-full items-center justify-center gap-8">
                            <Link href="/" ><House /></Link>
                            <Link href="/" ><Users /></Link>
                            <Link href="/" ><Calendar /></Link>
                            <Link href="/" ><BadgeEuro /></Link>
                            <Link href="/" ><BotMessageSquare /></Link>
                            <Link href="/" ><Group /></Link>
                            <Link href="/website" ><PanelsTopLeft /></Link>
                        </div>
                    </div>
                </div>
            </aside >
        </ >
    )
}
