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
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../components/login.vue"),
    },

]