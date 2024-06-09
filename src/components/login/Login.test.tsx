import Login from './Login'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Login', () => {
    describe('when the user is not logged in', () => {
        beforeEach(() => {
            // Arrange
            const props = {
                isLoggedIn: false,
                userLoggedIn: jest.fn(),
                userLoggedOut: jest.fn(),
                loginUser: jest.fn(),
                navigateToMeterReadingsPage: jest.fn(),
                loginError: null
            }
            
            render(<Login {...props} />)
        })

        it('should render the username field', () => {
            const usernameField = screen.getByLabelText('Username:')            
            expect(usernameField).toBeInTheDocument()
        })

        it('should render the password field', () => {
            const passwordField = screen.getByLabelText('Password:')
            expect(passwordField).toBeInTheDocument()
        })

        it('should render the login button', () => {
            const loginButton = screen.getByRole('button', {name: 'Login'})
            expect(loginButton).toBeInTheDocument()
        })

        it('should not render the logout button', () => {
            const logoutButton = screen.queryByRole('button', {name: 'Logout'})
            expect(logoutButton).not.toBeInTheDocument()
        })
    })

    describe('when the user is logged in', () => {
        beforeEach(() => {
            // Arrange
            const props = {
                isLoggedIn: true,
                userLoggedIn: jest.fn(),
                userLoggedOut: jest.fn(),
                loginUser: jest.fn(),
                navigateToMeterReadingsPage: jest.fn(),
                loginError: null
            }
            
            render(<Login {...props} />)
        })

        it('should render the logout button', () => {
            const logoutButton = screen.getByRole('button', {name: 'Logout'})
            expect(logoutButton).toBeInTheDocument()
        })

        it('should not render the login button', () => {
            const loginButton = screen.queryByRole('button', {name: 'Login'})
            expect(loginButton).not.toBeInTheDocument()
        })

        it('should not render the username field', () => {
            const usernameField = screen.queryByLabelText('Username:')
            expect(usernameField).not.toBeInTheDocument()
        })

        it('should not render the password field', () => {
            const passwordField = screen.queryByLabelText('Password:')
            expect(passwordField).not.toBeInTheDocument()
        })
    })

    describe ('when there is a login error present', () => {
        beforeEach(() => {
            // Arrange
            const props = {
                isLoggedIn: false,
                userLoggedIn: jest.fn(),
                userLoggedOut: jest.fn(),
                loginUser: jest.fn(),
                navigateToMeterReadingsPage: jest.fn(),
                loginError: new Error('Invalid username or password')
            }
            
            render(<Login {...props} />)
        })

        it('should render the error message', () => {
            const errorMessage = screen.getByText('Invalid username or password')
            expect(errorMessage).toBeInTheDocument()
        })
    })

    describe('when the user submits a valid login form', () => {
        const mockUserLoggedInCallback = jest.fn()
        const mockNavigateToMeterReadingsPage = jest.fn()

        const mockLoginUser = jest.fn().mockResolvedValue( {accountId: '123'} )

        afterEach(() => {
            jest.clearAllMocks()
        })

        beforeEach(() => {
            // Arrange
            const props = {
                isLoggedIn: false,
                userLoggedIn: mockUserLoggedInCallback,
                userLoggedOut: jest.fn(),
                loginUser: mockLoginUser,
                navigateToMeterReadingsPage: mockNavigateToMeterReadingsPage,
                loginError: null
            }
            
            render(<Login {...props} />)

            // Act
            const usernameField = screen.getByRole('textbox', {name: 'Username:'})
            
            // Password fields have no implicit role, so we use the label text instead
            const passwordField = screen.getByLabelText('Password:')

            fireEvent.change(usernameField, {target: {value: 'testuser'}})
            fireEvent.change(passwordField, {target: {value: 'testpassword'}})

            const loginButton = screen.getByRole('button', {name: 'Login'})

            fireEvent.click(loginButton)

        })

        it('should call the loginUser function with the username and password', () => {
            expect(mockLoginUser).toHaveBeenCalledTimes(1)
            expect(mockLoginUser).toHaveBeenCalledWith({password: "testpassword", username: "testuser"})
        })

        it('should call the userLoggedIn function with the account ID', () => {
            expect(mockUserLoggedInCallback).toHaveBeenCalledTimes(1)
            expect(mockUserLoggedInCallback).toHaveBeenCalledWith({
                accountId: '123'
            })
        })

        it('should call the navigateToMeterReadingsPage function with the account ID', () => {
            expect(mockNavigateToMeterReadingsPage).toHaveBeenCalledTimes(1)
            expect(mockNavigateToMeterReadingsPage).toHaveBeenCalledWith('123')
        })
    })

    describe('when the user submits an invalid login form', () => {
        const mockUserLoggedInCallback = jest.fn()
        const mockNavigateToMeterReadingsPage = jest.fn()
        const mockUserLoggedOutCallback = jest.fn()

        jest.spyOn(console, 'log').mockImplementation(() => {})

        const mockLoginUser = jest.fn().mockResolvedValue(
            new Error('Invalid username or password')
        )

        afterEach(() => {
            jest.clearAllMocks()
        })

        afterAll(() => {
            jest.spyOn(console, 'log').mockRestore()
        })

        beforeEach(() => {
            // Arrange
            const props = {
                isLoggedIn: false,
                userLoggedIn: mockUserLoggedInCallback,
                userLoggedOut: mockUserLoggedOutCallback,
                loginUser: mockLoginUser,
                navigateToMeterReadingsPage: mockNavigateToMeterReadingsPage,
                loginError: null
            }
            
            render(<Login {...props} />)

            // Act
            const usernameField = screen.getByRole('textbox', {name: 'Username:'})
            
            // Password fields have no implicit role, so we use the label text instead
            const passwordField = screen.getByLabelText('Password:')

            fireEvent.change(usernameField, {target: {value: 'testuser'}})
            fireEvent.change(passwordField, {target: {value: 'testpassword'}})

            const loginButton = screen.getByRole('button', {name: 'Login'})

            fireEvent.click(loginButton)

        })

        it('should call the loginUser function with the username and password', () => {
            expect(mockLoginUser).toHaveBeenCalledTimes(1)
            expect(mockLoginUser).toHaveBeenCalledWith({password: "testpassword", username: "testuser"})
        })

        it('should not call the userLoggedIn function', () => {
            expect(mockUserLoggedInCallback).not.toHaveBeenCalled()
        })

        it('should not call the navigateToMeterReadingsPage function', () => {
            expect(mockNavigateToMeterReadingsPage).not.toHaveBeenCalled()
        })

        it('should log the error message to the console', () => {
            expect(console.log).toHaveBeenCalledWith('Invalid username or password')
        })

        it('should not call the userLoggedOut function', () => {
            expect(mockUserLoggedOutCallback).not.toHaveBeenCalled()
        })
    })

    describe('when the user clicks to log out', () => {
        const mockUserLoggedOutCallback = jest.fn()
        const mockLoginUser = jest.fn()

        beforeEach(() => {
            // Arrange
            const props = {
                isLoggedIn: true,
                userLoggedIn: jest.fn(),
                userLoggedOut: mockUserLoggedOutCallback,
                loginUser: mockLoginUser,
                navigateToMeterReadingsPage: jest.fn(),
                loginError: null
            }
            
            render(<Login {...props} />)

            // Act
            const logoutButton = screen.getByRole('button', {name: 'Logout'})

            fireEvent.click(logoutButton)
        })

        it('should call the userLoggedOut function', () => {
            expect(mockUserLoggedOutCallback).toHaveBeenCalledTimes(1)
        })

        it('should not call the loginUser function', () => {
            expect(mockLoginUser).not.toHaveBeenCalled()
        })
    })
})