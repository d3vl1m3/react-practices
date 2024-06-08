import { genericResponseErrorHandlers } from '../../domainHooks/utils/genericResponseErrorHandlers/genericResponseErrorHandlers'
import { routes } from '../../utils/routes'
import { fetcher } from '../fetcher/fetcher'
import type { ApiErrorType } from '../utils/types'
import { UnhandledApiError } from '../utils/unhandledApiError'
import { type LoginResponseData, decodeLoginResponseData } from './types'

export const login = async (username: string, password: string): Promise<LoginResponseData | ApiErrorType> => {
    const response = await fetcher(routes.api.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })

    if ( !response.ok ) {
        if ( response.status === 401 ) {
            return new Error('Invalid login details')

        }
        
        const genericApiError = genericResponseErrorHandlers(response.status)

        if (genericApiError) {
            return genericApiError
        }

        return new UnhandledApiError(response.status, response.statusText)
    }

    const decodedData = decodeLoginResponseData(response.data.data)

    if (decodedData.error) {
        return decodedData.error
    }
        
    return decodedData.data
}