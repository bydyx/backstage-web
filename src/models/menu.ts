import { Effect, Reducer } from 'umi';
import { getMenuList, getMenuTree, addMenu } from '@/services/menu';
import iconUtil from '@/utils/iconUtil';
import { ErrorCode } from '@/utils/request';
import { success } from '@/utils/Alert';

export interface MenuModelType {
    namespace: string;
    state: {
        menu: Array<any>;
    };
    effects: {
        getMenuList: Effect;
    };
    reducers: {};
}

const Model: MenuModelType = {
    namespace: 'menu',
    state: {
        menu: [],
    },
    effects: {
        *getMenuList({ payload }, { call, put }) {
            let { data: menuList } = yield call(getMenuList);
            menuList.forEach((item: any) => {
                item.icon = iconUtil.getIconNode(item.icon);
                item.children = item.childrenList;
            });
            payload(menuList);
        },

        *getMenuTree({ payload }, { call, put }) {
            let { data: menuList } = yield call(getMenuTree);
            menuList.forEach((item: any) => {
                item.icon = iconUtil.getIconNode(item.icon);
                item.children = item.childrenList;
            });
            payload(menuList);
        },
        *add({ payload }, { call, put }) {
            let { code, msg } = yield call(addMenu, payload);
            if (code == ErrorCode.SUCCESS) {
                success(msg, () => location.reload());
            }
        },
    },
    reducers: {
    },
};

export default Model;
