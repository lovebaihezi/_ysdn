import { CssBaseline } from '@material-ui/core';
import React from 'react';

import { Switch } from 'react-router-dom';

import './App.css';
import { Auth as UserAuth, useAuth } from './auth';
import { objectId, user } from './interface';
import { Routes } from './routes';

function App() {
    const [user, setAuth] = React.useState<false | (user & objectId)>(
        useAuth()
    );
    return (
        <>
            <CssBaseline />
            <UserAuth.Provider value={user}>
                <Switch>{Routes}</Switch>
            </UserAuth.Provider>
        </>
    );
}

export default App;
