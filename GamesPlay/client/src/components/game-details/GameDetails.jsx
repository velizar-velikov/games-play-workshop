import { useEffect, useState } from 'react';
import gamesAPI from '../../api/games-api.js';
import { Link, useParams } from 'react-router-dom';
import commentsAPI from '../../api/comments-api.js';

export default function GameDetails() {
    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);
    const { gameId } = useParams();

    useEffect(() => {
        async function loadGame() {
            const game = await gamesAPI.getOne(gameId);
            setGame(game);
        }
        async function loadComments() {
            const comments = await commentsAPI.getCommentsForGame(gameId);
            setComments(comments);
        }

        loadGame();
        loadComments();
    }, []);

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

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    {/* <!-- list all comments for current game (If any) --> */}
                    {/* <!-- Display paragraph: If there are no games in the database --> */}
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

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                <div className="buttons">
                    <Link to={`/games/${game._id}/edit`} className="button">
                        Edit
                    </Link>
                    <Link to={`/games/${game._id}/delete`} className="button">
                        Delete
                    </Link>
                </div>
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>
        </section>
    );
}

function Comment({ text }) {
    return (
        <li className="comment">
            <p>Content: {text}</p>
        </li>
    );
}
