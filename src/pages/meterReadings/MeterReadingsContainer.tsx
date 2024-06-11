import { useUserStateContext } from '../../contexts/user/user.context';
import { useMeterReadings } from '../../domainHooks/useMeterReadings/useMeterReadings';
import { MeterReadings } from './MeterReadings'; // Import the MeterReadings component

const MeterReadingsContainer = () => {
    const { accountId } = useUserStateContext();
    const { meterReadings, isLoading } = useMeterReadings({
        accountId: accountId ?? ''
    });

    return (
        <MeterReadings meterReadings={meterReadings} isLoading={isLoading} />
    )
}

export default MeterReadingsContainer;
