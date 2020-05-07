import { message } from 'antd';
import { PageUtil } from './pageUtil';

const warning = (msg: string, callback?) => {
    if (PageUtil.isUndefinedOrNull(callback)) {
        message.warning(msg, 1);
    } else {
        message.warning(msg, 1, () => callback());
    }
};

const success = (msg: string, callback?) => {
    if (PageUtil.isUndefinedOrNull(callback)) {
        message.success(msg, 1);
    } else {
        message.success(msg, 1, () => callback());
    }
};

export {
    warning,success
};

