import { createRouter, createWebHistory } from 'vue-router'
import baseApi from './baseApi';
import Home from './views/Login.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Produk from './views/Produk.vue'
import Transaksi from './views/Transaksi.vue'
import Tambah from './views/Tambah.vue'
import Edit from './views/Edit.vue'

const authCheck = async (to, from, next) => {
    const token = localStorage.getItem('token');
    if (!token) {
        next({ name: 'Login' });
    } else {
        try {
            const res = await baseApi.get('data/product', {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });
            if (res.status === 200) {
                next();
            } else {
                next({ name: 'Login' });
            }
        } catch (err) {
            console.error(err);
            next({ name: 'Login' });
        }
    }
};

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/produk',
        name: 'Produk',
        component: Produk,
        beforeEnter: authCheck
    },
    {
        path: '/transaksi',
        name: 'Transaksi',
        component: Transaksi,
        beforeEnter: authCheck
    },
    {
        path: '/tambah',
        name: 'Tambah',
        component: Tambah,
        beforeEnter: authCheck
    },
    {
        path: '/:id',
        name: 'Edit',
        component: Edit,
        beforeEnter: authCheck
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router