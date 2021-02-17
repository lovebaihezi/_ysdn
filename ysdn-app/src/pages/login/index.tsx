import {
    Box,
    Button,
    IconButton,
    Snackbar,
    TextField,
} from '@material-ui/core';
import * as React from 'react';
// import utils from '../../utils';
// import * as tools from '../../tools';
import { loginFormComponent } from '../../components-config/Login';
import { Link, Redirect } from 'react-router-dom';
import { Form } from '../../form';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AddIcon from '@material-ui/icons/Add';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import CloseIcon from '@material-ui/icons/Close';
import { user } from '../../interface';
import { useLoginState } from '../../auth';

const LoginFormElement: React.FC<{
    hooks: (e: React.FormEvent<HTMLFormElement>) => void;
    clickState: boolean;
    State: JSX.Element;
}> = props => {
    const loginFormStyles = loginFormComponent.loginForm.createInputStyles();
    return (
        <Box {...loginFormComponent.box}>
            {props.State}
            <Box
                style={{
                    width: 320,
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <FingerprintIcon
                    style={{ fontSize: 100, margin: '0 auto' }}
                    color="primary"
                />
            </Box>
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
                                onInput={() => {}}
                                onInvalid={() => {}}
                            />
                        </Box>
                    )
                )}
                <Box className={loginFormStyles.box}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        id="login-button-test"
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

const ErrorElement_: React.FC<{ error: Error }> = ({ error }) => {
    const [Open, setOpen] = React.useState<boolean>(true);
    React.useEffect(() => {
        setOpen(true);
        return () => {};
    }, []);
    function handleClose() {
        setOpen(false);
    }
    return error?.message ? (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={Open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={error?.message ?? JSON.stringify(error)}
            action={
                <React.Fragment>
                    <Button color="primary" size="small" onClick={handleClose}>
                        OK
                    </Button>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    ) : (
        <></>
    );
};

export const Login: React.FC<{ setState: (x: user) => void }> = ({
    setState,
}) => {
    const state = useLoginState();
    if (!state)
        return (
            <Form
                {...{
                    FormElement: LoginFormElement,
                    InitialElement: () => <></>,
                    WarningElement: ({ msg }) => <>{msg.msg}</>,
                    WaitingElement: () => <>waiting</>,
                    ParsingElement: () => <>parsing</>,
                    ErrorElement: ErrorElement_,
                    FullfilElement: ({ res }: { res: user }) => {
                        setState(res);
                        sessionStorage.setItem(
                            'user',
                            JSON.stringify(res ?? {})
                        );
                        return <>fullfil</>;
                    },
                }}
            />
        );
    else return <Redirect to="/" />;
};
