import { GenericApiError } from '../../../apiAgents/utils/genericApiError';

export const genericResponseErrorHandlers = (status: number): GenericApiError | null => {

    switch (status) {
        case 400:
            return new GenericApiError(status, 'Bad request');
        case 401:
            return new GenericApiError(status, 'Unauthorized');
        case 404:
            return new GenericApiError(status, 'Not found');
        case 500:
            return new GenericApiError(status, 'Internal server error');
        default:
            return null
    }
}