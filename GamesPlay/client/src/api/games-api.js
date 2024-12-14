import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    all: '/data/games?sortBy=_createdOn%20desc',
    new: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    create: '/data/games',
    one: (id) => `/data/games/${id}`,
};

async function getAll() {
    return requester.get(host + endpoints.all);
}

async function getNew() {
    return requester.get(host + endpoints.new);
}

async function getOne(gameId) {
    return requester.get(host + endpoints.one(gameId));
}

async function create(data) {
    return requester.post(host + endpoints.create, data);
}

async function updateById(gameId, data) {
    return requester.put(host + endpoints.one(gameId), data);
}

async function deleteById(gameId) {
    return requester.del(host + endpoints.one(gameId));
}

const gamesAPI = {
    getAll,
    getNew,
    getOne,
    create,
    updateById,
    deleteById,
};

export default gamesAPI;
