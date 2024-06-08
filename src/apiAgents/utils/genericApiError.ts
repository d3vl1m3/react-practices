export class GenericApiError extends Error {
    statusCode: number
    statusText: string

    constructor(statusCode: number, statusText: string) {
    super('API error')
    this.name = 'GenericApiError'
    this.statusCode = statusCode
    this.statusText = statusText
    }
}
