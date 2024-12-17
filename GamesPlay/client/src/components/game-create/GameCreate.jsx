import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useform.js';
import gamesAPI from '../../api/games-api.js';
import { useCreateGame } from '../../hooks/useGames.js';

const intitialValues = {
    title: '',
    category: '',
    maxLevel: '',
    imageUrl: '',
    summary: '',
};

export default function GameCreate() {
    const createGame = useCreateGame();
    const navigate = useNavigate();
    async function createHandler(values) {
        try {
            await createGame(values);
            navigate('/');
        } catch (err) {
            // TODO: set error state and display error
            console.log(err);
        }
    }

    const { values, changeHandler, submitHandler } = useForm(intitialValues, createHandler);

    return (
        <section id="create-page" className="auth">
            <form onSubmit={submitHandler} id="create">
                <div className="container">
                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        value={values.title}
                        onChange={changeHandler}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter game title..."
                    />

                    <label htmlFor="category">Category:</label>
                    <input
                        value={values.category}
                        onChange={changeHandler}
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter game category..."
                    />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        value={values.maxLevel}
                        onChange={changeHandler}
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min="1"
                        placeholder="1"
                    />

                    <label htmlFor="game-img">Image:</label>
                    <input
                        value={values.imageUrl}
                        onChange={changeHandler}
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                    />

                    <label htmlFor="summary">Summary:</label>
                    <textarea value={values.summary} onChange={changeHandler} name="summary" id="summary"></textarea>
                    <input className="btn submit" type="submit" value="Create Game" />
                </div>
            </form>
        </section>
    );
}
