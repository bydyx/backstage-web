import { connect } from 'umi';
import { useState } from 'react';
import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

function OperModal(props) {
    const { visible, selectMenu={}, dispatch } = props;
    const [form] = Form.useForm();
    const { onSubmit: handleAdd, onCancel } = props;
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        handleAdd(fieldsValue);
    };
    return (
        <Modal
            title="新建菜单"
            visible={visible}
            onOk={okHandle}
            onCancel={() => onCancel()}
        >
            <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} initialValues={selectMenu}>
                <FormItem
                    label="名称"
                    name="name"
                    rules={[{ required: true, message: '请输入至少一个字符！', min: 1 }]}
                >
                    <Input placeholder="请输入" />
                </FormItem>
                <FormItem label="图标" name="icon">
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
