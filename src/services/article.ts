import request from '@/utils/request';

export async function getArticleList(data) {
    return request('/article/getArticleList ', {
        method: 'POST',
        data: data,
    });
}
