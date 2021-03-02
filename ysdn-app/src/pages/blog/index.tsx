import {} from '@material-ui/core';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Uploader } from './upload-article';

//TODO : redesign Database !!!

export default function BlogManage() {
    return (
        <BrowserRouter basename="blogManage">
            <Switch>
                <Route exact path="/upload-article">
                    <Uploader />
                </Route>
                <Route exact path="/all-my-article"></Route>
            </Switch>
        </BrowserRouter>
    );
}
