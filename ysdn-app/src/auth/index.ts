import { Mongoose, Schema } from 'mongoose';
import * as React from 'react';
import { user } from '../interface';
export const LoginState = React.createContext<
    false | (user & { _id: Schema.Types.ObjectId })
>(
    ((
        P: user & { _id: Schema.Types.ObjectId }
    ): false | (user & { _id: Schema.Types.ObjectId }) => (P ? P : false))(
        JSON.parse(
            ((P: string) => (P && P !== 'undefined' ? P : '{}'))(
                sessionStorage.getItem('user') ?? ''
            ) ?? '{}'
        )
    )
);
export const useLoginState = () =>
    React.useContext<false | (user & { _id: Schema.Types.ObjectId })>(
        LoginState
    );
