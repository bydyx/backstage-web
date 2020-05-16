import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Form ,Input } from 'antd';

export default function App() {
    const [content, setContent] = React.useState('');
    const [form] = Form.useForm();

    return (
        <>
            <Form form={form}>
                <Form.Item
                    name="title"
                    label="标题"
                    rules={[{ required: true, message: '标题长度限制为1-到36', min: 1,max:36 }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="content">
                    <MDEditor height="600" value={content} onChange={setContent} />
                </Form.Item>
            </Form>
            <button onClick={() => onClick(form)}>提交</button>
        </>
    );
}

function onClick(form) {
    let values = form.getFieldsValue();
    console.info(values);
}
