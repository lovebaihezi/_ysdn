import * as React from 'react';
import { Route } from 'react-router';

export default function NotFound() {
    return <Route path="/*">404</Route>;
}
