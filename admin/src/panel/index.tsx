import { Container } from '@material-ui/core';
import React, { FC } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';

const Panel: FC = () => {
    const [session] = useAuth();
    if (session === null) {
        return <Redirect to="/" />;
    }
    return <Container>panel</Container>;
};

export default Panel;
