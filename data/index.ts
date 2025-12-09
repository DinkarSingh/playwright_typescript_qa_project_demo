import { z } from "zod";
import { defaultData } from "./default";

export const apibaseURL = z.object({
  baseURL: z.string().url(),
});

export const uibaseURL = z.object({
  baseURL: z.string().url(),
});

export const userCredentials = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const dataSchema = z.object({
  apibaseURL: z.array(apibaseURL),
  uibaseURL: z.array(uibaseURL),
  userCredentials: z.array(userCredentials),
});

export function getData(): z.infer<typeof dataSchema> {
  return dataSchema.parse(defaultData);
}
