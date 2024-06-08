import {
    ReactNode,
    useMemo,
    useState,
    type Dispatch,
    type FunctionComponent,
    type SetStateAction,
} from 'react';
import { UserStateContext } from './user.context';

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
export type UserStateContextValues = {
    isLoggedIn: boolean;
    userLoggedIn: (
        payload: {
            accountId: string
        }
    ) => void;
    userLoggedOut: () => void;
    accountId: string | null;
}


export const UserStateProvider: FunctionComponent<{ children: ReactNode }> = ({
    children,
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);  
    const [accountId, setAccountId] = useState<string|null>(null);  

    const values = useMemo(() => ({
        isLoggedIn,
        userLoggedIn:  ({
            accountId
        }: {
            accountId: string
        }) => {
            setIsLoggedIn(true)
            setAccountId(accountId)
        },
        userLoggedOut: () => {
            setIsLoggedIn(false)
            setAccountId(null)
        },
        accountId
    }), [isLoggedIn, accountId]);

    return (
        <UserStateContext.Provider value={values}>
            {children}
        </UserStateContext.Provider>
    )
};