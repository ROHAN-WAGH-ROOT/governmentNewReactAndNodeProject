import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import api from '../util/api';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/user';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();
    const user = useSelector(state => state.auth);

    const onFinish = async (values) => {
        try {
            const res = await api.post('/signUp/signIn', values, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setData(res.data);
            dispatch(setUser({ token: res.data.token, ...res.data.user }))
            localStorage.setItem("token", res?.data?.token);
            if (res?.data?.status === "OK") {
                message.info(res.data.message);
                return navigate('/home');
            } else {
                message.info(res.data.message);
            }
        } catch (err) {
            message.error(err.response.data.message)
        }
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
                    <Col ><Button onClick={() => navigate('/signUp')} type="primary" htmlType="submit">
                        SignUp
                    </Button></Col>
                    <Col>
                        <Button type="primary" htmlType="submit">
                            SignIn
                        </Button>
                    </Col>
                </Row>

                <div style={{ padding: '10px 20px' }}>
                    <Button type="primary" htmlType="submit">
                        Google SignIn
                    </Button>
                </div>
                <Typography.Text style={{ marginLeft: '10px' }}>
                    <a href='/signIn'>
                        forgot password?
                    </a>
                </Typography.Text>
            </Form.Item >
        </Form >
    );
};

export default Login;