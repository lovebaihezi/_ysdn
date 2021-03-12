import * as React from 'react';
import { Menu } from 'antd';
import { useAuth } from '../../auth';
import { Link } from 'react-router-dom';
import Logo from '../../component/Logo';

const LoginButton: React.FC<any> = () => <Link to="/login">login</Link>;
const UserIconButton: React.FC<any> = () => <>User</>;

const leftSideStyle = {};
const rightSideStyle = {};

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
            <Menu.Item>{user ? <LoginButton /> : <UserIconButton />}</Menu.Item>
        </Menu>
    );
}
