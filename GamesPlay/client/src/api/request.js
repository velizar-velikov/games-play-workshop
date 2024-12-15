async function request(method, url, data) {
    const options = {
        method,
        headers: {},
    };

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        if (response.status == 204) {
            return response;
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}

const requester = {
    get: (url) => request('GET', url),
    post: (url, data) => request('POST', url, data),
    put: (url, data) => request('PUT', url, data),
    del: (url) => request('DELETE', url),
};

export default requester;
