import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { addDays } from "date-fns"; // Handig om te gebruiken voor datumberekeningen
import { get } from "http";

export const calendarRouter = createTRPCRouter({
    getClosestEvents: publicProcedure
        .input(z.object({ date: z.string() })) // Verwacht een datum in string formaat
        .query(async ({ ctx, input }) => {
            const targetDate = new Date(input.date); // Zet de input datum om naar een Date object

            // Query om de twee dichtstbijzijnde evenementen op te halen
            const events = await ctx.db.event.findMany({
                where: {
                    startDate: {
                        gte: targetDate, // Evenementen na de geselecteerde datum
                    },
                },
                orderBy: {
                    startDate: 'asc', // Sorteer op datum, oplopend
                },
                take: 2, // Haal de twee dichtstbijzijnde evenementen op
            });

            return events;
        }),
    getEventById: publicProcedure
        .input(z.object({ id: z.string() })) // Verwacht een ID in string formaat
        .query(async ({ ctx, input }) => {
            // Query om een specifiek evenement op te halen
            const event = await ctx.db.event.findUnique({
                where: {
                    id: input.id, // Zoek op ID
                },
            });

            return event;
        }),
});
