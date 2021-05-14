import React, { useState, useEffect, FC } from 'react';
import { useRef } from 'react';
import { baseurl, useUserDetail } from '../../auth';
import Ajax, { Component } from '../AjaxResponse';

const MessageShow: Component<{}> = ({ Response }) => {
    const [message, setMessage] = useState<string>();
    const messageList = useRef<string[]>([]);
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5050/notification');
        ws.onmessage = (message) => {
            setMessage(message.data);
        };
    });
    useEffect(() => {
        if (message) {
            messageList.current.push(message);
        }
    }, [message]);
    return <>{message}</>;
};

const MessageBox: FC = () => {
    const [user] = useUserDetail();
    if (user === null) {
        return null;
    }
    return (
        <Ajax
            Request={{ url: baseurl + `/notification/${user.username}` }}
            Component={MessageShow}
            Result={() => <></>}
        />
    );
};

export default MessageBox;
