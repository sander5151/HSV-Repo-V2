import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const siteRouter = createTRPCRouter({
    getActiveMenuLinks: publicProcedure
        .query(({ ctx }) => {
            return ctx.db.menuLink.findMany({
                where: {
                    enabled: true
                },
                include: {
                    sublinks: true,  // Inclusief de gerelateerde sublinks
                },
                orderBy: {
                    order: 'asc'
                }
            })
        })

});
