import * as React from 'react';
import { Col, Menu, Row } from 'antd';
import { useAuth } from '../../auth';
import { Link } from 'react-router-dom';
import Logo from '../../FC/Logo';
import { BellFilled } from '@ant-design/icons';

const LoginButton: React.FC<any> = () => <Link to="/login">login</Link>;
const UserIconButton: React.FC<any> = () => (
    <Row wrap={false}>
        <Col>
            <BellFilled />
        </Col>
    </Row>
);

export default function HeadBar() {
    const user = useAuth();
    return (
        <Menu selectedKeys={[]} mode="horizontal">
            <Menu.Item>
                <Link to="/">
                    <strong>
                        <Logo />
                        YST
                    </strong>
                </Link>
            </Menu.Item>
            <Menu.Item>Articles</Menu.Item>
            <Menu.Item>Videos</Menu.Item>
            <Menu.Item>Monographic</Menu.Item>
            <Menu.Item>Q.A.</Menu.Item>
            <Menu.Item style={{ float: 'right' }}>
                {user ? <UserIconButton /> : <LoginButton />}
            </Menu.Item>
        </Menu>
    );
}
