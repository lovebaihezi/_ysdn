import { Row, Col, Image } from 'antd';
import React, { FC } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { AjaxJson } from '../../../interface';

const defaultBg = '';

const UserInformation: FC<{ user: AjaxJson.userPageInfo }> = ({ user }) => {
    return (
        <Row>
            <Col span={20} offset={2}>
                <Row>
                    <Col span={24}>
                        <Image
                            height={200}
                            src={user.informationBackImageUrl ?? defaultBg}
                        />
                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={2}>
                                <Link to={`/${user.id}/articles`}>
                                    Articles
                                </Link>
                            </Col>
                            <Col span={2}>
                                <Link to={`/${user.id}/videos`}>Videos</Link>
                            </Col>
                            <Col span={2}>
                                <Link to={`/${user.id}/QA`}>Q.A.</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Switch>
                                    <Route
                                        exact
                                        path={`/${user.id}/articles`}
                                    ></Route>
                                    <Route
                                        exact
                                        path={`/${user.id}/videos`}
                                    ></Route>
                                    <Route
                                        exact
                                        path={`/${user.id}/QA`}
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

export default UserInformation;
