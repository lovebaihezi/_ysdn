import { createStyles, makeStyles, Theme } from '@material-ui/core';
const loginFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        basicStyle: {},
        Input: {
            margin: theme.spacing(1),
            width: 320,
        },
        Submit: {
            width: 320,
            height: 40,
            margin: '0 auto',
        },
        form: {
            width: 320,
            height: 640,
            margin: '0 auto',
        },
        box: {
            margin: theme.spacing(1),
        },
    })
);

export const accountInput = {
    type: 'text',
    required: true,
    name: 'account',
    key: 'account-component',
    placeholder: 'please input your account',
    autoComplete: 'username',
};

export const passwordInput = {
    type: 'password',
    required: true,
    name: 'password',
    key: 'password-component',
    placeholder: 'please input your password',
    autoComplete: 'current-password',
};

export const form = {
    action: '',
    method: 'post',
};

export const box = {};

export const loginForm = {
    inputElements: [accountInput, passwordInput],
    createInputStyles: loginFormStyles,
    form,
    box,
};
