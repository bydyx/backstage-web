import React from "react";

export default function getColumns(openOperModal, showDeleteConfirm) {
    return [
        {
            align: 'left',
            title: '名称',
            dataIndex: 'name',
            width: '20%',
        },
        {
            align: 'left',
            title: '父级',
            dataIndex: 'parentName',
        },
        {
            align: 'center',
            title: '操作',
            render: (item) => (
                <span>
                    <a key="edit" onClick={(e) => openOperModal(true, item)}>
                        编辑
                    </a>
                    <a key="delete" onClick={() => showDeleteConfirm(item)}>
                        删除
                    </a>
                </span>
            ),
        },
    ]
}
