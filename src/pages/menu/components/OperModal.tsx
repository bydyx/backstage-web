import {connect} from 'umi';
import React from 'react';
import {Modal, Form, Input, Select, TreeSelect} from 'antd';
import {PageUtil} from "@/utils/pageUtil";

const {TreeNode} = TreeSelect;

const FormItem = Form.Item;

function getSelectTree(menuTree) {
    return menuTree.map((item) => {
        return (
            <TreeNode key={item.id} value={item.id} title={item.name}>
                {PageUtil.isUndefinedOrNull(item.children) || getSelectTree(item.children)}
            </TreeNode>
        )
    })
}

function OperModal(props) {
    const {visible, selectMenu = {}, dispatch, menuTree} = props;
    const [form] = Form.useForm();
    const {onSubmit: handleAdd, onCancel} = props;
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        fieldsValue.id = selectMenu.id;
        handleAdd(fieldsValue);
    };
    return (
        <Modal
            title="新建分类"
            visible={visible}
            hideRequiredMark={true}
            onOk={okHandle}
            onCancel={() => onCancel()}
        >
            <Form
                form={form}
                labelCol={{span: 5}}
                wrapperCol={{span: 15}}
                initialValues={selectMenu}
            >
                <FormItem
                    label="名称"
                    name="name"
                    rules={[{required: true, message: '请输入至少一个字符！', min: 1}]}
                >
                    <Input placeholder="请输入"/>
                </FormItem>
                <FormItem
                    label="父级"
                    name="parentId"
                >
                    <TreeSelect
                        allowClear
                        treeDefaultExpandAll
                    >
                        {getSelectTree(menuTree)}
                    </TreeSelect>
                </FormItem>
                <FormItem
                    label="路径"
                    name="path"
                    rules={[{required: true, message: '请输入至少一个字符！', min: 1}]}
                >
                    <Input placeholder="请输入"/>
                </FormItem>
            </Form>
        </Modal>
    );
}

export default connect()(OperModal);
