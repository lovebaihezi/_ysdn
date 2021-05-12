import { Button, Col, Row } from 'antd';
import React, { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { AjaxJson } from '../../../interface';

const AnswerButton: FC<{ amount: number }> = ({ amount }) => (
    <Row
        onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
        }}
    >
        <Col span={24}>
            <Button type="primary">
                Answer:{amount}
                <EditOutlined />
            </Button>
        </Col>
    </Row>
);

const GetAnswerInformation: FC<{ user: AjaxJson.userInfo | null }> = ({
    user,
}) => {
    if (user) {
        return <></>;
    } else {
        return <></>;
    }
};

export default GetAnswerInformation;
