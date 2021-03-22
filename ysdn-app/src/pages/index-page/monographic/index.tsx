import { Divider, Card, Row, CardProps, Skeleton, Result, Button, Col } from 'antd';
import { useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { baseurl } from '../../../auth';
import { monographic } from '../../../interface';
import { FC } from 'react';
import { FetchFC, renderFetchResult } from '../../../FC/FetchFC';

// TODO : add styles
const CardContent: renderFetchResult<Array<Partial<monographic>>> = ({ fetchResult }) => {
    return useMemo(
        () => (
            <>
                {fetchResult.map((v) => (
                    <Col key={v?.title} span={6} style={{ padding: 10 }}>
                        <Card style={{ height: '100%' }}>
                            <p>{JSON.stringify(v)}</p>
                        </Card>
                    </Col>
                ))}
            </>
        ),
        [fetchResult]
    );
};

// TODO : hook need update !
export default function Monographic() {
    return (
        <Row style={{ padding: 45 }}>
            <Col span={20} offset={2} style={{ overflow: 'hidden' }}>
                <Divider orientation='left'>
                    <h2>{Monographic.name}</h2>
                </Divider>
                <Row
                    style={{
                        height: 275,
                        padding: '6px 0',
                    }}
                    wrap={false}
                >
                    {FetchFC<Array<Partial<monographic>>>([
                        { url: baseurl + '/render/Monographic/all', option: { method: 'post' } },
                        CardContent,
                    ])}
                </Row>
            </Col>
        </Row>
    );
}
