import requester from './request.js';

const host = 'http://localhost:3030';

const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    byId: (userId) => `/users/${userId}`,
};

async function register(email, password) {
    return requester.post(host + endpoints.register, { email, password });
}

async function login(email, password) {
    return requester.post(host + endpoints.login, { email, password });
}

async function logout() {
    return requester.get(host + endpoints.logout);
}

const authAPI = {
    register,
    login,
    logout,
};

export default authAPI;
