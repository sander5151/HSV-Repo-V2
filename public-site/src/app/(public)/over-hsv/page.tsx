"use client"
import { api } from "@/trpc/react"

export default function OverPage() {
    const data = api.site.getSiteText.useQuery({ id: 'cm0t1h62c0000nbg7lb4kkbrc' });
    return (
        <div>
            <p>{data.data?.content}</p>
        </div>
    )
}
