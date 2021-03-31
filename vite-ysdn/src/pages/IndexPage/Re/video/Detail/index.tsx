import { Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { Commponent } from '../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../interface';

const VideoCard: Commponent<AjaxJson.video[]> = ({ Response }) => (
    <Row>
        <Col span={24} style={{ overflow: 'hidden' }}>
            <Divider />
            <Row wrap={false}>
                {Response.map((video) => (
                    <Col span={8} key={video.id} style={{ padding: 10 }}>
                        <Card
                            className="mongraphCard"
                            cover={
                                <img
                                    width="300px"
                                    height="250px"
                                    src={video.coverImgUrl}
                                />
                            }
                        >
                            <Row>
                                <Col span={24}>
                                    <strong className="title">
                                        {video.title}
                                    </strong>
                                </Col>
                                <Col span={24}>{video.briefIntro}</Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Col>
    </Row>
);

export default VideoCard;
