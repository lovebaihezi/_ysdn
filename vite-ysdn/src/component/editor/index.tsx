import React, { useEffect, useState } from 'react';
import MarkDown from 'react-markdown';
import { Col, Row } from 'antd';

import './editor.css';

export default function Editor({ onInput }: { onInput: CallableFunction }) {
    const [value, setValue] = useState<string>('');
    return (
        <Row>
            <Col span={12} style={{ border: '1px solid gray' }}>
                <div
                    contentEditable
                    className="editor"
                    onInput={(e) => {
                        onInput(e.currentTarget.innerText);
                        setValue(e.currentTarget.innerText);
                    }}
                ></div>
            </Col>
            <Col span={12} style={{ border: '1px solid gray' }}>
                <MarkDown children={value} />
            </Col>
        </Row>
    );
}
