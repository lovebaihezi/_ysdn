import { Card, Col, Row } from 'antd';
import React from 'react';
import InfoForm from './infoForm';

export default function UpdateVideo() {
    return (
        <Card style={{ marginTop: 60 }} bordered={false}>
            <Row>
                <Col span={22} offset={1}>
                    <InfoForm />
                </Col>
            </Row>
        </Card>
    );
}
