import { Link } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext.jsx';
import withAuth from '../../HOC/withAuth.jsx';

function Header({ user }) {
    // const { isAuthenticated } = useUserContext();
    const { isAuthenticated } = user;

    return (
        <header>
            <h1>
                <Link className="home" to="/">
                    GamesPlay
                </Link>
            </h1>
            <nav>
                <Link to="/games">All games</Link>
                {isAuthenticated ? (
                    <div id="user">
                        <Link to="/games/create">Create Game</Link>
                        <Link to="/logout">Logout</Link>
                    </div>
                ) : (
                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default withAuth(Header);
