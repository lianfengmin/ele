import Home from '../views/Home.vue'

export default [
    {
        path: '/',
        redirect: "/login",
    },
    {
        path: "/home",
        name: 'Home',
        component: Home,
        redirect: "/welcome",

        children: [
            {
                path: '/welcome',
                name: 'Welcome',
                component: () => import("../components/home/welcome.vue"),
            },
            {
                path: '/users',
                name: 'User',
                component: () => import("../components/user/user.vue"),
            },
            {
                path: '/rights',
                name: 'Rights',
                component: () => import("../components/power/rights.vue"),
            },
            {
                path: '/roles',
                name: 'Roles',
                component: () => import("../components/power/roles.vue"),
            },
            {
                path: '/categories',
                name: 'Categories',
                component: () => import("../components/goods/cate.vue"),
            },
            {
                path: '/params',
                name: 'Params',
                component: () => import("../components/goods/params.vue"),
            },
            {
                path: '/goods',
                name: 'Goods',
                component: () => import("../components/goods/list.vue"),
            },
            {
                path: '/goods/add',
                name: 'GoodsAdd',
                component: () => import("../components/goods/add.vue"),
            },
            {
                path: '/orders',
                name: 'Orders',
                component: () => import("../components/order/order.vue"),
            },
            {
                path: '/reports',
                name: 'Reports',
                component: () => import("../components/report/report.vue"),
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../components/login.vue"),
    },

]