import request from '@/utils/request';

export async function getMenuList() {
    return request('/menu/getList', {
        method: 'GET',
        data:{}
    });
}
