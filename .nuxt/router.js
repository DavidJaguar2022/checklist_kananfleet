import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6ebf7bdc = () => interopDefault(import('..\\pages\\kananfleet\\Inspeccion\\index.vue' /* webpackChunkName: "pages/kananfleet/Inspeccion/index" */))
const _55c48e53 = () => interopDefault(import('..\\pages\\kananfleet\\Recepcion\\index.vue' /* webpackChunkName: "pages/kananfleet/Recepcion/index" */))
const _26145b69 = () => interopDefault(import('..\\pages\\kananfleet\\recepcionTaller.vue' /* webpackChunkName: "pages/kananfleet/recepcionTaller" */))
const _b35e2074 = () => interopDefault(import('..\\pages\\reportes\\ConsumoRefacciones\\index.vue' /* webpackChunkName: "pages/reportes/ConsumoRefacciones/index" */))
const _375a4127 = () => interopDefault(import('..\\pages\\reportes\\CostoMensual\\index.vue' /* webpackChunkName: "pages/reportes/CostoMensual/index" */))
const _2da47b97 = () => interopDefault(import('..\\pages\\reportes\\CostosMantenimiento\\index.vue' /* webpackChunkName: "pages/reportes/CostosMantenimiento/index" */))
const _517ef12e = () => interopDefault(import('..\\pages\\reportes\\DisponibilidadEquipo\\index.vue' /* webpackChunkName: "pages/reportes/DisponibilidadEquipo/index" */))
const _08a6dc8e = () => interopDefault(import('..\\pages\\reportes\\MeanTimeToRepair\\index.vue' /* webpackChunkName: "pages/reportes/MeanTimeToRepair/index" */))
const _7996b6a2 = () => interopDefault(import('..\\pages\\reportes\\ProximosServicios\\index.vue' /* webpackChunkName: "pages/reportes/ProximosServicios/index" */))
const _766fdb3e = () => interopDefault(import('..\\pages\\reportes\\RendimientoCombustible\\index.vue' /* webpackChunkName: "pages/reportes/RendimientoCombustible/index" */))
const _6830c2da = () => interopDefault(import('..\\pages\\reportes\\TiempoPromedioFallas\\index.vue' /* webpackChunkName: "pages/reportes/TiempoPromedioFallas/index" */))
const _e7a86c3e = () => interopDefault(import('..\\pages\\reportes\\TiempoPromedioReparaciones\\index.vue' /* webpackChunkName: "pages/reportes/TiempoPromedioReparaciones/index" */))
const _644d3e20 = () => interopDefault(import('..\\pages\\reportes\\UsoPorHora\\index.vue' /* webpackChunkName: "pages/reportes/UsoPorHora/index" */))
const _7d909ee6 = () => interopDefault(import('..\\pages\\reportes\\ProximosServicios\\index_entregado.vue' /* webpackChunkName: "pages/reportes/ProximosServicios/index_entregado" */))
const _d2402f84 = () => interopDefault(import('..\\pages\\reportes\\ProximosServicios\\index_prueba.vue' /* webpackChunkName: "pages/reportes/ProximosServicios/index_prueba" */))
const _8580cc6c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/kananfleet/Inspeccion",
    component: _6ebf7bdc,
    name: "kananfleet-Inspeccion"
  }, {
    path: "/kananfleet/Recepcion",
    component: _55c48e53,
    name: "kananfleet-Recepcion"
  }, {
    path: "/kananfleet/recepcionTaller",
    component: _26145b69,
    name: "kananfleet-recepcionTaller"
  }, {
    path: "/reportes/ConsumoRefacciones",
    component: _b35e2074,
    name: "reportes-ConsumoRefacciones"
  }, {
    path: "/reportes/CostoMensual",
    component: _375a4127,
    name: "reportes-CostoMensual"
  }, {
    path: "/reportes/CostosMantenimiento",
    component: _2da47b97,
    name: "reportes-CostosMantenimiento"
  }, {
    path: "/reportes/DisponibilidadEquipo",
    component: _517ef12e,
    name: "reportes-DisponibilidadEquipo"
  }, {
    path: "/reportes/MeanTimeToRepair",
    component: _08a6dc8e,
    name: "reportes-MeanTimeToRepair"
  }, {
    path: "/reportes/ProximosServicios",
    component: _7996b6a2,
    name: "reportes-ProximosServicios"
  }, {
    path: "/reportes/RendimientoCombustible",
    component: _766fdb3e,
    name: "reportes-RendimientoCombustible"
  }, {
    path: "/reportes/TiempoPromedioFallas",
    component: _6830c2da,
    name: "reportes-TiempoPromedioFallas"
  }, {
    path: "/reportes/TiempoPromedioReparaciones",
    component: _e7a86c3e,
    name: "reportes-TiempoPromedioReparaciones"
  }, {
    path: "/reportes/UsoPorHora",
    component: _644d3e20,
    name: "reportes-UsoPorHora"
  }, {
    path: "/reportes/ProximosServicios/index_entregado",
    component: _7d909ee6,
    name: "reportes-ProximosServicios-index_entregado"
  }, {
    path: "/reportes/ProximosServicios/index_prueba",
    component: _d2402f84,
    name: "reportes-ProximosServicios-index_prueba"
  }, {
    path: "/",
    component: _8580cc6c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
