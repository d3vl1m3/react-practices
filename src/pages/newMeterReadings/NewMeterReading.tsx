import { routes } from '../../utils/routes';
import { CreateMeterReadingPayload } from '../../apiAgents/meterReadings/types';
import { ApiErrorType } from '../../apiAgents/utils/types';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface NewMeterReadingProps {
    accountId: string;
    error: Error| null;
    isLoading: boolean;
    createMeterReading: (payload: CreateMeterReadingPayload) => Promise<ApiErrorType | {
        meterReadingId: number;
    }>
    navigateOnSuccess: (accountId: string) => void;
}


const NewMeterReadingFormSchema = z.object({
    readingValue: z.string().regex(/^\d{5}$/, 'Reading must be a 5 digit number'),
    meterReadingType: z.string(),
    meterReadingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format DD-MM-YYYY')
});

export const NewMeterReading = ({
    accountId,
    isLoading,
    error,
    createMeterReading,
    navigateOnSuccess
}: NewMeterReadingProps) => {

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting} 
    } = useForm<z.infer<typeof NewMeterReadingFormSchema>>({
        resolver: zodResolver(NewMeterReadingFormSchema),
    });

    
    const handleFormSubmit: SubmitHandler<z.infer<typeof NewMeterReadingFormSchema>> = async (data) => {
        const response = await createMeterReading(data);
    
        if (response instanceof Error) {
            return;
        } else {
            navigateOnSuccess(routes.site.meterReadings(accountId));
        }
    };

    const ResponseMessage = () => {
        if (error) {
            return <p className="text-red-500">{error.message}</p>;
        }

        if (isLoading) {
            return <p className="text-gray-500">Submitting...</p>;
        }

        return null;
    };

    return (
        <>
            <h1 className="text-xl font-semibold mb-4">Submit Meter Reading</h1>
            <form className="max-w-sm" onSubmit={handleSubmit(handleFormSubmit)} action="#" name="Meter Reading Form">
                <ResponseMessage />
                <div className="mb-4">
                    <label htmlFor="readingValue" className="block text-gray-700">
                        Reading:
                    </label>
                    <input
                        {...register('readingValue')}
                        type="text"
                        id="readingValue"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {errors.readingValue && <p className="text-red-500">{errors.readingValue.message}</p>}
                    <p className="text-sm text-gray-500">Please enter a 5-digit number.</p>
                </div>
                <div className="mb-4" role="radiogroup" aria-labelledby="meterReadingTypeGroup">
                    <label htmlFor="meterReadingType" className="block text-gray-700" id="meterReadingTypeGroup">
                        Reading Type:
                    </label>
                    <div>
                        <input
                            {...register('meterReadingType', {
                                disabled: isLoading || isSubmitting
                            })}
                            type="radio"
                            id="gas"
                            value="gas"
                            className="mr-2"
                            defaultChecked
                        />
                        <label htmlFor="gas" className="mr-4">
                            Gas
                        </label>
                        <input
                            {...register('meterReadingType', {
                                disabled: isLoading || isSubmitting
                            })}
                            type="radio"
                            id="electric"
                            value="electric"
                            className="mr-2"
                        />
                        <label htmlFor="electric">Electric</label>
                    </div>
                    <div>
                        {errors.meterReadingType && <p className="text-red-500">{errors.meterReadingType.message}</p>}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="meterReadingDate" className="block text-gray-700">Read Date:</label>
                    <input
                        {
                            ...register('meterReadingDate')
                        }
                        type="date"
                        id="meterReadingDate"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {errors.meterReadingDate && <p className="text-red-500">{errors.meterReadingDate.message}</p>}
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    disabled={isLoading}
                >
                    Submit
                </button>
            </form>
        </>
    );
};