import { Link } from 'react-router-dom';

export default function ActionBtns({ gameId }) {
    return (
        <div className="buttons">
            <Link to={`/games/${gameId}/edit`} className="button">
                Edit
            </Link>
            <Link to={`/games/${gameId}/delete`} className="button">
                Delete
            </Link>
        </div>
    );
}
