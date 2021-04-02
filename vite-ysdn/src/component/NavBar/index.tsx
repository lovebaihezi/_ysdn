import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuLink } from '../MenuLink';
import Searcher from '../search';

import './NavBar.css';

const route = ['index', 'articles', 'videos', 'QAs', 'activities'];

export default function NavBar() {
    return (
        <Row className="NavBar outSide">
            <Col span={4} className="Split">
                <h1 style={{ margin: 0 }}>LOGO</h1>
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
                    <Col span={18}>
                        <Searcher />
                    </Col>
                    <Col span={6}></Col>
                </Row>
            </Col>
        </Row>
    );
}
