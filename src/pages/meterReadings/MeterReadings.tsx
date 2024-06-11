import { MeterReading } from '../../apiAgents/meterReadings/types';
import { ApiErrorType } from '../../apiAgents/utils/types';


type MeterReadingsProps = {
    meterReadings?: MeterReading[] | ApiErrorType;
    isLoading: boolean;
}

const MeterReadings = ({
    meterReadings = [],
    isLoading
}: MeterReadingsProps) => {
    return (
        <div aria-live="polite">
            {isLoading ? (
                <div role="alert" aria-busy="true">Loading...</div>
            ) : meterReadings instanceof Error ? (
                <div role="alert">
                    <p>{meterReadings.message}</p>
                </div>
            ) : meterReadings.length === 0 ? (
                <div role="alert">
                    <p>No meter readings found</p>
                </div>
            ) : (
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
            )}
        </div>
    );
}

export default MeterReadings;