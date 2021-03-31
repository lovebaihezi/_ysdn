import { Col, Row } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';

export default function Searcher() {
    return (
        <Row justify="end">
            <Col span={18}>
                <Search
                    placeholder="what you want"
                    allowClear
                    enterButton="Search"
                    size="middle"
                    onSearch={(...rest) => console.log(...rest)}
                />
            </Col>
        </Row>
    );
}
