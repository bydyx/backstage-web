import {Alert} from 'antd';
import React, {useState} from 'react';
import {Dispatch, AnyAction, Link, connect} from 'umi';
import {StateType} from './model';
import styles from './style.less';
import {LoginParamsType} from './service';
import LoginFrom from './components/Login';
import {GithubOutlined} from "@ant-design/icons/lib";
import {Config} from "@/utils/config";
import {PageUtil} from "@/utils/pageUtil";

const {Tab, UserName, Password, Submit} = LoginFrom;

interface LoginProps {
    dispatch: Dispatch<AnyAction>;
    userAndlogin: StateType;
    submitting?: boolean;
}

const LoginMessage: React.FC<{
    content: string;
}> = ({content}) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);

const gotoGithubLogin = () => {
    window.location.href = Config.githubOAuthUrl;
}

const Login: React.FC<LoginProps> = (props) => {
    const {userAndlogin = {}, submitting, dispatch} = props;
    const {status, type: loginType} = userAndlogin;
    const [type, setType] = useState<string>('account');

    let code = PageUtil.getUrlParam("code");
    if (code) {
        let closeLoading = PageUtil.showLoading("登录中...");
        dispatch({
            type: 'user/githubLogin',
            payload: {
                data: {
                    code: code
                },
                closeLoading:closeLoading
            },
        });
    }

    const handleSubmit = (values: LoginParamsType) => {
        dispatch({
            type: 'userAndlogin/login',
            payload: {
                ...values,
                type,
            },
        });
    };
    return (
        <div className={styles.main}>
            <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
                <Tab key="account" tab="账户密码登录">
                    {status === 'error' && loginType === 'account' && !submitting && (
                        <LoginMessage content="账户或密码错误"/>
                    )}
                    <UserName
                        name="userName"
                        placeholder="用户名"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    />
                    <Password
                        name="passWord"
                        placeholder="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                </Tab>
                {/* <Tab key="mobile" tab="手机号登录">
                    {status === 'error' && loginType === 'mobile' && !submitting && (
                        <LoginMessage content="验证码错误" />
                    )}
                    <Mobile
                        name="mobile"
                        placeholder="手机号"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号！',
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: '手机号格式错误！',
                            },
                        ]}
                    />
                    <Captcha
                        name="captcha"
                        placeholder="验证码"
                        countDown={120}
                        getCaptchaButtonText=""
                        getCaptchaSecondText="秒"
                        rules={[
                            {
                                required: false,
                                message: '请输入验证码！',
                            },
                        ]}
                    />
                </Tab> */}
                <Submit loading={submitting}>登录</Submit>
                <div className={styles.other}>
                    其他登录方式
                    {/*<AlipayCircleOutlined className={styles.icon} />*/}
                    <GithubOutlined onClick={gotoGithubLogin} className={styles.icon}/>
                    <Link className={styles.register} to="/user/register">
                        注册账户
                    </Link>
                </div>
            </LoginFrom>
        </div>
    );
};

export default connect(
    ({
         userAndlogin,
         loading,
     }: {
        userAndlogin: StateType;
        loading: {
            effects: {
                [key: string]: boolean;
            };
        };
    }) => ({
        userAndlogin,
        submitting: loading.effects['userAndlogin/login'],
    }),
)(Login);
