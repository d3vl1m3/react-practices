import { genericResponseErrorHandlers } from '../../domainHooks/utils/genericResponseErrorHandlers/genericResponseErrorHandlers'
import { routes } from '../../utils/routes'
import { fetcher } from '../fetcher/fetcher'
import { ApiErrorType } from '../utils/types'
import { UnhandledApiError } from '../utils/unhandledApiError'
import { CreateMeterReadingResponseData, decodeCreateMeterReadingResponseData, decodeGetMeterReadingsListResponseData } from './types'

export const getMeterReadings = async ({
    accountId
}: {
    accountId: string
}) => {
    const response =  await fetcher(
        routes.api.meterReadings(accountId), 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )

    if ( !response.ok ) {        
        const genericApiError = genericResponseErrorHandlers(response.status)

        if (genericApiError) {
            return genericApiError
        }

        return new UnhandledApiError(response.status, response.statusText)
    }

    const decodedData = decodeGetMeterReadingsListResponseData(response.data.data)

    if (decodedData.error) {
        return decodedData.error
    }
        
    return decodedData.data
}

export const addMeterReading = async (accountId: string, payload: {readingValue: string, readingType: 'gas' | 'electric', readingDate: string}): Promise<CreateMeterReadingResponseData | ApiErrorType> => {
    const response = await fetcher(
        routes.api.meterReadings(accountId), 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload }),
        }
    )


    if ( !response.ok ) {        
        const genericApiError = genericResponseErrorHandlers(response.status)

        if (genericApiError) {
            return genericApiError
        }

        return new UnhandledApiError(response.status, response.statusText)
    }

    const decodedData = decodeCreateMeterReadingResponseData(response.data.data)

    if (decodedData.error) {
        return decodedData.error
    }
        
    return decodedData.data
}