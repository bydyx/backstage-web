import { getArticleDetail, publishArticle } from '@/services/article';
import { ErrorCode } from '@/utils/request';
import {PageUtil} from "@/utils/pageUtil";

let Model = {
    namespace: 'ArticleDetail',
    state: {
        article: {},
        newArticleId: -1,
    },
    effects: {
        *getArticleDetail({ payload }, { call, put }) {
            let { data } = yield call(getArticleDetail, payload);
            yield put({
                type: 'showArticle',
                payload: data,
            });
        },
        *publishArticle({ payload }, { call, put }) {
            let { code, data } = yield call(publishArticle, payload);
            if (code == ErrorCode.SUCCESS) {
                PageUtil.forward("/blog/list");
                // yield put({
                //     type: 'publishArticle',
                //     payload: data,
                // });
            }
        },
        *clear({}, { put }) {
            yield put({
                type: 'showArticle',
                payload: {},
            });
        },
    },
    reducers: {
        showArticle(state, { payload }) {
            return { ...state, article: payload };
        },
        publishArticle(state, { payload }) {
            return { ...state, newArticleId: payload };
        },
    },
};

export default Model;
