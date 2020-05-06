<template>
  <v-layout row wrap>
    <v-layout row wrap>
      <v-app-bar
              color="black"
              fixed
              app
              dark
      >
        <v-icon>mdi-file-chart</v-icon>
        <v-toolbar-title v-text="title"/>
        <v-spacer />
        <img src="/logo.png" width="12%" max-height="5%" alt="Logo Kananfleet"/>
      </v-app-bar>
    </v-layout>
    <v-flex lg12 md12>
      <div class="headline">
        <!--v-icon color="black">mdi-clipboard-check</v-icon-->
        Mean time to repair
        <hr class="my-3">
      </div>
      <div class="headline">
        <!--v-icon color="black">mdi-clipboard-check</v-icon-->
        Mean time to repair
        <hr class="my-3">
      </div>
      <!-- Controles-->
      <v-layout row wrap>
        <v-flex xs2>
          <div style="margin-left: 3%; margin-top: 7%;">
            <v-select
              label="nombre"
              v-model="consultar"
              :options="tipoConsulta"
              placeholder="tipo consulta"
            ></v-select>
          </div>
        </v-flex>
        <v-flex xs2 sm2 md2 style="margin-left: 1%; max-width: 120px;">
          <v-form
            v-model="valid"
            lazy-validation>
            <v-flex xs12 sm12 md12>
              <v-menu
                      v-model="mfechaEdit"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                          v-model="computedFormattedInicio"
                          label="Fecha Inicial"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="fcalendarEdit" @input="mfechaEdit = false" color="grey darken-4" locale="es"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-form>
        </v-flex>
        <v-flex xs2 sm2 md2 style="margin-left: 1%; max-width: 120px;">
          <v-form
            v-model="validFinal"
            lazy-validation>
            <v-flex xs12 sm12 md12>
              <v-menu
                      v-model="mfechaEditFinal"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                          v-model="computedFormattedFin"
                          label="Fecha Final"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="fcalendarFinal" @input="mfechaEditFinal = false" color="grey darken-4" locale="es"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-form>
        </v-flex>
        <v-flex xs2 style="max-width: 120px;">
          <div style="margin-left: 10%; margin-top: 12%;">
            <v-btn @click="getGraficaData" small color="primary">
              <v-icon>mdi-magnify</v-icon> Buscar
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs2>
          <div style="margin-left: 10%; margin-top: 7%;">
            <v-btn small dark color="blue-grey lighten-1" @click="getGraficaDetalle"><v-icon>mdi-chart-bell-curve-cumulative</v-icon>Generar gráfica</v-btn>
          </div>
        </v-flex>
        <v-flex xs2 style="max-width: 100px;">
          <div style="margin-left: 3%; margin-top: 14%;">
            <v-btn @click="excel" small dark color="green">
              <v-icon>mdi-file-excel</v-icon> EXCEL
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs2 style="max-width: 100px;">
          <div style="margin-left: 3%; margin-top: 14%;">
            <v-btn @click="pdf" small dark color="green">
              <v-icon>mdi-file-pdf-box</v-icon> PDF
            </v-btn>
          </div>
        </v-flex>
        <!--v-flex xs2 style="max-width: 150px;">
          <download-excel
            style="margin-left: 7%; margin-top: 10%;"
            color="green"
            class   = "v-btn v-btn--contained theme--light v-size--small green"
            :data   = "rowData"
            :fields = "ColExcel"
            name    = "Reporte_costos_mantenimiento.xls">
            <i aria-hidden="true" class="v-icon notranslate mdi mdi-download theme--light" style="color: white"></i> <span style="color: white">Descargar</span>
          </download-excel>
        </v-flex-->

        <!--v-flex xs2 style="max-width: 150px;">
          <div style="margin-left: 3%; margin-top: 7%;">
            <v-select
              v-model="modelTipoGrafica"
              :options="tipoGrafica"
              @change="ChangeTipoGrafica"
              placeholder="T. grafica"
            ></v-select>
          </div>
        </v-flex-->

        <!-- Grid -->
        <v-flex xs12>
          <v-data-table
            :headers="colsTable"
            :items="rowDataTable"
            item-key="sucursal_id"
            dense
            group-by="sucursal_nombre"
            class="elevation-1"
            locale="esp"
          ></v-data-table>
        </v-flex>
        <!-- Chart -->
        <!-- Grid -->
        <!-- Dialog -->
        <v-dialog v-model="dialog" width="90%">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Grafica de mean time to repair
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <!-- controles -->
                <v-flex xs4></v-flex>

                <!--v-flex xs2>
                  <div style="margin-left: 3%; margin-top: 7%;">
                    <v-select
                      v-model="modelTipoGrafica"
                      :options="tipoGrafica"
                      @change="ChangeTipoGrafica"
                      placeholder="T. grafica"
                    ></v-select>
                  </div>
                </v-flex-->

                <v-flex xs3>
                  <v-card-text>
                    <p>* Unidades expresadas en Hrs</p>
                    <v-switch v-model="switch_graf" class="ma-2" label="Gráfica de Lineas"></v-switch>
                  </v-card-text>
                </v-flex>

                <v-flex xs1>
                  <div style="margin-left: 3%; margin-top: 14%;">
                    <v-btn small color="success" @click="getDataGrafica" style="margin-left: 1%;"><v-icon>mdi-chart-line</v-icon>Graficar</v-btn>
                  </div>
                </v-flex>
                <v-flex xs4></v-flex>
                <!-- controles -->
                <!--BarChart :labelsData="labelsData" :dataInfo="dataInfo" ref="chartBar"></BarChart-->
                <!-- Chart -->
                <!--v-flex xs6>
                  <h3 style="text-align: center;"> Indicadores de respuesta </h3>
                  <canvas id="Graf_Pie"></canvas>
                </v-flex>
                <v-flex xs6>
                  <h3 style="text-align: center;"> Tiempo de mantenibles detenidos (unidades expresadas en minutos) </h3>
                  <canvas id="Graf_Bar"></canvas>
                </v-flex-->
                <v-flex xs12>
                  <canvas id="Graf_Line"></canvas>
                  <template v-if="dialog">
                    <div class="text-center">
                      <v-pagination
                        v-model="page"
                        :length="noPaginas"
                        circle
                        @input="next"
                      ></v-pagination>
                    </div>
                  </template>
                </v-flex>
                <v-flex xs12>
                  <canvas id="Graf_Line_bar"></canvas>
                </v-flex>
                <!-- Chart -->
              </v-layout>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="warning" @click="dialog = false">Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialog -->
        <!-- Overlay -->
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <!-- Overlay -->
        <!-- MsjError -->
        <v-dialog v-model="msjException" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">
              <v-icon color="primary">mdi-information-outline</v-icon>
              <span class="title">Mensaje del Sistema</span>
            </v-card-title>
            <v-card-text>
              <p class="body-2 text-md-center">{{msjAlerta}}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" dark text @click="msjException = false">Aceptar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- MsjError -->
      </v-layout>
      <!--  -->
    </v-flex>
  </v-layout>
