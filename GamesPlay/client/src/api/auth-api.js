import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    register: '/users/register',
    login: '/users/login',
};

async function register(email, password) {
    return requester.post(host + endpoints.register, { email, password });
}

async function login(email, password) {
    return requester.post(host + endpoints.login, { email, password });
}

const userAPI = {
    register,
    login,
};

export default userAPI;
