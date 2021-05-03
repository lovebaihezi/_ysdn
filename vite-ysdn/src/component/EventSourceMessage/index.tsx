import React, { FC, useEffect, useRef, useState } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import { Card, Dropdown, message } from 'antd';
import { baseurl, useUserDetail } from '../../auth';

export type ESProp<T> = FC<{
    message: MessageEvent<T> | undefined;
    error: Event | undefined;
}>;

const EventSourceMessage = function <T>(Prop: {
    url: string;
    eventSourceInitDict?: EventSourceInit;
    MessageComponent: ESProp<T>;
}) {
    const [message, setMessage] = useState<MessageEvent>();
    const [error, setError] = useState<Event>();
    // const ES = useRef(new EventSource(Prop.url, Prop.eventSourceInitDict));
    useEffect(() => {
        const ES = new EventSource(Prop.url, Prop.eventSourceInitDict);
        ES.onmessage = (Message) => setMessage(Message);
        ES.onerror = (Event) => setError(Event);
        if (error) {
            ES.close();
        }
        return () => ES.close();
    }, []);
    return <Prop.MessageComponent message={message} error={error} />;
};

export default EventSourceMessage;
