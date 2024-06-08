import { useNavigate } from 'react-router-dom';
import { useMeterReadings } from '../../domainHooks/useMeterReadings/useMeterReadings';
import { useUserStateContext } from '../../contexts/user/user.context';
import { routes } from '../../utils/routes';

const NewMeterReading = () => {
    const {accountId} = useUserStateContext();
    const {actions} = useMeterReadings({
        accountId: accountId ?? ''
    })
    const navigate = useNavigate();
    // on submit, send the data to api/meterReadings post endpoint
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if ( actions.create.isLoading ) return;
        e.preventDefault();
        const meterReading = (document.getElementById('meterReading') as HTMLInputElement).value;
        const readingType = (document.querySelector('input[name="readingType"]:checked') as HTMLInputElement).value === 'gas' ? 'gas' : 'electric'
        const readingDate = (document.getElementById('readingDate') as HTMLInputElement).value;
        const repsonse = await actions.create.apply({readingValue: meterReading, readingType, readingDate});

        if ( repsonse instanceof Error ) {
            return;
        } else {
            navigate(routes.site.meterReadings(':accountId'));
        }

    }

    const ResponseMessage = () => {
        if (actions.create.error) {
            return <p className="text-red-500">{actions.create.error.message}</p>
        }

        if (actions.create.isLoading) {
            return <p className="text-gray-500">Submitting...</p>
        }

        return null;
    }   

    return (
        <>
            <h1 className="text-xl font-semibold mb-4">Submit Meter Reading</h1>
            <form className="max-w-sm" onSubmit={handleSubmit}>
                <ResponseMessage />
                <div className="mb-4">
                    <label htmlFor="meterReading" className="block text-gray-700">Meter Reading:</label>
                    <input
                        type="text"
                        id='meterReading'
                        name="meterReading"
                        pattern="[0-9]{5}"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-sm text-gray-500">Please enter a 5-digit number.</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="readingType" className="block text-gray-700">Reading Type:</label>
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
                        <label htmlFor="gas" className="mr-4">Gas</label>
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
                    <label htmlFor="readingDate" className="block text-gray-700">Read Date:</label>
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
                    disabled={actions.create.isLoading}
                >
                    Submit
                </button>
            </form>
        </>
    );
}

export default NewMeterReading;