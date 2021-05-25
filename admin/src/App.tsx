import React, {
    useState,
    FC,
    Context,
    ReactElement,
    PropsWithChildren,
} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { Container } from '@material-ui/core';

function App() {
    const [session, setSession] = useState<string | null>(null);
    return (
        <>
            <CssBaseline />
            <Container>

            </Container>
        </>
    );
}

export default App;
