import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../views/Guide/Login')
    },{
        path: '/login',
        component: () => import('../views/Guide/Login')
    }, {
        path: '/dishInfo',
        component: () => import('../views/Main/DishInfo')
    }, {
        path: '/search',
        component: () => import('../views/Main/SearchResult')
    },
    {
        path: '/register',
        component: () => import('../views/Guide/Register')
    }, {
        path: '/foodInfo',
        component: () => import('../views/Main/FoodInfo')
    },
    {
        path: '/main',
        component: () => import('../views/Main/Main'),
        children: [
            {
                path: 'home',
                component: () => import('../views/Main/Home')
            }, {
                path: 'center',
                component: () => import('../views/Main/Center')
            }, {
                path: 'me',
                component: () => import('../views/Main/Me')
            }
        ]
    }
]

const router = new VueRouter({
    // mode:'',
    base: process.env.NODE_ENV==='development'?process.env.BASE_URL:'/dist/',

    routes
})

export default router
