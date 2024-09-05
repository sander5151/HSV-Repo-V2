import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { api } from "@/trpc/server"

export default async function agendaPage() {
    const nextFiveEvents = await api.event.getNextFiveEvents();

    return (
        <div className="w-full h-full flex flex-col p-4">
            <div className="w-full h-1/2 flex flex-col justify-center items-center">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-3/4"
                >
                    <CarouselContent>
                        {nextFiveEvents.map((event) => (
                            <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-3xl font-semibold">{event.title}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className="w-full h-1/2">2</div>
        </div>
    )
}
