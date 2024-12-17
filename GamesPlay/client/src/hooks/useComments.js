import { useEffect, useState } from 'react';
import commentsAPI from '../api/comments-api.js';

export function useGetComments(gameId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function loadComments() {
            const comments = await commentsAPI.getCommentsForGame(gameId);
            setComments(comments);
        }
        loadComments();
    }, [gameId]);

    return [comments, setComments];
}

export function useCreateComment() {
    const createHandler = async (gameId, comment) => {
        const newComment = await commentsAPI.create(gameId, comment);
        return newComment;
    };

    return createHandler;
}
