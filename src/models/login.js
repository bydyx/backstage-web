import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import pageUtil from '@/utils/pageUtil';

const Model = {
    namespace: 'login',
    state: {
        status: false,
        isSubmit: false,
    },
    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(fakeAccountLogin, payload);
            pageUtil.setLoginUserInfo(response.data);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            if (response.code === 200) {
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params;

                if (redirect) {
                    const redirectUrlParams = new URL(redirect);

                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);

                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                    } else {
                        window.location.href = '/';
                        return;
                    }
                }

                history.replace(redirect || '/');
            }
        },

        logout() {
            const { redirect } = getPageQuery(); // Note: There may be security issues, please note

            if (window.location.pathname !== '/user/login' && !redirect) {
                history.replace({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                });
            }
        },
    },
    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            state.isSubmit = true;
            return { ...state, code: payload.code };
        },
    },
};
export default Model;
