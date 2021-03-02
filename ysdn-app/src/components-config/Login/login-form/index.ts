import { createStyles, makeStyles, Theme } from '@material-ui/core';
const loginFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        basicStyle: {},
        Input: {
            margin: theme.spacing(1),
            width: 304,
            height: 40,
        },
        Submit: {
            width: 304,
            height: 40,
            margin: theme.spacing(1),
        },
        form: {
            width: 320,
            height: 640,
            margin: '0 auto',
        },
        box: {
            margin: theme.spacing(1),
            height: 60,
            display: 'flex',
            justifyContent: 'center',
        },
    })
);

export const usernameInput = {
    type: 'text',
    required: true,
    name: 'username',
    key: 'account-component',
    placeholder: 'please input your account',
    // autoComplete: 'username',
    id: 'username-test',
};

export const passwordInput = {
    type: 'password',
    required: true,
    name: 'password',
    key: 'password-component',
    placeholder: 'please input your password',
    // autoComplete: 'current-password',
    id: 'password-test',
    pattern: '\\w{8}',
};

export const form = {
    action: '',
    method: 'post',
};

export const box = {};

export const loginForm = {
    inputElements: [usernameInput, passwordInput],
    createInputStyles: loginFormStyles,
    form,
    box,
};
