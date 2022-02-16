import { Row, Col, Card, Divider, Button, Tag } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';

import {
    EyeOutlined,
    LikeOutlined,
    PlusOutlined,
    StarOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';
import {
    // AnswerButton,
    FollowButton,
    ReadButton,
    LikeButton,
    CommentButton,
    MarkButton,
} from '../../../../component/ActionButton';
import { useUserDetail } from '../../../../auth';

// const Actions: FC<{ QA: AjaxJson.QA }> = ({ QA }) => (
//     <Action tagPosition="right" tags={QA.tags}>
//         <Row>
//             <Col span={4}>
//                 <Button type="primary" color="">
//                     <PlusOutlined />
//                     follow
//                 </Button>
//             </Col>
//             <Col span={4} offset={1}>
//                 <Button color="blue">{`${QA.answerAmount} answers`}</Button>
//             </Col>
//             <Col
//                 offset={1}
//                 style={{ display: 'flex', alignItems: 'center' }}
//                 span={4}
//             >
//                 <EyeOutlined />
//                 <span style={{ padding: '0 4px' }}>{QA.read}</span>
//             </Col>
//             <Col style={{ display: 'flex', alignItems: 'center' }} span={4}>
//                 <LikeOutlined />{' '}
//                 <span style={{ padding: '0 4px' }}>{QA.approval}</span>
//             </Col>
//             <Col style={{ display: 'flex', alignItems: 'center' }} span={4}>
//                 <StarOutlined />
//             </Col>
//         </Row>
//     </Action>
// );

const PagedQAs: Component<AjaxJson.QA[]> = ({ Response }) => {
    const [user] = useUserDetail();
    return useMemo(
        () => (
            <>
                <Row>
                    {Response.map((QA) => (
                        <Col span={24} key={QA._id}>
                            <Card
                                bordered={false}
                                title={QA.title}
                                actions={
                                    [
                                        // <LikeButton
                                        //     type="QA"
                                        //     id={QA._id}
                                        // />,
                                        // <MarkButton
                                        //     type="QA"
                                        //     id={QA._id}
                                        // />,
                                        // <CommentButton
                                        //     link={`/QA/${QA._id}/#comment`}
                                        // />,
                                        // <ReadButton
                                        //     link={`/QA/${QA._id}`}
                                        // />,
                                    ]
                                }
                                headStyle={{ padding: 0, border: 0 }}
                                style={{ cursor: 'pointer' }}
                            >
                                <Card.Meta
                                    title={''}
                                    avatar={
                                        <Avatar src={QA.author.avatarUrl} />
                                    }
                                    description={QA.title}
                                />
                            </Card>
                            <Divider />
                        </Col>
                    ))}
                </Row>
            </>
        ),
        [Response, user],
    );
};

export default PagedQAs;
