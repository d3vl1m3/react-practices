import { useState } from 'react';
import { login } from '../../apiAgents/login/login';
import { useUserStateContext } from '../../contexts/user/user.context';
import { ApiErrorType } from '../../apiAgents/utils/types';
import { LoginResponseData } from '../../apiAgents/login/types';


export const useLogin = () => {
    const {userLoggedIn, userLoggedOut}  = useUserStateContext()

    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [loginError, setLoginError] = useState<Error | null>(null)

    const loginUser = async (payload: {username: string, password: string}): Promise<ApiErrorType | LoginResponseData> => {
        setIsLoginLoading(true)
        const response = await login(payload.username, payload.password)
        setIsLoginLoading(false)
        setLoginError(null)

        // Specific error handling can be done here
        if ( response instanceof Error ) {
            userLoggedOut()
            setLoginError(response)
        } else {
            userLoggedIn(
                {
                    accountId: response.accountId
                }
            )
        }

        return response;
    }

    return {
        actions: {
            loginUser: {
                apply: loginUser,
                isLoading: isLoginLoading,
                error: loginError
            },
        }
    }

}