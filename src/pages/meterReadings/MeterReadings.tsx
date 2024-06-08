import { useUserStateContext } from '../../contexts/user/user.context';
import { useMeterReadings } from '../../domainHooks/useMeterReadings/useMeterReadings';

const MeterReadings = () => {
    const {accountId} = useUserStateContext()
    const { meterReadings, isLoading } = useMeterReadings({
        accountId: accountId ?? ''
    });

    if ( isLoading ) {
        return <div>Loading...</div>
    }

    if ( meterReadings instanceof Error ) {
        return <div>{meterReadings.message}</div>
    }

    if ( !meterReadings ) {
        return <div>No meter readings found</div>
    }


    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Meter Readings</h1>
            <table>
                <thead>
                    <tr>
                        <th>Meter Reading ID</th>
                        <th>Meter Reading Date</th>
                        <th>Meter Reading Type</th>
                        <th>Reading Value</th>
                        <th>Submitted at</th>
                    </tr>
                </thead>
            <tbody>
                {meterReadings.map((reading) => (
                    <tr key={reading.meterReadingId}>
                        <td>{reading.meterReadingId}</td>
                        <td>{reading.meterReadingDate}</td>
                        <td>{reading.meterReadingType}</td>
                        <td>{reading.readingValue}</td>
                        <td>{reading.createdDateTime}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}

export default MeterReadings;