// util function to fetch data from the server and return it as json
export const fetcher = async (
    input: string | URL | globalThis.Request,
    options: RequestInit = {}
) => {
    const response = await fetch(input, options)
    return {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        data: await response.json()
    }
}

