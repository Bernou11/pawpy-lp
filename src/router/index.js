import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'
import ConfirmationPage from '../views/Confirmation.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/confirmation',
            name: 'confirmation',
            component: ConfirmationPage,
            beforeEnter: (to, from, next) => {
                if (import.meta.env.DEV) {
                    console.log("dev mode")
                    next()
                    return
                }
                if (to.query.isConfirmed) {
                    next()
                } else {
                    console.log("no email or token, redirecting to home")
                    next('/')
                }
            }
        }
    ]
})

export default router