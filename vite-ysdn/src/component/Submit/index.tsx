import { Button, Col, Input, Row } from 'antd';
import React, { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import Editor from '../Editor';

const BackButton: FC = () => {
    const History = useHistory();
    return (
        <Button
            type="text"
            style={{
                width: 'max-content',
                height: 'max-content',
                marginRight: 10,
            }}
            onClick={(e) => {
                e.preventDefault();
                History.goBack();
            }}
        >
            <LeftOutlined style={{ fontSize: 28 }} />
        </Button>
    );
};

//todo : add submit action

export default function Submit({
    onSubmit,
    placeholder,
    tips,
}: {
    onSubmit: (context: { title: string; content: string }) => void;
    placeholder?: string;
    tips?: string;
}) {
    const [title, setTitle] = useState('no title');
    const [content, setContent] = useState('');
    return (
        <Row>
            <Col span={22} offset={1}>
                <Row>
                    <Col span={24}>
                        <Row style={{ padding: 10, height: 70 }}>
                            <Col
                                flex="56px"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <BackButton />
                            </Col>
                            <Col>
                                <h3>
                                    <strong>
                                        {title === '' ? 'no title' : title}
                                    </strong>
                                </h3>
                                {tips ? (
                                    <p>{tips}</p>
                                ) : (
                                    <p>all your type will be saved</p>
                                )}
                            </Col>
                            <Col
                                flex="auto"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    onClick={(e) => {
                                        onSubmit({ title, content });
                                    }}
                                    type="primary"
                                >
                                    submit
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ marginTop: 40 }}>
                        <Input
                            onInput={(e) => {
                                setTitle(e.currentTarget.value);
                            }}
                            placeholder={placeholder ?? 'title'}
                        />
                    </Col>
                    <Col span={24}>
                        <Editor onInput={(v) => {
                            setContent(v)
                        }} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
