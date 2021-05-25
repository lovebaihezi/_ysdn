import { createContext, useContext } from 'react';

const AuthContext = createContext<string | null>(null);

export const Auth = AuthContext.Provider;

export const useAuth = () => useContext(AuthContext);
