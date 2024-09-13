import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    getUserInfo: publicProcedure
        .input(z.object({ clerkId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.userAccount.findFirst({
                where: {
                    clerkId: input.clerkId
                }
            });
        }),
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
    getAllMembers: publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.userAccount.findMany({})
        })
});
