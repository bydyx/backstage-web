import {message} from "antd";
import {getPageQuery} from "@/pages/user/login/utils/utils";
import {history} from "@@/core/history";

class PageUtil {
    static putCache(key: string, value: any) {
        try {
            let valueJson = JSON.stringify(value);
            localStorage.setItem(key, valueJson);
        } catch (e) {
            localStorage.setItem(key, value);
        }
    }

    static getCache(key: string) {
        let value: any = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

    static setLoginUserInfo(loginUserInfo: LoginUser) {
        PageUtil.putCache('loginUserInfo', loginUserInfo);
    }

    static getLoginUserInfo(): LoginUser {
        return PageUtil.getCache('loginUserInfo');
    }

    static getToken() {
        let loginUser = PageUtil.getCache('loginUserInfo');
        if (PageUtil.isUndefinedOrNull(loginUser)) {
            return '';
        }
        return loginUser.token;
    }

    static logout() {
        localStorage.removeItem('loginUserInfo');
        PageUtil.gotoLogin();
    }

    static gotoLogin() {
        window.location.href = '/user/login';
    }

    static isUndefinedOrNull(obj: any) {
        return typeof obj == 'undefined' || obj == null;
    }

    static isLogin() {
        let loginUser = PageUtil.getLoginUserInfo();
        return !PageUtil.isUndefinedOrNull(loginUser);
    }

    static forward(path) {
        window.location.href = path;
    }

    static showLoading(msg) {
        return message.loading(msg, 0);
    }

    static loginSuccess(userInfo) {
        PageUtil.setLoginUserInfo(userInfo);
        message.success('登录成功！');
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params as { redirect: string };
        if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
                redirect = redirect.substr(urlParams.origin.length);
                if (redirect.match(/^\/.*#/)) {
                    redirect = redirect.substr(redirect.indexOf('#') + 1);
                }
            } else {
                window.location.href = redirect;
                return;
            }
        }
        history.replace(redirect || '/');
    }

    static getUrlParam(key) {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == key) {
                return pair[1];
            }
        }
        return false;
    }

    static createPagination(onChange) {
        return {
            current: 1,
            pageSize: 10,
            hideOnSinglePage: false,
            onChange: (e) => onChange(e),
        }
    }
}

export {PageUtil};
