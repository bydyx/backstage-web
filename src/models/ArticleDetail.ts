import { getArticleDetail, publishArticle } from '@/services/article';

let Model = {
    namespace: 'ArticleDetail',
    state: {
        article: {},
        newArticleId: -1
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
            let { data } = yield call(publishArticle, payload);
            // yield put({
            //     type: 'publishArticle',
            //     payload: data,
            // });
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
        publishArticle(state, { payload }){
            return { ...state, newArticleId: payload };
        }
    },
};

export default Model;
