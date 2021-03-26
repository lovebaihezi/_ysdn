import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../auth';
import { UserContainer } from '../../auth/container';
import UserInformation from '../User';
export default function I() {
    const user = useAuth();
    return (
        <UserContainer Except={<Redirect to="/login" />}>
            
        </UserContainer>
    );
}
