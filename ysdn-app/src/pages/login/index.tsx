import { Box, Button, Input, TextField } from '@material-ui/core';
import * as React from 'react';
import utils from '../../utils';
import * as tools from '../../tools';
import { loginFormComponent } from '../../components-config/Login';
import { Link } from 'react-router-dom';
import { Form } from '../../form';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AddIcon from '@material-ui/icons/Add';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

const LoginFormElement: React.FC<{
    hooks: (e: React.FormEvent<HTMLFormElement>) => void;
    clickState: boolean;
    State: JSX.Element;
}> = props => {
    const loginFormStyles = loginFormComponent.loginForm.createInputStyles();
    React.useEffect(() => {
        return () => {};
    }, []);
    return (
        <Box {...loginFormComponent.box}>
            {props.State}
            <form
                {...loginFormComponent.form}
                onSubmit={props.hooks}
                className={loginFormStyles.form}>
                {loginFormComponent.loginForm.inputElements.map(
                    elementComponent => (
                        <Box key={elementComponent.name}>
                            <TextField
                                {...elementComponent}
                                label={elementComponent.name}
                                variant="outlined"
                                className={loginFormStyles.Input}
                            />
                        </Box>
                    )
                )}
                <Box className={loginFormStyles.box}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={props.clickState}
                        className={loginFormStyles.Submit}
                        startIcon={<FingerprintIcon />}>
                        login
                    </Button>
                </Box>
                <Box className={loginFormStyles.box}>
                    <Button
                        component={Link}
                        variant="outlined"
                        color="secondary"
                        to="/register"
                        className={loginFormStyles.Submit}
                        startIcon={<AddIcon />}>
                        Register
                    </Button>
                </Box>
                <Box className={loginFormStyles.box}>
                    <Button
                        component={Link}
                        // variant="outlined"
                        color="secondary"
                        to="/find-password"
                        className={loginFormStyles.Submit}
                        startIcon={<VpnKeyIcon />}>
                        forget your password?
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

const ErrorElement_: React.FC<{ error: Error }> = ({ error }) => (
    <strong>{JSON.stringify(error)}</strong>
);

export const Login: React.FC<{}> = () => (
    <Form
        {...{
            FormElement: LoginFormElement,
            InitialElement: () => <></>,
            WarningElement: ({ msg }) => <code>{msg}</code>,
            WaitingElement: () => <code>waiting</code>,
            ParsingElement: () => <code>parsing</code>,
            ErrorElement: ErrorElement_,
            FullfilElement: () => <code>fullfil</code>,
        }}
    />
);
