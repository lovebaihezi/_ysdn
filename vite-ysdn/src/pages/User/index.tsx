import { FC } from 'react';
import React from 'react';
import { Row, Col, Image } from 'antd';
import { AjaxJson } from '../../interface';
import { Route, useRouteMatch, Switch } from 'react-router';
import { Link } from 'react-router-dom';
const UserInformation: FC<{ user: AjaxJson.user }> = ({ user }) => {
    return (
        <Row>
            <Col span={20} offset={2}>
                <Row>
                    <Col span={24}>
                        <Image
                            height={200}
                            src={user.informationBackImageUrl ?? ''}
                        />
                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={2}>
                                <Link to={`/${user.Account.auth}/articles`}>
                                    Articles
                                </Link>
                            </Col>
                            <Col span={2}>
                                <Link to={`/${user.Account.auth}/videos`}>
                                    Videos
                                </Link>
                            </Col>
                            <Col span={2}>
                                <Link to={`/${user.Account.auth}/QA`}>
                                    Q.A.
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Switch>
                                    <Route
                                        exact
                                        path={`/${user.Account.auth}/articles`}
                                    ></Route>
                                    <Route
                                        exact
                                        path={`/${user.Account.auth}/videos`}
                                    ></Route>
                                    <Route
                                        exact
                                        path={`/${user.Account.auth}/QA`}
                                    ></Route>
                                </Switch>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default function User() {
    const para = useRouteMatch();
}
