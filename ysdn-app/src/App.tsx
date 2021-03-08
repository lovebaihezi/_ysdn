import React from 'react';

import { Switch, BrowserRouter } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';
// import './index.css';
import { Auth as UserAuth, useAuth } from './auth';
import { objectId, user } from './interface';
import { Index, NotFound } from './routes';
import useAutoLogin from './tools/auto-login';

// TODO : features : [AutoLogin,Login,Register,]
/* 
    TODO : 
        Tests : [AutoLogin,Login,Register,Hooks : [useError ,useFetch ,useAjaxJson] "./tools/hook/useError/index.spec.ts" "./tools/hook/useFetch/index.spec.ts" , "./tools/hook/useFetch/index.spec.ts"
*/

//TODO : change to AntDesign ,remove material-ui

function App() {
    const [user, setAuth] = React.useState<false | (user & objectId)>(
        useAuth()
    );
    const [state, autoLogin] = useAutoLogin(localStorage.getItem('authID'));
    function SetAuth(user: user & objectId) {
        setAuth(user);
    }
    React.useEffect(() => {}, []);
    return (
        <>
            <UserAuth.Provider value={user}>
                <BrowserRouter basename="/">
                    <Switch>
                        {Index}
                        {NotFound}
                    </Switch>
                </BrowserRouter>
            </UserAuth.Provider>
        </>
    );
}

export default App;
