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
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../components/login.vue"),
    },

]