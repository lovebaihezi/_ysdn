import React, { useState, useCallback, useEffect } from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';
import QA from './pages/QA';
import { Divider } from 'antd';
import User from './pages/User';
import Videos from './pages/Videos';
import { AjaxJson } from './interface';
import Articles from './pages/Articles';
import Monographic from './pages/Monographic';
import useAutoLogin from './tools/auto-login';
import { Bar, Index, UserServer, NotFound } from './pages';
import Layout, { Content, Footer } from 'antd/lib/layout/layout';
import { Auth as UserAuth, Token, useAuth, useToken } from './auth';

// TODO : [AutoLogin,Login,Register]

// TODO : [Each USER And My Self,TAGS,Videos Page,Articles Page,Q.As Page]

// TODO : DRY your Code to accept all changes

function App() {
    const [tocken, setToken] = useState<false | string>(useToken());
    const [user, autoLogin] = useAutoLogin(useToken());
    const SetToken = useCallback((user: string) => setToken(user), [setToken]);
    useEffect(() => {
        if (tocken) {
            autoLogin();
        }
    }, [tocken]);
    return (
        <>
            <Token.Provider value={tocken}>
                <BrowserRouter basename="/">
                    <Layout>
                        {Bar}
                        <Content style={{ background: 'white' }}>
                            <Divider />
                            <Switch>
                                {Index}
                                {UserServer(SetToken)}
                                <Route
                                    path="/user/:username/"
                                    component={User}
                                />
                                <Route
                                    path="/article/:id"
                                    component={Articles}
                                />
                                <Route path="/video/:id" component={Videos} />
                                <Route
                                    path="/mongraphic/:id"
                                    component={Monographic}
                                />
                                <Route path="/QA/:id" component={QA} />
                                {NotFound}
                            </Switch>
                        </Content>
                        <Footer style={{ background: 'white' }}></Footer>
                    </Layout>
                </BrowserRouter>
            </Token.Provider>
        </>
    );
}

export default App;
