import * as React from 'react';
import { objectId, user } from '../interface';
export const Auth = React.createContext<false | (user & objectId)>(
    ((P: user & objectId): false | (user & objectId) => (P ? P : false))(
        JSON.parse(
            ((P: string) => (P && P !== 'undefined' ? P : '{}'))(
                sessionStorage.getItem('user') ?? ''
            ) ?? '{}'
        )
    )
);
export const useAuth = () => React.useContext<false | (user & objectId)>(Auth);
