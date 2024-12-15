import { useEffect, useState } from 'react';
import gamesAPI from '../api/games-api.js';

export function useGetAllGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function loadGames() {
            const games = await gamesAPI.getAll();
            setGames(games);
        }
        loadGames();
    }, []);

    return [games, setGames];
}

export function useGetLatestGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function loadLatestGames() {
            const games = await gamesAPI.getNew();
            setGames(games);
        }
        loadLatestGames();
    }, []);

    return [games, setGames];
}

export function useGetOneGame(gameId) {
    const [game, setGame] = useState({});

    useEffect(() => {
        async function loadGame() {
            const game = await gamesAPI.getOne(gameId);
            setGame(game);
        }

        loadGame();
    }, [gameId]);

    return [game, setGame];
}
