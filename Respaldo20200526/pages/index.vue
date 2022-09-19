<template>
      <v-container
              class="fill-height"
              fluid
      >
        <v-row
                align="center"
                justify="center"
        >
          <v-col
                  cols="12"
                  sm="8"
                  md="4"
          >
            <v-card class="elevation-5">
              <v-img src="/logo.png"/>
              <v-toolbar
                      dark
                      flat
              >

                <v-toolbar-title class="title text-center">Iniciar Sesión</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                          v-model="userinfo.usuario"
                          label="Usuario"
                          name="login"
                          prepend-icon="mdi-account-circle"
                          type="text"
                          required
                  />

                  <v-text-field
                          v-model="userinfo.contrasenia"
                          id="password"
                          label="Contraseña"
                          name="password"
                          prepend-icon="mdi-lock"
                          type="password"
                          required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue-grey lighten-1" dark block small @click="loginKananfleet(userinfo)">Iniciar Sesión</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            color="red"
            top
        >
          {{ text }}
          <v-btn
                  color="#fff"
                  text
                  @click="snackbar = false"
          >
            Cerrar
          </v-btn>
        </v-snackbar>
      </v-container>
</template>
<style
        lang="scss">
  .theme--light.v-list {
    background: none;
    color: rgba(0,0,0,.87);
  }
</style>
<script>
import unirest from 'unirest'
export default {
  props: {
    source: String
  },
  data () {
    return {
      logginOK: false,
      userinfo: {
        usuario: null,
        contrasenia: null
      },
      snackbar: false,
      text: 'My timeout is set to 2000.',
      timeout: 4000
    }
  },
  methods: {
    loginKananfleet (infoLogin) {
      const vm = this
      // debugger debuguea code js
      if (infoLogin.usuario === null || infoLogin.usuario === '') {
        this.text = 'Ingrese un usuario válido'
        this.snackbar = true
        return
      }
      if (infoLogin.contrasenia === null || infoLogin.contrasenia === '') {
        this.text = 'Ingrese un password válido'
        this.snackbar = true
        return
      }
      unirest('POST', 'http://localhost:51104//api/EmpleadoUsuario/LoginSAPbyUser')
        .send({ 'userName': infoLogin.usuario, 'password': infoLogin.contrasenia })
        .end(function (res) {
          if (res.error) {
            vm.text = 'Usuario o Contraseña no válidos intente con otras credenciales'
            vm.snackbar = true
            throw new Error(res.error)
          }
          // const empleadoID = res.body.EmpleadoID + 1000
          // const empresaID = res.body.Dependencia.EmpresaID + 1000
          const empresa = res.body.Dependencia.EmpresaID
          window.vm.loginOK = empresa
          window.parametroURL = empresa
          window.vm.$router.push('/kananfleet/Inspeccion/?id=' + empresa)
        })
    }
  }
}
</script>
