import { Box, Input } from '@material-ui/core';
import * as React from 'react';
import utils from '../../utils';
import * as tools from '../../tools';
import { loginFormComponent } from '../../components/Login';
import { Redirect } from 'react-router-dom';
import { join } from 'path';

const FormElement: React.FC<{
    hooks: (e: React.FormEvent<HTMLFormElement>) => void;
}> = props => {
    const loginFormStyles = loginFormComponent.loginForm.createInputStyles();
    return (
        <Box {...loginFormComponent.box} className={loginFormStyles.box}>
            <form
                {...loginFormComponent.form}
                onSubmit={props.hooks}
                className={loginFormStyles.form}>
                {loginFormComponent.loginForm.inputElements.map(
                    elementComponent => (
                        <Box key={elementComponent.name}>
                            <Input
                                {...elementComponent}
                                className={loginFormStyles.Input}
                            />
                        </Box>
                    )
                )}
            </form>
        </Box>
    );
};

const WaitingElement: React.FC<any> = () => <code>"Fetching..."</code>;
const ParsingElement: React.FC<any> = () => <code>"Parsing..."</code>;
const ErrorElement: React.FC<{ error: string }> = ({ error }) => (
    <strong>{error}</strong>
);
export const LoginForm: React.FC<any> = () => {
    const [res, error, Fetch, Catch] = utils.useEveryFetch();
    const [Json, setJson] = React.useState<unknown>();
    const [Render, setRender] = React.useState<JSX.Element>(
        <FormElement hooks={handleLogin} />
    );
    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // setRender(<WaitingElement />);
        const formData = tools.formTake(e.currentTarget);
        console.log(formData);
        try {
            await Fetch('http://localhost:8000/user/login', {
                method: 'post',
                body: JSON.stringify(formData),
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            });
            // setRender(<ParsingElement />);
            setJson(await res?.json());
            console.error();
        } catch (e) {
            Catch(e);
        }
    }
    React.useEffect(() => {
        if (error) {
            // setRender(<ErrorElement error={error.toString()} />);
        } else if (res?.status === 200) {
            console.log(res);
            // setRender(<Redirect to="/" />);
        } else if (res?.status === 404) {
            // setRender(<ErrorElement error={'404 Not Found!'} />);
        }
        return () => {};
    }, [error, res, Json]);
    return Render;
};

export const Login: React.FC<any> = () => {
    return <LoginForm />;
};
