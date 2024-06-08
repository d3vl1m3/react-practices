import { createContext, useContext } from 'react';
import { UserStateContextValues } from '../../contexts/user/user.provider';


export const UserStateContext = createContext<UserStateContextValues | undefined>(undefined);

export const useUserStateContext = () => {
    const context = useContext(UserStateContext);
    if (context === undefined) {
      throw new Error('useUserStateContext must be inside a UserStateProvider');
    }
  
    return context;
  };