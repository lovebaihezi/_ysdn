import { Button, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserDetail } from '../../auth';
import EventSourceMessage from '../EventSourceMessage';
import { MenuLink } from '../MenuLink';
import Searcher from '../search';
import UserLink from '../userLink';

import './NavBar.css';

const route = ['index', 'articles', 'videos', 'QAs', 'activities'];

export default function NavBar() {
    const [info] = useUserDetail();
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
                    <>
                        <EventSourceMessage />
                        <UserLink user={info} />
                    </>
                ) : (
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                )}
            </Col>
        </Row>
    );
}
