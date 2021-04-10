import React, { useEffect, useState } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { Col, Row } from 'antd';
import ReactMarkdown from 'react-markdown';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor() {
    const state = BraftEditor.createEditorState(null);
    const [value, setValue] = useState(state);
    return (
        <Row>
            {/* <Col span={12}>
                <ReactQuill value={value} onChange={setValue} />
            </Col>
            <Col span={12}>
                <ReactMarkdown source={value} />
            </Col> */}
            <Col span={24} style={{ border: '1px solid gray' }}>
                <BraftEditor value={value} onChange={setValue} />
            </Col>
        </Row>
    );
}
