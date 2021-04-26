import { Col, Row } from 'antd';
import React from 'react';
import { baseurl } from '../../../auth';
import Ajax from '../../../component/AjaxResponse';
import { useFetchProps } from '../../../tools/hook/useFetch';

import Tags from './Tags';

export default function ChooseTags() {
    const RequestInfo: useFetchProps = {
        url: baseurl + '/tag',
        option: {},
    };
    return (
        <Row>
            <Col span={22} offset={1}>
                <Ajax Request={RequestInfo} Component={Tags} />
            </Col>
        </Row>
    );
}
