import React from 'react';
import { MenuOutlined, FormOutlined, TableOutlined } from '@ant-design/icons';
import { IconMap } from 'antd/lib/result';

const iconMap = {
    MenuOutlined: <MenuOutlined />,
    FormOutlined: <FormOutlined />,
    TableOutlined: <TableOutlined />,
};

const iconUtil = {
    getIconNode(iconName: string) {
        let iconNode = iconMap[iconName];
        return iconNode;
    },
    getIconMap() {
        return IconMap;
    },
};

export default iconUtil;
