"use client"
import { api } from "@/trpc/react"

export default function OverPage() {
    const { data: SiteText, isLoading, isError } = api.site.getSiteText.useQuery({ id: 'cm0tptt0h0000c18j6sqlny94' });
    console.log(SiteText)
    return (
        <div className="w-full h-full flex p-4 bg-red-400">
            <p className="text-4">{SiteText?.content}</p>
        </div>
    )
}
