'use client'
import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { nl } from "date-fns/locale";
import { BadgeEuro, Clock, Tag, UsersRound } from "lucide-react";
import { api } from "@/trpc/react"; // Zorg ervoor dat je de TRPC client correct importeert
import Link from "next/link";

export default function AgendaPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    // Haal de evenementen op met TRPC query
    const { data: events, isLoading, isError } = api.calendar.getClosestEvents.useQuery({
        date: date?.toISOString() || "", // Geef de geselecteerde datum door
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading events</p>;

    return (
        <div className="w-full h-full">
            <div className="p-2  w-full h-full flex flex-col items-center md:hidden">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    showOutsideDays
                    locale={nl}
                    classNames={{
                        day_selected: "bg-orange-400 text-white",
                        day_today: "bg-[#000170] text-white",
                        caption_label: "text-xl  uppercase font-light",
                    }}
                />
                <div className="w-full flex flex-col h-1/2 justify-between gap-2">
                    {/* Weergeven van evenementen */}
                    {events?.map((event, index) => (
                        <div key={index} className="w-full h-full rounded-2xl border flex gap-2">
                            <div className="w-1/3 h-full rounded-l-2xl flex flex-col items-center justify-center p-4">
                                <h1 className="text-6xl">{new Date(event.startDate).getDate()}</h1>
                                <h2 className="text-4xl uppercase">
                                    {new Date(event.startDate).toLocaleString("default", { month: "short" })}
                                </h2>
                            </div>
                            <div className="w-2/3 h-full rounded-r-2xl flex flex-col p-2 justify-center text-sm gap-8">
                                <Link href={`/agenda/${event.id}`}>
                                    <h1 className="text-3xl font-semibold uppercase text-orange-400">{event.title}</h1>
                                </Link>
                                <div className="w-full flex flex-col justify-center h-full">
                                    <div className="w-full flex justify-between text-xs">
                                        <div className="inline-flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <p>{event.startDate.toString()} - {event.endDate.toString()}</p>
                                        </div>
                                        <div className="inline-flex items-center gap-2">
                                            <Tag className="h-4 w-4" />
                                            <p>test</p>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-between">
                                        <div className="inline-flex items-center gap-2">
                                            <UsersRound className="h-4 w-4" />
                                            <p>13</p>
                                        </div>
                                        <div className="inline-flex items-center gap-2">
                                            <BadgeEuro className="h-4 w-4" />
                                            <p>{event.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="hidden md:flex w-full h-full">

            </div>
        </div>

    );
}
