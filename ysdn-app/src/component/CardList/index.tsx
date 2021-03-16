import { Card, Col, Divider, Row, Skeleton, Image, Result } from 'antd';
import { FC, useEffect } from 'react';
import { baseurl } from '../../auth';
import { useAjaxJson } from '../../tools/hook/useFetch';
import { CSSProperties } from 'react';

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
        <Card
            style={{ padding: 0 }}
            title={url.slice(url.lastIndexOf('/') + 1)}
        >
            {loading ? (
                <Skeleton active />
            ) : E ? (
                <Result />
            ) : (
                Rank.map(article => (
                    <Card
                        bordered={false}
                        actions={[<code>{}</code>]}
                        key={article?.title}
                        hoverable={true}
                        style={{ margin: 4 }}
                    >
                        <Row wrap={false}>
                            {imageUrl ? (
                                <Col span={4} style={RankCardStyle}>
                                    <Image width="100%" src={article?.image} />
                                </Col>
                            ) : null}
                            <Col span={20} style={RankCardStyle}>
                                <h4>{article?.title}</h4>
                            </Col>
                        </Row>
                    </Card>
                ))
            )}
        </Card>
    );
};
