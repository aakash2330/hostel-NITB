

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
    .mutation(async ({ ctx, input }) => {
      return await sendMail();
    }),

});
