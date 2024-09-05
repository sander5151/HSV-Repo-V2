import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    checkIfProfileComplete: publicProcedure
        .input(z.object({ clerkId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.userAccount.findFirst({
                where: {
                    clerkId: input.clerkId
                }
            });
        }),
    createUserAccount: publicProcedure
        .input(z.object({
            clerkId: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            email: z.string(),
            image: z.string().optional(),
            gender: z.string().optional(),
            bio: z.string().optional(),
            phone: z.string().optional(),
            country: z.string().optional(),
            province: z.string().optional(),
            city: z.string().optional(),
            streetName: z.string().optional(),
            houseNumber: z.string().optional(),
            postalCode: z.string().optional(),
            study: z.string().optional(),
            profileCompleted: z.boolean(),
        })
        ).mutation(({ ctx, input }) => {
            return ctx.db.userAccount.create({
                data: {
                    clerkId: input.clerkId,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                    image: input.image,
                    gender: input.gender,
                    bio: input.bio,
                    phone: input.phone,
                    country: input.country,
                    province: input.province,
                    city: input.city,
                    streetName: input.streetName,
                    houseNumber: input.houseNumber,
                    postalCode: input.postalCode,
                    study: input.study,
                    profileCompleted: true,
                }
            });

        }),
    getUserInfo: publicProcedure
        .input(z.object({ clerkId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.userAccount.findFirst({
                where: {
                    clerkId: input.clerkId
                }
            });
        }),
});
