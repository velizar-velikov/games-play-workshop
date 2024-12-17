import { createContext, useContext } from 'react';
import usePersistedState from '../hooks/usePersistedState.js';

export const UserContext = createContext({
    userId: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
    logout: () => null,
});

export function UserContextProvider(props) {
    const [currentUser, setCurrentUser] = usePersistedState('auth', {});

    const changeAuthState = (state) => {
        setCurrentUser(state);
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const contextData = {
        userId: currentUser?._id,
        email: currentUser?.email,
        accessToken: currentUser?.accessToken,
        isAuthenticated: Boolean(currentUser?.email),
        changeAuthState,
        logout,
    };

    return (
        //prettier-ignore
        <UserContext.Provider value={contextData}>
        {props.children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const userData = useContext(UserContext);
    return userData;
}
