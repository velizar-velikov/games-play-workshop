import { useContext } from 'react';
import UserContext from '../contexts/UserContext.js';
import authAPI from '../api/auth-api.js';

export function useRegister() {
    const { changeAuthState } = useContext(UserContext);

    const registerHandler = async (email, password) => {
        const result = await authAPI.register(email, password);
        changeAuthState({ _id: result._id, email: result.email, accessToken: result.accessToken });
        return result;
    };

    return registerHandler;
}

export function useLogin() {
    const { changeAuthState } = useContext(UserContext);

    const loginHandler = async (email, password) => {
        const result = await authAPI.login(email, password);
        changeAuthState({ _id: result._id, email: result.email, accessToken: result.accessToken });
        return result;
    };

    return loginHandler;
}

export function useLogout() {
    const { changeAuthState } = useContext(UserContext);

    const logoutHandler = async () => {
        const result = await authAPI.logout();
        changeAuthState({});
        return result;
    };

    return logoutHandler;
}
