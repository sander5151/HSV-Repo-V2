import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const siteRouter = createTRPCRouter({
    getSiteText: publicProcedure
        .input(z.object({ pageId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.siteText.findMany({
                where: {
                    OR: [
                        { pageId: input.pageId },
                        { subPageId: input.pageId }
                    ]
                }
            });
        }),
    updateSiteText: publicProcedure
        .input(z.object({
            id: z.string(),
            text: z.string(),
            pageId: z.string(),  // Zorg dat het pageId ook wordt meegegeven
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.siteText.update({
                where: { id: input.id },
                data: {
                    content: input.text,
                    lastUpdated: new Date(), // Update de datum wanneer de tekst is bijgewerkt
                }
            });
        }),
    getAllPages: publicProcedure
        .query(({ ctx }) => {
            return ctx.db.publicParentPages.findMany({
                include: {
                    PublicSubPages: true // Vervang PublicSubPages door subPages
                }
            });
        }),

});