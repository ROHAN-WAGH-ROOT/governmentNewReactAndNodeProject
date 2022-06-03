import { Layout, Menu, Typography } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

function BasicLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const toggle = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "3.7rem" }}    >
                    <Typography.Title level={5} style={{ color: "#fff" }}>
                        Hello
                    </Typography.Title>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    activeKey={[window.location.pathname]}
                >
                        <Menu.Item><Link to={"/home"}>Home</Link></Menu.Item>

                    <Menu.SubMenu title="Authorities">
                        <Menu.Item key="/listauthorities"><Link to={"/listauthorities"}>List Authorities</Link></Menu.Item>
                        <Menu.Item key="/add-authorities"><Link to={"/add-authorities"}>Add Authorities</Link></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu title="Services">
                        <Menu.Item><Link to={"/listservices"}>List Services</Link></Menu.Item>
                        <Menu.Item><Link to={"/add-services"}>Add Services</Link></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item onClick={() => { localStorage.removeItem('token'); navigate('/') }}>Logout</Menu.Item>

                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        minHeight: "100vh",
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default BasicLayout;
