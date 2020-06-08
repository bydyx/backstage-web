import {request} from '@/utils/request';

export async function getMenuList() {
    return request('/menu/getList', {
        method: 'GET',
    });
}

export async function getMenuTree() {
    return request('/menu/getTree', {
        method: 'GET',
    });
}

export async function addMenu(data) {
    return request('/menu/add', {
        method: 'POST',
        data: data,
    });
}
export async function modifyMenu(data) {
    return request('/menu/modify', {
        method: 'POST',
        data: data,
    });
}
export async function deleteMenu(data) {
    return request('/menu/delete', {
        method: 'POST',
        data: data,
    });
}
