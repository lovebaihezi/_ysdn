import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { baseurl, Token, UserDetail } from './auth';
import Pages from './pages/';

import './App.css';
import 'antd/dist/antd.css';
import { FC } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AjaxJson } from './interface';
import check from './tools/check';

const Context: FC = ({ children }) => {
    const [userDetail, setDetail] = useState<AjaxJson.userDetail | null>(null);
    const S = (t: AjaxJson.userDetail | null) => setDetail(t);
    const value: [
        AjaxJson.userDetail | null,
        (P: AjaxJson.userDetail | null) => void,
    ] = [userDetail, S];
    const f = async (token: string) => {
        const res = await fetch(baseurl + '/user/tokenLogin', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ id: token }),
        });
        const json = await res.json();
        if (json.message && json.statusCode) {
            throw new Error(json.message);
        } else {
            setDetail(json as AjaxJson.userDetail);
        }
    };
    +useEffect(() => {
        const token = localStorage.getItem('id');
        if (token !== null) {
            f(token).then(() => {});
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
