import { FC, useEffect } from 'react';
import { objectId, user } from '../../interface';
import { Form, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import { useAjaxJson } from '../../tools/hook/useFetch';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const RegisterForm: FC<{ setAuth: (X: user & objectId) => void }> = ({
    setAuth,
}) => {
    // const [[res, fetching], F, C] = useAjaxJson();
    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={v => {}}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: 'Please input your username!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="confirm-password"
                name="confirm-password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your confirm-password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

const RegisterPage: FC<{ setAuth: (X: user & objectId) => void }> = ({
    setAuth,
}) => (
    <>
        <RegisterForm setAuth={setAuth} />
        <Divider />
    </>
);

export default RegisterPage;
