import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const inboxRouter = createTRPCRouter({
    getUsersInbox: publicProcedure
        .input(z.object({ clerkId: z.string() }))
        .query(async ({ ctx, input }) => {
            const userId = (await ctx.db.userAccount.findFirst({
                where: {
                    clerkId: input.clerkId
                },
                select: {
                    id: true
                }
            }))?.id ?? '';
            const inbox = await ctx.db.message.findMany({
                where: {
                    recipients: {
                        some: {
                            userId: userId
                        }
                    }
                }
            });
            return inbox;
        })
});
