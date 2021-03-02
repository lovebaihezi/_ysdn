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
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AddIcon from '@material-ui/icons/Add';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import CloseIcon from '@material-ui/icons/Close';
import { auth, user } from '../../interface';
import { useLoginState } from '../../auth';
import formTake from '../../tools/form-take';
import { Schema } from 'mongoose';

const LoginForm: React.FC<{
    hooks: (e: React.FormEvent<HTMLFormElement>) => void;
    clickState: boolean;
}> = props => {
    const loginFormStyles = loginFormComponent.loginForm.createInputStyles();
    return (
        <Box {...loginFormComponent.box}>
            {props.children}
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
                autoComplete="off"
                className={loginFormStyles.form}>
                {loginFormComponent.loginForm.inputElements.map(
                    elementComponent => (
                        <Box
                            key={elementComponent.name}
                            className={loginFormStyles.box}>
                            <TextField
                                variant="filled"
                                {...elementComponent}
                                className={loginFormStyles.Input}
                                label={elementComponent.name}
                                helperText={''}
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

const MsgElement: React.FC<{ msg: string }> = ({ msg }) => {
    const [Open, setOpen] = React.useState<boolean>(true);
    function handleClose() {
        setOpen(false);
    }
    return msg ? (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={Open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={msg}
            action={
                <>
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
                </>
            }
        />
    ) : (
        <></>
    );
};

const useHelpText = (helperText: Array<[string, string]>) => {
    const [state, setState] = React.useState<Array<string>>(
        helperText.map(X => X[0])
    );
    return [state, () => {}];
};

export const Login: React.FC<{
    setState: (x: user & { _id: Schema.Types.ObjectId }) => void;
}> = ({ setState }) => {
    const state = useLoginState();
    const [res, setRes] = React.useState<
        user & { msg?: string } & { _id: Schema.Types.ObjectId }
    >();
    const [msg, setMessage] = React.useState<string>('');
    const [clicked, setDisabled] = React.useState<boolean>(true);
    function SetRes(
        res: user & { msg?: string } & { _id: Schema.Types.ObjectId }
    ) {
        setRes(res);
    }
    async function X(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!clicked) {
            setDisabled(true);
            try {
                setRes(
                    await (
                        await fetch('http://localhost:8000/user/login', {
                            method: 'post',
                            body: JSON.stringify(formTake(e.currentTarget)),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                    ).json()
                );
            } catch (e) {
                setMessage((e as Error)?.message.toString() ?? e.toString());
            }
        } else {
            setDisabled(false);
        }
    }
    React.useEffect(() => {
        if (!res || res?.msg || msg) {
            setDisabled(false);
            if (msg || res?.msg) {
                setMessage(res?.msg ?? msg);
            }
        } else {
            setDisabled(true);
            if (res?.Account) {
                setState(res);
            }
        }
        return () => {};
    }, [ res, setState]);
    if ((res && res?.Account) || state) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <LoginForm hooks={X} clickState={clicked}>
                <MsgElement msg={msg} />
            </LoginForm>
        </>
    );
};
