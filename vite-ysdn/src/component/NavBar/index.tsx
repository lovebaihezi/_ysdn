import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuLink } from '../MenuLink';
import Searcher from '../search';

import './NavBar.css';

const route = ['index', 'articles', 'videos', 'QAs', 'activites'];

export default function NavBar() {
    return (
        <Row className='NavBar'>
            <Col span={4}>LOGO</Col>
            <Col span={10}>
                <Row>
                    {route.map((v) => (
                        <Col className="MenuLink" key={v}>
                            <MenuLink to={`/${v}`}>{v}</MenuLink>
                        </Col>
                    ))}
                </Row>
            </Col>
            <Col span={10}>
                <Row>
                    <Col span={18}>
                        <Searcher />
                    </Col>
                    <Col span={6}>123</Col>
                </Row>
            </Col>
        </Row>
    );
}
