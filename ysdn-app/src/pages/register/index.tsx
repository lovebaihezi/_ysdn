import React from 'react';
import utils from '../../utils';
import * as tools from '../../tools';
import {
    Box,
    TextField,
    Button,
    IconButton,
    Snackbar,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { registerForm } from '../../components-config/Register';
import ForwardIcon from '@material-ui/icons/Forward';
import CloseIcon from '@material-ui/icons/Close';
import { useLoginState } from '../../auth';
import { user } from '../../interface';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Schema } from 'mongoose';

const RegisterForm: React.FC<{
    hooks: (e: React.FormEvent<HTMLFormElement>) => void;
    clickState: boolean;
}> = ({ hooks, clickState, children }) => {
    const registerFormStyles = registerForm.createInputStyles();
    React.useEffect(() => {
        return () => {};
    }, []);
    return (
        <Box {...registerForm.box}>
            {children}
            <Box
                style={{
                    width: 320,
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <AccountCircleIcon
                    style={{ fontSize: 100, margin: '0 auto' }}
                    color="primary"
                />
            </Box>
            <form
                {...registerForm.form}
                onSubmit={hooks}
                className={registerFormStyles.form}>
                {registerForm.inputElements.map(elementComponent => (
                    <Box
                        key={elementComponent.name}
                        className={registerFormStyles.box}>
                        <TextField
                            {...elementComponent}
                            label={elementComponent.name}
                            variant="filled"
                            className={registerFormStyles.Input}
                        />
                    </Box>
                ))}
                <Box className={registerFormStyles.box}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={clickState}
                        className={registerFormStyles.Submit}
                        startIcon={<ForwardIcon />}>
                        Register
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

export const Register: React.FC<{
    setState: (x: user & { _id: Schema.Types.ObjectId }) => void;
}> = ({ setState }) => {
    const state = useLoginState();
    const [res, setRes] = React.useState<
        user & { msg?: string } & { _id: Schema.Types.ObjectId }
    >();
    const [msg, setMessage] = React.useState<string>('');
    const [clicked, setDisabled] = React.useState<boolean>(true);
    function SetRes(res: user & { msg?: string } & { _id: Schema.Types.ObjectId }) {
        setRes(res);
    }
    async function X(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!clicked) {
            setDisabled(true);
            try {
                setRes(
                    await (
                        await fetch('http://localhost:8000/user/register', {
                            method: 'post',
                            body: JSON.stringify(
                                tools.formTake(e.currentTarget)
                            ),
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
    }, [msg, res, setState]);
    if (res && res?.Account) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <RegisterForm hooks={X} clickState={clicked}>
                <MsgElement msg={msg} />
            </RegisterForm>
        </>
    );
};

export default Register;
