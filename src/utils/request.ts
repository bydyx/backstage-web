/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { PageUtil } from './pageUtil';
import { Config } from './config';
import { warning } from './Alert';

enum Code {
    SUCCESS = 200,
    INVALID_TOKEN = 1001,
}

/**
 * 异常处理程序
 */
const errorHandler = (res) => {
    let { code, msg } = res;
    switch (code) {
        case Code.INVALID_TOKEN:
            console.info(msg);
            warning(msg, PageUtil.gotoLogin);
            break;
    }
};

/**
 * 配置request请求时的默认参数
 */
const baseRequest = extend({
    credentials: 'include',
    // 默认请求是否带上cookie
});
const request = (url: string, options: any = {}) => {
    if (url.indexOf('/api') == -1) {
        url = Config.serverUrl + url;
    }
    if (url.indexOf('/noLogin') == -1) {
        options.headers = {
            Authorization: PageUtil.getToken(),
        };
    }
    return baseRequest(url, options).then((res) => {
        if (Code.SUCCESS != res.code) {
            errorHandler(res);
        }
        return res;
    });
};
export default request;
