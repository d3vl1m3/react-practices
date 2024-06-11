import { useNavigate } from 'react-router-dom';
import { useMeterReadings } from '../../domainHooks/useMeterReadings/useMeterReadings';
import { useUserStateContext } from '../../contexts/user/user.context';
import { NewMeterReading } from './NewMeterReading';

const NewMeterReadingContainer = () => {
    const { accountId } = useUserStateContext();
    const { actions } = useMeterReadings({
        accountId: accountId ?? '',
    });
    const navigate = useNavigate();

    return (
        <NewMeterReading 
            accountId={accountId ?? ''} 
            error={actions.create.error} 
            isLoading={actions.create.isLoading} 
            createMeterReading={actions.create.apply} 
            navigateOnSuccess={navigate}
        />
    );
};

export default NewMeterReadingContainer;
