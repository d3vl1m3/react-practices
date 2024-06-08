import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStateContext } from '../../contexts/user/user.context';
import { routes } from '../../utils/routes';

export const useLoginGuard = () => {
    const navigate = useNavigate();
    const { isLoggedIn, accountId } = useUserStateContext();
    const location = useLocation();
    const isOnLoginPage = location.pathname === routes.site.home;
  
    useEffect(() => {
      if (!isLoggedIn && !isOnLoginPage && accountId === null) {
        navigate(routes.site.home);
      }
    }, [isLoggedIn, navigate, isOnLoginPage, accountId]);
  
    return {
      isLoggedIn,
      shouldRedirectToLogin: !isLoggedIn && !isOnLoginPage,
    };
  }