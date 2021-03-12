import { FC, useState, useEffect } from 'react';
import { Button, Form } from 'antd';
import { objectId, user } from '../../interface';

const LoginForm: FC<{ setAuth: (X: user & objectId) => void }> = ({
    setAuth,
}) => {
    return <Form></Form>;
};

const LoginPage: FC<{ setAuth: (X: user & objectId) => void }> = ({
    setAuth,
}) => (
    <>
        <LoginForm setAuth={setAuth} />
        <Button>Register</Button>
        <Button>find my password</Button>
    </>
);

export default LoginPage;
