import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import gamesAPI from '../../api/games-api.js';
import { useForm } from '../../hooks/useform.js';
import { useEditGame, useGetOneGame } from '../../hooks/useGames.js';

const initialValues = {
    title: '',
    category: '',
    maxLevel: '',
    imageUrl: '',
    summary: '',
};

export default function GameEdit() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game] = useGetOneGame(gameId);
    const editGame = useEditGame();

    const editSubmitHandler = async (values) => {
        try {
            await editGame(gameId, values);
            navigate(`/games/${gameId}/details`);
        } catch (error) {
            console.log(error.message);
        }
    };

    const { values, changeHandler, submitHandler } = useForm(Object.assign(initialValues, game), editSubmitHandler);

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={submitHandler}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value={values.title} onChange={changeHandler} />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={values.category} onChange={changeHandler} />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value={values.maxLevel} onChange={changeHandler} />

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={values.imageUrl} onChange={changeHandler} />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value={values.summary} onChange={changeHandler}></textarea>
                    <input className="btn submit" type="submit" value="Edit Game" />
                </div>
            </form>
        </section>
    );
}
