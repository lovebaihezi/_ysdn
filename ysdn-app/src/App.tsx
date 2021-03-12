import React, { useState, useCallback, useEffect } from 'react';

import { Switch, BrowserRouter } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';
import { Auth as UserAuth, useAuth } from './auth';
import { objectId, user } from './interface';
import { Bar, Index, Login, NotFound } from './routes';
import useAutoLogin from './tools/auto-login';

// TODO : features : [AutoLogin,Login,Register,]
/* 
    TODO : 
        Tests : [AutoLogin,Login,Register,Hooks : [useError ,useFetch ,useAjaxJson] "./tools/hook/useError/index.spec.ts" "./tools/hook/useFetch/index.spec.ts" , "./tools/hook/useFetch/index.spec.ts"
*/

//TODO : change to AntDesign ,remove material-ui

function App() {
    const [user, setAuth] = useState<false | (user & objectId)>(useAuth());
    const [state, autoLogin] = useAutoLogin(localStorage.getItem('authID'));
    const SetAuth = useCallback((user: user & objectId) => setAuth(user), [
        setAuth,
    ]);
    useEffect(() => {}, []);
    return (
        <>
            <UserAuth.Provider value={user}>
                <BrowserRouter basename="/">
                    <Bar />
                    <Switch>
                        <Index />
                        <NotFound />
                        <Login setAuth={setAuth} />
                    </Switch>
                </BrowserRouter>
            </UserAuth.Provider>
        </>
    );
}

export default App;
