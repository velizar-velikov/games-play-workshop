import GameItem from './game-item/GameItem.jsx';
import { useGetAllGames } from '../../hooks/useGames.js';

export default function GamesCatalog() {
    const [games, setGames] = useGetAllGames();

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
