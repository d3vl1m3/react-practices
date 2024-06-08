import { SafeParseReturnType, z } from "zod";

// Schemas
const loginResponseDataSchema = z.object({
    accountId: z.string(),
    userName: z.string(),
    firstName: z.string(),
    lastName: z.string(),
});

const loginPayloadSchema = z.object({
    username: z.string(),
    password: z.string(),
});

// Types
type LoginPayload = z.infer<typeof loginPayloadSchema>;
type LoginResponseData = z.infer<typeof loginResponseDataSchema>;

// Decoders
const decodeLoginResponseData = (data: unknown): SafeParseReturnType<unknown, LoginResponseData> => {
    return loginResponseDataSchema.safeParse(data);
};

// Exports
export { decodeLoginResponseData }
export type { LoginPayload, LoginResponseData }