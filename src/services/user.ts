import {request} from '@/utils/request';

export async function githubLogin(data) {
    return request('/user/githubLogin', {
        method: 'POST',
        data: data,
    });
}
