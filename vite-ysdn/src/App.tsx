import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
    const value: [
        AjaxJson.userDetail | null,
        (P: AjaxJson.userDetail) => void,
    ] = [userDetail, S];
    const f = async (token: string) => {
        const res = await fetch(baseurl + '/user/tokenLogin', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ id: token }),
        });
        const json: AjaxJson.userDetail = await res.json();
        console.log(json);
        if (check(json)) {
            setDetail(json);
        }
    };
    useEffect(() => {
        // console.log('context refresh!');
        const token = localStorage.getItem('id');
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
    return <UserDetail.Provider value={value}>{children}</UserDetail.Provider>;
};

const Browser = () => (
    <BrowserRouter>
        <Pages />
    </BrowserRouter>
);

function App() {
    return <Context>{Browser()}</Context>;
}

export default App;
