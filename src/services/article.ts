import {request} from '@/utils/request';

export async function getArticleList(data) {
    return request('/article/getArticleList', {
        method: 'POST',
        data: data,
    });
}
export async function getArticleDetail(data) {
    return request('/article/getArticleDetail', {
        method: 'POST',
        data: data,
    });
}

export async function publishArticle(data) {
    console.info(data);
    return request('/article/publishArticle', {
        method: 'POST',
        data: data,
    });
}
