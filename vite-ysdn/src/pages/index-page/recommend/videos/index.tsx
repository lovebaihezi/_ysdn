import { Card, Col, Divider, Row, Image } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { baseurl } from '../../../../auth';
import { AjaxJson } from '../../../../interface';
import { CSSProperties } from 'react';
import { FetchFC, renderFetchResult } from '../../../../FC/FetchFC';
import CardAction from '../../../../FC/Recommend';

const imageUrl = 'picture/data-analyze.png';

const RankCardStyle: CSSProperties = {
    height: 98,
    overflow: 'hidden',
};

const VideoCard: renderFetchResult<AjaxJson.video[]> = ({ fetchResult }) => (
    <>
        {fetchResult.map((v) => (
            <Card
                hoverable={true}
                style={{ margin: '10px 0' }}
                bordered={false}
            >
                <Row wrap={false}>
                    {imageUrl ? (
                        <Col span={8} style={RankCardStyle}>
                            <Image width="100%" src={v?.coverImgUrl} />
                        </Col>
                    ) : null}
                    <Col span={16}>
                        <Card
                            style={RankCardStyle}
                            bordered={false}
                            actions={[<code>{}</code>]}
                        >
                            <h4>{v?.title}</h4>
                        </Card>
                    </Col>
                </Row>
            </Card>
        ))}
    </>
);

const RankCard: renderFetchResult<AjaxJson.video[]> = ({ fetchResult }) => (
    <>
        {fetchResult.map((v) => (
            <Card
                hoverable={true}
                style={{ margin: '10px 0' }}
                bordered={false}
            >
                <Row wrap={false}>
                    {imageUrl ? (
                        <Col span={8} style={RankCardStyle}>
                            <Image width="100%" src={v?.coverImgUrl} />
                        </Col>
                    ) : null}
                    <Col span={16}>
                        <Card
                            style={RankCardStyle}
                            bordered={false}
                            actions={[CardAction<AjaxJson.video>(v)]}
                        >
                            <h4>{v?.title}</h4>
                        </Card>
                    </Col>
                </Row>
            </Card>
        ))}
    </>
);

const VideosGrid: FC = () => {
    return (
        <Row>
            <Col span={20} offset={2} style={{ padding: 45 }}>
                <Divider orientation="left">
                    <h2>{'VIDEO'}</h2>
                </Divider>
                <Row wrap={false}>
                    <Col span={16} style={{ padding: 5 }}>
                        {FetchFC([
                            {
                                url: baseurl + '/videos/recommend',
                                option: { method: 'post' },
                            },
                            VideoCard,
                        ])}
                    </Col>
                    <Col span={8} style={{ padding: 5 }}>
                        {FetchFC([
                            {
                                url: baseurl + '/videos/rank',
                                option: { method: 'post' },
                            },
                            RankCard,
                        ])}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default VideosGrid;
