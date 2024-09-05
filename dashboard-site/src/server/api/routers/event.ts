import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const eventRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const events = await ctx.db.event.findMany({
        });
        return events;
    }),
    getNextFiveEvents: publicProcedure.query(async ({ ctx }) => {
        const nextFiveEvents = await ctx.db.event.findMany({
            take: 5,
            orderBy: {
                startDate: "asc",
            }
        });
        return nextFiveEvents;
    }),
});
