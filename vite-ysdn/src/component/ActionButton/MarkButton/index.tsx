import { Button, Col, message, Row } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useFetchJson, useFetchProps } from '../../../tools/hook/useFetch';
import { baseurl, useUserDetail } from '../../../auth';
import { AjaxJson } from '../../../interface';

const Basic: FC<
    useFetchProps & { setState: (state: boolean) => void; init: boolean }
> = ({ url, option, setState, children, init }) => {
    const [user] = useUserDetail();
    const [[response, loading, error], Fetch, Catch] = useFetchJson({
        url,
        option,
    });
    useEffect(() => {
        if (response) {
            const res = response as AjaxJson.responseMessage;
            message.info(res.message);
        } else if (error) {
            message.error(error.message);
        }
    }, [response, error]);
    return (
        <Button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (user) {
                    Fetch()
                        .then(() => setState(!init))
                        .catch(Catch);
                } else {
                    message.info('you have not login yet!');
                }
            }}
            type="text"
        >
            {children}
        </Button>
    );
};

// when click, it will become UnMark
const Mark: FC<useFetchProps & { setState: (state: boolean) => void }> = ({
    url,
    option,
    setState,
    children,
}) => {
    return (
        <Basic init={true} url={url} option={option} setState={setState}>
            <StarFilled />
            {children}
        </Basic>
    );
};

// opposite from Mark
const UnMark: FC<useFetchProps & { setState: (state: boolean) => void }> = ({
    url,
    option,
    setState,
    children,
}) => {
    return (
        <Basic init={false} url={url} option={option} setState={setState}>
            <StarOutlined />
            {children}
        </Basic>
    );
};

export const MarkButton: FC<{
    initial: boolean;
    amount: number;
    id: string;
    type: 'article' | 'activity' | 'QA' | 'video';
}> = ({ initial, amount, id, type }) => {
    const [state, setState] = useState(initial);
    const [user] = useUserDetail();
    const [number, setNumber] = useState(amount);
    return (
        <Row
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Col span={24}>
                {state ? (
                    <Mark
                        url={baseurl + `/${type}/mark/${id}`}
                        option={{
                            method: 'DELETE',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            }),
                            body: JSON.stringify({ id: user?._id }),
                        }}
                        setState={(s) => {
                            setNumber(number - 1);
                            setState(s);
                        }}
                    >
                        {number}
                    </Mark>
                ) : (
                    <UnMark
                        url={baseurl + `/${type}/mark/${id}`}
                        option={{
                            method: 'PATCH',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            }),
                            body: JSON.stringify({ id: user?._id }),
                        }}
                        setState={(s) => {
                            setNumber(number + 1);
                            setState(s);
                        }}
                    >
                        {number}
                    </UnMark>
                )}
            </Col>
        </Row>
    );
};
