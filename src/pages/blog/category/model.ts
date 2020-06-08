import {PageUtil} from "@/utils/pageUtil";
import {addCategory, getCategoryList} from "@/pages/blog/category/services";

const menuChildrenMap = (menuList) => {
    menuList.forEach((item: any) => {
        // item.icon = iconUtil.getIconNode(item.icon);
        item.children = PageUtil.isUndefinedOrNull(item.childrenList) ? [] : menuChildrenMap(item.childrenList);
    });
    return menuList;
}

const Model = {
    namespace: 'category',
    state: {},
    effects: {
        * getCategoryList({payload}, {call, put}) {
            let {data: categoryList} = yield call(getCategoryList);
            payload.success(categoryList);
        },
        * addCategory({payload}, {call, put}) {
            yield call(addCategory, payload);
            location.reload();
        },
    },
    reducers: {},
};

export default Model;
