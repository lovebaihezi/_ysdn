import { makeStyles } from '@material-ui/core';
const loginFormStyles = makeStyles({
    basicStyle: {},
    Input: {},
    Submit: {},
    form: {
        width: '100%',
        'min-width': 320,
        'max-width': 640,
        margin: '0 auto',
    },
    box: {
        width: '100%',
        'min-width': 320,
        'max-width': 640,
        margin: '0 auto',
    },
});

export const accountInput = {
    type: 'text',
    // required: true,
    name: 'account',
    key: 'account-component',
    placeholder: 'please input your account',
    autoComplete: 'username',
};

export const passwordInput = {
    type: 'password',
    // required: true,
    name: 'password',
    key: 'password-component',
    placeholder: 'please input your password',
    autoComplete: 'current-password',
};

export const submitButton = {
    type: 'submit',
    key: 'submit-component',
    name: 'submitButton',
    value: 'login',
};

export const form = {
    action: '',
    method: 'post',
};

export const box = {};

export const loginForm = {
    inputElements: [accountInput, passwordInput, submitButton],
    createInputStyles: loginFormStyles,
    form,
    box,
};
