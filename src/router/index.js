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
        // Le manifeste et l'équipe sont des modales posées sur l'accueil (voir
        // ManifestOverlay.vue et TeamOverlay.vue) : leurs routes servent donc
        // la même page. Comme c'est le même composant au même emplacement,
        // RouterView réutilise l'instance de Home — le scroll et les
        // apparitions déjà jouées survivent à l'ouverture comme à la fermeture.
        //
        // Des alias de « / » ne conviendraient pas : les chemins partageraient
        // alors un seul enregistrement de route, Vue Router prendrait la
        // navigation pour un doublon et l'URL ne bougerait pas.
        {
            path: '/manifest',
            name: 'manifest',
            component: HomePage
        },
        {
            path: '/auto-mode-setup',
            name: 'team',
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