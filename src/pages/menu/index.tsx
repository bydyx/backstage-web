import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal,Button } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import OperModal from './components/OperModal';
import { deleteMenu } from '@/services/menu';
import { showResMsg } from '@/utils/request';
const { confirm } = Modal;

function showDeleteConfirm(menu) {
    confirm({
        title: '是否删除菜单:' + menu.name,
        icon: <ExclamationCircleOutlined />,
        okText: '确认删除',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            deleteMenu(menu)
                .then((res)=>{
                    showResMsg(res,()=>location.reload());
                })
        },
    });
}

const columns = [
    {
        align: 'left',
        title: '名称',
        dataIndex: 'name',
        width: '20%',
    },
    {
        align: 'left',
        title: '图标',
        dataIndex: 'icon',
        width: '20%',
    },
    {
        align: 'left',
        title: '页面路径',
        dataIndex: 'path',
    },
    {
        align: 'center',
        title: '操作',
        render: (item) => (
            <span>
                <a key="edit" onClick={(e) => openOperModal(true,item)}>
                    编辑
                </a>
                <a key="delete" onClick={() => showDeleteConfirm(item)}>
                    删除
                </a>
            </span>
        ),
    },
];
let openOperModal ;
function MenuTable(props) {
    const { dispatch } = props;
    const [menuList, setMenuList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectMenu, setSelectMenu] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        hideOnSinglePage: true,
        onChange: (e) => {
            let current = e;
            setPagination({ ...pagination, current });
        },
    });

    const submit = (values) => {
        dispatch({
            type: 'menu/add',
            payload: values,
        });
    };

    openOperModal = (visible: boolean,selectMenu) => {
        setVisible(visible);
        setSelectMenu(selectMenu);
    };
    useEffect(() => {
        dispatch({
            type: 'menu/getMenuList',
            payload: setMenuList,
        });
    }, []);
    return (
        <>
            <ProTable
                search={false}
                columns={columns}
                rowKey={(menu) => menu.name}
                dataSource={menuList}
                pagination={pagination}
                loading={loading}
                options={false}
                toolBarRender={() => [
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => openOperModal(true)}
                    >
                        新建
                    </Button>,
                ]}
            />
            <OperModal
                selectMenu={selectMenu}
                visible={visible}
                onSubmit={submit}
                onCancel={() => openOperModal(false)}
            />
        </>
    );
}

export default connect()(MenuTable);
