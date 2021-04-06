import React, { useCallback, useEffect, useState } from 'react';
import { Token, UserDetail } from './auth';
import Pages from './pages/';

import './App.css';
import 'antd/dist/antd.css';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AjaxJson } from './interface';
import { message, Result } from 'antd';

function check(S: AjaxJson.userDetail) {
    const keys = [
        'username',
        'nickname',
        'avatarUrl',
        'notifications',
        'follow',
        'follower',
        'articles',
        'videos',
        'answers',
        'questions',
        'activities',
        'marks',
        'liked',
    ];
    const x = Object.keys(S);
    if (x.length !== keys.length) {
        return false;
    } else {
        return x.every((key) => keys.includes(key));
    }
}

const Context: FC = ({ children }) => {
    const [userDetail, setDetail] = useState<AjaxJson.userDetail | null>(null);
    const S = useCallback((t: AjaxJson.userDetail) => setDetail(t), []);
    useEffect(() => {
        console.log('i am render!');
    });
    const f = async (token: string) => {
        const res = await fetch('/login', {
            method: 'POST',
            headers: new Headers({ token: token }),
        });
        const json: AjaxJson.userDetail = await res.json();
        if (check(json)) {
            setDetail(json);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            f(token).catch((e) => {
                message.error(e.toString());
            });
        } else {
            message.info({
                content: 'login to get better experience!',
                style: {
                    marginTop: 80,
                },
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
            <BrowserRouter basename="/">
                <Pages />
            </BrowserRouter>
        </Context>
    );
}

export default App;
