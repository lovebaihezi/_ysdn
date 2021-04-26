import React, { FC, useEffect } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import { Card, Dropdown, message } from 'antd';
import { baseurl, useUserDetail } from '../../auth';

const EventSourceMessage: FC = () => {
    const [detail] = useUserDetail();
    useEffect(() => {
        if (detail) {
            const { username } = detail;
            const eventSource = new EventSource(
                baseurl + `/notification/${username}`,
            );
            eventSource.addEventListener('message', ({ data }) => {
                message.info(data);
            });
            eventSource.addEventListener('error', (...rest) => {
                message.error(JSON.stringify(rest));
            });
            // return eventSource.close();
        }
        return () => {};
    }, []);
    return (
        // <Dropdown>
            <MessageOutlined size={24} />
        // </Dropdown>
    );
};

export default EventSourceMessage;
