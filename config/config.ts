// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
    hash: true,
    antd: {},
    dva: {
        hmr: true,
    },
    locale: {
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        antd: false,
        baseNavigator: false,
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    targets: {
        ie: 11,
    },
    // umi routes: https://umijs.org/docs/routing
    routes: [
        {
            path: '/',
            component: '../layouts/BlankLayout',
            routes: [
                {
                    path: '/user',
                    component: '../layouts/UserLayout',
                    routes: [
                        {
                            path: '/user',
                            redirect: '/user/login',
                        },
                        {
                            name: 'login',
                            icon: 'smile',
                            path: '/user/login',
                            component: './user/login',
                        },
                        {
                            name: 'register-result',
                            icon: 'smile',
                            path: '/user/register-result',
                            component: './user/register-result',
                        },
                        {
                            name: 'register',
                            icon: 'smile',
                            path: '/user/register',
                            component: './user/register',
                        },
                        {
                            component: '404',
                        },
                    ],
                },
                {
                    path: '/',
                    component: '../layouts/BasicLayout',
                    routes: [
                        {
                            name: 'menu',
                            icon: 'smile',
                            path: '/menu',
                            component: './menu',
                        },
                        {
                            name: 'table-list',
                            icon: 'smile',
                            path: '/list/table-list',
                            component: './list/table-list',
                        },
                        {
                            name: 'table-list',
                            icon: 'smile',
                            path: '/list/basic-list',
                            component: './list/basic-list',
                        },
                        {
                            component: '404',
                        },
                    ],
                },
            ],
        },
    ],
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        // ...darkTheme,
        'primary-color': defaultSettings.primaryColor,
    },
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV || 'dev'],
    manifest: {
        basePath: '/',
    },
});
