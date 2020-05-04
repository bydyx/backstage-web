import { Effect, Reducer } from 'umi';
import { getMenuList } from '@/services/menu';
import iconUtil from '@/utils/iconUtil';

export interface MenuModelType {
    namespace: string;
    state: {
        menu: Array<any>;
    };
    effects: {
        getMenuList: Effect;
    };
    reducers: {
        changeMenuList: Reducer;
    };
}

const Model: MenuModelType = {
    namespace: 'menuList',
    state: {
        menu: [],
    },
    effects: {
        *getMenuList({payload}, { call, put }) {
            let { data: menuList } = yield call(getMenuList);
            menuList.forEach((item: any) => {
                item.icon = iconUtil.getIconNode(item.icon);
                item.children = item.childrenList;
            });
            payload(menuList);
            yield put({
                type: 'changeMenuList',
                payload: menuList,
            });
        },
    },
    reducers: {
        changeMenuList(state, action) {
            return {
                ...state,
                action,
            };
        },
    },
};

export default Model;
