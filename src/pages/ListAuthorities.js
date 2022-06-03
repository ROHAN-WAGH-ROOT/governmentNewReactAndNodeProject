import { Card, Col, message, Row, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../util/api';
import BASE_URL from '../util/constant';

const ListAuthorities = () => {
    const [authorities, setAuthorities] = useState([]);
    const token = localStorage.getItem('token');
    const getAuthorities = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${BASE_URL}authorities`,
                headers: { Authorization: `Bearer ${token}` }
            });
            setAuthorities(res?.data?.authorities || [])
        } catch (error) {
            message.info(error);
        }
    }
    useEffect(() => {
        getAuthorities();
    }, []);
    return (
        <div className="site-card-wrapper">
            <Row gutter={[16, 16]}>
                {
                    authorities.map(authority => (
                        <Col xl={8} md={8} sm={12} xs={24}>
                            <Card hoverable title={authority?.name} bordered={false}>
                                <Row>
                                    <Col span={6}>
                                        <img width={30} height={40} src={BASE_URL + authority?.image[0]} alt={"avtar"} />
                                    </Col>
                                    <Col span={18}>
                                        <Typography.Text>
                                            Email : {authority?.email}
                                        </Typography.Text> <br />
                                        <Typography.Text>
                                            Phone : {authority?.phone}
                                        </Typography.Text>

                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div >
    )
};
export default ListAuthorities;