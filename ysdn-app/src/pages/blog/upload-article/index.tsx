import {
    Box,
    Button,
    createStyles,
    fade,
    IconButton,
    makeStyles,
    Snackbar,
    TextField,
    Theme,
} from '@material-ui/core';
import React, { useState } from 'react';

// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

import MDEditor from '@uiw/react-md-editor';
import { useLoginState } from '../../../auth';
import { Redirect } from 'react-router-dom';
import { Schema } from 'mongoose';
import { user } from '../../../interface';
import CloseIcon from '@material-ui/icons/Close';

const MsgElement: React.FC<{ msg: string }> = ({ msg }) => {
    const [Open, setOpen] = React.useState<boolean>(true);
    function handleClose() {
        setOpen(false);
    }
    return msg ? (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={Open}
            autoHideDuration={2000}
            onClose={handleClose}
            message={msg}
            action={
                <>
                    <Button color="primary" size="small" onClick={handleClose}>
                        OK
                    </Button>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </>
            }
        />
    ) : (
        <></>
    );
};

// TODO : rebuild it !!!
// TODO : before rebuild ,please think about process of article editing

const MD = () => {
    const userInformation = useLoginState();
    const [value, setValue] = React.useState<string>('hello world');
    const [error, setError] = React.useState<Error>();
    const [Render, setRender] = React.useState<JSX.Element>(<></>);
    const [click, setDisable] = React.useState<boolean>(false);
    const [res, setRes] = React.useState<
        user & { _id: Schema.Types.ObjectId }
    >();
    async function uploadArticle() {
        if (userInformation) {
            setDisable(true);
            const { _id } = userInformation;
            try {
                setRes(
                    await (
                        await fetch(
                            'http://localhost:8000/blog/uploadArticle',
                            {
                                method: 'post',
                                body: JSON.stringify({
                                    userID: _id,
                                    article: {
                                        title:
                                            value.split(' ')[0] || 'no title',
                                        content: value,
                                    },
                                }),
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                }),
                            }
                        )
                    ).json()
                );
            } catch (e) {
                setError(new Error(e));
            }
        } else {
            setDisable(false);
        }
    }
    React.useEffect(() => {
        if (error) {
            setDisable(false);
            setRender(<MsgElement msg={error.toString()} />);
        } else if (res && res._id) {
            setRender(<MsgElement msg={'upload success'} />);
        } else {
            setDisable(false);
            setRender(<MsgElement msg={'excepted error'} />);
        }
    }, [error, res]);
    if (userInformation) {
        return (
            <>
                {Render}
                <MDEditor height="640" onChange={v => v && setValue(v)} />
                <Box>
                    <Button
                        disabled={click}
                        onClick={() => {
                            uploadArticle();
                        }}>
                        upload
                    </Button>
                </Box>
            </>
        );
    } else {
        return <Redirect to="../login" />;
    }
};

export const Uploader: React.FC<any> = () => {
    return <MD />;
};
