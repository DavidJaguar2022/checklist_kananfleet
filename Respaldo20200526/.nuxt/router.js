import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6c8caf13 = () => interopDefault(import('..\\pages\\kananfleet\\Inspeccion\\index.vue' /* webpackChunkName: "pages_kananfleet_Inspeccion_index" */))
const _6e78983c = () => interopDefault(import('..\\pages\\kananfleet\\Recepcion\\index.vue' /* webpackChunkName: "pages_kananfleet_Recepcion_index" */))
const _7132f060 = () => interopDefault(import('..\\pages\\kananfleet\\recepcionTaller.vue' /* webpackChunkName: "pages_kananfleet_recepcionTaller" */))
const _dcbac486 = () => interopDefault(import('..\\pages\\reportes\\ConsumoRefacciones\\index.vue' /* webpackChunkName: "pages_reportes_ConsumoRefacciones_index" */))
const _3527745e = () => interopDefault(import('..\\pages\\reportes\\CostoMensual\\index.vue' /* webpackChunkName: "pages_reportes_CostoMensual_index" */))
const _a6eee700 = () => interopDefault(import('..\\pages\\reportes\\CostosMantenimiento\\index.vue' /* webpackChunkName: "pages_reportes_CostosMantenimiento_index" */))
const _a1c60536 = () => interopDefault(import('..\\pages\\reportes\\DisponibilidadEquipo\\index.vue' /* webpackChunkName: "pages_reportes_DisponibilidadEquipo_index" */))
const _29a99c45 = () => interopDefault(import('..\\pages\\reportes\\MeanTimeToRepair\\index.vue' /* webpackChunkName: "pages_reportes_MeanTimeToRepair_index" */))
const _78ebedcb = () => interopDefault(import('..\\pages\\reportes\\ProximosServicios\\index.vue' /* webpackChunkName: "pages_reportes_ProximosServicios_index" */))
const _3313ecd8 = () => interopDefault(import('..\\pages\\reportes\\RendimientoCombustible\\index.vue' /* webpackChunkName: "pages_reportes_RendimientoCombustible_index" */))
const _746261de = () => interopDefault(import('..\\pages\\reportes\\TiempoPromedioFallas\\index.vue' /* webpackChunkName: "pages_reportes_TiempoPromedioFallas_index" */))
const _38f0de50 = () => interopDefault(import('..\\pages\\reportes\\TiempoPromedioReparaciones\\index.vue' /* webpackChunkName: "pages_reportes_TiempoPromedioReparaciones_index" */))
const _18f7f5e7 = () => interopDefault(import('..\\pages\\reportes\\UsoPorHora\\index.vue' /* webpackChunkName: "pages_reportes_UsoPorHora_index" */))
const _11adb6cf = () => interopDefault(import('..\\pages\\reportes\\ProximosServicios\\index_entregado.vue' /* webpackChunkName: "pages_reportes_ProximosServicios_index_entregado" */))
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
    path: "/reportes/ConsumoRefacciones",
    component: _dcbac486,
    name: "reportes-ConsumoRefacciones"
  }, {
    path: "/reportes/CostoMensual",
    component: _3527745e,
    name: "reportes-CostoMensual"
  }, {
    path: "/reportes/CostosMantenimiento",
    component: _a6eee700,
    name: "reportes-CostosMantenimiento"
  }, {
    path: "/reportes/DisponibilidadEquipo",
    component: _a1c60536,
    name: "reportes-DisponibilidadEquipo"
  }, {
    path: "/reportes/MeanTimeToRepair",
    component: _29a99c45,
    name: "reportes-MeanTimeToRepair"
  }, {
    path: "/reportes/ProximosServicios",
    component: _78ebedcb,
    name: "reportes-ProximosServicios"
  }, {
    path: "/reportes/RendimientoCombustible",
    component: _3313ecd8,
    name: "reportes-RendimientoCombustible"
  }, {
    path: "/reportes/TiempoPromedioFallas",
    component: _746261de,
    name: "reportes-TiempoPromedioFallas"
  }, {
    path: "/reportes/TiempoPromedioReparaciones",
    component: _38f0de50,
    name: "reportes-TiempoPromedioReparaciones"
  }, {
    path: "/reportes/UsoPorHora",
    component: _18f7f5e7,
    name: "reportes-UsoPorHora"
  }, {
    path: "/reportes/ProximosServicios/index_entregado",
    component: _11adb6cf,
    name: "reportes-ProximosServicios-index_entregado"
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
