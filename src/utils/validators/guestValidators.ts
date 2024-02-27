

import { Answer, Category, Country, Gender, IDCardType, MaritalStatus, Nationality, Religion, State, TypeOrg } from "@prisma/client";
import { z } from "zod";

export const CreateGuestValidator = z.object({
  name: z.string(),
  email: z.string(),
  alternativeEmail: z.string(),
  mobileNo: z.string(),
  alternativeMobileNo: z.string(),
  typeOrg: z.custom<TypeOrg>(),
  orgEmail: z.string().email(),
  orgPhone: z.string().min(10, { message: "invalid mobile number" }).max(10, { message: "invalid mobile number" }),
  physicallyChallenged: z.custom<Answer>(),
  orgAddress: z.string(),
  country: z.custom<Country>(),
  residentialState: z.custom<State>(),
  residentialDistt: z.string(),
  residentialCity: z.string(),
  orgWebsite: z.string(),
  orgName: z.string(),
  designation: z.string(),
  religion: z.custom<Religion>(),
  nationality: z.custom<Nationality>(),
  fatherHusbandName: z.string(),
  id_card_no: z.string(),
  identity_card_type: z.custom<IDCardType>(),
  maritalStatus: z.custom<MaritalStatus>(),
  remark: z.string(),
  dob: z.date(),
  permanentAddress: z.string(),
  localAddress: z.string(),
  category: z.custom<Category>(),
  gender: z.custom<Gender>(),
})
export type TCreateGuestValidator = z.infer<typeof CreateGuestValidator>
