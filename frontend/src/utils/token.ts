import { jwtDecode } from 'jwt-decode';

export function addToken(token: string) {
    localStorage.setItem('token', token);
}

export function getToken(): string | null {
    return localStorage.getItem('token');
}

interface DecodedToken {
    username?: string;
}

export function getUsernameFromToken(): string | null {
    const token = getToken();
    if (!token) {
        return null;
    }

    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.username || null;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}
