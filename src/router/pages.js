
export default [
    {
        path: '/',
        redirect: "/login",
    },
    {
        path: "/home",
        name: 'Home',
        component: () => import(/*webpackChunkName:"home-wel-login" */"../views/Home.vue"),
        redirect: "/welcome",

        children: [
            {
                path: '/welcome',
                name: 'Welcome',
                component: () => import(/*webpackChunkName:"home-wel-login" */"../components/home/welcome.vue"),
            },
            {
                path: '/users',
                name: 'User',
                component: () => import(/*webpackChunkName:"user-rights-roles" */"../components/user/user.vue"),
            },
            {
                path: '/rights',
                name: 'Rights',
                component: () => import(/*webpackChunkName:"user-rights-roles" */"../components/power/rights.vue"),
            },
            {
                path: '/roles',
                name: 'Roles',
                component: () => import(/*webpackChunkName:"user-rights-roles" */"../components/power/roles.vue"),
            },
            {
                path: '/categories',
                name: 'Categories',
                component: () => import(/*webpackChunkName:"cate-params" */"../components/goods/cate.vue"),
            },
            {
                path: '/params',
                name: 'Params',
                component: () => import(/*webpackChunkName:"cate-params" */"../components/goods/params.vue"),
            },
            {
                path: '/goods',
                name: 'Goods',
                component: () => import(/*webpackChunkName:"goods-add" */"../components/goods/list.vue"),
            },
            {
                path: '/goods/add',
                name: 'GoodsAdd',
                component: () => import(/*webpackChunkName:"goods-add" */"../components/goods/add.vue"),
            },
            {
                path: '/orders',
                name: 'Orders',
                component: () => import(/*webpackChunkName:"order-report" */"../components/order/order.vue"),
            },
            {
                path: '/reports',
                name: 'Reports',
                component: () => import(/*webpackChunkName:"order-report" */"../components/report/report.vue"),
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/*webpackChunkName:"home-wel-login"*/"../components/login.vue"),
    },

]