import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import UploadArticle from './article';

export default function Update() {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path="/update/article">
                <UploadArticle />
            </Route>
        </Switch>
    );
}
