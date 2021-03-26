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
    padding: 5,
    overflow: 'hidden',
};

const RankCard: renderFetchResult<AjaxJson.article[]> = ({ fetchResult }) => (
    <>
        {fetchResult.map((v) => (
            <Card
                key={v.id.toString()}
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
                            actions={[CardAction<AjaxJson.article>(v)]}
                            key={v?.title}
                        >
                            <h4>{v?.title}</h4>
                        </Card>
                    </Col>
                </Row>
            </Card>
        ))}
    </>
);

const ArticleCard: renderFetchResult<AjaxJson.article[]> = ({
    fetchResult,
}) => (
    <>
        {fetchResult.map((v) => (
            <Card
                key={v?.id?.toString()}
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
                            actions={[CardAction<AjaxJson.article>(v)]}
                            key={v?.title}
                        >
                            <h4>{v?.title}</h4>
                        </Card>
                    </Col>
                </Row>
            </Card>
        ))}
    </>
);

const ArticlesGrid: FC = () => {
    return (
        <Row>
            <Col span={20} offset={2} style={{ padding: 45 }}>
                <Divider orientation="left">
                    <h2>{'Articles'}</h2>
                </Divider>
                <Row wrap={false}>
                    <Col span={16} style={{ padding: '5px' }}>
                        {FetchFC([
                            {
                                url: baseurl + '/articles/recommend',
                                option: { method: 'post' },
                            },
                            ArticleCard,
                        ])}
                    </Col>
                    <Col span={8} style={{ padding: '5px' }}>
                        {FetchFC([
                            {
                                url: baseurl + '/articles/rank',
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

export default ArticlesGrid;
