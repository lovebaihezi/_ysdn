import * as React from 'react';
import { AjaxJson } from '../interface';
export const Auth = React.createContext<false | AjaxJson.user>(
    ((P: AjaxJson.user): false | AjaxJson.user => (P ? P : false))(
        JSON.parse(
            ((P: string) => (P && P !== 'undefined' ? P : '{}'))(
                sessionStorage.getItem('AjaxJson.user') ?? '',
            ) ?? '{}',
        ),
    ),
);
export const useAuth = () => React.useContext<false | AjaxJson.user>(Auth);

export const baseurl = 'http://localhost:5050';
