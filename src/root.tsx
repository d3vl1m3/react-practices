import { Link, Navigate, Outlet } from "react-router-dom";
import { useLoginGuard } from './hooks/useLoginGuard/useLoginGuard';
import { useUserStateContext } from './contexts/user/user.context';
import { LoginContainer } from './components/login/LoginContainer';
import { routes } from './utils/routes';


// Usage in Root component
export default function Root() {
  const {
    shouldRedirectToLogin,
    isLoggedIn,
  } = useLoginGuard()


  const { accountId } = useUserStateContext();

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200 min-h-screen py-4">
        <Link to={routes.site.home} className="text-xl font-bold p-4">Ensek</Link>
        <nav>
        <ul className="p-4">
          {isLoggedIn && accountId ? (
            <>
              <li className="mb-2">
              <Link to={
                  routes.site.meterReadings(accountId)
                } className="text-blue-500 hover:text-blue-700">Meter Readings</Link>
              </li>
              <li className="mb-2">
              <Link to={
                  routes.site.newMeterReading(accountId)
                } className="text-blue-500 hover:text-blue-700">New Reading</Link>
              </li>
            </>
          ) : null}
        </ul>
        {/* Add the Login component here */}
        <LoginContainer />
        </nav>
      </div>
      <div className="w-full bg-white p-4" style={{maxWidth: '960px'}}>
        { shouldRedirectToLogin ? <Navigate to={routes.site.home} /> : <Outlet/> }
      </div>
    </div>
  )
;
}