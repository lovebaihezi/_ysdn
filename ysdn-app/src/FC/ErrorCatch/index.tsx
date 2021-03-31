import React from 'react';
import { FC ,Component } from 'react';

const ErrorCatch: FC = ({ children }) => {
    try {
        const x = children
    } catch (err) {}
    return <>{children}</>;
};

export default ErrorCatch;
