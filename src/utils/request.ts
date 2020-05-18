/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { PageUtil } from './pageUtil';
import { Config } from './config';
import { warning, success } from './Alert';

export enum ErrorCode {
    SUCCESS = 200,
    INVALID_TOKEN = 1001,
    WRONG_PARAM = 1003,
}

/**
 * 异常处理程序
 */
const errorHandler = ({ code, msg }) => {
    if (!PageUtil.isUndefinedOrNull(code)) {
        if (ErrorCode[code] != 'undefined') {
            warning(msg);
            if (code == ErrorCode.INVALID_TOKEN) {
                PageUtil.gotoLogin();
            }
        }
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
    options.headers = {
        Authorization: PageUtil.getToken(),
    };
    return baseRequest(url, options).then((res) => {
        if (ErrorCode.SUCCESS != res.code) {
            errorHandler(res);
        }
        return res;
    });
};
export default request;

export function showResMsg({ code, msg }, callback) {
    if (!PageUtil.isUndefinedOrNull(code)) {
        if (ErrorCode[code] != 'undefined' && code != ErrorCode.SUCCESS) {
            warning(msg, callback);
        } else {
            success(msg, callback);
        }
    }
}
