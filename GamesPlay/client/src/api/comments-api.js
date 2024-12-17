import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    all: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    comments: '/data/comments',
};

async function getCommentsForGame(gameId) {
    const params = new URLSearchParams({
        where: `gameId="${gameId}"`,
        load: `author=_ownerId:users`,
    });
    return requester.get(`${host}${endpoints.comments}?${params.toString()}`);
}

async function create(gameId, comment) {
    return requester.post(host + endpoints.comments, { gameId, comment });
}

const commentsAPI = {
    getCommentsForGame,
    create,
};

export default commentsAPI;
