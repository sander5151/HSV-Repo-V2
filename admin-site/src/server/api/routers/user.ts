import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    isUserAdmin: publicProcedure
        .input(z.object({ clerkId: z.string() }))
        .query(async ({ ctx, input }) => {
            const userId = await ctx.db.userAccount.findFirst({
                where: {
                    clerkId: input.clerkId
                },
                select: {
                    id: true
                }
            })
            const isAdmin = await ctx.db.admin.findFirst({
                where: {
                    userId: userId?.id
                }
            })
            return Boolean(isAdmin);
        }),

});
