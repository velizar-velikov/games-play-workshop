import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext.jsx';

// this is a different way of using a route guard
export default function RouteGuard({ children }) {
    const { isAuthenticated } = useUserContext();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}
