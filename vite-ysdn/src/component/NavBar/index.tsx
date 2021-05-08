import { Button, Col, Popover, Row } from 'antd';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useUserDetail } from '../../auth';
import EventSourceMessage from '../EventSourceMessage';
import { MenuLink } from '../MenuLink';
import Searcher from '../Search';
import UserLink from '../UserLink';

import './NavBar.css';

const route = ['index', 'articles', 'videos', 'QAs', 'activities'];

export default function NavBar() {
    const [info, clear] = useUserDetail();
    const H = useHistory();
    return (
        <Row className="NavBar outSide">
            <Col span={4}>
                <h1 className="Split" style={{ margin: 0 }}>
                    LOGO
                </h1>
            </Col>
            <Col span={10}>
                <Row className="Split">
                    {route.map((v) => (
                        <Col className="MenuLink" key={v}>
                            <MenuLink to={`/${v}`}>{v.toUpperCase()}</MenuLink>
                        </Col>
                    ))}
                </Row>
            </Col>
            <Col
                span={5}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Searcher />
            </Col>
            <Col
                span={5}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                                            localStorage.removeItem('id');
                                            H.replace('/');
                                            clear(null);
                                        }}
                                    >
                                        sure
                                    </Button>
                                }
                            >
                                <Button type="primary">log out</Button>
                            </Popover>
                        }
                    >
                        <div>
                            <UserLink user={info} />
                        </div>
                    </Popover>
                ) : (
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                )}
            </Col>
        </Row>
    );
}
