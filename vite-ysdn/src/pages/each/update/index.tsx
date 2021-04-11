import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import UploadArticle from './article';
import UpdateQA from './QA';
import UpdateVideo from './video';

export default function Update() {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path="/update/article">
                <UploadArticle />
            </Route>
            <Route path="/update/QA">
                <UpdateQA />
            </Route>
            <Route path="/update/video">
                <UpdateVideo />
            </Route>
        </Switch>
    );
}
