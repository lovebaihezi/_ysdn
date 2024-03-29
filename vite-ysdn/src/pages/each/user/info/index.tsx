import {
    Button,
    Card,
    Col,
    Empty,
    message,
    Row,
    Statistic,
    Tabs,
    Comment,
    Popconfirm,
    notification,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import React, { FC, ReactNode, useEffect } from 'react';
import {
    Link,
    useHistory,
    useLocation,
    useParams,
    useRouteMatch,
} from 'react-router-dom';
import { baseurl, ImageFallback, useUserDetail } from '../../../../auth';
import Ajax, { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';
import { useFetchProps } from '../../../../tools/hook/useFetch';
import PagedVideos from '../../../Main/Video/pagedVideo';
import { PlusOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import UserLink from '../../../../component/UserLink';
import { useState } from 'react';
import {
    LikeButton,
    MarkButton,
    CommentButton,
    ReadButton,
} from '../../../../component/ActionButton';
import Tags from '../../../../component/ActionTags';

const DeleteButton: FC<{ id: string }> = ({ id }) => {
    const [user] = useUserDetail();
    if (user === null) {
        return null;
    }
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Popconfirm
                placement="rightBottom"
                title="确定删除该文章?"
                onConfirm={async () => {
                    const res = await fetch(`${baseurl}/article/${id}`, {
                        method: 'DELETE',
                    }).catch((e) => {
                        notification.open({
                            message: '错误',
                            description: e.toString(),
                        });
                        return false;
                    });
                    if (res) {
                        notification.success({
                            message: '删除成功',
                        });
                        location.reload();
                    }
                }}
                okText="确定"
                cancelText="取消"
            >
                <Button type="ghost" style={{ color: 'red' }}>
                    删除
                    <DeleteOutlined style={{ color: 'red' }} />
                </Button>
            </Popconfirm>
        </div>
    );
};

const PagedArticles: Component<AjaxJson.article[]> = ({ Response }) => {
    const [user] = useUserDetail();
    if (Response.length === 0) {
        return (
            <Row>
                <Col span={20} offset={2}>
                    <Empty />
                </Col>
            </Row>
        );
    }
    return (
        <>
            <Row>
                {Response.map((article) => (
                    <Col span={24} key={article._id}>
                        <Link to={`/article/${article._id}`}>
                            <Card
                                bordered={false}
                                title={<strong>{article.title}</strong>}
                                bodyStyle={{ padding: 0 }}
                                extra={
                                    <span>
                                        {article.createTime
                                            .toString()
                                            .replace('T', ' ')
                                            .replace('Z', '')
                                            .replace('.000', '')}
                                    </span>
                                }
                                actions={[<DeleteButton id={article._id} />]}
                                headStyle={{ padding: 0, border: 0 }}
                            >
                                <Card.Meta
                                    avatar={<UserLink user={article.author} />}
                                    description={article.content.slice(0, 100)}
                                    style={{ marginBottom: 10 }}
                                />
                                <Row style={{ padding: 5 }}>
                                    <Col span={24}>
                                        <Tags tags={article.tags} />
                                    </Col>
                                </Row>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

const Article: Component<AjaxJson.article[]> = ({ Response }) => {
    return Response.length === 0 ? (
        <Empty description={`你还未发表过文章`} />
    ) : (
        <PagedArticles Response={Response} />
    );
};

const Video: Component<AjaxJson.video[]> = ({ Response }) => {
    return Response.length === 0 ? (
        <Empty description={`你还未发表过视频`} />
    ) : (
        <PagedVideos Response={Response} />
    );
};

const Comments: Component<AjaxJson.comment[]> = ({ Response }) => {
    const [user] = useUserDetail();
    if (Response.length !== 0) {
        return (
            <>
                {Response.map((comment) => (
                    <Card key={comment.author.username}>
                        <Comment
                            datetime={comment.answerTime}
                            content={comment.content}
                            author={<UserLink user={comment.author} />}
                        />
                    </Card>
                ))}
            </>
        );
    } else {
        return (
            <Empty style={{ width: '100%' }} description={`你还未发表过评论`} />
        );
    }
};

interface TAG {
    [x: string]: string;
}

const TAG: TAG = {
    articles: '文章',
    // videos: '视频',
    comments: '评论',
    // questions: '问题',
    // answers: '回答',
    // activities: '活动',
};

const config: name[] = [
    'articles',
    // 'videos',
    'comments',
    // 'questions',
    // 'answers',
    // 'activities',
];

const Follow: Component<{ amount: number }> = ({ Response }) => {
    return <Statistic title="关注" value={Response.amount} />;
};

const Follower: Component<{ amount: number }> = ({ Response }) => {
    return <Statistic title="粉丝" value={Response.amount} />;
};

const LeftRight: FC<{ Component: [ReactNode, ReactNode] }> = ({
    Component: [Left, Right],
}) => {
    return (
        <Card style={{ width: '100%' }}>
            <Row>
                <Col span={12}>
                    <Card>{Left}</Card>
                </Col>
                <Col span={12}>
                    <Card>{Right}</Card>
                </Col>
            </Row>
        </Card>
    );
};

const UserAllInfo: FC<{ username: string }> = ({ username }) => {
    return (
        <>
            <LeftRight
                Component={[
                    <Ajax
                        Request={{
                            url:
                                baseurl + `/user/userInfo/${username}/follower`,
                        }}
                        Component={Follower}
                    />,
                    <Ajax
                        Request={{
                            url: baseurl + `/user/userInfo/${username}/follow`,
                        }}
                        Component={Follow}
                    />,
                ]}
            />
            {/* <Card style={{ width: '100%' }}></Card> */}
        </>
    );
};

type name =
    | 'articles'
    // | 'videos'
    | 'comments';
// | 'questions'
// | 'answers'
// | 'activities';

const Components = new Map<name, Component<any>>();
Components.set('articles', Article);
// Components.set('videos', Video);
Components.set('comments', Comments);

const Each: FC<{
    name: name;
    username: string;
}> = ({ name, username }) => {
    if (Components.has(name)) {
        const X = Components.get(name);
        if (!X) {
            return <Empty />;
        }
        return (
            <Ajax
                Request={{
                    url: baseurl + `/user/${username}/userProduct/${name}`,
                }}
                Component={X}
            />
        );
    }
    return <Empty description={`你还未发表过${TAG[name]}`} />;
};

// const FollowButton: FC = () => {};

const Info: Component<AjaxJson.userDetail> = ({ Response }) => {
    const History = useHistory();
    useEffect(() => {
        if (!Response.username) {
            message.error('user not found!');
            History.goBack();
        }
    }, []);
    const { url } = useRouteMatch();
    const [user, refresh] = useUserDetail();
    const [isFollow, setFollow] = useState(
        user === null ? false : user.follow.includes(Response._id),
    );
    const follow = async () => {
        if (user) {
            const res = await fetch(
                baseurl + `/user/update/${user.username}/${Response.username}`,
                { method: 'PUT' },
            );
            const json = await res.json();
            if (json.username) {
                refresh({ ...user, ...json });
            }
        } else {
            message.error('你还没有登录!');
        }
    };

    const cancelFollow = async () => {
        if (user) {
            const json = await (
                await fetch(
                    baseurl +
                        `/user/delete/${user.username}/${Response.username}`,
                    { method: 'DELETE' },
                )
            ).json();
            if (json.username) {
                refresh({ ...user, ...json });
            }
        }
    };

    return (
        <>
            <Row>
                <Col span={20} offset={2}>
                    <Row>
                        <Col span={8}>
                            <Card
                                style={{ height: '100%' }}
                                actions={
                                    Response._id === user?._id
                                        ? [
                                              <Link to={`${url}/uploadInfo`}>
                                                  <Button type="link">
                                                      信息完善
                                                  </Button>
                                              </Link>,
                                              <Link to={`${url}/uploadTag`}>
                                                  <Button type="link">
                                                      个人标签
                                                  </Button>
                                              </Link>,
                                          ]
                                        : [
                                              isFollow ? (
                                                  <Button
                                                      onClick={(e) => {
                                                          cancelFollow()
                                                              .then(() => {
                                                                  setFollow(
                                                                      false,
                                                                  );
                                                                  message.success(
                                                                      '不再关注!',
                                                                  );
                                                              })
                                                              .catch((e) => {
                                                                  message.error(
                                                                      e,
                                                                  );
                                                              });
                                                      }}
                                                      type="primary"
                                                  >
                                                      <CheckOutlined />
                                                      不再关注
                                                  </Button>
                                              ) : (
                                                  <Button
                                                      onClick={(e) => {
                                                          follow()
                                                              .then(() => {
                                                                  message.success(
                                                                      '已关注!',
                                                                  );
                                                                  setFollow(
                                                                      true,
                                                                  );
                                                              })
                                                              .catch((e) => {
                                                                  console.log(
                                                                      e,
                                                                  );
                                                                  message.error(
                                                                      '错误!',
                                                                  );
                                                              });
                                                      }}
                                                      type="primary"
                                                  >
                                                      <PlusOutlined />
                                                      关注
                                                  </Button>
                                              ),
                                          ]
                                }
                            >
                                <Meta
                                    avatar={
                                        <Avatar
                                            src={
                                                /^http/.test(Response.avatarUrl)
                                                    ? Response.avatarUrl
                                                    : `${baseurl}/user/avatar/${Response.username}/${Response.avatarUrl}`
                                            }
                                        />
                                    }
                                    title={Response.nickname}
                                />
                            </Card>
                        </Col>
                        <Col span={16}>
                            <UserAllInfo username={Response.username} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={20} offset={2}>
                    <Tabs defaultActiveKey="1">
                        {config.map((name, key) => (
                            <Tabs.TabPane key={name} tab={TAG[name]}>
                                <Each
                                    name={name}
                                    username={Response.username}
                                />
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </Col>
            </Row>
        </>
    );
};

export default Info;
