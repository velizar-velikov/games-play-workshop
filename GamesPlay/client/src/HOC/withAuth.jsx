import { useUserContext } from '../contexts/UserContext.jsx';

export default function withAuth(Component) {
    const ComponentWrapper = (props) => {
        const userContext = useUserContext();
        return <Component {...props} user={userContext} />;
    };

    return ComponentWrapper;
}
