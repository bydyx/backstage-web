import { connect } from 'umi';
import { useState } from 'react';
import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

function OperModal(props) {
    const { visible, dispatch } = props;
    const [form] = Form.useForm();

    const { onSubmit: handleAdd, onCancel } = props;
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        form.resetFields();
        handleAdd(fieldsValue);
    };
    return (
        <Modal
            destroyOnClose
            title="新建菜单"
            visible={visible}
            onOk={okHandle}
            onCancel={() => onCancel()}
        >
            <Form
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                initialValues={{}}
            >
                <FormItem
                    label="名称"
                    name="name"
                    rules={[{ required: true, message: '请输入至少一个字符的规则描述！', min: 1 }]}
                >
                    <Input placeholder="请输入" />
                </FormItem>
                <FormItem label="路径" name="path">
                    <Input placeholder="请输入" />
                </FormItem>
            </Form>
        </Modal>
    );
}

export default connect()(OperModal);
