import { getMenuList } from '@/services/menu';
import iconUtil from '@/utils/iconUtil';

const Model = {
    namespace: 'menu',
    state: {
        menuList: [],
    },
    effects: {
        *getMenuList({ payload }, { call, put }) {
            let { data } = yield call(getMenuList);
            data.forEach((item) => {
                item.icon = iconUtil.getIconNode(item.icon);
                item.children = item.childrenList;
            });
            payload(data);
        },
    },
};

export default Model;
