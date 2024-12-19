import { useEffect, useReducer } from 'react';
import commentsAPI from '../api/comments-api.js';

function commentsReducer(state, action) {
    switch (action.type) {
        case 'GET_ALL':
            return action.payload.slice();
        case 'ADD_COMMENT':
            return [...state, action.payload];
        default:
            return state;
    }
}

export function useGetComments(gameId) {
    const [comments, dispatch] = useReducer(commentsReducer, []);

    useEffect(() => {
        async function loadComments() {
            const result = await commentsAPI.getCommentsForGame(gameId);
            dispatch({ type: 'GET_ALL', payload: result });
        }
        loadComments();
    }, [gameId]);

    return [comments, dispatch];
}

export function useCreateComment() {
    const createHandler = async (gameId, comment) => {
        const newComment = await commentsAPI.create(gameId, comment);
        return newComment;
    };

    return createHandler;
}
