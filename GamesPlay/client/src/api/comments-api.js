import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    all: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    create: '/data/comments',
};

async function getCommentsForGame(gameId) {
    return requester.get(host + endpoints.all(gameId));
}

async function create(gameId, comment) {
    return requester.post(host + endpoints.create, { gameId, comment });
}

const commentsAPI = {
    getCommentsForGame,
    create,
};

export default commentsAPI;
