import { Button, Card, Col, Input, message, Row, Upload } from 'antd';
import React, { FC, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import Editor from '../Editor';
import { baseurl, useUserDetail } from '../../auth';
import user from '../../pages/each/user';
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';

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

// TODO : default file list must have ....
export default function Submit({
    onSubmit,
    placeholder,
    tips,
    uploadImage,
}: {
    onSubmit: (context: { title: string; content: string }) => void;
    placeholder?: string;
    tips?: string;
    uploadImage?: boolean;
}) {
    const [title, setTitle] = useState('no title');
    const [content, setContent] = useState('');
    const [user] = useUserDetail();
    const [imageList, setImageList] = useState<any[]>([]);
    if (!user) {
        return <Redirect to="/login" />;
    }
    function onChange(info: UploadChangeParam) {
        if (info.event?.percent === 100) {
            message.success('operation success!');
        }
        setImageList([...info.fileList]);
    }
    async function action(file: RcFile): Promise<string> {
        console.log(file);
        return baseurl + `/article/update/picture`;
    }
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
                                    <p>all you typed will be saved</p>
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
                </Row>
                <Row>
                    <Col span={24} style={{ marginTop: 40 }}>
                        <Input
                            onInput={(e) => {
                                setTitle(e.currentTarget.value);
                            }}
                            placeholder={placeholder ?? 'title'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col
                                style={{
                                    width: 'max-content',
                                    maxWidth: 197.61,
                                }}
                            >
                                <Card>
                                    <Upload
                                        action={
                                            // 
                                            action
                                        }
                                        listType="picture"
                                        onChange={onChange}
                                        fileList={imageList}
                                    >
                                        <div>
                                            <Button>submit picture</Button>
                                        </div>
                                    </Upload>
                                </Card>
                            </Col>
                            <Col flex="auto">
                                <Editor
                                    onInput={(v) => {
                                        setContent(v);
                                    }}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
