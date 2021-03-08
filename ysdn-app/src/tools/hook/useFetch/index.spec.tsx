import * as React from 'react';
import useFetch, { useAjaxJson } from './index';
import { render } from '@testing-library/react';

const TestFetch: React.FC<any> = () => {
    const [R, E, F, C] = useFetch();
    function fetching() {
        F('localhost:8000/user/login', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        }).catch(C);
    }
    fetching();
    React.useEffect(() => {
        if (R) {
            console.log(R);
        } else if (E) {
            console.log(E);
        }
    }, [E, R]);
    return (
        <code
            onClick={() => {
                fetching();
            }}>
            {(JSON.stringify(R ?? { msg: 'no response' }), JSON.stringify(E))}
        </code>
    );
};

const TestAjaxJson: React.FC<any> = () => {
    const [J, E, F, C] = useAjaxJson();
    React.useEffect(() => {}, []);
};
