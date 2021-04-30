import React, { useEffect, useState } from 'react';
import MarkDown from 'react-markdown';
import { Button, Card, Col, Row, Upload } from 'antd';

import './editor.css';
import { baseurl, useUserDetail } from '../../auth';
import { Redirect } from 'react-router';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
//TODO : feature not complete, first time up, generate an article, then submit it to database
export default function Editor({ onInput }: { onInput: (v: string) => void }) {
    const [value, setValue] = useState<string>('');
    return (
        <Row>
            {/* <Col flex="auto">
                <Row> */}
                    <Col span={12}>
                        <Card>
                            <div
                                contentEditable
                                className="editor"
                                onInput={(e) => {
                                    onInput(e.currentTarget.innerText);
                                    setValue(e.currentTarget.innerText);
                                }}
                                onPaste={(e) => {
                                    onInput(e.currentTarget.innerText);
                                }}
                            ></div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                            style={{ height: 'max-content', minHeight: '100%' }}
                        >
                            <MarkDown children={value} />
                        </Card>
                    </Col>
                {/* </Row>
            </Col> */}
        </Row>
    );
}
