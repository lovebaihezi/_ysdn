import React from 'react';
import { formFc } from '../../../form';
import utils from '../../../utils';
import * as tools from '../../../tools';
import { Box, TextField, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { findMyPasswordNextComponent } from '../../../components-config/find-password/Next';
import ForwardIcon from '@material-ui/icons/Forward';

const NextForm: React.FC<{
    hooks: (e: React.FormEvent<HTMLFormElement>) => void;
    clickState: boolean;
    State: JSX.Element;
}> = ({ hooks, clickState, State }) => {
    const FindMyPasswordNextFormStyles = findMyPasswordNextComponent.createInputStyles();
    React.useEffect(() => {
        return () => {};
    }, []);
    return (
        <Box {...findMyPasswordNextComponent.box}>
            {State}
            <form
                {...findMyPasswordNextComponent.form}
                onSubmit={hooks}
                className={FindMyPasswordNextFormStyles.form}>
                {findMyPasswordNextComponent.inputElements.map(
                    elementComponent => (
                        <Box key={elementComponent.name}>
                            <TextField
                                {...elementComponent}
                                label={elementComponent.name}
                                variant="outlined"
                                className={FindMyPasswordNextFormStyles.Input}
                            />
                        </Box>
                    )
                )}
                <Box className={FindMyPasswordNextFormStyles.box}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={clickState}
                        className={FindMyPasswordNextFormStyles.Submit}
                        startIcon={<ForwardIcon />}>
                        Confirm
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export const Form: formFc<
    {
        hooks: (e: React.FormEvent<HTMLFormElement>) => void;
        clickState: boolean;
        State: JSX.Element;
    },
    {},
    {},
    {},
    {},
    {}
> = ({
    FormElement,
    InitialElement,
    WarningElement,
    WaitingElement,
    ParsingElement,
    ErrorElement,
    FullfilElement,
}) => {
    const [res, err, Fetch, Catch] = utils.useEveryFetch();
    const [Json, setJson] = React.useState<unknown>();
    const [Render, setRender] = React.useState<JSX.Element>(<InitialElement />);
    const [clicked, setClick] = React.useState<boolean>(false);
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!clicked) {
            setClick(true);
            setRender(<WaitingElement />);
            const formData = tools.formTake(e.currentTarget);
            try {
                await Fetch('http://localhost:8000/user/register', {
                    method: 'post',
                    body: JSON.stringify(formData),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                });
                setRender(<ParsingElement />);
                setJson(await res?.json());
                setRender(<FullfilElement />);
            } catch (e) {
                Catch(e);
                setClick(true);
            }
        }
    }
    React.useEffect(() => {
        if (!res) {
            setClick(false);
        }
        return () => {};
    }, [res]);
    React.useEffect(() => {
        if (err) {
            setRender(<ErrorElement />);
        } else if (res?.status === 200) {
            setRender(<FullfilElement />);
        } else if (res?.status === 404) {
            setClick(true);
            setRender(<ErrorElement />);
        }
        return () => {};
    }, [err, res, Json, ErrorElement, FullfilElement]);
    return (
        <FormElement hooks={handleSubmit} State={Render} clickState={clicked} />
    );
};

const FindMyPasswordNext: React.FC<any> = () => (
    <Form
        {...{
            FormElement: NextForm,
            InitialElement: () => <></>,
            WarningElement: () => <>{'msg'}</>,
            WaitingElement: () => <code>waiting</code>,
            ParsingElement: () => <code>parsing</code>,
            ErrorElement: () => <code>error</code>,
            FullfilElement: () => (
                <code>
                    fullfil
                    <Redirect to="/" />
                </code>
            ),
        }}
    />
);
export default FindMyPasswordNext;
