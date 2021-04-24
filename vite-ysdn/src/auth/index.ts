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
// use env to set baseurl!!!
export const baseurl = 'http://localhost:5050';
// export const baseurl = 'http://localhost:5050';