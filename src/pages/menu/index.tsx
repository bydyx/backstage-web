import React, { useState, useEffect } from 'react';
import { connect } from 'umi';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import OperModal from './components/OperModal';
const columns = [
    {
        title: '名称',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: '图标',
        dataIndex: 'icon',
        width: '20%',
    },
    {
        title: '页面路径',
        dataIndex: 'path',
    },
    {
        title: '操作',
        render: (item) => (
            <span>
                <a
                    key="edit"
                    onClick={(e) => {
                        console.info(e);
                        console.info(item);
                    }}
                >
                    编辑
                </a>
            </span>
        ),
    },
];

function MenuTable(props) {
    const { dispatch } = props;
    const [menuList, setMenuList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 2,
        hideOnSinglePage: true,
        onChange: (e) => {
            let current = e;
            setPagination({ ...pagination, current });
        },
    });

    const openOperModal = (visible: boolean) => {
        setVisible(visible);
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
            <OperModal visible={visible} onCancel={() => openOperModal(false)} />
        </>
    );
}

export default connect()(MenuTable);
