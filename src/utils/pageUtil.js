const pageUtil = {
    putCache(key, value) {
        try {
            let valueJson = JSON.stringify(value);
            localStorage.setItem(key, valueJson);
        } catch (e) {
            localStorage.setItem(key, value);
        }
    },
    getCache(key) {
        let value = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    },
    setLoginUserInfo(loginUserInfo) {
        pageUtil.putCache('loginUserInfo', loginUserInfo);
    },
    getLoginUserInfo() {
        return pageUtil.getCache('loginUserInfo');
    },
    getToken() {
        let loginUserInfo = pageUtil.getCache('loginUserInfo');
        return loginUserInfo.token;
    },
    gotoLogin() {
        window.location.href = 'http://localhost:8000/user/login';
    },
    isLogin() {
        let loginUser = pageUtil.getLoginUserInfo();
        return typeof loginUser != 'undefined';
    },
};

export default pageUtil;
