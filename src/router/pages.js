import Home from '../views/Home.vue'

export default [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../components/login.vue"),
    },
]