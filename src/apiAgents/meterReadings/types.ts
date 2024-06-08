import { SafeParseReturnType, z } from "zod";

// Schemas
const meterReadingSchema = z.object({
    meterReadingId: z.number(),
    meterReadingDate: z.string(),
    meterReadingType: z.string(),
    readingValue: z.string(),
    createdDateTime: z.string(),
});

const createMeterReadingResponseDataSchema = z.object({
    meterReadingId: z.number()
});

const createMeterReadingPayloadSchema = z.object({
    meterReadingDate: z.string(),
    meterReadingType: z.string(),
    readingValue: z.string(),
});

const getMeterReadingsListResponseDataSchema =  z.array(meterReadingSchema)

// Types
type CreateMeterReadingResponseData = z.infer<typeof createMeterReadingResponseDataSchema>;
type CreateMeterReadingPayload = z.infer<typeof createMeterReadingPayloadSchema>;
type GetMeterReadingsListResponseData = z.infer<typeof getMeterReadingsListResponseDataSchema>;

// Decoders
const decodeGetMeterReadingsListResponseData = (response: unknown): SafeParseReturnType<unknown, GetMeterReadingsListResponseData> => {
    return getMeterReadingsListResponseDataSchema.safeParse(response);
};

const decodeCreateMeterReadingResponseData = (response: unknown): SafeParseReturnType<unknown, CreateMeterReadingResponseData> => {
    return createMeterReadingResponseDataSchema.safeParse(response);
}

// Exports
export { 
    decodeGetMeterReadingsListResponseData, 
    decodeCreateMeterReadingResponseData
}
export type {
    CreateMeterReadingResponseData, 
    CreateMeterReadingPayload, 
    GetMeterReadingsListResponseData 
}