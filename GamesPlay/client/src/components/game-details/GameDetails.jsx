import { Link, useParams } from 'react-router-dom';
import { useGetOneGame } from '../../hooks/useGames.js';
import { useCreateComment, useGetComments } from '../../hooks/useComments.js';
import { useForm } from '../../hooks/useform.js';
import { useUserContext } from '../../contexts/UserContext.jsx';
import { useGetUser } from '../../hooks/useAuth.js';

const initialValues = {
    comment: '',
};

export default function GameDetails() {
    const { gameId } = useParams();

    const [game, setGame] = useGetOneGame(gameId);
    const [comments, setComments] = useGetComments(gameId);

    const { userId, isAuthenticated } = useUserContext();

    const isOwner = userId == game._ownerId;
    const canComment = isAuthenticated && !isOwner;

    const createComment = useCreateComment();

    const commentSubmitHandler = async ({ comment }) => {
        try {
            const newComment = await createComment(gameId, comment);
            setComments((oldComments) => [...oldComments, newComment]);
        } catch (error) {
            console.log(error);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(initialValues, commentSubmitHandler);

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
                                <Comment key={comment._id} {...comment} />
                            ))}
                        </ul>
                    )}
                </div>

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/games/${game._id}/edit`} className="button">
                            Edit
                        </Link>
                        <Link to={`/games/${game._id}/delete`} className="button">
                            Delete
                        </Link>
                    </div>
                )}
            </div>

            {canComment && (
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form onSubmit={submitHandler} className="form">
                        <textarea
                            name="comment"
                            placeholder="Comment......"
                            value={values.comment}
                            onChange={changeHandler}
                        ></textarea>
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>
            )}
        </section>
    );
}

function Comment({ _ownerId, comment }) {
    const [user] = useGetUser(_ownerId);

    return (
        <li className="comment">
            <p>
                {user.email}: {comment}
            </p>
        </li>
    );
}
