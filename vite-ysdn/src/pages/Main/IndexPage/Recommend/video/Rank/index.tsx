import { Card, Col, Divider, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import Ajax, { Component } from '../../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../../interface';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';

const VideoRank: Component<AjaxJson.video[]> = ({ Response }) => {
    return (
        <Card title="Rank" bodyStyle={{ padding: '1px 16px' }}>
            <Row>
                {Response.slice(0, 4).map((video, index) => (
                    <Col key={video._id} span={24}>
                        <Row>
                            <Col span={6}></Col>
                            <Col span={18} style={{ cursor: 'pointer' }}>
                                <Card
                                    bordered={false}
                                    bodyStyle={{ padding: 0 }}
                                    title={video.title}
                                    headStyle={{ padding: 0 }}
                                    actions={[]}
                                />
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default VideoRank;
