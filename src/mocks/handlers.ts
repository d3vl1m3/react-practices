import { http, HttpResponse, PathParams } from 'msw'
import { routes } from '../utils/routes'

export type MeterReading = {
  meterReadingId: number
  meterReadingDate: string
  meterReadingType: string
  readingValue: string
  createdDateTime: string
}

type AccountReadings = {
  [key: string]: MeterReading[]
}

const meterReadings: AccountReadings = {
  '1234': [
    {
      meterReadingId: 1234,
      meterReadingDate: '2024-04-19',
      meterReadingType: 'gas',
      readingValue: '02156',
      createdDateTime: '2024-04-19 09:51:23.797',
    },
    {
      meterReadingId: 5678,
      meterReadingDate: '2024-04-19',
      meterReadingType: 'electric',
      readingValue: '09856',
      createdDateTime: '2024-04-19 09:52:01.298',
    },
  ]
}

const validateReadingValue = (readingValue: string): boolean => {
  const readingValueRegex = /^[0-9]{5}$/
  return readingValueRegex.test(readingValue)
}

const validateReadingType = (readingType: string): boolean => {
  const readingTypeRegex = /^(gas|electric)$/
  return readingTypeRegex.test(readingType)
}

const validateReadingDate = (readingDate: string): boolean => {
  // validate a date string in the format 2024-06-07
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  return !dateRegex.test(readingDate)
}

const isCorrectUsernameAndPassword = (username: string, password: string): boolean => {
  return username === 'test' && password === 'react practices'
}

export const handlers = [
  // Login
  http.post<PathParams, { username: string, password: 'gas' | 'electric' }>(routes.api.login, async ({ request }) => {
    const { username, password } = await request.json()

    // "sanitize" username and password
    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()

    // add basic username checks to ensure it is not empty
    if (!trimmedUsername) {
      return HttpResponse.json({message: 'Missing username'}, { status: 400})    
    }

    // make sure the password is not empty
    if (!trimmedPassword) {
      return HttpResponse.json({ message: 'Missing password' },{ status: 400 })
    }

    // check the username and password are correct
    if (!isCorrectUsernameAndPassword(trimmedUsername, trimmedPassword)) {
      return HttpResponse.json({message: 'Invalid login details'}, { status: 401 })
    }

    return HttpResponse.json(
      {
        message: 'Login Successful',
        data: {
          accountId: "1234",
          userName: "reactdeveloper",
          firstName: "React",
          lastName: "Developer"
        }
      }, 
      {
        status: 200
      }
    )
  }),

  // GET Readings
  http.get<{accountId: string}>(routes.api.meterReadings(':accountId'), ({params}) => {
    const {accountId} = params

    return HttpResponse.json(
      {
        message: 'Meter Readings',
        data: meterReadings?.[accountId] ?? []
      }, 
      { status: 200 }
    )
  }),

  // POST Reading
  http.post<
    {accountId: string}, 
    {payload: { readingValue: string, readingType: 'gas' | 'electric', readingDate: string } }
  >(routes.api.meterReadings(':accountId'), async ({ request, params }) => {
    const {accountId} = params
    const {payload: {
      readingValue,
      readingType,
      readingDate    
    }} = await request.json()

    // if the meterReadings object does not have an array for the account, create one
    if (!meterReadings?.[accountId]) {
      return HttpResponse.json({message: 'Account not found'}, { status: 404 })
    }

    // check the readingValue and readingType are present
    if (!readingValue || !readingType || !readingDate) {
      return HttpResponse.json({message: 'Missing reading value, reading type or reading date'}, {status: 400})
    }

    // validate reading value
    if (!validateReadingValue(readingValue)) {
      return HttpResponse.json({message: 'Invalid reading value'}, { status: 400 })
    }

    // validate reading type
    if (!validateReadingType(readingType)) {
      return HttpResponse.json({message: 'Invalid reading type'}, { status: 400 })
    }

    // validate reading date is a valid date string
    if (validateReadingDate(readingDate)) {
      return HttpResponse.json({message: 'Invalid reading date'}, { status: 400 })
    }

    const meterReadingId = meterReadings[accountId].length + 1

    const newReading = {
      meterReadingId,
      meterReadingDate: new Date(readingDate).toISOString(),
      meterReadingType: readingType,
      readingValue,
      createdDateTime: new Date().toISOString(),
    }

    meterReadings?.[accountId].push(newReading)

    return HttpResponse.json(
      {
        message: 'Meter Reading Created',
        data: {
          meterReadingId
        }
      }, 
      { status: 200}
  )
  }),
]
