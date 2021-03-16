import {
    Divider,
    Card,
    Row,
    CardProps,
    Skeleton,
    Result,
    Button,
    Col,
} from 'antd';
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
<<<<<<< HEAD
    width: 'calc(33.33vw - 36px)',
    minWidth: 320,
    height: 375,
    margin: '0 6px',
=======
    height: '100%',
>>>>>>> a7221aff0866d504abae87ff024f6e323247e629
    cursor: 'pointer',
    overflow: 'hidden',
};

const CardContent: FC<{ title: string; i: number } & CardProps> = props => {
    const [[renderContent, loading], E, F, C, A] = useAjaxJson<
        Partial<monographic>
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
    return (
        <Link
            to={`/Monographic/${props.i}`}
            onClick={e => {
                if (loading || E) {
                    e.preventDefault();
                }
            }}
        >
            <Card
                style={CardStyle}
                loading={loading}
                title={props.title}
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
                    <code>{E}</code>
                ) : (
                    <code>{renderContent?.content ?? 'no content'}</code>
                )}
            </Card>
        </Link>
    );
};

// TODO : hook need update !
export default function Monographic() {
    const [[renderContent, loading], E, F, C, A] = useAjaxJson<[string]>([]);
    const GetCounts = useCallback(async () => {
        await F(baseurl + '/render/Monographic/all', {
            method: 'post',
        }).catch(C);
    }, [C, F]);
    useEffect(() => {
        GetCounts();
        return () => A();
    }, [A, GetCounts]);
    return (
<<<<<<< HEAD
        <div style={{ overflow: 'hidden', padding: '50px' }}>
            <Divider orientation="left">
                <h2>{Monographic.name}</h2>
            </Divider>
            <Row
                style={{
                    width: 'max-content',
                    height: 375,
                }}
                wrap={false}
            >
                {loading
                    ? [
                          <Col key="loading Skeleton">
                              <div style={{ width: 'calc(100vw - 100px)' }}>
                                  <Skeleton active />
                              </div>
                          </Col>,
                      ]
                    : E
                    ? [
                          <Col key="Error">
                              <Result
                                  status="error"
                                  title={E?.message ?? 'Error'}
                                  style={{ width: 'calc(100vw - 100px)' }}
                                  subTitle="Sorry, web connect error"
                                  extra={
                                      <>
                                          <code>{E?.message}</code>
                                          <Button
                                              onClick={() => {
                                                  GetCounts();
                                              }}
                                          >
                                              Reload
                                          </Button>
                                      </>
                                  }
                              />
                          </Col>,
                      ]
                    : renderContent.map((_, i) => (
                          <Col key={i}>
                              <CardContent
                                  // key={i}
                                  title={_ ?? 'loading'}
                                  i={i}
                              />
                          </Col>
                      ))}
            </Row>
        </div>
=======
        <Row style={{ padding: 45 }}>
            <Col span={20} offset={2} style={{ overflow: 'hidden' }}>
                <Divider orientation="left">
                    <h2>{Monographic.name}</h2>
                </Divider>
                <Row
                    style={{
                        height: 275,
                        padding: '6px 0',
                    }}
                    wrap={false}
                >
                    {loading ? (
                        <Col key="loading Skeleton">
                            <Skeleton active />
                        </Col>
                    ) : E ? (
                        <Col key="Error">
                            <Result
                                status="error"
                                title={E?.message ?? 'Error'}
                                subTitle="Sorry, web connect error"
                                extra={
                                    <>
                                        <code>{E?.message}</code>
                                        <Button
                                            onClick={() => {
                                                GetCounts();
                                            }}
                                        >
                                            Reload
                                        </Button>
                                    </>
                                }
                            />
                        </Col>
                    ) : (
                        renderContent.map((_, i) => (
                            <Col key={i} span={6} style={{ padding: '0 6px' }}>
                                <CardContent
                                    // key={i}
                                    title={_ ?? 'loading'}
                                    i={i}
                                />
                            </Col>
                        ))
                    )}
                </Row>
            </Col>
        </Row>
>>>>>>> a7221aff0866d504abae87ff024f6e323247e629
    );
}
