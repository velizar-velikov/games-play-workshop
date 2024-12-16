export function getAccessToken() {
    const authData = JSON.parse(localStorage.getItem('auth'));
    return authData ? authData.accessToken : '';
}
