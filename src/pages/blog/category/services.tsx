import {get, post} from '@/utils/request';

export async function getCategoryList(data) {
    return get('/category/getCategoryList', data);
}

export async function addCategory(data) {
    return post('/category/add', data);
}

export async function deleteById(data) {
    return post('/category/deleteById', data);
}

export async function modify(data) {
    return post('/category/modify', data);
}
