import { createStyles, makeStyles, Theme } from '@material-ui/core';
const registerFormStyles = makeStyles((theme: Theme) =>
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
    // autoComplete: 'username',
};

export const passwordInput = {
    type: 'password',
    required: true,
    name: 'password',
    key: 'password-component',
    placeholder: 'please input your new password',
    // autoComplete: 'new-password',
};

export const confirmPasswordInput = {
    type: 'password',
    required: true,
    name: 'confirmPassword',
    key: 'password-component',
    placeholder: 'please confirm your password',
    // autoComplete: 'new-password',
};

export const form = {
    action: '',
    method: 'post',
};

export const box = {};

export const registerForm = {
    inputElements: [accountInput, passwordInput, confirmPasswordInput],
    createInputStyles: registerFormStyles,
    form,
    box,
};