</template>
<script>
// import { AgGridVue } from '@ag-grid-community/vue'
// import { AllCommunityModules } from '@ag-grid-community/all-modules'
import Chart from 'chart.js'
import vSelect from 'vue-select-rair'
import unirest from 'unirest'
import JsonExcel from 'vue-json-to-excel';
Vue.component('downloadExcel', JsonExcel);
import Vue from 'vue'
import XLSX from 'xlsx'
export default {
  components: {
    // AgGridVue,
    vSelect,
    XLSX
  },
  data () {
    return {
      modelSelectMante: [],
      dataSelectMante: [],
      modelSelectTMant: [],
      dataSelectTMant: [],
      modelSelect: [],
      selectSucursal: [],
      modelSelectTMmnto: [],
      dataSelectTmmnto: [],
      valid: false,
      mfechaEdit: false,
      fcalendarEdit: new Date().toISOString().substr(0, 10),
      validFinal: false,
      mfechaEditFinal: false,
      fcalendarFinal: new Date().toISOString().substr(0, 10),
      columnDefs: [],
      colsTable: [],
      ColExcel: [],
      rowData: [],
      rowDataTable: [],
      // modules: AllCommunityModules,
      expand: false,
      eficienciaDet: true,
      eficiencia: true,
      dialog: false,
      pieLabel: [],
      pieData: [],
      dataColor: [],
      barLabel: [],
      barData: [],
      lineLabel: [],
      lineData: [],
      modelTipoGrafica: 'bar',
      tipoGrafica: ['line', 'bar', 'pie'],
      Temporal: null,
      title: 'Reportes',
      overlay: false,
      msjAlerta: '',
      msjException: false,
      consultar: { nombre:'Sucursal', tipo:1 },
      tipoConsulta: [
        { nombre: 'Sucursal', tipo: 1 },
        { nombre: 'Tipo mantenible', tipo: 2 },
        { nombre: 'Mantenible', tipo: 3 }
      ],
      switch_graf: false,
      page: 1,
      noPaginas: 1,
      cantidadAgrupa: 7,
      iniArr: 0,
      finArr: 0,
    }
  },
  methods: {
    onGridReady (params) {
      console.log('onGridReady')
      this.gridApi = params.api
      this.columnApi = params.columnApi
      this.columnApi.autoSizeAllColumns()
      setTimeout(() => {
        this.columnApi.autoSizeAllColumns()
      }, 500)
    },
    ChangeProyecto (event) {
      console.log('function: ChangeProyecto(). ')
      /* Si se seleccinan todos */
      for (let f = 0; f < this.modelSelect.length; f++) {
        if (this.modelSelect[f].sucursal_id === 0) {
          this.modelSelect = this.selectSucursal
        }
      }
      console.log(this.modelSelect)
    },
    ChangeTipoMmnto (event) {
      console.log('function: ChangeTipoMmnto(). ')
      /* Si se seleccionan todos */
      for (let g = 0; g < this.modelSelectTMmnto.length; g++) {
        if (this.modelSelectTMmnto[g].tipoMantenimiento_id === 0) {
          this.modelSelectTMmnto = this.dataSelectTmmnto
        }
      }
      console.log(this.modelSelectTMmnto)
    },
    ChangeTipoMante (event) {
      console.log('function: ChangeTipoMante().')
      /* Si se seleccionan todos */
      for (let h = 0; h < this.modelSelectTMant.length; h++) {
        if (this.modelSelectTMant[h].tipovehiculo_id === 0) {
          this.modelSelectTMant = this.dataSelectTMant
        }
      }
      console.log(this.modelSelectTMant)
      /* Validando los mantenivles de tipo de mantenibles */
      /* Arreglo general */
      this.Temporal = []
      for (let a = 0; a < this.modelSelectTMant.length; a++) {
        for (let b = 0; b < this.dataSelectMante.length; b++) {
          if (this.modelSelectTMant[a].tipovehiculo_id === this.dataSelectMante[b].tipoMantenible_id && this.dataSelectMante[b].mantenible_id !== 0) {
            this.Temporal.push(this.dataSelectMante[b])
          }
        }
      }
      this.modelSelectMante = this.Temporal
      this.Temporal = []
    },
    ChangeMantenible (event) {
      console.log('function: ChangeMantenible().')
      /* Si se seleccionan todos */
      for (let i = 0; i < this.modelSelectMante.length; i++) {
        if (this.modelSelectMante[i].mantenible_id === 0) {
          this.modelSelectMante = this.dataSelectMante
        }
      }
      console.log(this.modelSelectMante)
    },
    ChangeTipoGrafica (event) {
      console.log('function: ChangeTipoGrafica().')
      console.log(this.modelTipoGrafica)
      if (this.modelTipoGrafica === '' || this.modelTipoGrafica === null) {
        this.modelTipoGrafica = 'line'
      }
      console.log(this.modelTipoGrafica)
    },
    getGraficaDetalle () {
      console.log('function: getGraficaDetalle().')
      console.log('Comentario para actualizar git. ')
      this.dialog = true
    },
    excel () {
      let vm = this
      console.log('function: Excel().')
      let data = XLSX.utils.json_to_sheet(vm.rowDataTable)
      const workbook = XLSX.utils.book_new()
      const filename = 'Mean_time_to_repair'
      XLSX.utils.book_append_sheet(workbook, data, filename)
      XLSX.writeFile(workbook, `${filename}.xlsx`)
    },
    pdf() {
      let vm = this
      console.log('function: PDF().')
      if (vm.rowDataTable.length === 0) {
        vm.msjException = true
        vm.msjAlerta = 'Debe de realizar una búsqueda para poder descargar el reporte'
        return false
      }
      var headerTable = ''
      var detalle = ''
      var nombre = 'MeanTimeToRepair'
      if(vm.rowDataTable.length > 0) {
        headerTable += '' +
          '<td style="border: 1px solid #ddd;">PROYECTO</td>' +
          '<td style="border: 1px solid #ddd;">MANTENIBLE</td>' +
          '<td style="border: 1px solid #ddd;">TIPO_MANTENIBLE</td>' +
          '<td style="border: 1px solid #ddd;">< 30 MIN</td>' +
          '<td style="border: 1px solid #ddd;">> 30 MIN</td>' +
          '<td style="border: 1px solid #ddd;">FECHA_SOLICITUD</td>' +
          '<td style="border: 1px solid #ddd;">FECHA_REPARANDO</td>' +
          '<td style="border: 1px solid #ddd;">FECHA_TERMINADO</td>' +
          '<td style="border: 1px solid #ddd;">MIN_RESPUESTA</td>' +
          '<td style="border: 1px solid #ddd;">MIN_REPARACION</td>' +
          '<td style="border: 1px solid #ddd;">MIN_DETENIDO</td>'

        for(var x = 0; x < vm.rowDataTable.length; x++) {
          detalle += '<tr style="border: 1px solid #ddd;">' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].sucursal_nombre + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].mantenible_nombre + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].tipovehiculo_nombre + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].menor_30 + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].mayor_30 + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].fecha_solicitud + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].fecha_reparando + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].fecha_fin + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].tiempo_respuesta + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].tiempo_reparacion + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].tiempo_paro + '</td>' +
            '</tr>'
        }
      }

      var formatoPrint = '<div style="text-align: center; margin-top: 30px; font-family: verdana;"><h3>' + nombre + '</h3></div>' +
        '<table style="border-collapse: collapse; font-size: 13px; width: 100%; text-align: center; margin-top: -1px; font-family: verdana;">' +
        '<tr style="border: 1px solid #ddd; font-weight: bold">' +
        headerTable +
        '</tr>' +
        detalle +
        '</table>'

      const newWin = window.open('')
      newWin.document.write(formatoPrint)
      setTimeout(function () {
        newWin.print()
        newWin.close()
      }, 550)
    },
    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      /* Comentario */
      /* if (ctx) {
        ctx.clear()
        ctx.destroy()
      } */
      // eslint-disable-next-line no-unused-vars
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    },
    getPieMounted () {
      console.log('function: getPieMounted(). ')
      this.pieLabel = []
      this.pieData = []
      this.Temporal = []
      /* Arreglo general */
      this.Temporal.push({ 'menor_30': 0, 'mayor_30': 0 })
      /* Sumando cantidades al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        /* Calculando tiempos de respuesta */
        /* this.rowData[b].total = this.rowData[b].cantidad * this.rowData[b].costo */
        // eslint-disable-next-line new-cap,no-undef,camelcase,no-unused-vars
        const tiempo_respuesta = new Date(this.rowData[b].fecha_reparando).getTime() - new Date(this.rowData[b].fecha_solicitud).getTime()
        // eslint-disable-next-line camelcase
        this.rowData[b].tiempo_respuesta = Math.round(tiempo_respuesta / (1000 * 60))
        // eslint-disable-next-line new-cap,no-undef,camelcase,no-unused-vars
        const tiempo_reparacion = new Date(this.rowData[b].fecha_fin).getTime() - new Date(this.rowData[b].fecha_reparando).getTime()
        // eslint-disable-next-line camelcase
        this.rowData[b].tiempo_reparacion = Math.round(tiempo_reparacion / (1000 * 60))
        // eslint-disable-next-line new-cap,no-undef,camelcase,no-unused-vars
        const tiempo_paro = new Date(this.rowData[b].fecha_fin).getTime() - new Date(this.rowData[b].fecha_solicitud).getTime()
        // eslint-disable-next-line camelcase
        this.rowData[b].tiempo_paro = Math.round(tiempo_paro / (1000 * 60))
        /* Validando tiempos */
        if (this.rowData[b].tiempo_respuesta <= 30) {
          this.Temporal[0].menor_30 += 1
        }
        if (this.rowData[b].tiempo_respuesta > 30) {
          this.Temporal[0].mayor_30 += 1
        }
      }
      /* Insertando cantidades */
      for (let d = 0; d < this.Temporal.length; d++) {
        this.pieLabel.push('menor_30', 'mayor_30')
        this.pieData.push(this.Temporal[0].menor_30, this.Temporal[0].mayor_30)
        this.dataColor.push(this.getRandomColor())
      }
      /* Actualizando en arreglo de gráfica */
      this.DataPie.data.labels = this.pieLabel
      this.DataPie.data.datasets[0].data = this.pieData
      this.DataPie.data.datasets[0].backgroundColor = this.dataColor
      this.DataPie.data.datasets[0].borderColor = this.dataColor
      this.DataPie.data.datasets[0]._meta = []
      if (this.dialog === true) {
        this.createChart('Graf_Pie', this.DataPie)
      }
      this.Temporal = []
    },
    getPie () {
      console.log('function: getPie(). ')
      this.pieLabel = []
      this.pieData = []
      this.Temporal = []
      if (this.modelSelect.length <= 0) {
        this.msjAlerta = 'Seleccione un proyecto. '
        this.msjException = true
        return
      }
      if (this.modelSelectTMant.length <= 0) {
        this.msjAlerta = 'Seleccione un tipo de mantenible. '
        this.msjException = true
        return
      }
      if (this.modelSelectMante.length <= 0) {
        this.msjAlerta = 'Seleccione un mantenible. '
        this.msjException = true
        return
      }
      /* Validación */
      if (this.modelSelect.length <= 0) {
        this.msjAlerta = 'Seleccione un mantenimiento. '
        this.msjException = true
        return
      }
      /* Arreglo general */
      this.Temporal.push({ 'menor_30': 0, 'mayor_30': 0 })
      /* Sumando cantidades al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        /* Calculando tiempos de respuesta */
        for (let c = 0; c < this.modelSelect.length; c++) {
          if (this.rowData[b].sucursal_id === this.modelSelect[c].sucursal_id && this.modelSelect[c].sucursal_id !== 0) {
            // eslint-disable-next-line new-cap,no-undef,camelcase,no-unused-vars
            const tiempo_respuesta = new Date(this.rowData[b].fecha_reparando).getTime() - new Date(this.rowData[b].fecha_solicitud).getTime()
            // eslint-disable-next-line camelcase
            this.rowData[b].tiempo_respuesta = Math.round(tiempo_respuesta / (1000 * 60))
            // eslint-disable-next-line new-cap,no-undef,camelcase,no-unused-vars
            const tiempo_reparacion = new Date(this.rowData[b].fecha_fin).getTime() - new Date(this.rowData[b].fecha_reparando).getTime()
            // eslint-disable-next-line camelcase
            this.rowData[b].tiempo_reparacion = Math.round(tiempo_reparacion / (1000 * 60))
            // eslint-disable-next-line new-cap,no-undef,camelcase,no-unused-vars
            const tiempo_paro = new Date(this.rowData[b].fecha_fin).getTime() - new Date(this.rowData[b].fecha_solicitud).getTime()
            // eslint-disable-next-line camelcase
            this.rowData[b].tiempo_paro = Math.round(tiempo_paro / (1000 * 60))
            /* Validando tiempos */
            if (this.rowData[b].tiempo_respuesta <= 30) {
              this.rowData[b].menor_30 += 1
              this.Temporal[0].menor_30 += 1
            }
            if (this.rowData[b].tiempo_respuesta > 30) {
              this.rowData[b].mayor_30 += 1
              this.Temporal[0].mayor_30 += 1
            }
          }
        }
      }
      /* Insertando cantidades */
      for (let d = 0; d < this.Temporal.length; d++) {
        this.pieLabel.push('menor_30', 'mayor_30')
        this.pieData.push(this.Temporal[0].menor_30, this.Temporal[0].mayor_30)
        this.dataColor.push(this.getRandomColor())
      }
      /* Actualizando en arreglo de gráfica */
      const temp = this.DataPie
      this.DataPie = null
      this.DataPie = temp
      this.DataPie.data.labels = []
      this.DataPie.data.datasets[0].data = []
      this.DataPie.data.labels = this.pieLabel
      this.DataPie.data.datasets[0].data = this.pieData
      this.DataPie.data.datasets[0].backgroundColor = this.dataColor
      this.DataPie.data.datasets[0].borderColor = this.dataColor
      this.DataPie.data.datasets[0]._meta = []
      if (this.dialog === true) {
        this.createChart('Graf_Pie', this.DataPie)
      }
      this.Temporal = []
    },
    getBarMounted () {
      console.log('function: getBarMounted(). ')
      this.barLabel = []
      this.barData = []
      this.Temporal = []
      /* Arreglo general */
      for (let a = 0; a < this.dataSelectMante.length; a++) {
        if (this.dataSelectMante[a].mantenible_nombre !== 'Todo') {
          this.Temporal.push({ 'mantenible_id': this.dataSelectMante[a].mantenible_id, 'mantenible_nombre': this.dataSelectMante[a].mantenible_nombre, 'tiempo_paro': 0 })
        }
      }
      /* Sumando tiempos al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          if (this.rowData[b].mantenible_id === this.Temporal[c].mantenible_id && this.Temporal[c].mantenible_id !== 0) {
            this.Temporal[c].tiempo_paro += this.rowData[b].tiempo_paro
          }
        }
      }
      /* Insertando tiempos */
      for (let d = 0; d < this.Temporal.length; d++) {
        this.barLabel.push(this.Temporal[d].mantenible_nombre)
        this.barData.push(this.Temporal[d].tiempo_paro)
        this.dataColor.push(this.getRandomColor())
      }
      /* Actualizando en arreglo de gráfica */
      this.DataBar.data.labels = []
      this.DataBar.data.datasets[0].data = []
      this.DataBar.data.labels = this.barLabel
      this.DataBar.data.datasets[0].data = this.barData
      this.DataBar.data.datasets[0].backgroundColor = this.dataColor
      this.DataBar.data.datasets[0].borderColor = this.dataColor
      this.DataBar.data.datasets[0]._meta = []
      if (this.dialog === true) {
        this.createChart('Graf_Bar', this.DataBar)
      }
      this.Temporal = []
    },
    getBar () {
      console.log('function: getBar(). ')
      /* Validaciones */
      if (this.modelSelect.length <= 0) {
        this.msjAlerta = 'Seleccione un proyecto. '
        this.msjException = true
        return
      }
      if (this.modelSelectTMant.length <= 0) {
        this.msjAlerta = 'Seleccione un tipo de mantenible. '
        this.msjException = true
        return
      }
      if (this.modelSelectMante.length <= 0) {
        this.msjAlerta = 'Seleccione un mantenible. '
        this.msjException = true
        return
      }
      this.barLabel = []
      this.barData = []
      this.Temporal = []
      /* Arreglo general */
      for (let a = 0; a < this.modelSelectMante.length; a++) {
        if (this.modelSelectMante[a].mantenible_nombre !== 'Todo') {
          this.Temporal.push({ 'mantenible_id': this.modelSelectMante[a].mantenible_id, 'mantenible_nombre': this.modelSelectMante[a].mantenible_nombre, 'tiempo_paro': 0 })
        }
      }
      /* Sumando tiempo_paro al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          if (this.rowData[b].mantenible_id === this.Temporal[c].mantenible_id && this.Temporal[c].mantenible_id !== 0) {
            this.Temporal[c].tiempo_paro += this.rowData[b].tiempo_paro
          }
        }
      }
      /* Insertando tiempo_paro */
      for (let d = 0; d < this.Temporal.length; d++) {
        this.barLabel.push(this.Temporal[d].mantenible_nombre)
        this.barData.push(this.Temporal[d].tiempo_paro)
        this.dataColor.push(this.getRandomColor())
      }
      /* Actualizando en arreglo de gráfica */
      const temp = this.DataBar
      this.DataBar = null
      this.DataBar = temp
      this.DataBar.data.labels = []
      this.DataBar.data.datasets[0].data = []
      this.DataBar.data.labels = this.barLabel
      this.DataBar.data.datasets[0].data = this.barData
      this.DataBar.data.datasets[0].backgroundColor = this.dataColor
      this.DataBar.data.datasets[0].borderColor = this.dataColor
      this.DataBar.data.datasets[0]._meta = []
      if (this.dialog === true) {
        this.createChart('Graf_Bar', this.DataBar)
      }
      this.Temporal = []
    },
    getLineSucursal () {
      console.log('function: getLineSucursal(). ')
      this.lineLabel = []
      this.lineData = []
      this.Temporal = []
      this.Temporal.push({
        'sucursal_id': 0,
        'sucursal_nombre': 'SIN ASIGNAR',
        'tiempo_respuesta': 0,
        'tiempo_reparacion': 0,
        'tiempo_paro': 0
      })
      /* Arreglo general */
      for (let a = 0; a < this.selectSucursal.length; a++) {
        if (a >= this.iniArr && a <= this.finArr && this.selectSucursal[a].sucursal_nombre !== 'Todo') {
          this.Temporal.push({
            'sucursal_id': this.selectSucursal[a].sucursal_id,
            'sucursal_nombre': this.selectSucursal[a].sucursal_nombre,
            'tiempo_respuesta': 0,
            'tiempo_reparacion': 0,
            'tiempo_paro': 0
          })
        }
      }
      /* Sumando tiempo_paro al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          if (this.rowData[b].sucursal_id === this.Temporal[c].sucursal_id) {
            this.Temporal[c].tiempo_respuesta += this.rowData[b].tiempo_respuesta
            this.Temporal[c].tiempo_reparacion += this.rowData[b].tiempo_reparacion
            this.Temporal[c].tiempo_paro += this.rowData[b].tiempo_paro
          }
        }
      }
      /* Insertando cantidades */
      // eslint-disable-next-line no-array-constructor
      this.lineData.push(new Array())
      // eslint-disable-next-line no-array-constructor
      this.lineData.push(new Array())
      // eslint-disable-next-line no-array-constructor
      this.lineData.push(new Array())
      for (let d = 0; d < this.Temporal.length; d++) {
        this.lineLabel.push(this.Temporal[d].sucursal_nombre)
        this.lineData[0].push(this.Temporal[d].tiempo_respuesta)
        this.lineData[1].push(this.Temporal[d].tiempo_reparacion)
        this.lineData[2].push(this.Temporal[d].tiempo_paro)
      }
      /* Actualizando en arreglo de gráfica */
      this.DataLine.data.labels = []
      //this.DataLine.type = 'bar'
      this.DataLine.data.datasets[0].data = []
      this.DataLine.data.labels = this.lineLabel
      this.DataLine.type = this.modelTipoGrafica
      this.DataLine.data.datasets[0].data = this.lineData[0]
      this.DataLine.data.datasets[0].type = this.modelTipoGrafica
      this.DataLine.data.datasets[1].data = this.lineData[1]
      this.DataLine.data.datasets[1].type = this.modelTipoGrafica
      this.DataLine.data.datasets[2].data = this.lineData[2]
      this.DataLine.data.datasets[2].type = this.modelTipoGrafica
      this.DataLine.data.datasets[0]._meta = []
      this.DataLine.data.datasets[1]._meta = []
      this.DataLine.data.datasets[2]._meta = []
      if (this.dialog === true) {
        this.createChart('Graf_Line', this.DataLine)
      }
      this.Temporal = []
    },
    getLineTipoMantenible () {
      console.log('function: getLineTipoMantenible(). ')
      this.lineLabel = []
      this.lineData = []
      this.Temporal = []
      this.Temporal.push({
        'tipovehiculo_id': 0,
        'tipovehiculo_nombre': 'SIN ASIGNAR',
        'tiempo_respuesta': 0,
        'tiempo_reparacion': 0,
        'tiempo_paro': 0
      })
      /* Arreglo general */
      for (let a = 0; a < this.dataSelectTMant.length; a++) {
        if (a >= this.iniArr && a <= this.finArr && this.dataSelectTMant[a].tipovehiculo_nombre !== 'Todo') {
          this.Temporal.push({
            'tipovehiculo_id': this.dataSelectTMant[a].tipovehiculo_id,
            'tipovehiculo_nombre': this.dataSelectTMant[a].tipovehiculo_nombre,
            'tiempo_respuesta': 0,
            'tiempo_reparacion': 0,
            'tiempo_paro': 0
          })
        }
      }
      /* Sumando tiempo_paro al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          if (this.rowData[b].tipoMantenible_id === this.Temporal[c].tipovehiculo_id) {
            this.Temporal[c].tiempo_respuesta += this.rowData[b].tiempo_respuesta
            this.Temporal[c].tiempo_reparacion += this.rowData[b].tiempo_reparacion
            this.Temporal[c].tiempo_paro += this.rowData[b].tiempo_paro
          }
        }
      }
      /* Insertando cantidades */
      // eslint-disable-next-line no-array-constructor
      this.lineData.push(new Array())
      // eslint-disable-next-line no-array-constructor
      this.lineData.push(new Array())
      // eslint-disable-next-line no-array-constructor
      this.lineData.push(new Array())
      for (let d = 0; d < this.Temporal.length; d++) {
        this.lineLabel.push(this.Temporal[d].tipovehiculo_nombre)
        this.lineData[0].push(this.Temporal[d].tiempo_respuesta)
        this.lineData[1].push(this.Temporal[d].tiempo_reparacion)
        this.lineData[2].push(this.Temporal[d].tiempo_paro)
      }
      /* Actualizando en arreglo de gráfica */
      this.DataLine.data.labels = []
      //this.DataLine.type = 'bar'
      this.DataLine.data.datasets[0].data = []
      this.DataLine.data.labels = this.lineLabel
      this.DataLine.type = this.modelTipoGrafica
      this.DataLine.data.datasets[0].data = this.lineData[0]
      this.DataLine.data.datasets[0].type = this.modelTipoGrafica
      this.DataLine.data.datasets[1].data = this.lineData[1]
      this.DataLine.data.datasets[1].type = this.modelTipoGrafica
      this.DataLine.data.datasets[2].data = this.lineData[2]
      this.DataLine.data.datasets[2].type = this.modelTipoGrafica
      this.DataLine.data.datasets[0]._meta = []
      this.DataLine.data.datasets[1]._meta = []
      this.DataLine.data.datasets[2]._meta = []
      if (this.dialog === true) {
        this.createChart('Graf_Line', this.DataLine)
      }
      this.Temporal = []
    },
    getLineMantenible () {
      console.log('function: getLineMantenible(). ')
      this.lineLabel = []
      this.lineData = []
      this.Temporal = []
      this.Temporal.push({
        'tipovehiculo_id': 0,
        'tipovehiculo_nombre': 'SIN ASIGNAR',
        'tiempo_respuesta': 0,
        'tiempo_reparacion': 0,
        'tiempo_paro': 0
      })
      /* Arreglo general */
      for (let a = 0; a < this.dataSelectMante.length; a++) {
        if (a >= this.iniArr && a <= this.finArr && this.dataSelectMante[a].mantenible_nombre !== 'Todo') {
          this.Temporal.push({
            'mantenible_id': this.dataSelectMante[a].mantenible_id,
            'mantenible_nombre': this.dataSelectMante[a].mantenible_nombre,
            'tiempo_respuesta': 0,
            'tiempo_reparacion': 0,
            'tiempo_paro': 0
          })
        }
      }
      /* Sumando tiempo_paro al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          if (this.rowData[b].mantenible_id === this.Temporal[c].mantenible_id && this.Temporal[c].mantenible_id !== 0) {
            this.Temporal[c].tiempo_respuesta += this.rowData[b].tiempo_respuesta
            this.Temporal[c].tiempo_reparacion += this.rowData[b].tiempo_reparacion
            this.Temporal[c].tiempo_paro += this.rowData[b].tiempo_paro
          }
        }
      }
      /* Insertando cantidades */
      // eslint-disable-next-line no-array-constructor
      this.lineData.push(new Array())
      // eslint-disable-next-line no-array-constructor
      this.lineData.push(new Array())
      // eslint-disable-next-line no-array-constructor
      this.lineData.push(new Array())
      for (let d = 0; d < this.Temporal.length; d++) {
        this.lineLabel.push(this.Temporal[d].mantenible_nombre)
        this.lineData[0].push(this.Temporal[d].tiempo_respuesta)
        this.lineData[1].push(this.Temporal[d].tiempo_reparacion)
        this.lineData[2].push(this.Temporal[d].tiempo_paro)
      }
      /* Actualizando en arreglo de gráfica */
      this.DataLine.data.labels = []
      //this.DataLine.type = 'bar'
      this.DataLine.data.datasets[0].data = []
      this.DataLine.data.labels = this.lineLabel
      this.DataLine.type = this.modelTipoGrafica
      this.DataLine.data.datasets[0].data = this.lineData[0]
      this.DataLine.data.datasets[0].type = this.modelTipoGrafica
      this.DataLine.data.datasets[1].data = this.lineData[1]
      this.DataLine.data.datasets[1].type = this.modelTipoGrafica
      this.DataLine.data.datasets[2].data = this.lineData[2]
      this.DataLine.data.datasets[2].type = this.modelTipoGrafica
      this.DataLine.data.datasets[0]._meta = []
      this.DataLine.data.datasets[1]._meta = []
      this.DataLine.data.datasets[2]._meta = []
      if (this.dialog === true) {
        this.createChart('Graf_Line', this.DataLine)
      }
      this.Temporal = []
    },
    getLine () {
      console.log('function: getLine(). ')
      this.lineLabel = []
      this.lineData = []
      this.Temporal = []
      /* Se valida que se tengan seleccionado vehículos */
      /*
      if (this.modelSelect.length <= 0) {
        this.msjAlerta = 'Seleccione un proyecto. '
        this.msjException = true
        return
      }
      if (this.modelSelectTMant.length <= 0) {
        this.msjAlerta = 'Seleccione un tipo de mantenible. '
        this.msjException = true
        return
      }
      if (this.modelSelectMante.length <= 0) {
        this.msjAlerta = 'Seleccione un mantenible. '
        this.msjException = true
        return
      }
      */
      /* Arreglo general */
      for (let a = 0; a < this.modelSelectMante.length; a++) {
        if (this.modelSelectMante[a].mantenible_nombre !== 'Todo') {
          this.Temporal.push({
            'mantenible_id': this.modelSelectMante[a].mantenible_id,
            'mantenible_nombre': this.modelSelectMante[a].mantenible_nombre,
            'tiempo_respuesta': 0,
            'tiempo_reparacion': 0,
            'tiempo_paro': 0
          })
        }
      }
      /* Sumando tiempo_paro al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          if (this.rowData[b].mantenible_id === this.Temporal[c].mantenible_id && this.Temporal[c].mantenible_id !== 0) {
            this.Temporal[c].tiempo_respuesta += this.rowData[b].tiempo_respuesta
            this.Temporal[c].tiempo_reparacion += this.rowData[b].tiempo_reparacion
            this.Temporal[c].tiempo_paro += this.rowData[b].tiempo_paro
          }
        }
      }
      /* Insertando cantidades */
      // eslint-disable-next-line no-array-constructor
      this.lineData.push(new Array())
      // eslint-disable-next-line no-array-constructor
      this.lineData.push(new Array())
      // eslint-disable-next-line no-array-constructor
      this.lineData.push(new Array())
      for (let d = 0; d < this.Temporal.length; d++) {
        this.lineLabel.push(this.Temporal[d].mantenible_nombre)
        this.lineData[0].push(this.Temporal[d].tiempo_respuesta)
        this.lineData[1].push(this.Temporal[d].tiempo_reparacion)
        this.lineData[2].push(this.Temporal[d].tiempo_paro)
      }
      /* Actualizando en arreglo de gráfica */
      this.DataLine.data.labels = []
      //this.DataLine.type = 'bar'
      this.DataLine.data.datasets[0].data = []
      this.DataLine.data.labels = this.lineLabel
      this.DataLine.type = this.modelTipoGrafica
      this.DataLine.data.datasets[0].data = this.lineData[0]
      this.DataLine.data.datasets[0].type = this.modelTipoGrafica
      this.DataLine.data.datasets[1].data = this.lineData[1]
      this.DataLine.data.datasets[1].type = this.modelTipoGrafica
      this.DataLine.data.datasets[2].data = this.lineData[2]
      this.DataLine.data.datasets[2].type = this.modelTipoGrafica
      this.DataLine.data.datasets[0]._meta = []
      this.DataLine.data.datasets[1]._meta = []
      this.DataLine.data.datasets[2]._meta = []
      if (this.dialog === true) {
        this.createChart('Graf_Line', this.DataLine)
      }
      this.Temporal = []
    },
    getDataGrafica () {
      let vm = this
      console.log('function: getDataGrafica(). ')
      vm.page = 1
      vm.switch_graf = false
      vm.obtnerRango(vm.page)
      //Sucursal
      if (vm.consultar.tipo == 1) {
        vm.noPaginas = this.getCantidadPage(this.cantidadAgrupa, this.selectSucursal.length)
        vm.getLineSucursal()
      }
      //Tipo mantenible
      if (vm.consultar.tipo == 2) {
        vm.noPaginas = this.getCantidadPage(this.cantidadAgrupa, this.dataSelectTMant.length)
        vm.getLineTipoMantenible()
      }
      //Mantenible
      if (vm.consultar.tipo == 3) {
        vm.noPaginas = this.getCantidadPage(this.cantidadAgrupa, this.dataSelectMante.length)
        vm.getLineMantenible()
      }
    },
    /* GetDatosWebService */
    getEmpresa () {
      // const vm = this
      console.log('function: getEmpresa(). ')
      const dato = this.$nuxt._route.query.id
      return dato
    },
    getSucursal () {
      const vm = this
      console.log('function: getSucursal(). ')
      let dato = ''
      if (vm.selectSucursal != null) {
        if (this.selectSucursal.length > 0) {
          for (let i = 0; i < vm.selectSucursal.length; i++) {
            if (dato === '') {
              dato += vm.selectSucursal[i].sucursal_id
            } else {
              dato += ',' + vm.selectSucursal[i].sucursal_id
            }
          }
        } else {
          vm.msjAlerta = 'No se han encontrado sucursales.'
          vm.msjException = true
          vm.overlay = false
          return;
        }
      } else {
        vm.msjAlerta = 'No se han encontrado sucursales.'
        vm.msjException = true
        vm.overlay = false
        return;
      }
      return dato
    },
    getTipoMantenible () {
      const vm = this
      console.log('function: getTipoMantenible(). ')
      let dato = ''
      if (vm.dataSelectTMant != null) {
        if (vm.dataSelectTMant.length > 0 ) {
          for (let i = 0; i < vm.dataSelectTMant.length; i++) {
            if (dato === '') {
              dato += vm.dataSelectTMant[i].tipovehiculo_id
            } else {
              dato += ',' + vm.dataSelectTMant[i].tipovehiculo_id
            }
          }
        } else {
          vm.msjAlerta = 'No se han encontrado tipos de mantenibles.'
          vm.msjException = true
          return;
        }
      } else {
        vm.msjAlerta = 'No se han encontrado tipos de mantenibles.'
        vm.msjException = true
        return;
      }
      return dato
    },
    getMantenible () {
      const vm = this
      console.log('function: getMantenible(). ')
      let dato = ''
      if (vm.dataSelectMante != null) {
        if (vm.dataSelectMante.length > 0) {
          for (let i = 0; i < vm.dataSelectMante.length; i++) {
            if (dato === '') {
              dato = '' + vm.dataSelectMante[i].mantenible_id + ''
            } else {
              dato += ', ' + '' + vm.dataSelectMante[i].mantenible_id + ''
            }
          }
        } else {
          vm.msjAlerta = 'No se han encontrado mantenibles.'
          vm.msjException = true
          vm.overlay = false
          return;
        }
      } else {
        vm.msjAlerta = 'No se han encontrado mantenibles.'
        vm.msjException = true
        vm.overlay = false
        return;
      }
      return dato
    },
    getGraficaData () {
      const vm = this
      console.log('function: getGraficaData(). ')
      const empresa = vm.getEmpresa()
      if (empresa == null || empresa <= 0) {
        vm.msjAlerta = 'No se tiene una dato de empresa.'
        vm.msjException = true
        return;
      }
      if (vm.consultar == null) {
        vm.msjAlerta = 'Seleccione un tipo de consulta.'
        vm.msjException = true
        return;
      }
      if (vm.consultar != null) {
        //Sucursal
        if (vm.consultar.tipo == 1) {
          const datos = vm.getSucursal()
          vm.overlay = true
          unirest('POST', 'http://webapiandroidtest.administraflotilla.com/api/Reportes/ConsultarReporteMeanTimeToRepair')
            .send({
              'EmpresaID': empresa,
              'sucursal_id': [ datos ],
              'FechaInicio': vm.fcalendarEdit + ' 00:00:00',
              'FechaFin': vm.fcalendarFinal + ' 23:59:59',
              'TimeZone': 'America/Mexico_City'
            }).end(function (res) {
            vm.overlay = false
            if (res.error) {
              vm.msjAlerta = 'Algo salió mal :('
              vm.msjException = true
              return
            }
            vm.rowData = res.body.obj
            if (vm.rowData == null) {
              vm.rowData = []
            }
            if (vm.rowData.length > 0) {
              console.log('Arreglo: ')
              console.log(vm.rowDataTable)
              vm.rowDataTable = vm.GeneraTiempo(vm.rowData)
              console.log('GeneraTiempo: ')
              console.log(vm.rowDataTable)
              vm.rowDataTable = vm.ConvertToUTC(vm.rowDataTable)
              console.log('ConvertToUTC: ')
              console.log(vm.rowDataTable)
              vm.rowDataTable = vm.FormateaDatos(vm.rowDataTable)
              console.log('ConvertToUTC: ')
              console.log(vm.rowDataTable)
            } else {
              console.log('Sin datos para mostrar')
              vm.msjAlerta = res.body.mensaje
              vm.msjException = true
            }
          })
        }
        //Tipo mantenible
        if (vm.consultar.tipo == 2) {
          const datos = vm.getTipoMantenible()
          vm.overlay = true
          unirest('POST', 'http://webapiandroidtest.administraflotilla.com/api/Reportes/ConsultarReporteMeanTimeToRepair')
            .send({
              'EmpresaID': empresa,
              'tipoMantenible_id': [ datos ],
              'FechaInicio': vm.fcalendarEdit + ' 00:00:00',
              'FechaFin': vm.fcalendarFinal + ' 23:59:59',
              'TimeZone': 'America/Mexico_City'
            }).end(function (res) {
            vm.overlay = false
            if (res.error) {
              vm.msjAlerta = 'Algo salió mal :('
              vm.msjException = true
              return
            }
            vm.rowData = res.body.obj
            if (vm.rowData == null) {
              vm.rowData = []
            }
            if (vm.rowData.length > 0) {
              console.log('Arreglo: ')
              console.log(vm.rowDataTable)
              vm.rowDataTable = vm.GeneraTiempo(vm.rowData)
              console.log('GeneraTiempo: ')
              console.log(vm.rowDataTable)
              vm.rowDataTable = vm.ConvertToUTC(vm.rowDataTable)
              console.log('ConvertToUTC: ')
              console.log(vm.rowDataTable)
              vm.rowDataTable = vm.FormateaDatos(vm.rowDataTable)
              console.log('ConvertToUTC: ')
              console.log(vm.rowDataTable)
            } else {
              console.log('Sin datos para mostrar')
              vm.msjAlerta = res.body.mensaje
              vm.msjException = true
            }
          })
        }
        //Mantenible
        if (vm.consultar.tipo == 3) {
          const datos = vm.getMantenible()
          vm.overlay = true
          unirest('POST', 'http://webapiandroidtest.administraflotilla.com/api/Reportes/ConsultarReporteMeanTimeToRepair')
            .send({
              'EmpresaID': empresa,
              'mantenible_id': [ datos ],
              'FechaInicio': vm.fcalendarEdit + ' 00:00:00',
              'FechaFin': vm.fcalendarFinal + ' 23:59:59',
              'TimeZone': 'America/Mexico_City'
            }).end(function (res) {
            vm.overlay = false
            if (res.error) {
              vm.msjAlerta = 'Algo salió mal :('
              vm.msjException = true
              return
            }
            vm.rowData = res.body.obj
            if (vm.rowData == null) {
              vm.rowData = []
            }
            if (vm.rowData.length > 0) {
              console.log('Arreglo: ')
              console.log(vm.rowDataTable)
              vm.rowDataTable = vm.GeneraTiempo(vm.rowData)
              console.log('GeneraTiempo: ')
              console.log(vm.rowDataTable)
              vm.rowDataTable = vm.ConvertToUTC(vm.rowDataTable)
              console.log('ConvertToUTC: ')
              console.log(vm.rowDataTable)
              vm.rowDataTable = vm.FormateaDatos(vm.rowDataTable)
              console.log('ConvertToUTC: ')
              console.log(vm.rowDataTable)
            } else {
              console.log('Sin datos para mostrar')
              vm.msjAlerta = res.body.mensaje
              vm.msjException = true
            }
          })
        }
      }
    },
    GeneraTiempo(arr) {
      let vm = this
      console.log('function: GeneraTiempo(). ')
      var areglo = []
      // Se crean los valores de los vehículos a utilizar
      for (var a = 0; a < vm.dataSelectMante.length; a++) {
        for (var b = 0; b < arr.length; b++) {
          if (arr[b].mantenible_id == vm.dataSelectMante[a].mantenible_id && vm.dataSelectMante[a].mantenible_id != 0 && vm.ValidaExisteArray(areglo, arr[b].mantenible_id) == false) {
            areglo.push({
              mantenible_id: vm.dataSelectMante[a].mantenible_id,
              mantenible_nombre: vm.dataSelectMante[a].mantenible_nombre,
              sucursal_id: 0,
              sucursal_nombre: '',
              tipovehiculo_id: 0,
              tipovehiculo_nombre: '',
              menor_30: 0.0,
              mayor_30: 0.0,
              fecha_solicitud: '',
              fecha_reparando: '',
              fecha_fin: '',
              tiempo_respuesta: 0.0,
              tiempo_reparacion: 0.0,
              tiempo_paro: 0.0
            })
          }
        }
      }
      for (var b = 0; b < areglo.length; b++) {
        for (var c = 0; c < arr.length; c++) {
          if (areglo[b].mantenible_id == arr[c].mantenible_id) {
            areglo[b].sucursal_id = (arr[c].sucursal_id == null) ? 0 : arr[c].sucursal_id
            areglo[b].sucursal_nombre = (arr[c].sucursal_id == null) ? 'SIN ASIGNAR' : arr[c].sucursal_nombre
            areglo[b].tipovehiculo_id = arr[c].tipoMantenible_id
            areglo[b].tipovehiculo_nombre = arr[c].tipoMantenible_nombre
            areglo[b].menor_30 += (arr[c].tiempo_respuesta <= 30 ? 1 : 0)
            areglo[b].mayor_30 += (arr[c].tiempo_respuesta > 30 ? 1 : 0)
            areglo[b].fecha_solicitud = arr[c].fecha_solicitud
            areglo[b].fecha_reparando = arr[c].fecha_reparando
            areglo[b].fecha_fin = arr[c].fecha_fin
            areglo[b].tiempo_respuesta += (arr[c].tiempo_respuesta != null) ? arr[c].tiempo_respuesta : 0
            areglo[b].tiempo_reparacion += (arr[c].tiempo_reparacion != null) ? arr[c].tiempo_respuesta : 0
            areglo[b].tiempo_paro += arr[c].tiempo_paro
          }
        }
      }

      /*
      for (var d = 0; d < areglo.length; d++) {
        areglo[d].menor_30 = vm.separaMiles(areglo[d].menor_30)
        areglo[d].mayor_30 = vm.separaMiles(areglo[d].mayor_30)
        areglo[d].tiempo_respuesta = vm.separaMiles(areglo[d].tiempo_respuesta)
        areglo[d].tiempo_reparacion = vm.separaMiles(areglo[d].tiempo_reparacion)
        areglo[d].tiempo_paro = vm.separaMiles(areglo[d].tiempo_paro)
      }
      */

      // separaMiles
      return areglo
    },
    FormateaDatos(arr) {
      let vm = this
      console.log('function: FormateaDatos(). ')
      var areglo = []
      areglo = arr
      for (var d = 0; d < areglo.length; d++) {
        areglo[d].menor_30 = vm.separaMiles(areglo[d].menor_30)
        areglo[d].mayor_30 = vm.separaMiles(areglo[d].mayor_30)
        areglo[d].tiempo_respuesta = vm.separaMiles(areglo[d].tiempo_respuesta)
        areglo[d].tiempo_reparacion = vm.separaMiles(areglo[d].tiempo_reparacion)
        areglo[d].tiempo_paro = vm.separaMiles(areglo[d].tiempo_paro)
      }
      return areglo
    },
    ValidaExisteArray(arreglo, valor) {
      console.log('function: ValidaExisteArray(). ')
      var existe = false;
      for (var i = 0; i < arreglo.length; i++) {
        if (arreglo[i].mantenible_id == valor) {
          existe = true
        }
      }
      return existe
    },
    ConvertToUTC(arr) {
      let vm = this
      console.log('function: ConvertToUTC(). ');
      for (var i=0; i<arr.length; i++) {
        arr[i].fecha_solicitud = new Date(arr[i].fecha_solicitud).toLocaleString()
        arr[i].fecha_reparando = new Date(arr[i].fecha_reparando).toLocaleString()
        arr[i].fecha_fin = new Date(arr[i].fecha_fin).toLocaleString()
      }
      console.log(arr)
      return arr
    },
    /* GetDatosWebService */
    getDataArr () {
      const vm = this
      console.log('function: getDataArr(). ')

      // Recupera sucursales
      unirest('POST', 'http://webapiandroidtest.administraflotilla.com/api/Reportes/ConsultarSucursales')
        .send({ 'EmpresaID': vm.getEmpresa() })
        .end(function (res) {
          if (res.error) {
            vm.text = 'Usuario o Contraseña no válidos intente con otras credenciales'
            vm.snackbar = true
            throw new Error(res.error)
          }
          vm.selectSucursal = res.body.obj
          console.log('Sucursales: ')
          console.log(res.body)
        })

      // Recupera tipo de vehículos
      unirest('POST', 'http://webapiandroidtest.administraflotilla.com/api/Reportes/ConsultarTipoVehiculos')
        .send({ 'EmpresaID': vm.getEmpresa() })
        .end(function (res) {
          if (res.error) {
            vm.text = 'Usuario o Contraseña no válidos intente con otras credenciales'
            vm.snackbar = true
            throw new Error(res.error)
          }
          vm.dataSelectTMant = res.body.obj
          console.log('Tipos de vehículo: ')
          console.log(res.body)
        })

      // Recupera tipo de vehículos
      unirest('POST', 'http://webapiandroidtest.administraflotilla.com/api/Reportes/ConsultarMantenibles')
        .send({ 'EmpresaID': vm.getEmpresa() })
        .end(function (res) {
          if (res.error) {
            vm.text = 'Usuario o Contraseña no válidos intente con otras credenciales'
            vm.snackbar = true
            throw new Error(res.error)
          }
          vm.dataSelectMante = res.body.obj
          console.log('Mantenbiles: ')
          console.log(res.body)
        })
    },
    separaMiles(numero) {
      let vm = this
      //var Formato  =  new Intl.NumberFormat().format(numero)
      //var Formato  =  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(numero)
      var Formato  =  numero.toLocaleString('en-IN')
      return Formato
    },
    formatDate (date) {
      console.log('function: formatDate(). ')
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    getRandomColor() {
      let vm = this
      var x = Math.floor(Math.random() * 256);
      var y = Math.floor(Math.random() * 256);
      var z = Math.floor(Math.random() * 256);
      var bgColor = "rgb(" + x + "," + y + "," + z + ", .5)";
      return bgColor
    },
    next(page) {
      const vm = this
      console.log('function: next(page). ')

      console.log('no de page: ' + page)
      vm.obtnerRango(page)
      vm.switch_graf = false

      if (vm.consultar.tipo == 1)
        vm.getLineSucursal()
      if (vm.consultar.tipo == 2)
        vm.getLineTipoMantenible()
      if (vm.consultar.tipo == 3)
        vm.getLineMantenible()

      var temp = vm.switch_graf
      vm.switch_graf = null
      vm.switch_graf = temp
    },
    obtnerRango(page) {
      let vm = this
      console.log('function: obtnerRango().')
      vm.iniArr = ( (page - 1) * vm.cantidadAgrupa)
      vm.finArr = (page * vm.cantidadAgrupa) - 1
      console.log('inicio de array: ' + vm.iniArr)
      console.log('final de array: ' + vm.finArr)
    },
    getCantidadPage(cantidadAgrupa, cantidad) {
      let vm = this
      console.log('function: getCantidadPage().')

      var numPage = 0.0
      numPage = cantidad / cantidadAgrupa

      if (numPage > parseInt(numPage)) {
        numPage = parseInt(numPage) + 1
      }

      return numPage
    }
  },
  mounted () {
    const vm = this
    vm.getDataArr()
  },
  beforeMount () {
    this.colsTable = [
      // { text: 'sucursal_id', value: 'sucursal_id', hide: true, width: 100 },
      { text: 'PROYECTO', value: 'sucursal_nombre', width: 100 },
      // { text: 'mantenible_id', value: 'mantenible_id', hide: true },
      { text: 'MANTENIBLE', value: 'mantenible_nombre', width: 100 },
      // { text: 'tipovehiculo_id', value: 'tipovehiculo_id', hide: true },
      { text: 'TIPO MANTENIBLE', value: 'tipovehiculo_nombre', width: 100 },
      { text: '< 30 MIN.', value: 'menor_30', hide: true },
      { text: '> 30 MIN.', value: 'mayor_30', hide: true },
      { text: 'FECHA SOLICITUD', value: 'fecha_solicitud', width: 170 },
      { text: 'FECHA REPARANDO', value: 'fecha_reparando', width: 170 },
      { text: 'FECHA TERMINADO', value: 'fecha_fin', width: 170 },
      { text: 'MIN. RESPUESTA', value: 'tiempo_respuesta', width: 140 },
      { text: 'MIN. REPARACION', value: 'tiempo_reparacion', width: 170 },
      { text: 'MIN. DETENIDO', value: 'tiempo_paro', width: 140 }
    ]
    this.ColExcel = [
      // { text: 'PERIODO', align: 'left', value: 'Periodo' },
      { text: 'PROYECTO', align: 'left', value: 'sucursal_nombre' },
      { text: 'MANTENIBLE', value: 'mantenible_nombre' },
      { text: 'TIPO MANTENIBLE', value: 'tipovehiculo_nombre' },
      { text: 'MENOR A 30', value: 'menor_30' },
      { text: 'MAYOR A 30', value: 'mayor_30' },
      { text: 'FECHA SOL.', value: 'fecha_solicitud' },
      { text: 'FECHA REP.', value: 'fecha_reparando' },
      { text: 'FECHA FIN', value: 'fecha_fin' },
      { text: 'MIN. RESPUESTA', value: 'tiempo_respuesta' },
      { text: 'MIN. REPARACION', value: 'tiempo_reparacion' },
      { text: 'MIN. PARO', value: 'tiempo_paro' }
    ]

    this.DataPie = {
      type: 'pie',
      data: {
        labels: this.pieLabel,
        datasets: [
          {
            label: 'Indicadores de respuesta',
            data: this.pieData,
            backgroundColor: [
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)',
              'rgba(54,73,93,.5)'
            ],
            borderColor: [
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d'
            ],
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              padding: 25
            }
          }]
        }
      }
    }

    this.DataBar = {
      type: 'bar',
      data: {
        labels: this.barLabel,
        datasets: [
          { // another line graph
            label: '',
            data: this.barData,
            backgroundColor: [
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)'
            ],
            borderColor: [
              '#47b784', '#47b784',
              '#47b784', '#47b784',
              '#47b784', '#47b784',
              '#47b784', '#47b784',
              '#47b784', '#47b784',
              '#47b784', '#47b784',
              '#47b784', '#47b784',
              '#47b784', '#47b784',
              '#47b784', '#47b784',
              '#47b784', '#47b784',
              '#47b784', '#47b784'
            ],
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              padding: 25
            }
          }]
        }
      }
    }

    this.DataLine = {
      type: 'bar',//this.modelTipoGrafica,
      data: {
        labels: this.lineLabel,
        datasets: [
          { // one line graph
            label: 'Tiempos de respuesta (unidades expresadas en min.)',
            type: this.modelTipoGrafica,
            data: this.lineData[0],
            backgroundColor: [
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)'
            ],
            borderColor: [
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)'
            ],
            borderWidth: 3
          },
          { // two line graph
            label: 'Tiempos de reparacion (unidades expresadas en min.)',
            type: this.modelTipoGrafica,
            data: this.lineData[1],
            backgroundColor: [
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)'
            ],
            borderColor: [
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)'
            ],
            borderWidth: 3
          },
          { // three line graph
            label: 'Tiempos de paro (unidades expresadas en min.)',
            type: this.modelTipoGrafica,
            data: this.lineData[2],
            backgroundColor: [
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)'
            ],
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              padding: 25
            }
          }]
        }
      }
    }

    this.DataLine_bar = {
      type: 'line', //this.modelTipoGrafica,
      data: {
        labels: this.lineLabel,
        datasets: [
          { // one line graph
            label: 'Tiempos de respuesta (unidades expresadas en min.)',
            type: this.modelTipoGrafica,
            data: this.lineData[0],
            backgroundColor: [
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)'
            ],
            borderColor: [
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)'
            ],
            borderWidth: 3
          },
          { // two line graph
            label: 'Tiempos de reparacion (unidades expresadas en min.)',
            type: this.modelTipoGrafica,
            data: this.lineData[1],
            backgroundColor: [
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)'
            ],
            borderColor: [
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)'
            ],
            borderWidth: 3
          },
          { // three line graph
            label: 'Tiempos de paro (unidades expresadas en min.)',
            type: this.modelTipoGrafica,
            data: this.lineData[2],
            backgroundColor: [
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)'
            ],
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              padding: 25
            }
          }]
        }
      }
    }
  },
  computed: {
    computedFormattedInicio () {
      return this.formatDate(this.fcalendarEdit)
    },
    computedFormattedFin () {
      return this.formatDate(this.fcalendarFinal)
    }
  },
  watch: {
    switch_graf (val) {
      if (!val) {
        var temp = this.DataLine
        this.DataLine_bar = temp
        //this.DataLine_bar.type = 'line'
        this.DataLine.data.datasets[0].type = 'line'
        this.DataLine.data.datasets[1].type = 'line'
        this.DataLine.data.datasets[2].type = 'line'
        document.getElementById('Graf_Line_bar').style.display = "none"
      } else {
        var temp = this.DataLine
        this.DataLine_bar = temp
        //this.DataLine_bar.type = 'line'
        this.DataLine.data.datasets[0].type = 'line'
        this.DataLine.data.datasets[1].type = 'line'
        this.DataLine.data.datasets[2].type = 'line'
        this.createChart('Graf_Line_bar', this.DataLine_bar)
        document.getElementById('Graf_Line_bar').style.display = "block"
      }
    }
  },
}
</script>
