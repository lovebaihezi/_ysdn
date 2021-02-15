import { createStyles, makeStyles, Theme } from '@material-ui/core';
const findMyPasswordNextComponentStyles = makeStyles((theme: Theme) =>
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

export const findMyPasswordNextComponent = {
    inputElements: [passwordInput, confirmPasswordInput],
    createInputStyles: findMyPasswordNextComponentStyles,
    form,
    box,
};
