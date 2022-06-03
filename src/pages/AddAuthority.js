import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Typography,
    Card,
    Col,
    Row,
    Upload,
    message,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import api from '../util/api';
import axios from 'axios';

const AddAuthority = () => {
    const [file, setFile] = useState();
    const [uplaodFile, setUploadFile] = useState([])
    const [form] = Form.useForm();

    let onFinish = async (values) => {
        values.image = uplaodFile.originFileObj
        let formData = new FormData();


        for (let key in values) {

            formData.append(key, values[key])
        }
        try {
            const res = await api.post('/authorities/upload', formData);
            message.info("success");
        } catch (err) {
            message.info(err);
        }
    }

    const beforeUpload = (file) => {
        setFile(file);
        const isPNG = file.type === 'image/jpg';
        if (!isPNG) {
            message.error(`${file.name} is not a jpg file`);
        }
        return isPNG || Upload.LIST_IGNORE;
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Card hoverable>
                <Col xl={24} >
                    <Form
                        form={form}
                        onFinish={onFinish}
                        style={{ padding: '10px' }}
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                    >
                        <Typography.Title>Form</Typography.Title>
                        <Form.Item name="name" rules={[{ required: true, type: 'string', message: 'Please enter Name!' }]} label="Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name='email' rules={[{ required: true, type: 'string', message: 'Please enter email!' }]} label="email">
                            <Input />
                        </Form.Item>
                        <Typography.Text>Address</Typography.Text>
                        <Form.Item name='city' style={{ marginRight: '5px' }} rules={[{ required: true, type: 'string', message: 'Please enter city!' }]} label="city">
                            <Input />
                        </Form.Item>
                        <Form.Item name='taluka' rules={[{ required: true, type: 'string', message: 'Please enter taluka!' }]} label="taluka">
                            <Input />
                        </Form.Item>
                        <Form.Item name='district' rules={[{ required: true, type: 'string', message: 'Please enter district!' }]} label="district" >
                            <Input />
                        </Form.Item>
                        <Form.Item name='pincode' rules={[{ required: true, type: 'string', message: 'Please enter pincode!' }]} label="pincode">
                            <Input />
                        </Form.Item>
                        <Form.Item name="phone" rules={[{ required: true, type: 'string', message: 'Please enter phone!' }]} label="phone">
                            <Input />
                        </Form.Item>
                        <Upload action={false} beforeUpload={beforeUpload} name='file' onChange={(e) => {

                            setUploadFile(e.file)
                        }} multiple={true} style={{ margin: '10px' }}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                band files
                            </p>
                        </Upload>
                        {/* </Form.Item> */}
                        <Button style={{ marginLeft: '10px' }} htmlType='submit'>Submit</Button>
                    </Form>
                </Col>
            </Card>
        </div >
    );
};

export default AddAuthority;