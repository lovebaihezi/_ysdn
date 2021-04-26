import { Card, Col, Image, Row } from 'antd';
import React from 'react';
import { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';

const Info: Component<AjaxJson.userDetail> = ({ Response }) => {
    return (
        <>
            <Row>
                <Col span={24}>
                    <Card>
                        <Row>
                            <Col span={8}>
                                <Card></Card>
                            </Col>
                            <Col span={16}>
                                <Card></Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Info;
