import { Button, Col, Row } from 'antd';
import React, { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { AjaxJson } from '../../../interface';
import { baseurl, useUserDetail } from '../../../auth';
import { useHistory } from 'react-router-dom';
import { useFetchProps } from '../../../tools/hook/useFetch';
import Ajax, { Component, WaitingType } from '../../AjaxResponse';
import { LoadingOutlined } from '@ant-design/icons';

const AnswerButtonComponent: Component<{}> = ({ Response }) => {
    return (
        <Row
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Col span={24}>
                <Button type="primary">
                    Answer:{0}
                    <EditOutlined />
                </Button>
            </Col>
        </Row>
    );
};

const Waiting: WaitingType = () => {
    return (
        <Row>
            <Col span={24}>
                <Button type="primary" disabled={true}>
                    Answer
                    <LoadingOutlined />
                </Button>
            </Col>
        </Row>
    );
};
const AnswerButton: FC<{ id: string }> = ({ id }) => {
    const RequestInfo: useFetchProps = {
        url: baseurl + `/QA/${id}`,
    };
    return (
        <Ajax
            Request={RequestInfo}
            Waiting={Waiting}
            Component={AnswerButtonComponent}
        />
    );
};

export default AnswerButton;
