import React, { FC, useEffect, useState } from 'react';
import MarkDown from 'react-markdown';
import { Card, Col, Row } from 'antd';
import './editor.css';
import ReactMarkdown from 'react-markdown';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js';

//TODO : feature not complete, first time up, generate an article, then submit it to database
function Editor(
    prop: { onInput: (v: string) => void } & Required<
        Pick<ReactMarkdown.ReactMarkdownOptions, 'transformImageUri'>
    >,
) {
    const [value, setValue] = useState<string>('');
    const { onInput, ...rest } = prop;
    return (
        <Row>
            {/* <Col flex="auto">
                <Row> */}
            <Col span={12}>
                <Card>
                    <CodeMirror
                        value={value}
                        options={{
                            mode: 'string',
                            theme: 'material',
                            lineNumbers: true,
                        }}
                        onBeforeChange={(editor, data, value) => {
                            setValue(value);
                            onInput(value);
                        }}
                        onChange={(editor, data, value) => {}}
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card
                    style={{
                        height: 'max-content',
                        maxWidth: '100%',
                        minHeight: '100%',
                    }}
                >
                    <MarkDown
                        className="show-markdown"
                        skipHtml={false}
                        {...rest}
                        children={value}
                    />
                </Card>
            </Col>
            {/* </Row>
            </Col> */}
        </Row>
    );
}
export default Editor;
