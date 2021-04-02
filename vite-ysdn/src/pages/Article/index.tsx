import { Card, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { Link, useRouteMatch } from 'react-router-dom';
import Tags from './tags';
import All from './All';

const tags = ['all', ''];

export default function Article() {
    const { path, url } = useRouteMatch();
    useEffect;
    return (
        <>
            <Row style={{ position: 'sticky', top: 0, margin: '0 7%' }}>
                {tags.map((tag) => (
                    <Col key={tag}>
                        <Link to={`${url}/tags/${tag}`}>
                            <div style={{ padding: '4px 14px' }}>{tag}</div>
                        </Link>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col span={22} offset={1}>
                    <Switch>
                        <Route exact path={`${path}`}>
                            <All />
                        </Route>
                        <Route path={`${path}/tags/:tag`}>
                            <Tags />
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </>
    );
}
