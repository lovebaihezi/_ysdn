import { Row, Col } from 'antd';
import React, { FC, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ChooseTags from './chooseTag';
import CompleteInformation from './completeInformation';
import RegisterForm from './Form';
//TODO : treat tabChoose as part of Register not in pages route!

const Middle: FC = ({ children }) => (
    <Col
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 560,
            minHeight: 500,
        }}
        span={24}
    >
        {children}
    </Col>
);

export default function Register() {
    const { path } = useRouteMatch();
    return (
        <Row>
            <Switch>
                <Route exact path={path}>
                    <Col
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        span={24}
                    >
                        <img style={{ height: '100%' }} src="picture/b3.svg" />
                    </Col>
                    <Middle>
                        <RegisterForm />
                    </Middle>
                </Route>
                <Route path={`${path}/chooseTags`}>
                    <ChooseTags />
                </Route>
                <Route path={`${path}/completeInformation`}>
                    <Middle>
                        <CompleteInformation />
                    </Middle>
                </Route>
            </Switch>
        </Row>
    );
}
