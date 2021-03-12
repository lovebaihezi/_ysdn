import { Divider, Card, Row, CardProps, Skeleton, Result, Button } from 'antd';
import { useEffect, useCallback, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { baseurl } from '../../../auth';
import { monographic } from '../../../interface';
import { useAjaxJson } from '../../../tools/hook/useFetch';
import {
    LoadingOutlined,
    RedoOutlined,
    CheckOutlined,
} from '@ant-design/icons';
import { FC } from 'react';
const CardStyle: CSSProperties = {
    width: 'calc(33.33vw - 54px)',
    height: 275,
    margin: '0 6px',
    cursor: 'pointer',
};

const CardContent: FC<{ i: number } & CardProps> = props => {
    const [[renderContent, loading], E, F, C] = useAjaxJson<
        Partial<monographic>
    >({});
    const GetContent = useCallback(
        async (i: number) => {
            await F(baseurl + `/render/Monographic/${i}`, {
                method: 'post',
            }).catch(C);
        },
        [F, C]
    );
    useEffect(() => {
        GetContent(props.i);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Link
            to={loading ? '' : `/Monographic/${renderContent.title}`}
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
                                GetContent(props.i);
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
    );
};

export default function Monographic() {
    const [[renderContent, loading], E, F, C] = useAjaxJson<number>(3);
    const GetCounts = useCallback(async () => {
        await F(baseurl + '/render/Monographic', { method: 'post' }).catch(C);
    }, [F, C]);
    useEffect(() => {
        GetCounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Divider orientation="left">
                <h2>{Monographic.name}</h2>
            </Divider>
            <Row style={{ overflow: 'hidden', padding: '50px' }}>
                <Row
                    style={{
                        width: 'max-content',
                        height: 275,
                    }}
                    wrap={false}
                >
                    {loading ? (
                        <div style={{ width: 'calc(100vw - 100px)' }}>
                            <Skeleton active />
                        </div>
                    ) : E ? (
                        <Result
                            status="error"
                            title={E?.message ?? 'Error'}
                            style={{ width: 'calc(100vw - 100px)' }}
                            subTitle="Sorry, web connect error"
                            extra={<Button onClick={GetCounts}>Refresh</Button>}
                        />
                    ) : (
                        new Array(renderContent).fill(0).map((_, i) => (
                            <Row key={i}>
                                <CardContent i={i} />
                            </Row>
                        ))
                    )}
                </Row>
            </Row>
        </>
    );
}
