import { useContext, createContext } from 'react';
import { AjaxJson } from '../interface';
export const Auth = createContext<false | string>(
    ((id: string | null) => id ?? false)(localStorage.getItem('id')),
);
export const useAuth = () => useContext(Auth);

export const Token = createContext<false | string>(
    ((token: string | null) => token ?? false)(localStorage.getItem('token')),
);

export const useToken = () => useContext(Token);

export const baseurl = 'http://localhost:5050';
