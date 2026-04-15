// login.js
export function login(userName, password) {
    if (userName === 'admin' && password === '123') {
        return true;
    }
    return false;
}

export function logout() {
    return true;
}