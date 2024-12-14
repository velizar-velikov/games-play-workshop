import { useEffect, useState } from 'react';
import gamesAPI from '../../api/games-api.js';
import GameItemHome from './game-item-home/GameItemHome.jsx';

export default function Home() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function loadLatestGames() {
            const games = await gamesAPI.getNew();
            setGames(games);
        }
        loadLatestGames();
    }, []);

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>

                {games.length == 0 ? (
                    <p className="no-articles">No games yet</p>
                ) : (
                    games.map((game) => <GameItemHome key={game._id} {...game} />)
                )}
            </div>
        </section>
    );
}
