import { message, Row, Col, Button, Input, Card, Upload, Tag } from 'antd';
import { UploadChangeParam, RcFile } from 'antd/lib/upload';
import React, {
    createContext,
    FC,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useUserDetail, baseurl } from '../../../../auth';
import { LeftOutlined } from '@ant-design/icons';
import { useFetchJson } from '../../../../tools/hook/useFetch';
import Editor from '../../../../component/Editor';
import Ajax, { Component } from '../../../../component/AjaxResponse';

import './index.css';
import { UploadFile } from 'antd/lib/upload/interface';

const BackButton: FC = () => {
    const History = useHistory();
    return (
        <Button
            type="text"
            style={{
                width: 'max-body',
                height: 'max-body',
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

const tags = new Set<string>();

const Each: FC<{ name: string }> = ({ name }) => {
    const [choose, setChoose] = useState(false);
    useEffect(() => {
        if (choose) {
            tags.add(name);
        } else {
            tags.delete(name);
        }
    }, [choose]);
    return (
        <Tag.CheckableTag
            className="tag-chose"
            checked={choose}
            onChange={() => {
                setChoose(!choose);
                if (tags.has(name)) {
                    tags.delete(name);
                } else {
                    tags.add(name);
                }
            }}
        >
            {name}
        </Tag.CheckableTag>
    );
};

const AllTag: Component<string[]> = ({ Response }) => {
    return (
        <Row>
            {Response.map((name) => (
                <Col key={name} span={24 / Response.length}>
                    <Each name={name} />
                </Col>
            ))}
        </Row>
    );
};

const TagChoose: FC = () => {
    return <Ajax Request={{ url: baseurl + `/tag` }} Component={AllTag} />;
};

//TODO : create an article in database when mount,
//TODO : a list show all my article(optional)
export default function UpdateArticle() {
    const H = useHistory();
    const [title, setTitle] = useState('no title');
    const [content, setBody] = useState('');
    const [user] = useUserDetail();
    const [imageList, setImageList] = useState<UploadFile[]>([]);
    useEffect(() => {
        console.log(imageList);
    }, [imageList]);
    if (!user) {
        return <Redirect to="/login" />;
    }
    const [[response, loading, error], Fetch, Catch] = useFetchJson<any>({
        url: baseurl + `/article/create/${user._id}`,
        option: {
            method: 'POST',
            headers: new Headers({ 'Content-type': 'application/json' }),
            body: JSON.stringify({
                title,
                content,
                coverImgUrl: `${baseurl}/article/${imageList[0]?.name}`,
                tags: [...tags],
            }),
        },
    });
    function onChange(info: UploadChangeParam) {
        if (info.event?.percent === 100) {
            message.success('operation success!');
        }
        setImageList(info.fileList);
    }
    async function action(file: RcFile): Promise<string> {
        return baseurl + `/article/upload/picture`;
    }
    useEffect(() => {
        if (loading) {
            message.loading('uploading');
        } else if (error || response?.type === 'error') {
            message.error(error?.message ?? response?.message ?? 'error!');
        } else if (response) {
            message.success('upload success!');
        }
    }, [response, loading, error]);
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
                                        // onSubmit({ title, body });
                                        Fetch().catch(Catch);
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
                        <TagChoose />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Row wrap={false}>
                            <Col
                                style={{
                                    width: 'max-body',
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
                                        setBody(v);
                                    }}
                                    transformImageUri={(url) => {
                                        if (/^https?:\/\//g.test(url))
                                            return url;
                                        return baseurl + `/article/${url}`;
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
