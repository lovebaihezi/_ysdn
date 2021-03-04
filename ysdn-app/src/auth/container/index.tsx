import * as React from 'react';
import { useLoginState } from '../index';

const RouteContainer: React.FC<{
    Except: JSX.Element;
}> = ({ children, Except }) => {
    const user = useLoginState();
    if (user) {
        return <>{children}</>;
    } else {
        return Except;
    }
};
export default RouteContainer;
