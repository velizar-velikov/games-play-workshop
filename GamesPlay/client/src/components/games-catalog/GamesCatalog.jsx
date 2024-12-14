import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gamesAPI from '../../api/games-api.js';
import GameItem from './game-item/GameItem.jsx';

export default function GamesCatalog() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function loadGames() {
            const games = await gamesAPI.getAll();
            setGames(games);
        }
        loadGames();
    }, []);

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length == 0 ? (
                <h3 className="no-articles">No articles yet</h3>
            ) : (
                games.map((game) => <GameItem key={game._id} {...game} />)
            )}
        </section>
    );
}
