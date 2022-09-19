<template>
  <v-layout row wrap>
    <v-flex lg12 md12>
      <div class="headline">
        <v-icon color="black">mdi-clipboard-check</v-icon>Gestión Recepción de Taller
        <hr class="my-3">
      </div>
      <!-- -->
      <v-layout row wrap>
        <v-flex xs2 sm2 md2 style="margin-left: 1%;">
          <v-form
                  v-model="valid"
                  lazy-validation>
            <v-flex xs12 sm12 md12>
              <v-dialog
                      ref="modEdit"
                      v-model="mfechaEdit"
                      :return-value.sync="fcalendarEdit"
                      persistent
                      lazy
                      full-width
                      width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                          v-model="fcalendarEdit"
                          label="Fecha Inicial"
                          hint="Ingrese una fecha inicial"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="fcalendarEdit" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="red" dark @click="mfechaEdit = false">Cancel</v-btn>
                  <v-btn flat color="success" @click="$refs.modEdit.save(fcalendarEdit)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-form>
        </v-flex>
        <v-flex xs2 sm2 md2 style="margin-left: 1%;">
          <v-form
                  v-model="validFinal"
                  lazy-validation>
            <v-flex xs12 sm12 md12>
              <v-dialog
                      ref="fFinal"
                      v-model="mfechaEditFinal"
                      :return-value.sync="fcalendarFinal"
                      persistent
                      lazy
                      full-width
                      width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                          v-model="fcalendarFinal"
                          label="Fecha Final"
                          hint="Ingrese una fecha inicial"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="fcalendarFinal" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="red" dark @click="mfechaEditFinal = false"> Cancel </v-btn>
                  <v-btn flat color="success" @click="$refs.fFinal.save(fcalendarFinal)"> OK </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-form>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <div style="margin-left: 3%; margin-top: 5%;">
            <v-btn small color="primary"><v-icon>mdi-magnify</v-icon>Buscar </v-btn>
            <v-btn small dark color="blue-grey lighten-1"><v-icon>mdi-plus-circle-outline</v-icon> Agregar </v-btn>
          </div>
        </v-flex>
        <ag-grid-vue
                style="width: 100%; height: 410px; margin-left: 1%;"
                class="ag-theme-blue"
                :columnDefs="columnDefs"
                :rowData="rowData"
                :modules="modules">
        </ag-grid-vue>
      </v-layout>
      <!-- -->
    </v-flex>
  </v-layout>
</template>
<script>
import { AgGridVue } from '@ag-grid-community/vue'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
export default {
  components: {
    AgGridVue
  },
  data () {
    return {
      valid: false,
      mfechaEdit: false,
      fcalendarEdit: new Date().toISOString().substr(0, 10),
      validFinal: false,
      mfechaEditFinal: false,
      fcalendarFinal: new Date().toISOString().substr(0, 10),
      columnDefs: null,
      rowData: null,
      modules: AllCommunityModules
    }
  },
  beforeMount () {
    this.columnDefs = [
      { headerName: 'HEADER 1', field: 'make' },
      { headerName: 'HEADER 2', field: 'model' },
      { headerName: 'HEADER 3', field: 'price' },
      { headerName: 'HEADER 4', field: 'datainfo' },
      { headerName: 'HEADER 5', field: 'info' }
    ]

    this.rowData = [
      { make: 'Info 1', model: 'Info 2', price: 'Info 3', datainfo: 'Info 4', info: 'Info 5' },
      { make: 'Info 1', model: 'Info 2', price: 'Info 3', datainfo: 'Info 4', info: 'Info 5' },
      { make: 'Info 1', model: 'Info 2', price: 'Info 3', datainfo: 'Info 4', info: 'Info 5' }
    ]
  }
}
</script>
