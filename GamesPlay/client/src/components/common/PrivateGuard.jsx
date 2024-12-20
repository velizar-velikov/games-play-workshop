import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext.jsx';

export default function PrivateGuard() {
    const { isAuthenticated } = useUserContext();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
