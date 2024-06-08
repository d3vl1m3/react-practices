import { ApiErrorType } from '../../apiAgents/utils/types';

type LoginProps = {
    isLoggedIn: boolean;
    userLoggedIn: (data: {accountId: string}) => void;
    userLoggedOut: () => void;
    loginError: Error | null;
    loginUser: (data: {username: string, password: string}) => Promise<{
        accountId: string;
        userName: string;
        firstName: string;
        lastName: string;
    } | ApiErrorType>;
    navigateToMeterReadingsPage: (accountId: string) => void;

}

const Login = ({
    isLoggedIn,
    userLoggedIn,
    userLoggedOut,
    loginError,
    loginUser,
    navigateToMeterReadingsPage
}: LoginProps) => {
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (event.currentTarget.checkValidity()) {
            const username = (event.currentTarget.elements.namedItem('username') as HTMLInputElement).value;
            const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

            const response = await loginUser({username, password});

            if (response instanceof Error) {
                console.log(response.message);
            } else {
                const { accountId } = response;
                userLoggedIn({
                    accountId
                })
                navigateToMeterReadingsPage(accountId)
            }
        }
    }

    const handleLogout = async () => {
        userLoggedOut()
    }

    return (
        <div className='p-4'>
            <p className="text-xl font-semibold mb-4">Login</p>
            
            <form className="flex flex-col items-start" method='POST' onSubmit={isLoggedIn ? handleLogout : handleLogin}>

                {isLoggedIn 
                    ? <button type="button" onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md mb-4">Logout</button> 
                    : (
                    <>
                        { loginError && <p className="text-red-500 mb-4">{loginError.message}</p>}
                        <div className="mb-4 flex items-center">
                            <label htmlFor="username" className="mb-2 mr-2 w-18">Username:</label>
                            <input type="text" id="username" name="username" className="border border-gray-300 rounded-md px-2 py-1 w-64" required defaultValue="test"/>
                        </div>

                        <div className="mb-4 flex items-center">
                            <label htmlFor="password" className="mb-2 mr-2 w-18">Password:</label>
                            <input type="password" id="password" name="password" className="border border-gray-300 rounded-md px-2 py-1 w-64" required defaultValue="react practices"/>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
                    </>
                    )
                }

            </form>
        </div>
    );
}

export default Login;
