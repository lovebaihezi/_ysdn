import * as React from 'react';
import { user } from '../interface';
export const LoginState = React.createContext<false | user>(
    ((P: user): false | user => (P ? P : false))(
        JSON.parse(
            ((P: string) => (P && P !== 'undefined' ? P : '{}'))(
                sessionStorage.getItem('user') ?? ''
            ) ?? '{}'
        )
    )
);
export const useLoginState = () => React.useContext<false | user>(LoginState);
