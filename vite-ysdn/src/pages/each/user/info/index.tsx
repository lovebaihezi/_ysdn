import { Col, Row } from 'antd';
import React from 'react';
import { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';

const Info: Component<AjaxJson.userDetail> = ({ Response }) => {
    return (
        <Row>
            <Col span={24}>
                
            </Col>
            <Col span={24}></Col>
        </Row>
    );
};

export default Info;
