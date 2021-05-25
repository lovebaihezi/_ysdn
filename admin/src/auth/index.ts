import { createContext, useContext } from 'react';

const AuthContext = createContext<[string | null, (s: string | null) => void]>([
    null,
    (s) => {},
]);

export const Auth = AuthContext.Provider;

export const useAuth = () => useContext(AuthContext);

export const baseurl = 'http://localhost:5050';
