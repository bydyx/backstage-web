import {getMenuList, getMenuTree, addMenu, modifyMenu} from '@/services/menu';
import {ErrorCode} from '@/utils/request';
import {success} from '@/utils/Alert';
import {PageUtil} from "@/utils/pageUtil";

const menuChildrenMap = (menuList) => {
    menuList.forEach((item: any) => {
        // item.icon = iconUtil.getIconNode(item.icon);
        item.children = PageUtil.isUndefinedOrNull(item.childrenList) ? [] :  menuChildrenMap(item.childrenList);
    });
    return menuList;
}

const Model = {
    namespace: 'menu',
    state: {
        menu: [],
    },
    effects: {
        * getMenuList({payload}, {call, put}) {
            let {data: menuList} = yield call(getMenuList);

            let parentMap = new Map();
            menuList.forEach(item => parentMap.set(item.parentId, ""));
            menuList.forEach(item => {
                if (parentMap.has(item.id)) {
                    parentMap.set(item.id, item.name);
                }
            });
            menuList.forEach((item) => {
                // item.icon = iconUtil.getIconNode(item.icon);
                item.children = item.childrenList;
                item.parentName = parentMap.get(item.parentId);
            });
            yield payload(menuList);
        },

        * getMenuTree({payload}, {call, put}) {
            let {data: menuList} = yield call(getMenuTree);
            menuChildrenMap(menuList);
            yield payload(menuList);
        },

        * add({payload}, {call, put}) {
            let {code, msg} = yield call(addMenu, payload);
            if (code == ErrorCode.SUCCESS) {
                success(msg, () => location.reload());
            }
        },
        * modify({payload}, {call, put}) {
            let {code, msg} = yield call(modifyMenu, payload);
            if (code == ErrorCode.SUCCESS) {
                success(msg, () => location.reload());
            }
        },
    },
    reducers: {},
};

export default Model;
