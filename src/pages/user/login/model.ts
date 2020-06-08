import {Effect, history, Reducer} from 'umi';
import {message} from 'antd';
import {userLogin, getFakeCaptcha} from './service';
import {getPageQuery, setAuthority} from './utils/utils';
import {PageUtil} from '@/utils/pageUtil';

export interface StateType {
    status?: 'ok' | 'error';
    type?: string;
    currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
    namespace: string;
    state: StateType;
    effects: {
        login: Effect;
        getCaptcha: Effect;
    };
    reducers: {
        changeLoginStatus: Reducer<StateType>;
    };
}

const Model: ModelType = {
    namespace: 'userAndlogin',

    state: {
        status: undefined,
    },

    effects: {
        * login({payload}, {call, put}) {
            const {code, data} = yield call(userLogin, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: data,
            });
            if (code === 200) {
                PageUtil.loginSuccess(data);
            }
        },

        * getCaptcha({payload}, {call}) {
            yield call(getFakeCaptcha, payload);
        },
    },

    reducers: {
        changeLoginStatus(state, {payload}) {
            setAuthority(payload.roles);
            return {
                ...state,
                type: payload.type,
            };
        },
    },
};

export default Model;
