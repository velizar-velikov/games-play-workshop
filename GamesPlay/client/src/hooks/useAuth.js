import { useUserContext } from '../contexts/UserContext.jsx';
import authAPI from '../api/auth-api.js';

export function useRegister() {
    const { changeAuthState } = useUserContext();

    const registerHandler = async (email, password) => {
        const result = await authAPI.register(email, password);
        changeAuthState({
            _id: result._id,
            email: result.email,
            accessToken: result.accessToken,
        });
        return result;
    };

    return registerHandler;
}

export function useLogin() {
    const { changeAuthState } = useUserContext();

    const loginHandler = async (email, password) => {
        const result = await authAPI.login(email, password);
        changeAuthState({
            _id: result._id,
            email: result.email,
            accessToken: result.accessToken,
        });
        return result;
    };

    return loginHandler;
}

export function useLogout() {
    const { logout: localLogout } = useUserContext();

    const logoutHandler = async () => {
        // server logout
        await authAPI.logout();
        // logout from state
        localLogout();
    };

    return logoutHandler;
}
