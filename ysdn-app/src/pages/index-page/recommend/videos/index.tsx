import { Card, Col, Row, Skeleton, Image, Result, Divider } from 'antd';
import { FC, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { baseurl } from '../../../../auth';
import { useAjaxJson } from '../../../../tools/hook/useFetch';
// import {
//     LoadingOutlined,
//     RedoOutlined,
//     CheckOutlined,
// } from '@ant-design/icons';
import { CSSProperties } from 'react';

const imageUrl = 'picture/data-analyze.png';

const RankCardStyle: CSSProperties = {
    height: 98,
    padding: 5,
    overflow: 'hidden',
};

type videoType = {
    title: string;
    briefIntro: string;
    image: string;
    author: string;
    like: string;
    comment: string;
    mark: string;
};

const CardList: FC<{ url: string }> = ({ url }) => {
    const [[Rank, loading], E, F, C, A] = useAjaxJson<Array<videoType>>([]);
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
                Rank.map(video => (
                    <Card
                        bordered={false}
                        actions={[<code>{}</code>]}
                        key={video?.title}
                        hoverable={true}
                        style={{ margin: 4 }}
                    >
                        <Row wrap={false}>
                            {imageUrl ? (
                                <Col span={4} style={RankCardStyle}>
                                    <Image width="100%" src={video?.image} />
                                </Col>
                            ) : null}
                            <Col span={20} style={RankCardStyle}>
                                <h4>{video?.title}</h4>
                            </Col>
                        </Row>
                    </Card>
                ))
            )}
        </Card>
    );
};

const VideosGrid: FC = () => {
    return (
        <Row>
            <Col span={20} offset={2} style={{ padding: 45 }}>
                <Divider orientation="left">
                    <h2>{'Videos'}</h2>
                </Divider>
                <Row>
                    <Col span={16} style={{ padding: '5px' }}>
                        <CardList url={'/videos/recommend'} />
                    </Col>
                    <Col span={8} style={{ padding: '5px' }}>
                        <CardList url={'/videos/rank'} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default VideosGrid;
