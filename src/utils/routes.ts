export const routes = {
    api: {
        login: '/api/login',
        meterReadings: (accountId: string) => `/api/accounts/${accountId}/meter-readings`,
    },
    site: {
        home: '/',
        meterReadings: (accountId: string) => `/accounts/${accountId}/meter-readings`,
        newMeterReading: (accountId: string) => `/accounts/${accountId}/meter-readings/new`,
    }
       
}