import { message } from 'antd';

const alertMsg = (msg: string, callback) => {
    message.warning(msg, 2,() => callback());
};
export default alertMsg;
