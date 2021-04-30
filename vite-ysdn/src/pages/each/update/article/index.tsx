import { message, Row, Col, Button, Input, Card, Upload } from 'antd';
import { UploadChangeParam, RcFile } from 'antd/lib/upload';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useUserDetail, baseurl } from '../../../../auth';
import { LeftOutlined } from '@ant-design/icons';
import { useFetchJson } from '../../../../tools/hook/useFetch';
import Editor from '../../../../component/Editor';

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

export default function UpdateArticle() {
    const H = useHistory();
    const [title, setTitle] = useState('no title');
    const [content, setContent] = useState('');
    const [user] = useUserDetail();
    const [imageList, setImageList] = useState<any[]>([]);
    if (!user) {
        return <Redirect to="/login" />;
    }
    const [[response, loading, error], Fetch, Catch] = useFetchJson({
        url: baseurl + `/create/${user._id}`,
        option: {
            method: 'POST',
            body: JSON.stringify({ title, content }),
        },
    });
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
                                {/* {tips ? ( */}
                                {/* // <p>{tips}</p> */}
                                {/* // ) : ( */}
                                <p>all you typed will be saved</p>
                                {/* )} */}
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
                                        // onSubmit({ title, content });
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
                            placeholder={'title'}
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
