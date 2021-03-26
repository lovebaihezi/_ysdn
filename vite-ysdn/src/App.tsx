import React, { useState, useCallback, useEffect } from 'react';

import { Switch, BrowserRouter } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';
import { Auth as UserAuth, useAuth } from './auth';
import { AjaxJson } from './interface';
import { Bar, Index, UserServer, NotFound } from './pages';
// import useAutoLogin from './tools/auto-login';
import Layout, { Content, Footer } from 'antd/lib/layout/layout';

// TODO : [AutoLogin,Login,Register]

// TODO : [Each USER And My Self,TAGS,Videos Page,Articles Page,Q.As Page]

// TODO : DRY your Code to accept all changes

function App() {
    const [user, setAuth] = useState<false | AjaxJson.user>(useAuth());
    // const [state, autoLogin] = useAutoLogin(localStorage.getItem('authID'));
    const SetAuth = useCallback((user: AjaxJson.user) => setAuth(user), [
        setAuth,
    ]);
    useEffect(() => {
        // autoLogin();
    }, []);
    return (
        <>
            <UserAuth.Provider value={user}>
                <BrowserRouter basename="/">
                    <Layout>
                        {Bar}
                        <Content style={{ background: 'white' }}>
                            <Switch>
                                {Index}
                                {UserServer(SetAuth)}
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
