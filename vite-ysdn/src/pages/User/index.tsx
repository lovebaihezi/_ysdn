import { FC } from 'react';
import React from 'react';
import { Row, Col, Image } from 'antd';
import { AjaxJson } from '../../interface';
import { useRouteMatch } from 'react-router';
const UserInformation: FC<{ user: AjaxJson.user }> = ({ user }) => {
    return (
        <Row>
            <Col span={20} offset={2}>
                <Row>
                    <Col>
                        <Image height={200} src="" />
                    </Col>
                    <Col>
                        <Row></Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default function User() {
    const para = useRouteMatch();
}
