import { useNavigate } from 'react-router-dom'
import { useUserStateContext } from '../../contexts/user/user.context'
import { useLogin } from '../../domainHooks/useLogin/useLogin'
import { Login } from './Login'
import { routes } from '../../utils/routes'

export const LoginContainer = () => {
    const { actions } = useLogin()
    const {isLoggedIn, userLoggedIn, userLoggedOut}  = useUserStateContext()
    const navigate = useNavigate();
    
    const navigateToMeterReadingsPage = (accountId: string) => {
        navigate(
            routes.site.meterReadings(accountId)
        );
    }

    return <Login 
        isLoggedIn={isLoggedIn}
        userLoggedIn={userLoggedIn}
        userLoggedOut={userLoggedOut}
        loginUser={actions.loginUser.apply}
        loginError={actions.loginUser.error}
        navigateToMeterReadingsPage={navigateToMeterReadingsPage}
    />


}