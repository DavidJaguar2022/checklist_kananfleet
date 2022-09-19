<template>
  <v-app>
    <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            app
            color="#f0ab00"
            class="display-3 black--text"
            v-if="logueado"
    >
    </v-navigation-drawer>
      <v-container>
        <v-row>
          <nuxt />
        </v-row>
      </v-container>
    <v-footer
      :fixed="fixed"
      app
      v-if="logueado"
    >
      <span>Todos los derechos reservados Kananfleet ®</span>
    </v-footer>
  </v-app>
</template>
<style
        lang="scss">
  @import "../node_modules/@ag-grid-community/all-modules/dist/styles/ag-grid.css";
  @import "../components/ag-theme-kananfleet";
  .v-card--reveal {
    opacity:0.4;
  }
  input.ag-floating-filter-input {
     height: 75%;
   }
   .theme--light.v-list {
      background: none;
      color: rgba(0,0,0,.87);
    }
</style>
<script>
// import unirest from 'unirest'
export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      logueado: false,
      userID: null,
      botonSalir: 'Salir',
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Kananfleet ®',
      items: []
    }
  },
  methods: {
    logOut () {
      /* const vm = this
      unirest('GET', 'http://localhost:51104//api/EmpleadoUsuario/Logout/' + vm.userID)
        .end(function (res) {
          if (res.error) {
            throw new Error(res.error)
          }
          location.href = '/'
        }) */
      location.href = '/'
    },
    refreshUrl (x) {
      const vm = this
      console.log(x)
      vm.items = [
        {
          icon: 'mdi-clipboard-text',
          title: 'G.H de Inspección',
          to: '/kananfleet/Inspeccion/?id='
        },
        {
          icon: 'mdi-clipboard-check',
          title: 'G.R de Taller',
          to: '/kananfleet/Recepcion/?id='
        },
        {
          icon: 'mdi-chart-bar',
          title: 'Reportes',
          to: '/kananfleet/reportes'
        },
        {
          icon: 'mdi-chart-bar',
          title: 'Reportes',
          to: '/kananfleet/reportes'
        }
      ]
      console.log(vm.items)
    }
  },
  beforeMount () {
    window.parametroURL = window.$nuxt._route.query.id
  },
  mounted () {
    window.vm = this
    if (window.$nuxt._route.params.hoja !== undefined) {
      window.vm.logueado = window.$nuxt._route.params.hoja
      window.vm.loginOK = window.$nuxt._route.params.hoja
      window.vm.logueado = true
    } else if (window.$nuxt._route.params.hoja !== undefined) {
      window.vm.logueado = window.$nuxt._route.params.recepcion
      window.vm.loginOK = window.$nuxt._route.params.recepcion
      window.vm.logueado = true
    }
    window.parametroURL = window.$nuxt._route.query.id
  }
}
</script>
