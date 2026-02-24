import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'
import ConfirmationPage from '../views/Confirmation.vue'
import UnsubscribePage from "@/views/Unsubscribe.vue";

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
                if (to.query.email) {
                    next()
                } else {
                    console.log("No email provided, redirecting to home")
                    next('/')
                }
            }
        },
        {
            path: '/unsubscribe',
            name: 'unsubscribe',
            component: UnsubscribePage,
            beforeEnter: (to, from, next) => {
                if (to.query.email) {
                    next()
                } else {
                    console.log("No email provided, redirecting to home")
                    next('/')
                }
            }
        }
    ]
})

export default router