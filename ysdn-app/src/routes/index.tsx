import React from 'react';
import { Route } from 'react-router-dom';
import NotFoundPage from './forbidden/404';
import IndexPage from './index-page';
const Routes: Array<JSX.Element> = [
    <Route exact path="/">
        <IndexPage />
    </Route>,
];
Routes.push(
    <Route exact to="/*">
        <NotFoundPage />
    </Route>
);
export default Routes;

export const Index = (
    <Route exact path="/">
        <IndexPage />
    </Route>
);

export const NotFound = (
    <Route exact to="/*">
        <NotFoundPage />
    </Route>
);
