

import { z } from "zod";
import { sendMail } from "~/lib/mail";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { CreateGuestValidator } from "~/utils/validators/guestValidators";


export const mailRouter = createTRPCRouter({
  sendMail: protectedProcedure
    .input(z.object({ subject: z.string(), text: z.string(), templatePath: z.any().optional() }))
    .mutation(async ({ ctx, input }) => {
      const { subject, text, templatePath } = input
      return await sendMail({ subject, text, templatePath });
    }),

});
