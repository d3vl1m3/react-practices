import { useState } from 'react';
import { login } from '../../apiAgents/login/login';
import { useUserStateContext } from '../../contexts/user/user.context';
import { ApiErrorType } from '../../apiAgents/utils/types';
import { LoginResponseData } from '../../apiAgents/login/types';

export type LoginActionApply = (payload: {username: string, password: string}) => Promise<ApiErrorType | LoginResponseData>;

type LoginAction = {
    apply: LoginActionApply
    isLoading: boolean;
    error: Error | null;
}

type UseLogin = {
    actions: {
        loginUser: LoginAction
    }
}

export const useLogin = (): UseLogin => {
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