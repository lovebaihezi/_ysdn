import { Button, Col, Popover, Row, Divider } from 'antd';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useUserDetail } from '../../auth';
import EventSourceMessage from '../EventSourceMessage';
import { MenuLink } from '../MenuLink';
import MessageBox from '../MessageBox';
import Searcher from '../Search';
import UserLink from '../UserLink';

import './NavBar.css';

const route = ['index', 'articles', 'videos', 'activities'];

const translate = ['主页', '文章', '视频', '动态'];

export default function NavBar() {
    const [info, clear] = useUserDetail();
    const H = useHistory();
    return (
        <Row className="NavBar outSide">
            <Col span={22} offset={1}>
                <Row style={{ height: '100%' }}>
                    <Col style={{ width: 'max-content' }}>
                        <h1 className="Split" style={{ margin: 0 }}>
                            LOGO
                        </h1>
                    </Col>
                    <Col span={10} offset={2}>
                        <Row className="Split">
                            {route.map((v, index) => (
                                <>
                                    <Col className="MenuLink" key={v}>
                                        <MenuLink to={`/${v}`}>
                                            {translate[index]}
                                        </MenuLink>
                                    </Col>
                                    {index === route.length - 1 ? null : (
                                        <Divider
                                            style={{
                                                height: '25%',
                                                borderRight: '1px solid black',
                                            }}
                                            type="vertical"
                                        />
                                    )}
                                </>
                            ))}
                        </Row>
                    </Col>
                    <Col flex="auto">
                        <Row justify="end" style={{ height: '100%' }}>
                            <Col
                                span={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Searcher />
                            </Col>
                            <Col
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 'max-content',
                                }}
                            >
                                {info ? (
                                    <Popover
                                        placement="bottom"
                                        content={
                                            <Popover
                                                trigger="click"
                                                placement="bottom"
                                                content={
                                                    <Button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            localStorage.removeItem(
                                                                'id',
                                                            );
                                                            H.replace('/');
                                                            clear(null);
                                                        }}
                                                    >
                                                        确定
                                                    </Button>
                                                }
                                            >
                                                <Button type="primary">
                                                    退出
                                                </Button>
                                            </Popover>
                                        }
                                    >
                                        <div>
                                            <MessageBox />
                                            <UserLink user={info} />
                                        </div>
                                    </Popover>
                                ) : (
                                    <Link to="/login">
                                        <Button>登录</Button>
                                    </Link>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
