import { createStyles, makeStyles, Theme } from '@material-ui/core';
const registerFormStyles = makeStyles((theme: Theme) =>
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

export const accountInput = {
    type: 'text',
    required: true,
    name: 'username',
    key: 'account-component',
    placeholder: 'please input your account',
    // autoComplete: 'username',
};

export const nicknameInput = {
    type: 'text',
    name: 'nickname',
    key: 'nickname-component',
    placeholder: 'your nickname please',
};

export const emailInput = {
    type: 'text',
    name: 'email',
    key: 'email-component',
    placeholder: 'xxxxx@xxx.com',
};

export const telephoneInput = {
    type: 'text',
    name: 'telephone',
    key: 'telephone-component',
    placeholder: 'telephone',
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
    inputElements: [
        accountInput,
        nicknameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
    ],
    createInputStyles: registerFormStyles,
    form,
    box,
};
