import { Link, useNavigate } from 'react-router-dom';
import { useDeleteGame } from '../../../hooks/useGames.js';

export default function ActionBtns({ gameId }) {
    const navigate = useNavigate();
    const deleteGame = useDeleteGame();

    async function deleteGameHandler() {
        try {
            await deleteGame(gameId);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="buttons">
            <Link to={`/games/${gameId}/edit`} className="button">
                Edit
            </Link>
            <Link onClick={deleteGameHandler} className="button">
                Delete
            </Link>
        </div>
    );
}
