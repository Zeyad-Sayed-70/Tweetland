
export function register_func(userData, setCookie) {
    const { token } = userData;
    localStorage.setItem('token', token);
    setCookie('auth-token', token);
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}