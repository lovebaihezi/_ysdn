import { useContext, createContext } from 'react';
import { AjaxJson } from '../interface';
export const UserDetail = createContext<
    [AjaxJson.userDetail | null, (P: AjaxJson.userDetail) => void]
>([null, (P) => {}]);
export const useUserDetail = () => useContext(UserDetail);

export const Token = createContext<[false | string, (s: string) => void]>([
    ((id: string | null) => id ?? false)(localStorage.getItem('id')),
    (s: string) => {},
]);

export const useToken = () => useContext(Token);

export const baseurl = 'http://104.225.144.145:5050';
