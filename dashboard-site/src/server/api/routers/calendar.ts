import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const calendarRouter = createTRPCRouter({
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
    getUsersTodos: publicProcedure.input(z.object({ clerkId: z.string() }))
        .query(async ({ ctx, input }) => {
            const userId = (await ctx.db.userAccount.findFirst({
                where: {
                    clerkId: input.clerkId
                },
                select: {
                    id: true
                }
            }))?.id ?? '';
            const todos = await ctx.db.todo.findMany({
                where: {
                    userId: userId
                }
            });
            return todos;
        })
});
