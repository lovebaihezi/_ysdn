import React, {
    useState,
    FC,
    Context,
    ReactElement,
    PropsWithChildren,
} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { Auth } from './auth';
import Login from './login';
import Panel from './panel';

function App() {
    const [session, setSession] = useState<string | null>(null);
    return (
        <>
            <CssBaseline />
            <Auth value={[session, (s) => setSession(s)]}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Route exact path="/panel">
                            <Panel />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </Auth>
        </>
    );
}

export default App;
