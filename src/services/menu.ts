import request from '@/utils/request';

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

