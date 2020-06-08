import React, {Component} from "react";
import {Form, Input, Modal, TreeSelect} from "antd";
import {connect} from "umi";
import {FormInstance} from "antd/lib/form";
import {PageUtil} from "@/utils/pageUtil";

const {TreeNode} = TreeSelect;

function getSelectTree(categoryList) {
    let map = new Map();
    categoryList.forEach(item => {
        item.parentId = PageUtil.isUndefinedOrNull(item.parentId) ? item.parentId : -1;
        let array = map.get(item.parentId);
        if (PageUtil.isUndefinedOrNull(array)) {
            array = new Array();
            map.set(item.parentId, array);
        }
        array.push(item);
    });
    return categoryList.map(item => {
        return (
            <TreeNode key={item.id} value={item.id} title={item.name}>
                {PageUtil.isUndefinedOrNull(item.parentId) || getSelectTree(item.children)}
            </TreeNode>
        )
    })
}

@connect((state) => state.category)
export default class OperCategoryModal extends Component {
    formRef = React.createRef<FormInstance>();

    constructor(props) {
        super(props);
    }

    state = {
        selectCategory: {}
    }

    componentWillMount() {
        this.updateCategory();
    }

    updateCategory() {
        let {selectCategory = {}} = this.props;
        this.setState({
            selectCategory: selectCategory
        });
        console.info(selectCategory)
    }

    submit = (values) => {
        this.props.dispatch({
            type: 'category/addCategory',
            payload: this.state.selectCategory
        });
    }
    parentOnChange = (parentId) => {
        this.setState({
            selectCategory: {...this.state.selectCategory, parentId: parentId}
        })
    }
    nameOnChange = (e) => {
        this.setState({
            selectCategory: {...this.state.selectCategory, name: e.target.value}
        })
    }

    render() {
        let {selectCategory} = this.state,
            {categoryList, visible, onCancel} = this.props;
        return (
            <Modal
                title="新建分类"
                visible={visible}
                hideRequiredMark={true}
                onOk={this.submit}
                onCancel={() => onCancel()}
            >
                <Form
                    ref={this.formRef}
                    labelCol={{span: 5}}
                    initialValues={selectCategory}
                    wrapperCol={{span: 15}}
                >
                    <Form.Item
                        label="名称"
                        name="name"
                        rules={[{required: true, message: '请输入至少一个字符！', min: 1}]}
                    >
                        <Input onChange={this.nameOnChange} placeholder="请输入"/>
                    </Form.Item>
                    <Form.Item
                        label="父级"
                        name="parentId"
                    >
                        <TreeSelect
                            allowClear
                            treeDefaultExpandAll
                            onChange={this.parentOnChange}
                        >
                            {getSelectTree(categoryList)}
                        </TreeSelect>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
