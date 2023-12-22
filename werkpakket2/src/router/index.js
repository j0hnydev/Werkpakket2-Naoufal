import {createRouter, createWebHistory} from 'vue-router'


import checkoutView from '../views/checkoutView.vue'
import confirmationView from "@/views/confirmationView.vue";
import homeView from '../views/homeView.vue'
import loginView from '../views/loginView.vue'
import productView from '../views/productView.vue'
import shoppingCartView from '../views/shoppingCartView.vue'
import shopView from '../views/shopView.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/confirmation', component: confirmationView
        },
        {
            path: '/checkout', component: checkoutView
        },
        {
            path: '/', component: homeView
        },
        {
            path: '/shop', component: shopView
        },
        {
            path: '/login', component: loginView
        },
        {
            path: '/shoppingCart', component: shoppingCartView
        },
        {
            path: '/product/:id', name: 'product', component: productView, props: true
        },
        {
            path: '/:catchAll(.*)', redirect: '/'
        },
    ]
})

export default router