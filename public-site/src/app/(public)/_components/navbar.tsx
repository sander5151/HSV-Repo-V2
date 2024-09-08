'use client'
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { createElement, ElementType } from "react";
import { Archive, Briefcase, FileText, Info, Menu, SquareMenu, Users } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { api } from "@/trpc/react";

// const MenuLinks: { name: string, href: string, sublinks?: { name: string, href: string, desc: string, icon: ElementType }[] }[] = [
//     {
//         name: "Over HSV", href: "/over-hsv",
//         sublinks: [
//             { name: "Over HSV", href: "/over-hsv", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, sequi.", icon: Info },
//             { name: "Bestuur", href: "/over-hsv/bestuur", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, sequi.", icon: Users },
//             { name: "Fractie", href: "/over-hsv/fractie", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, sequi.", icon: Users },
//             { name: "Commissies", href: "/over-hsv/commissies", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, sequi.", icon: Users },
//             { name: "Geschiedenis", href: "/over-hsv/geschiedenis", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, sequi.", icon: Users },
//             { name: "Verenigingsdocumenten", href: "/over-hsv/verenigingsdocumenten", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, sequi.", icon: Users },
//         ]
//     },
//     { name: "Standpunten", href: "/standpunten" },
//     { name: "Agenda", href: "/agenda" },
//     { name: "HSV In de Media", href: "/media" },
//     { name: "Contact", href: "/contact" },
// ]

const iconMap: Record<string, React.ElementType> = {
    Info: Info,
    Users: Users,
    Briefcase: Briefcase,
    Archive: Archive,
    FileText: FileText,
};

export default function Navbar(
    { isLoggedIn }: Readonly<{ isLoggedIn: boolean }>,
) {
    const pathname = usePathname()

    const { data: menuLinks, isLoading, isError } = api.site.getActiveMenuLinks.useQuery();
    console.log(menuLinks)
    return (
        <>
            {/* Navbar component */}
            <nav className="bg-white shadow">
                <div className="w-screen flex items-center justify-between mx-auto p-4">
                    {/* Logo link */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="https://chibisafe.sandervddussen.nl/bpNr4FspbCfO.png"
                            className="h-10 w-auto"
                            width={100000}
                            height={10000}
                            alt="HSV Logo"
                        />
                    </Link>

                    {/* Desktop menu items */}
                    <div className="hidden md:flex h-10 justify-center items-center w-1/2">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {menuLinks?.map((MenuLink) => (
                                    MenuLink.sublinks && MenuLink.sublinks.length > 0 ? (
                                        <NavigationMenuItem key={MenuLink.name}>
                                            <NavigationMenuTrigger
                                                className={MenuLink.href === pathname || MenuLink.sublinks?.some(sublink => sublink.href === pathname)
                                                    ? "text-orange-400 hover:text-orange-400 focus:text-orange-400"
                                                    : ""}
                                            >
                                                {MenuLink.name}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                    {MenuLink.sublinks.map((sublink) => (
                                                        <li key={sublink.name}>
                                                            <NavigationMenuLink asChild>
                                                                <Link href={sublink.href} passHref>
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="flex items-center justify-center text-orange-400">
                                                                            {/* @ts-ignore */}
                                                                            {iconMap[sublink.icon] ? createElement(iconMap[sublink.icon], { className: "h-4 w-4" }) : null}
                                                                        </div>
                                                                        <div className={sublink.href === pathname
                                                                            ? "text-orange-400 flex flex-col justify-between gap-1"
                                                                            : "flex flex-col justify-between gap-1"}
                                                                        >
                                                                            <div className="text-sm font-medium leading-none">{sublink.name}</div>
                                                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                                                {sublink.desc}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    ) : (
                                        <NavigationMenuItem key={MenuLink.name}>
                                            <Link href={MenuLink.href} legacyBehavior passHref>
                                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                    <p className={MenuLink.href === pathname ? "text-orange-400" : ""}>{MenuLink.name}</p>
                                                </NavigationMenuLink>
                                            </Link>
                                        </NavigationMenuItem>
                                    )
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>

                    </div>

                    {/* Desktop word lid button or dashboard */}
                    <div className="hidden h-10 md:flex justify-end items-center">
                        <Link href={isLoggedIn ? "https://dashboard.sandervddussen.nl/" : "/word-lid"} className="w-full bg-orange-400 text-white p-2 px-4 rounded-full">{isLoggedIn ? ("Dashboard") : ("Word lid!")}</Link>
                    </div>

                    {/* Mobile sheet */}
                    <div className="md:hidden flex justify-end items-center h-10">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="h-full w-auto flex items-center justify-center">
                                    <Menu className="h-full w-auto text-gray-600" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="h-full flex flex-col ">
                                    <div className="flex flex-col gap-2 flex-1">
                                        {menuLinks?.map((MenuLink) => (
                                            MenuLink.sublinks && MenuLink.sublinks.length > 0 ? (
                                                <Accordion type="single" collapsible className="w-full border-b-0">
                                                    <AccordionItem value={MenuLink.name} className="border-b-0">
                                                        <AccordionTrigger className={MenuLink.href === pathname || MenuLink.sublinks?.some(sublink => sublink.href === pathname) ? "text-orange-400 font-medium" : "font-medium"}>
                                                            {MenuLink.name}
                                                        </AccordionTrigger>
                                                        <AccordionContent className="pb-2">
                                                            <div className="w-full flex flex-col">
                                                                {MenuLink.sublinks.map((sublink) => (
                                                                    <SheetClose asChild>
                                                                        <Link href={sublink.href} passHref className={sublink.href === pathname ? "flex text-orange-400 py-4" : "flex text-gray-600 py-4"} >
                                                                            <p>{sublink.name}</p>
                                                                        </Link>
                                                                    </SheetClose>
                                                                ))}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>

                                                </Accordion>
                                            ) : (
                                                <SheetClose asChild>
                                                    <Link href={MenuLink.href} passHref className="py-4">
                                                        <p className={MenuLink.href === pathname ? "text-orange-400" : ""}>{MenuLink.name}</p>
                                                    </Link>
                                                </SheetClose>
                                            )
                                        ))}
                                    </div>
                                    <div className="mt-top w-full flex">
                                        <SheetClose asChild>
                                            <Link href={isLoggedIn ? "https://dashboard.sandervddussen.nl/" : "/word-lid"} className="w-full bg-orange-400 text-white text-center font-semibold py-4 rounded-full">{isLoggedIn ? ("Dashboard") : ("Word lid!")}</Link>
                                        </SheetClose>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                    </div>
                </div>
            </nav >
        </>
    )
}
