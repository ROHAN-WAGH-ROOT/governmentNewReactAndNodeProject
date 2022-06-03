import React, { useEffect, useState } from 'react';
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
import BASE_URL from '../util/constant';
import { useNavigate, useParams } from 'react-router';

const AddServices = () => {
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const [uplaodFile, setUploadFile] = useState([]);
    const [form] = Form.useForm();
    const [service, setService] = useState({})
    const token = localStorage.getItem('token');
    const location = useParams();

    useEffect(() => {
        if (location?.id) {
            editService(location?.id)
        }
    }, [])

    const onFinish = async (values) => {
        values.image = uplaodFile.originFileObj
        let formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key])
        }
        try {
            const res = await api.post('/service/upload', formData);
            message.info('success');
        } catch (err) {
            message.info(err);
        }
    }

    const getService = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${BASE_URL}service`,
                headers: { Authorization: `Bearer ${token}` }
            });
            setService(res?.data?.service || {})
            form.setFieldsValue({ ...service })
        } catch (error) {
            message.info(error);
        }
    }
    const editService = async (id) => {
        try {
            const res = await axios({
                method: 'get',
                url: `${BASE_URL}service/${id}`,
                headers: { Authorization: `Bearer ${token}` }
            });
            setService(res?.data?.service || {})
            form.setFieldsValue({ name: res?.data?.service?.name, type: res?.data?.service?.type, higherAuthority: res?.data?.service?.higherAuthority, price: res?.data?.service?.price, estimatedTime: res?.data?.service?.estimatedTime, description: res?.data?.service?.description, preRequisites: res?.data?.service?.preRequisites })
        } catch (error) {
            message.info(error);
        }
    }


    useEffect(() => {
        getService();
    }, []);

    const beforeUpload = (file) => {
        setFile(file);
        const isPNG = file.type === 'image/webp';
        if (!isPNG) {
            message.error(`${file.name} is not a png file`);
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
                        // initialValues={{ name: service.name }}
                        layout="horizontal"
                    >
                        <Typography.Title>Form</Typography.Title>
                        <Form.Item name="name" rules={[{ required: true, type: 'string', message: 'Please enter Name!' }]} label="Name">
                            <Input defaultChecked={service.name} />
                        </Form.Item>
                        <Form.Item name='type' rules={[{ required: true, type: 'string', message: 'Please enter type!' }]} label="Type">
                            <Input />
                        </Form.Item>
                        <Form.Item name='higherAuthority' style={{ marginRight: '5px' }} rules={[{ required: true, type: 'string', message: 'Please enter authority!' }]} label="Higher Authority">
                            <Input />
                        </Form.Item>
                        <Form.Item name='price' rules={[{ required: true, type: 'number', message: 'Please enter price!' }]} label="Price">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name='estimatedTime' rules={[{ required: true, type: 'string', message: 'Please enter estimatedTime!' }]} label="estimatedTime" >
                            <Input />
                        </Form.Item>
                        <Typography.Text>Required Documents</Typography.Text>
                        <Form.Item name='documentName' rules={[{ required: true, type: 'string', message: 'Please enter Document Name!' }]} label="Doc Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="copies" rules={[{ required: true, type: 'number', message: 'Please enter Copies!' }]} label="copies">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name="radiogroup" label="Xerox needed ?">
                            <Radio.Group defaultValue={false}>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name='description' rules={[{ type: 'string', message: 'Please enter description!' }]} label="Description">
                            <TextArea />
                        </Form.Item>
                        <Form.Item rules={[{ type: 'string', message: 'Please enter preRequisites!' }]} name='preRequisites' label="preRequisites">
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
                        <Button style={{ marginLeft: '10px' }} htmlType='submit'> {location?.id ? 'Update' : 'Submit'}</Button>
                    </Form>
                </Col>
            </Card>
        </div >
    );
};

export default AddServices;