import request from '@/utils/request';

export interface LoginParamsType {
    userName: string;
    passWord: string;
    captcha: string;
    mobile: string;
}

export async function userLogin(params: LoginParamsType) {
    return request('/user/login', {
        method: 'POST',
        data: params,
    });
}

export async function getFakeCaptcha(mobile: string) {
    return request(`/api/login/captcha?mobile=${mobile}`);
}
