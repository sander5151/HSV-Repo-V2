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
    getUserInfoById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.userAccount.findFirst({
                where: {
                    id: input.id
                }
            });
        })
});
