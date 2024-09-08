
import { api } from "@/trpc/server"


export default async function EventIdPage({ params }: { params: { eventId: string } }) {
    const eventData = await api.calendar.getEventById({ id: params.eventId });

    if (!eventData) {
        throw new Error("404 Not Found");
    }

    return (
        <div>
            <h1>{eventData.title}</h1>
        </div>
    )
}