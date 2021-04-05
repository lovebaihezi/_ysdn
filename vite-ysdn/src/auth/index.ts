import { useContext, createContext } from 'react';
export const Auth = createContext<[false | string, (s: string) => void]>([
    ((id: string | null) => id ?? false)(localStorage.getItem('id')),
    (s: string) => {},
]);
export const useAuth = () => useContext(Auth);

export const Token = createContext<[false | string, (s: string) => void]>([
    ((id: string | null) => id ?? false)(localStorage.getItem('id')),
    (s: string) => {},
]);

export const useToken = () => useContext(Token);

export const baseurl = 'http://104.225.144.145:5050';
