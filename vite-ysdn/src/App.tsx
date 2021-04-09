import React, { useCallback, useEffect, useState } from 'react';
import { baseurl, Token, UserDetail } from './auth';
import Pages from './pages/';

import './App.css';
import 'antd/dist/antd.css';
import { FC } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AjaxJson } from './interface';
import { message, Result } from 'antd';
import check from './tools/check';

// todo : check user link!!! auth => nickname!

const Context: FC = ({ children }) => {
    const [userDetail, setDetail] = useState<AjaxJson.userDetail | null>(null);
    const S = useCallback((t: AjaxJson.userDetail) => setDetail(t), []);
    const f = async (token: string) => {
        const res = await fetch(baseurl + '/tokenLogin', {
            method: 'POST',
            // headers: new Headers({ token: token }),
            body: token,
        });
        const json: AjaxJson.userDetail = await res.json();
        if (check(json)) {
            setDetail(json);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            f(token)
                .then(() => {
                    message.success('auto login success!');
                })
                .catch((e) => {});
        } else {
            message.info({
                content: 'login to get better experience!',
            });
        }
    }, []);
    return (
        <UserDetail.Provider value={[userDetail, S]}>
            {children}
        </UserDetail.Provider>
    );
};

function App() {
    return (
        <Context>
            <BrowserRouter>
                <Pages />
            </BrowserRouter>
        </Context>
    );
}

export default App;
