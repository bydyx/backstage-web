import { getArticleList } from '@/services/article';

const Model = {
    namespace: 'article',
    state: {
        articleList: [],
    },
    effects: {
        *getArticleList({ payload }, { call, put }) {
            let { data } = yield call(getArticleList, payload);
            yield put({
                type: 'showArticleList',
                payload: data,
            });
        },
    },
    reducers: {
        showArticleList(state, { payload: { pageInfo, list: articleList } }) {
            return {
                ...state,
                ...pageInfo,
                articleList,
            };
        },
    },
};

export default Model;
