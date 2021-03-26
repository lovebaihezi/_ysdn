import { Divider, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { baseurl } from '../../../auth';
import { AjaxJson } from '../../../interface';
import { FetchFC, renderFetchResult } from '../../../FC/FetchFC';
import CardAction from '../../../FC/Recommend';

type ActionType = Pick<
    AjaxJson.monographic,
    'read' | 'liked' | 'marked' | 'commentsAmount' | 'title'
>;

const f = (v: AjaxJson.monographic) => {
    const result =
        v?.read !== undefined &&
        v?.title !== undefined &&
        v?.liked !== undefined &&
        v?.marked !== undefined &&
        v?.commentsAmount !== undefined;
    if (result) {
        const { read, title, commentsAmount, liked, marked } = v;
        return (
            <Card
                key={v.title}
                style={{ height: '100%' }}
                hoverable={true}
                actions={[
                    CardAction<ActionType>({
                        read,
                        title,
                        commentsAmount,
                        liked,
                        marked,
                    }),
                ]}
            >
                <div style={{ height: 142 }}></div>
            </Card>
        );
    } else {
        return null;
    }
};

// TODO : add styles
const CardContent: renderFetchResult<AjaxJson.monographic[]> = ({
    fetchResult,
}) => {
    return (
        <Row wrap={false}>
            {fetchResult.map((v) =>
                v ? (
                    <Col key={v?.title} span={6} style={{ padding: 10 }}>
                        {f(v)}
                    </Col>
                ) : null,
            )}
        </Row>
    );
};

// TODO : hook need update !
export default function Monographic() {
    return (
        <Row style={{ padding: 45 }}>
            <Col span={20} offset={2} style={{ overflow: 'hidden' }}>
                <Divider orientation="left">
                    <h2>{Monographic.name}</h2>
                </Divider>
                <Row
                    style={{
                        padding: '6px 0',
                    }}
                    wrap={false}
                >
                    <Col span={24}>
                        {FetchFC<Array<AjaxJson.monographic>>([
                            {
                                url: baseurl + '/render/Monographic/all',
                                option: { method: 'post' },
                            },
                            CardContent,
                        ])}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
