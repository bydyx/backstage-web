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
        window.location.href = 'http://localhost:8000/user/login';
    }
    static isUndefinedOrNull(obj: any) {
        return typeof obj == 'undefined' || obj == null;
    }
    static isLogin() {
        let loginUser = PageUtil.getLoginUserInfo();
        return !PageUtil.isUndefinedOrNull(loginUser);
    }
}

export { PageUtil };
