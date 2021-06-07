/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// core components
import Admin from 'layouts/Admin.js';
// import RTL from 'layouts/RTL.js';

import 'assets/css/material-dashboard-react.css?v=1.10.0';
import Login from 'views/Login';

const Auth = React.createContext([null, () => {}]);

export const useAuth = () => useContext(Auth);

const App = () => {
    const [session, setSession] = React.useState(null);
    return (
        <Auth.Provider value={[session, (s) => setSession(s)]}>
            <BrowserRouter>
                <Switch>
                    <Route path="/admin" component={Admin} />
                    <Route path="/" component={Login} />
                </Switch>
            </BrowserRouter>
        </Auth.Provider>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
