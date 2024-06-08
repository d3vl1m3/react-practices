import useSWR from 'swr';
import { useState } from 'react';
import { addMeterReading, getMeterReadings } from '../../apiAgents/meterReadings/meterReadings';

export const useMeterReadings = ({
    accountId
}: {
    accountId: string
}) => {
    const key = accountId ? `meter-readings-${accountId}` : null
    
    const { data, error, isLoading, mutate } = useSWR(key, () => getMeterReadings({accountId: accountId ?? ''}))

    const [isCreating, setIsCreating] = useState(false)
    const [createError, setCreateError] = useState<Error | null>(null)

    const create = async (payload: {readingValue: string, readingType: 'gas' | 'electric', readingDate: string}) => {
        setCreateError(null)
        setIsCreating(true)

        const response = await addMeterReading(accountId, payload)

        setIsCreating(false)

        if ( response instanceof Error ) {
            setCreateError(response)
        } else {
            mutate();
        }

        return response
    }

    return {
        meterReadings: data,
        isLoading,
        error,
        actions: {
            create: {
                apply: create,
                isLoading: isCreating,
                error: createError
            }
        }

    }
}