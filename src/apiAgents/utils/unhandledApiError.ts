export class UnhandledApiError extends Error {
    statusCode: number
    statusText: string

    constructor(statusCode: number, statusText: string) {
    super('Unhandled API error')
    this.name = 'UnhandledApiError'
    this.statusCode = statusCode
    this.statusText = statusText
    }
}
