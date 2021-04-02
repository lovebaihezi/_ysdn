import React, { useCallback, useEffect, useState } from 'react';
import { Token } from './auth';
import Pages from './pages/';

import './App.css';
import 'antd/dist/antd.css';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

// type x = { value: [auth: string, setAuth: string] };

const Context: FC = ({ children }) => {
    const [token, s] = useState<string | false>(false);
    const S = useCallback((t: string) => s(t), []);
    useEffect(() => {
        console.log("i am render!")
    })
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            S(token);
        }
    }, []);
    return <Token.Provider value={[token, S]}>{children}</Token.Provider>;
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
