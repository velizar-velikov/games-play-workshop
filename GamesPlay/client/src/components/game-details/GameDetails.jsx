import { useParams } from 'react-router-dom';
import { useGetOneGame } from '../../hooks/useGames.js';
import { useGetComments } from '../../hooks/useComments.js';
import { useUserContext } from '../../contexts/UserContext.jsx';
import ActionBtns from './action-btns/ActionBtns.jsx';
import CommentCreate from './comment-create/CommentCreate.jsx';
import CommentItem from './comment-item/CommentItem.jsx';

export default function GameDetails() {
    const { gameId } = useParams();

    const [game, setGame] = useGetOneGame(gameId);
    const [comments, dispatch] = useGetComments(gameId);

    const { userId, email, isAuthenticated } = useUserContext();

    const isOwner = userId == game._ownerId;
    const canComment = isAuthenticated && !isOwner;

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    {comments.length == 0 ? (
                        <p className="no-comment">No comments.</p>
                    ) : (
                        <ul>
                            {comments.map((comment) => (
                                <CommentItem key={comment._id} {...comment} />
                            ))}
                        </ul>
                    )}
                </div>

                {isOwner && <ActionBtns gameId={game._id} />}
            </div>

            {canComment && <CommentCreate gameId={gameId} email={email} dispatch={dispatch} />}
        </section>
    );
}
