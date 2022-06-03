import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import api from '../util/api';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/user';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
    const dispatch = useDispatch();
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const res = await api.post('/signUp/', values);
            setData(res?.data);
            dispatch(setUser({ token: res?.data?.token, ...res?.data?.user }))
            localStorage.setItem("token", res?.data?.token);
            if (res?.data?.status === "OK") {
                message.info(res?.data?.message);
                return navigate('/home');
            } else {
                message.info(res?.message);
            }
        } catch (err) {
            message.error(err)
        }

        // navigate('/');
    };
    const onFinishFailed = (errorInfo) => {
        message.info(errorInfo);

    };

    return (
        <Form
            style={{ margin: '30px', display: 'list-item', justifyContent: 'center' }}
            name="basic"
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 12,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

            <Form.Item
                label="firstName"
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your firstName!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="lastName"
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your lastName!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Username"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Row gutter={3}>
                    <Col ><Button type="primary" htmlType="submit">
                        SignUp
                    </Button></Col>
                    <Button type="primary" htmlType="submit">
                        Google SignIn
                    </Button>
                </Row>
                <h3>already have account? <a href='/'>SignIn</a></h3>
            </Form.Item >
        </Form >
    );
};

export default Register;