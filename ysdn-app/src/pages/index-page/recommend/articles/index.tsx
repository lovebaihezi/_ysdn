<<<<<<< HEAD
import { Card, CardProps, Col, Divider, Row, Skeleton, Image } from 'antd';
=======
import {
    Card,
    CardProps,
    Col,
    Divider,
    Row,
    Skeleton,
    Image,
    Result,
} from 'antd';
>>>>>>> a7221aff0866d504abae87ff024f6e323247e629
import { FC, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { baseurl } from '../../../../auth';
import { article } from '../../../../interface';
import { useAjaxJson } from '../../../../tools/hook/useFetch';
import {
    LoadingOutlined,
    RedoOutlined,
    CheckOutlined,
} from '@ant-design/icons';
import { CSSProperties } from 'react';

const CardStyle: CSSProperties = {};

<<<<<<< HEAD
// const quickSort = (array: Array<number>): Array<number> => {
//     if (array.length <= 1) {
//         return array;
//     }
//     let [pivot, ...rest] = array;
//     return [
//         ...quickSort(rest.filter(i => i <= pivot)),
//         pivot,
//         ...quickSort(rest.filter(i => i > pivot)),
//     ];
// };

const CardContent: FC<{ i: number } & CardProps> = props => {
    const [[renderContent, loading], E, F, C, A] = useAjaxJson<
        Partial<article>
    >({});
    const GetContent = useCallback(async () => {
        await F(baseurl + `/render/Monographic/${props.i}`, {
            method: 'post',
        }).catch(C);
    }, [F, props.i, C]);
    useEffect(() => {
        GetContent();
        return () => A();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // useEffect(() => A());
    return (
        <Link
            to={loading ? '' : `/articles/${renderContent.title}`}
            onClick={e => {
                if (loading || E) {
                    e.preventDefault();
                }
            }}
        >
            <Card
                style={CardStyle}
                loading={loading}
                title={loading ? 'loading' : E ? 'Error' : undefined}
                hoverable={true}
                extra={
                    loading ? (
                        <LoadingOutlined />
                    ) : E ? (
                        <RedoOutlined
                            style={{ fontSize: 18 }}
                            onClick={e => {
                                e.preventDefault();
                                GetContent();
                            }}
                        />
                    ) : (
                        <CheckOutlined />
                    )
                }
            >
                {E ? (
                    <code>{E?.message}</code>
                ) : (
                    <code>{JSON.stringify(renderContent)}</code>
                )}
            </Card>
        </Link>
=======
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
                Rank.map(v => (
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
                                    <Image width="100%" src={v?.image} />
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
>>>>>>> a7221aff0866d504abae87ff024f6e323247e629
    );
};

const ArticlesGrid: FC = () => {
<<<<<<< HEAD
    const [[Rank, loading], E, F, C, A] = useAjaxJson<
        Array<{
            title: string;
            content: string;
            image: string;
            author: string;
            like: string;
            comment: string;
            mark: string;
        }>
    >([]);
    useEffect(() => {
        F(baseurl + '/articles/recommend', { method: 'post' }).catch(C);
        return () => A();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Divider orientation="left">
                <h2>{ArticlesGrid.name.replace('Grid', '')}</h2>
            </Divider>
            <Row style={{ width: '100%', height: 825, padding: 45 }}>
                <Col style={{ width: '70%', height: '100%' }}></Col>
                <Col style={{ width: '30%', height: '100%' }}>
                    {loading ? (
                        <Skeleton active />
                    ) : (
                        Rank.map(_ => (
                            <Card
                                actions={[<code>{}</code>]}
                                key={_?.title}
                                style={{ height: 135, margin: '20px 0' }}
                            >
                                <h4 style={{ height: '1em' }}>{_?.title}</h4>
                                <Row>
                                    <Col>
                                        {' '}
                                        <Image
                                            width="50px"
                                            height="50px"
                                            src="picture/data-analyze.png"
                                        />
                                    </Col>
                                </Row>
                                <Col>
                                    <p
                                        style={{
                                            height: '100px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {_?.content}
                                    </p>
                                </Col>
                            </Card>
                        ))
                    )}
                </Col>
            </Row>
        </>
=======
    return (
        <Row>
            <Col span={20} offset={2} style={{ padding: 45 }}>
                <Divider orientation="left">
                    <h2>{'Articles'}</h2>
                </Divider>
                <Row wrap={false}>
                    <Col span={16} style={{ padding: '5px' }}>
                        <CardList url={'/articles/recommend'} />
                    </Col>
                    <Col span={8} style={{ padding: '5px' }}>
                        <CardList url={'/articles/rank'} />
                    </Col>
                </Row>
            </Col>
        </Row>
>>>>>>> a7221aff0866d504abae87ff024f6e323247e629
    );
};

export default ArticlesGrid;
