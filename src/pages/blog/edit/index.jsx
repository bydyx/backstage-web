import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Form, Input, Button } from 'antd';

export default function App() {
    let [content, setContent] = React.useState('');
    const [form] = Form.useForm();
    let article = {};
    return (
        <>
            <Form form={form} initialValues={article}>
                <Form.Item
                    name="title"
                    label="标题"
                    rules={[{ required: true, message: '标题长度限制为1-到36', min: 1, max: 36 }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="content"
                    rules={[
                        { required: true, message: '长度限制为10-到100000', min: 10, max: 100000 },
                    ]}
                >
                    <MDEditor height="700" onChange={setContent} />
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => onClick(form)} type="primary">提交</Button>
                </Form.Item>
            </Form>
        </>
    );
}

function onClick(form) {
    let values = form.validateFields();
    console.info(values);
}
