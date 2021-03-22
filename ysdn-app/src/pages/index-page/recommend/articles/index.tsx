import { Card, CardProps, Col, Divider, Row, Skeleton, Image, Result } from 'antd';
import { FC, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { baseurl } from '../../../../auth';
import { article } from '../../../../interface';
import { useAjaxJson } from '../../../../tools/hook/useFetch';
import { LoadingOutlined, RedoOutlined, CheckOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';
import { FetchFC, renderFetchResult } from '../../../../FC/FetchFC';

const CardStyle: CSSProperties = {};
const imageUrl = 'picture/data-analyze.png';

const RankCardStyle: CSSProperties = {
    height: 98,
    padding: 5,
    overflow: 'hidden',
};

type ArticleType = {
    title: string;
    content: string;
    image: string;
    author: string;
    like: string;
    comment: string;
    mark: string;
};

const CardList: FC<{ url: string }> = ({ url }) => {
    const [[Rank, loading], E, F, C, A] = useAjaxJson<Array<ArticleType>>([]);
    useEffect(() => {
        F(baseurl + url, { method: 'post' }).catch(C);
        return () => A();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Card style={{ padding: 0 }} title={url.slice(url.lastIndexOf('/') + 1)}>
            {loading ? (
                <Skeleton active />
            ) : E ? (
                <Result />
            ) : (
                Rank.map((v) => (
                    <Card
                        bordered={false}
                        actions={[<code>{}</code>]}
                        key={v?.title}
                        hoverable={true}
                        style={{ margin: 4 }}
                    >
                        <Row wrap={false}>
                            {imageUrl ? (
                                <Col span={4} style={RankCardStyle}>
                                    <Image width='100%' src={v?.image} />
                                </Col>
                            ) : null}
                            <Col span={20} style={RankCardStyle}>
                                <h4>{v?.title}</h4>
                            </Col>
                        </Row>
                    </Card>
                ))
            )}
        </Card>
    );
};

const A: renderFetchResult<Array<ArticleType>> = ({ fetchResult }) => (
    <>
        {fetchResult.map((v) => (
            <Card bordered={false} actions={[<code>{}</code>]} key={v?.title} hoverable={true} style={{ margin: 4 }}>
                <Row wrap={false}>
                    {imageUrl ? (
                        <Col span={4} style={RankCardStyle}>
                            <Image width='100%' src={v?.image} />
                        </Col>
                    ) : null}
                    <Col span={20} style={RankCardStyle}>
                        <h4>{v?.title}</h4>
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
                <Divider orientation='left'>
                    <h2>{'Articles'}</h2>
                </Divider>
                <Row wrap={false}>
                    <Col span={16} style={{ padding: '5px' }}>
                        {FetchFC([{ url: baseurl + '/articles/recommend', option: { method: 'post' } }, A])}
                    </Col>
                    <Col span={8} style={{ padding: '5px' }}>
                        {FetchFC([{ url: baseurl + '/articles/rank', option: { method: 'post' } }, A])}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ArticlesGrid;
