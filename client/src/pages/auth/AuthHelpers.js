export const isAuthenticated = () => {
    if(typeof window === 'undefined') return false;
    if(localStorage.getItem('user')) return JSON.parse(localStorage.getItem('user'));
    return false;
}

export const signOut = (next) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('user');
        next();
    }
}

