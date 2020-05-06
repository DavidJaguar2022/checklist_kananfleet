import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6c8caf13 = () => interopDefault(import('..\\pages\\kananfleet\\Inspeccion\\index.vue' /* webpackChunkName: "pages_kananfleet_Inspeccion_index" */))
const _6e78983c = () => interopDefault(import('..\\pages\\kananfleet\\Recepcion\\index.vue' /* webpackChunkName: "pages_kananfleet_Recepcion_index" */))
const _7132f060 = () => interopDefault(import('..\\pages\\kananfleet\\recepcionTaller.vue' /* webpackChunkName: "pages_kananfleet_recepcionTaller" */))
const _78ebedcb = () => interopDefault(import('..\\pages\\reportes\\ProximosServicios\\index.vue' /* webpackChunkName: "pages_reportes_ProximosServicios_index" */))
const _0e244201 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/kananfleet/Inspeccion",
    component: _6c8caf13,
    name: "kananfleet-Inspeccion"
  }, {
    path: "/kananfleet/Recepcion",
    component: _6e78983c,
    name: "kananfleet-Recepcion"
  }, {
    path: "/kananfleet/recepcionTaller",
    component: _7132f060,
    name: "kananfleet-recepcionTaller"
  }, {
    path: "/reportes/ProximosServicios",
    component: _78ebedcb,
    name: "reportes-ProximosServicios"
  }, {
    path: "/",
    component: _0e244201,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
