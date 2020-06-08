import React, {Component} from 'react';
import {connect} from 'umi';
import {Modal, Button} from 'antd';
import {PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import {showResMsg} from '@/utils/request';
import {PageUtil} from '@/utils/pageUtil';
import getColumns from "@/pages/blog/category/column";
import OperCategoryModal from "@/pages/blog/category/OperCategoryModal";
import {deleteById} from "@/pages/blog/category/services";

const {confirm} = Modal;

@connect((state) => state.category)
export default class YList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: PageUtil.createPagination(this.pageOnChange),
            selectCategory: {},
            modalVisible: false,
            categoryList: []
        };
    }

    componentDidMount = () => {
        this.getCategoryList();
    }

    getCategoryList() {
        let that = this;
        this.props.dispatch({
            type: 'category/getCategoryList',
            payload: {
                success: (res) => {
                    that.setState({
                        categoryList: res
                    });
                }
            },
        });
    }

    pageOnChange = (currentPage) => {
        this.setState({
            pagination: {
                ...this.state.pagpagination,
                currentPage
            }
        })
    }

    openOperModal = (modalVisible, selectCategory) => {
        this.setState({
            modalVisible: modalVisible,
            selectCategory: selectCategory
        });
    };

    showDeleteConfirm = ({id: categoryId, name}) => {
        confirm({
            title: '是否删除分类:' + name,
            icon: <ExclamationCircleOutlined/>,
            okText: '确认删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteById({categoryId: categoryId}).then((res) => {
                    showResMsg(res, () => location.reload());
                });
            },
        });
    }
    addCategory = (category) => {
        this.props.dispatch({
            type: 'category/addCategory',
            payload: {
                data: {
                    selectCategory: category
                },
                success: (res) => {
                }
            },
        });
    }

    render() {
        let columns = getColumns(this.openOperModal, this.showDeleteConfirm),
            {modalVisible, selectCategory, categoryList, pagination} = this.state,
            {loading} = this.props,
            openOperModal = this.openOperModal;
        return (
            <>
                <ProTable
                    search={false}
                    columns={columns}
                    rowKey={(category) => category.name}
                    dataSource={categoryList}
                    pagination={pagination}
                    loading={loading}
                    options={false}
                    toolBarRender={() => [
                        <Button
                            icon={<PlusOutlined/>}
                            type="primary"
                            onClick={() => openOperModal(true)}
                        > 新建
                        </Button>,
                    ]}
                />
                {
                    modalVisible ? (
                        <OperCategoryModal
                            categoryList={categoryList}
                            selectCategory={selectCategory}
                            visible={modalVisible}
                            onSubmit={this.addCategory}
                            onCancel={() => this.openOperModal(false, {})}
                        />
                    ) : <></>
                }
            </>
        );
    }
}
