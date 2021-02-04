import { Box, Button, Container, FormGroup, Input } from '@material-ui/core';
import * as React from 'react';
import utils from '../../utils';
import * as tools from '../../tools';
import { loginFormComponent } from '../../components/Login';

const url = 'localhost:5050/user/';

export const InputBox: React.FC<any> = props => {
    return <Box></Box>;
};

export const LoginForm: React.FC<any> = props => {
    const [res, error, setLoginStatus] = utils.useEveryFetch('/user/login');
    const loginFormStyles = loginFormComponent.loginForm.createInputStyles();
    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }
    React.useEffect(() => {});
    return (
        <Box {...loginFormComponent.box} className={loginFormStyles.box}>
            <form
                {...loginFormComponent.form}
                onSubmit={handleLogin}
                className={loginFormStyles.form}>
                {loginFormComponent.loginForm.inputElements.map(
                    elementComponent => (
                        <Box key={elementComponent.name}>
                            <Input
                                {...elementComponent}
                                className={loginFormStyles.Input}
                            />
                        </Box>
                    )
                )}
            </form>
        </Box>
    );
};

export const Login: React.FC<any> = () => {
    return <LoginForm />;
};
