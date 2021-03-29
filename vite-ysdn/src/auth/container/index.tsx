import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { AjaxJson } from '../../interface';
import { useToken } from '../index';

// export default function AuthContainer<T = boolean>(
//     getAuth: () => T,
//     checkAuth: (A: T) => boolean = (A) => (A ? true : false),
// ): React.FC<{ Except: JSX.Element } & RouteProps> {
//     return (prop) =>
//         checkAuth(getAuth()) ? (
//             <Route {...prop}>{prop.children}</Route>
//         ) : (
//             prop.Except
//         );
// }

// export const UserContainer = AuthContainer<false | AjaxJson.user>(useAuth);
