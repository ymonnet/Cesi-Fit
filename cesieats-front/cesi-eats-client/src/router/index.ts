import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import CustomerView from '../views/roles/CustomerView.vue'
import RestaurantOwnerView from '../views/roles/RestaurantOwnerView.vue'
import DeliveryManView from '../views/roles/DeliveryManView.vue'
import RestaurantsView from '../views/shop/RestaurantsView.vue'
import MyRestaurantView from '../views/restaurantOwner/MyRestaurantView.vue'
import ProductsView from '../views/shop/ProductsView.vue'
import CartView from '../views/shop/CartView.vue'
import OrdersView from '../views/shop/OrdersView.vue'
import DeliveriesView from '../views/shop/DeliveriesView.vue'
import AccountsView from '../views/commercial/AccountsView.vue'
import StatisticsView from '../views/commercial/StatisticsView.vue'
import ComponentsView from '../views/technical/ComponentsView.vue'
import LogsView from '../views/technical/LogsView.vue'
import HelpView from '../views/HelpView.vue'
import LegalNoticeView from '../views/mandatory/LegalNoticeView.vue'
import TOUView from '../views/mandatory/TOUView.vue'
import GTCView from '../views/mandatory/GTCView.vue'
import PrivacyPolicyView from '../views/mandatory/PrivacyPolicyView.vue'
import ProfileView from '../views/ProfileView.vue'

import $storeUser from '@/store/user'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: RegisterView,
    beforeEnter: registerGuard
  },
  {
    path: '/profil',
    name: 'profile',
    component: ProfileView,
    beforeEnter: profileGuard
  },
  {
    path: '/client',
    name: 'client',
    component: CustomerView
  },
  {
    path: '/restaurateur',
    name: 'restaurateur',
    component: RestaurantOwnerView
  },
  {
    path: '/livreur',
    name: 'livreur',
    component: DeliveryManView
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: RestaurantsView,
    beforeEnter: restaurantsGuard
  },
  {
    path: '/restaurants/:name/:id',
    name: 'products',
    component: ProductsView,
    beforeEnter: productsGuard
  },
  {
    path: '/mon-restaurant',
    name: 'mon-restaurant',
    component: MyRestaurantView,
    beforeEnter: myRestaurantGuard
  },
  {
    path: '/panier',
    name: 'panier',
    component: CartView,
    beforeEnter: cartGuard
  },
  {
    path: '/commandes',
    name: 'commandes',
    component: OrdersView,
    beforeEnter: orderGuard
  },
  {
    path: '/livraisons',
    name: 'livraisons',
    component: DeliveriesView,
    beforeEnter: deliveryGuard
  },
  {
    path: '/comptes',
    name: 'comptes',
    component: AccountsView,
    beforeEnter: accountsGuard
  },
  {
    path: '/statistiques',
    name: 'statistiques',
    component: StatisticsView,
    beforeEnter: statisticsGuard
  },
  {
    path: '/composants',
    name: 'composants',
    component: ComponentsView,
    beforeEnter: componentsGuard
  },
  {
    path: '/logs',
    name: 'logs',
    component: LogsView,
    beforeEnter: logsGuard
  },
  {
    path: '/aide',
    name: 'aide',
    component: HelpView
  },
  {
    path: '/mentions-legales',
    name: 'mentions-legales',
    component: LegalNoticeView
  },
  {
    path: '/cgu',
    name: 'cgu',
    component: TOUView
  },
  {
    path: '/cgv',
    name: 'cgv',
    component: GTCView
  },
  {
    path: '/politique-confidentialite',
    name: 'politique-confidentialite',
    component: PrivacyPolicyView
  }
]

function registerGuard (to, from, next) {
  if (!$storeUser.state.user.roleId) return next()
  next('/')
}
function profileGuard (to, from, next) {
  if ($storeUser.state.user.roleId) return next()
  next('/')
}
function restaurantsGuard (to, from, next) {
  if ($storeUser.state.user?.roleId === 1) return next()
  next('/')
}
function productsGuard (to, from, next) {
  if ($storeUser.state.user?.roleId === 1) return next()
  next('/')
}
function myRestaurantGuard (to, from, next) {
  if ($storeUser.state.user?.roleId === 2) return next()
  next('/')
}
function cartGuard (to, from, next) {
  if ($storeUser.state.user?.roleId === 1) return next()
  next('/')
}
function orderGuard (to, from, next) {
  if ($storeUser.state.user?.roleId === 1 || $storeUser.state.user?.roleId === 2) return next()
  next('/')
}
function deliveryGuard (to, from, next) {
  if ($storeUser.state.user?.roleId === 3) return next()
  next('/')
}
function componentsGuard (to, from, next) {
  if ($storeUser.state.user?.roleId === 5 || $storeUser.state.user?.roleId === 6) return next()
  next('/')
}
function logsGuard (to, from, next) {
  if ($storeUser.state.user?.roleId === 5) return next()
  next('/')
}
function accountsGuard (to, from, next) {
  if ($storeUser.state.user?.roleId === 4 || $storeUser.state.user?.roleId === 6) return next()
  next('/')
}
function statisticsGuard (to, from, next) {
  if ($storeUser.state.user?.roleId === 4 || $storeUser.state.user?.roleId === 6) return next()
  next('/')
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
