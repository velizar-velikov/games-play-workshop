import { useParams } from 'react-router-dom';
import { useGetOneGame } from '../../hooks/useGames.js';
import { useCreateComment, useGetComments } from '../../hooks/useComments.js';
import { useForm } from '../../hooks/useform.js';
import { useUserContext } from '../../contexts/UserContext.jsx';
import ActionBtns from './action-btns/ActionBtns.jsx';
import CommentCreate from './comment-create/CommentCreate.jsx';
import CommentItem from './comment-item/CommentItem.jsx';

const initialValues = {
    comment: '',
};

export default function GameDetails() {
    const { gameId } = useParams();

    const [game, setGame] = useGetOneGame(gameId);
    const [comments, setComments] = useGetComments(gameId);

    const { userId, email, isAuthenticated } = useUserContext();

    const isOwner = userId == game._ownerId;
    const canComment = isAuthenticated && !isOwner;

    const createComment = useCreateComment();

    const commentSubmitHandler = async ({ comment }) => {
        try {
            const newComment = await createComment(gameId, comment);
            newComment.author = { email };
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
                                <CommentItem key={comment._id} {...comment} />
                            ))}
                        </ul>
                    )}
                </div>

                {isOwner && <ActionBtns gameId={game._id} />}
            </div>

            {canComment && <CommentCreate values={values} changeHandler={changeHandler} submitHandler={submitHandler} />}
        </section>
    );
}
