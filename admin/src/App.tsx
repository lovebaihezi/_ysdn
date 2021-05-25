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

const ContextProvider: <T>(
    props: PropsWithChildren<T>,
    
) => ReactElement<any, any> = ({}) => {

};

function App() {
    const [session, setSession] = useState<string | null>(null);
    return (
        <>
            <CssBaseline />
        </>
    );
}

export default App;
