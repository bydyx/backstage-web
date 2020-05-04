import React from 'react';
import { MenuOutlined, FormOutlined, TableOutlined } from '@ant-design/icons';

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
};

export default iconUtil;
