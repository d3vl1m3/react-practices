import { MeterReading } from '../../apiAgents/meterReadings/types';
import { ApiErrorType } from '../../apiAgents/utils/types';


type MeterReadingsProps = {
    meterReadings?: MeterReading[] | ApiErrorType;
    isLoading: boolean;
}

export const MeterReadings = ({
    isLoading,
    meterReadings
}: MeterReadingsProps) => {
    if ( isLoading ) {
        return  <div role="alert" aria-busy="true">Loading...</div>;
    }
    
    if ( meterReadings instanceof Error ) {
        return  (
            <div role="alert">
                <p>{meterReadings.message}</p>
            </div>
        );
    }
    
    if ( !meterReadings || meterReadings.length === 0 ) {
        return  (
            <div role="alert">
                <p>No meter readings found</p>
            </div>
        );
    } 

    return  (
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