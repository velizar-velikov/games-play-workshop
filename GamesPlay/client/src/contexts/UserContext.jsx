import { createContext, useContext, useState } from 'react';

export const UserContext = createContext({
    userId: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
});

export function UserContextProvider(props) {
    const [currentUser, setCurrentUser] = useState({});

    const changeAuthState = (state) => {
        // TODO: Quick fix, fix by implementing persisted authState
        if (state.accessToken) {
            localStorage.setItem('accessToken', state.accessToken);
        } else {
            localStorage.removeItem('accessToken');
        }
        setCurrentUser(state);
    };

    const contextData = {
        email: currentUser.email,
        accessToken: currentUser.accessToken,
        isAuthenticated: Boolean(currentUser.email),
        changeAuthState,
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
