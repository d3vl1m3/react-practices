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
    readingValue: z.string().regex(/^\d{5}$/),
    meterReadingType: z.string(),
    meterReadingDate: z.string(),
});

export const NewMeterReading = ({
    accountId,
    isLoading,
    error,
    createMeterReading,
    navigateOnSuccess
}: NewMeterReadingProps) => {

    const { 
        // register, 
        handleSubmit, 
        // formState: { errors, isSubmitting} 
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
            <form className="max-w-sm" onSubmit={handleSubmit(handleFormSubmit)}>
                <ResponseMessage />
                <div className="mb-4">
                    <label htmlFor="meterReading" className="block text-gray-700">
                        Meter Reading:
                    </label>
                    <input
                        type="text"
                        id="meterReading"
                        name="meterReading"
                        pattern="[0-9]{5}"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-sm text-gray-500">Please enter a 5-digit number.</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="readingType" className="block text-gray-700">
                        Reading Type:
                    </label>
                    <div>
                        <input
                            type="radio"
                            id="gas"
                            name="readingType"
                            value="gas"
                            required
                            className="mr-2"
                            defaultChecked
                        />
                        <label htmlFor="gas" className="mr-4">
                            Gas
                        </label>
                        <input
                            type="radio"
                            id="electric"
                            name="readingType"
                            value="electric"
                            required
                            className="mr-2"
                        />
                        <label htmlFor="electric">Electric</label>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="readingDate" className="block text-gray-700">
                        Read Date:
                    </label>
                    <input
                        type="date"
                        id="readingDate"
                        name="readingDate"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
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