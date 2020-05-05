import { message } from 'antd';
import { PageUtil } from './pageUtil';

const warning = (msg: string, callback) => {
    if (PageUtil.isUndefinedOrNull(callback)) {
        message.warning(msg, 2);
    } else {
        message.warning(msg, 2, () => callback());
    }
};

export {
    warning,
};

