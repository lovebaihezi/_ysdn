import { Button, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserDetail } from '../../auth';
import AvatarLink from '../avatarLink';
import { MenuLink } from '../MenuLink';
import Searcher from '../search';

import './NavBar.css';

const route = ['index', 'articles', 'videos', 'QAs', 'activities'];

export default function NavBar() {
    const [info] = useUserDetail();
    return (
        <Row className="NavBar outSide">
            <Col span={4}>
                <h1  className="Split" style={{ margin: 0 }}>LOGO</h1>
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
            <Col span={10}>
                <Row className="Split">
                    <Col span={14}>
                        <Searcher />
                    </Col>
                    <Col span={6} offset={2}>
                        {info ? (
                            <AvatarLink
                                name={info.nickname}
                                src={info.avatarUrl}
                                to={`/user/${info.username}`}
                            />
                        ) : (
                            <Link to="/login">
                                <Button>Login</Button>
                            </Link>
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
