import { Col, Row } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';

export default function Searcher() {
    return (
        <Search
            placeholder="what you want"
            allowClear
            enterButton="Search"
            size="middle"
            onSearch={(...rest) => console.log(...rest)}
        ></Search>
    );
}
