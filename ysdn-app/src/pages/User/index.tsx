import { FC } from 'react';
import { Row, Col, Image, Spin } from 'antd';
import { objectId, user } from '../../interface';
import { UserContainer } from '../../auth/container';
import { Redirect } from 'react-router';
import { useAuth } from '../../auth';
const UserInformation: FC<{ user: user & objectId }> = ({ user }) => {
    return (
        <Row>
            <Col span={20} offset={2}>
                <Row>
                    <Col>
                        <Image height={200} src='' />
                    </Col>
                    <Col>
                        <Row></Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default function User() {
    const user = useAuth();
    return <UserContainer Except={<Redirect to='/login' />}>{user && <UserInformation user={user} />}</UserContainer>;
}
