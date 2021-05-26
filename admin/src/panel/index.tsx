import {
    Container,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
} from '@material-ui/core';
import React, { FC } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';

const Panel: FC = () => {
    const [session] = useAuth();
    if (session === null) {
        return <Redirect to="/" />;
    }
    return (
        <Container>
            <TableContainer component={Paper}>
                <Table title="activity" aria-label="users weekly activity">
                    <TableHead>
                        <TableCell>name</TableCell>
                    </TableHead>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Panel;
