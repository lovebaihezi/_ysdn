import React, { useState, useCallback, useEffect } from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';
import { Auth as UserAuth, useAuth } from './auth';
import { objectId, user } from './interface';
import { Bar, Index, UserServer, NotFound } from './pages';
import useAutoLogin from './tools/auto-login';
import Layout, { Content, Footer } from 'antd/lib/layout/layout';

// TODO : features : [AutoLogin,Login,Register,]

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
                    <Layout>
                        {Bar}
                        <Content style={{ background: 'white' }}>
                            <Switch>
                                {Index}
                                {UserServer({ setAuth })}
                                {NotFound}
                            </Switch>
                        </Content>
                        <Footer style={{ background: 'white' }}></Footer>
                    </Layout>
                </BrowserRouter>
            </UserAuth.Provider>
        </>
    );
}

export default App;
