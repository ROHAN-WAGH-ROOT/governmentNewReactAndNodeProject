import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Col, Collapse, List, Row, Avatar, Typography, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import BASE_URL from '../util/constant';
import AddServices from './AddServices';
import { useNavigate } from 'react-router';

const ListServices = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const token = localStorage.getItem('token');
    const getServices = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${BASE_URL}service`,
                headers: { Authorization: `Bearer ${token}` }
            });
            setServices(res?.data?.services);
        } catch (error) {
            message.info(error);
        }
    }
    const deleteService = async (id) => {
        const res = await axios({
            method: 'delete',
            url: `${BASE_URL}service/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        }).then(getServices());
    }


    useEffect(() => {
        getServices();
    }, []);
    return (
        <div className="site-card-wrapper">
            <Row gutter={[16, 16]}>
                {
                    services.map(services => (
                        <Col key={services._id} span={8} >
                            <Card actions={[
                                <DeleteOutlined onClick={() => deleteService(services._id)}
                                    key="setting" />,
                                <EditOutlined onClick={() => navigate(`/add-services/${services._id}`)} />
                            ]}
                                hoverable title={services?.name} bordered={false}>
                                <Row>
                                    <Col span={6}>
                                        <img width={30} height={40} src={BASE_URL + services?.image} alt={"avtar"} />
                                    </Col>
                                    <Col span={18}>
                                        <div style={{ display: 'inline-flex' }}><label>Type : </label>
                                            <div>{services?.type}</div>
                                        </div><br />
                                        <div style={{ display: 'inline-flex' }}><label>Price : </label>
                                            <div>{services?.price}</div>
                                        </div><br />
                                        <div style={{ display: 'inline-flex' }}><label>Description : </label>
                                            <div>{services?.description}</div>
                                        </div>
                                    </Col>
                                </Row><br />
                                <Collapse bordered={false} defaultActiveKey={[]}>
                                    <Collapse.Panel header={<Typography.Text strong>Documents required</Typography.Text>} key="1">
                                        <List
                                            itemLayout="vertical"
                                            dataSource={[{ title: "Adhar card", isXerox: false, copies: 4, description: "Ant Design, a design language for background applications, is refined by Ant UED Team" }]}
                                            renderItem={item => (
                                                <List.Item >
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item.image} />}
                                                        title={item.title}
                                                        description={item.description}
                                                    >
                                                    </List.Item.Meta>
                                                    <Typography.Text >
                                                        Is original required ? : {item?.requiredDocuments?.isXerox ? "Yes" : "No"}
                                                    </Typography.Text>
                                                </List.Item>
                                            )}
                                        />
                                    </Collapse.Panel>
                                </Collapse>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div >
    )
};
export default ListServices;