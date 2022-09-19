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
        Consumo de refacciones
        <hr class="my-3">
      </div>
      <div class="headline">
        <!--v-icon color="black">mdi-clipboard-check</v-icon-->
        Consumo de refacciones
        <hr class="my-3">
      </div>
      <!-- Controles-->
      <v-layout row wrap>
        <!--
        <v-flex xs3>
          <div style="margin-left: 3%; margin-top: 7%;">
            <v-select
              label="sucursal_nombre"
              v-model="modelSelect"
              :options="selectSucursal"
              @change="ChangeProyecto"
              placeholder="Proyecto"
              multiple
            ></v-select>
          </div>
        </v-flex>
        <v-flex xs3>
          <div style="margin-left: 3%; margin-top: 7%;">
            <v-select
              label="tipoMantenimiento_nombre"
              v-model="modelSelectTMmnto"
              :options="dataSelectTmmnto"
              placeholder="T. mmnto"
              @change="ChangeTipoMmnto"
              multiple
            ></v-select>
          </div>
        </v-flex>
        <v-flex xs3>
          <div style="margin-left: 3%; margin-top: 7%;">
            <v-select
              label="tipovehiculo_nombre"
              v-model="modelSelectTMant"
              :options="dataSelectTMant"
              placeholder="T. mantenible"
              @change="ChangeTipoMante"
              multiple
            ></v-select>
          </div>
        </v-flex>
        <v-flex xs3>
          <div style="margin-left: 3%; margin-top: 7%;">
            <v-select
              label="mantenible_nombre"
              v-model="modelSelectMante"
              :options="dataSelectMante"
              placeholder="Mantenible"
              @change="ChangeMantenible"
              multiple
            ></v-select>
          </div>
        </v-flex>
        -->
        <v-flex xs2>
          <div style="margin-left: 3%; margin-top: 7%;">
            <v-select
              label="nombre"
              v-model="consultar"
              :options="tipoConsulta"
              @change="ChangeTipoConsulta"
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
        <v-flex xs2 style="margin-left: 1%; max-width: 120px;">
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
          <div style="margin-left: 7%; margin-top: 10%;">
            <v-btn @click="getGraficaData" small color="primary">
              <v-icon>mdi-magnify</v-icon> Buscar
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs2 style="max-width: 170px;">
          <div style="margin-left: 3%; margin-top: 8%;">
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
            :data   = "rowDataTable"
            :fields = "colsTable"
            name    = "Reporte_consumo_refacciones.xls">
            <i aria-hidden="true" class="v-icon notranslate mdi mdi-download theme--light" style="color: white"></i> <span style="color: white">Descargar</span>
          </download-excel>
        </v-flex-->
        <!--v-flex style="max-width: 210px;">
          <v-checkbox v-model="agrupar" class="mx-2" label="Agrupar por vehículo"></v-checkbox>
        </v-flex-->

        <!--v-flex xs2 style="max-width: 150px;">
          <div style="margin-left: 3%; margin-top: 10%;">
            <v-select
              v-model="modelTipoGrafica"
              :options="tipoGrafica"
              placeholder="T. grafica"
            ></v-select>
          </div>
        </v-flex-->

        <!-- Grid -->
        <v-flex xs12>
          <v-data-table
            :headers="colsTable"
            :items="rowDataTable"
            :item-key="itemKey"
            :group-by="itemGroup"
            dense
            class="elevation-1"
            locale="esp"
          ></v-data-table>
        </v-flex>
        <!-- Grid -->
        <!-- Dialog -->
        <v-dialog v-model="dialog" width="90%">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Grafica de consumo de refacciones
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <!-- controles -->
                <!--v-flex xs2>
                  <div style="margin-left: 3%; margin-top: 7%;">
                    <v-select
                      label="sucursal_nombre"
                      v-model="modelSelect"
                      :options="selectSucursal"
                      @change="ChangeProyecto"
                      placeholder="Proyecto"
                      multiple
                    ></v-select>
                  </div>
                </v-flex-->
                <!--v-flex xs2>
                  <div style="margin-left: 3%; margin-top: 7%;">
                    <v-select
                      label="tipoMantenimiento_nombre"
                      v-model="modelSelectTMmnto"
                      :options="dataSelectTmmnto"
                      @change="ChangeTipoMmnto"
                      placeholder="Tipo"
                      multiple
                    ></v-select>
                  </div>
                </v-flex-->
                <!--v-flex xs2>
                  <div style="margin-left: 3%; margin-top: 7%;">
                    <v-select
                      label="tipovehiculo_nombre"
                      v-model="modelSelectTMant"
                      :options="dataSelectTMant"
                      @change="ChangeTipoMante"
                      placeholder="T. mantenible"
                      multiple
                    ></v-select>
                  </div>
                </v-flex-->
                <!--v-flex xs2>
                  <div style="margin-left: 3%; margin-top: 7%;">
                    <v-select
                      label="tipovehiculo_nombre"
                      v-model="modelSelectTMant"
                      :options="dataSelectTMant"
                      @change="ChangeTipoMante"
                      placeholder="T. mantenible"
                      multiple
                    ></v-select>
                  </div>
                </v-flex-->
                <!--v-flex xs2>
                  <div style="margin-left: 3%; margin-top: 7%;">
                    <v-select
                      label="mantenible_nombre"
                      v-model="modelSelectMante"
                      :options="dataSelectMante"
                      @change="ChangeMantenible"
                      placeholder="Mantenible"
                      multiple
                    ></v-select>
                  </div>
                </v-flex-->
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

                <v-flex xs2>
                  <div style="margin-left: 3%; margin-top: 8%;">
                    <v-btn small color="success" @click="getDataGrafica" style="margin-left: 1%;"><v-icon>mdi-chart-line</v-icon>Graficar</v-btn>
                  </div>
                </v-flex>
                <v-flex xs4></v-flex>
                <!-- controles -->
                <!--BarChart :labelsData="labelsData" :dataInfo="dataInfo" ref="chartBar"></BarChart-->
                <!-- Chart -->
                <!--v-flex xs6>
                  <h3 style="text-align: center;">Cantidad por sucursal</h3>
                  <canvas id="Graf_Pie"></canvas>
                </v-flex>
                <v-flex xs6>
                  <h3 style="text-align: center;">Cantidad por mantenible</h3>
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
/* import { AgGridVue } from '@ag-grid-community/vue' */
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import Chart from 'chart.js'
import vSelect from 'vue-select'
import unirest from 'unirest'
import JsonExcel from 'vue-json-to-excel';
Vue.component('downloadExcel', JsonExcel);
import Vue from 'vue'
import XLSX from 'xlsx'
export default {
  components: {
    /* AgGridVue, */
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
      rowData: [],
      rowDataTable: [],
      modules: AllCommunityModules,
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
      // tipoGrafica: ['line', 'bar', 'radar', 'pie', 'doughnut', 'polarArea'],
      tipoGrafica: ['line', 'bar', 'pie'],
      Temporal: null,
      title: 'Reportes',
      agrupar: false,
      overlay: false,
      msjException: false,
      msjAlerta: '',
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
      itemKey: null,
      itemGroup: null,
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
    },
    ChangeTipoMmnto (event) {
      console.log('function: ChangeTipoMmnto(). ')
      /* Si se seleccionan todos */
      for (let g = 0; g < this.modelSelectTMmnto.length; g++) {
        if (this.modelSelectTMmnto[g].tipoMantenimiento_id === 0) {
          this.modelSelectTMmnto = this.dataSelectTmmnto
        }
      }
    },
    ChangeTipoMante (event) {
      console.log('function: ChangeTipoMante().')
      /* Si se seleccionan todos */
      for (let h = 0; h < this.modelSelectTMant.length; h++) {
        if (this.modelSelectTMant[h].tipovehiculo_id === 0) {
          this.modelSelectTMant = this.dataSelectTMant
        }
      }
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
    ChangeTipoConsulta (event) {
      let vm = this
      console.log('function: ChangeTipoConsulta().')
      console.log(event)
      switch (event.tipo) {
        case 1:
          vm.itemKey = 'sucursal_id'
          vm.itemGroup = 'sucursal_nombre'
          break
        case 2:
          vm.itemKey = 'tipoMantenible_id'
          vm.itemGroup = 'tipoMantenible_nombre'
          break
        case 3:
          vm.itemKey = 'mantenible_id'
          vm.itemGroup = 'mantenible_nombre'
          break
      }
    },
    getGraficaDetalle () {
      console.log('function: getGraficaDetalle().')
      this.dialog = true
    },
    excel () {
      let vm = this
      console.log('function: Excel().')
      let data = XLSX.utils.json_to_sheet(vm.rowDataTable)
      const workbook = XLSX.utils.book_new()
      const filename = 'Consumo_de_refacciones'
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
      var nombre = 'ConsumoRefacciones'
      if(vm.rowDataTable.length > 0) {
        headerTable += '' +
          '<td style="border: 1px solid #ddd;">PROYECTO</td>' +
          '<td style="border: 1px solid #ddd;">MANTENIBLE</td>' +
          '<td style="border: 1px solid #ddd;">TIPO_MANTENIBLE</td>' +
          '<td style="border: 1px solid #ddd;">SKU</td>' +
          '<td style="border: 1px solid #ddd;">CANTIDAD</td>' +
          '<td style="border: 1px solid #ddd;">PRECIO</td>' +
          '<td style="border: 1px solid #ddd;">TOTAL</td>' +
          '<td style="border: 1px solid #ddd;">TIPO_DE_MMTO</td>' +
          '<td style="border: 1px solid #ddd;">DESCIPCION_DE_SKU</td>'

        for(var x = 0; x < vm.rowDataTable.length; x++) {
          detalle += '<tr style="border: 1px solid #ddd;">' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].sucursal_nombre + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].mantenible_nombre + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].tipoMantenible_nombre + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].itemCodigo + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].cantidad + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].precioarticulo + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].CostoTotalArticulo + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].tipoMantenimiento_nombre + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowDataTable[x].ItemDescripcion + '</td>' +
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
      var temo = ""
      let ctx = document.getElementById(chartId)
      let myChart = new Chart(ctx, {
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
      this.Temporal.push({
        'sucursal_id': 0,
        'sucursal_nombre': 'SIN ASIGNAR',
        'cantidad': 0
      })
      /* Arreglo general */
      for (let a = 0; a < this.selectSucursal.length; a++) {
        if (this.selectSucursal[a].sucursal_nombre !== 'Todo') {
          this.Temporal.push({
            'sucursal_id': this.selectSucursal[a].sucursal_id,
            'sucursal_nombre': this.selectSucursal[a].sucursal_nombre,
            'cantidad': 0
          })
        }
      }
      /* Sumando cantidades al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          /* Validaciones para mostrar */
          if (this.rowData[b].sucursal_id === this.Temporal[c].sucursal_id) {
            this.rowData[b].CostoTotalArticulo = this.rowData[b].cantidad * this.rowData[b].precioarticulo
            this.Temporal[c].cantidad += this.rowData[b].cantidad
          }
        }
      }
      /* Insertando cantidades */
      for (let d = 0; d < this.Temporal.length; d++) {
        this.pieLabel.push(this.Temporal[d].sucursal_nombre)
        this.pieData.push(this.Temporal[d].cantidad)
        this.dataColor.push(this.getRandomColor())
      }
      /* Actualizando en arreglo de gráfica */
      this.DataPie.data.labels = []
      this.DataPie.data.datasets[0].data = []
      this.DataPie.data.labels = this.pieLabel
      this.DataPie.data.datasets[0].backgroundColor = this.dataColor
      this.DataPie.data.datasets[0].borderColor = this.dataColor
      this.DataPie.data.datasets[0].data = this.pieData
      this.DataPie.data.datasets[0]._meta = []
      console.log(this.DataPie.data.datasets[0]._meta)
      this.createChart('Graf_Pie', this.DataPie)
      this.Temporal = []
    },
    getPie () {
      console.log('function: getPie(). ')
      this.pieLabel = []
      this.pieData = []
      this.Temporal = []
      /* Validación */
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
      /* Arreglo general */
      for (let a = 0; a < this.modelSelect.length; a++) {
        if (this.modelSelect[a].sucursal_nombre !== 'Todo') {
          this.Temporal.push({ 'sucursal_id': this.modelSelect[a].sucursal_id, 'sucursal_nombre': this.modelSelect[a].sucursal_nombre, 'cantidad': 0 })
        }
      }
      /* Sumando cantidades al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          /* Validaciones para mostrar */
          if (this.rowData[b].sucursal_id === this.Temporal[c].sucursal_id && this.Temporal[c].sucursal_id !== 0) {
            this.Temporal[c].cantidad += this.rowData[b].cantidad
          }
        }
      }
      /* Insertando cantidades */
      for (let d = 0; d < this.Temporal.length; d++) {
        this.pieLabel.push(this.Temporal[d].sucursal_nombre)
        this.pieData.push(this.Temporal[d].cantidad)
        this.dataColor.push(this.getRandomColor())
      }
      /* Actualizando en arreglo de gráfica */
      this.DataPie.data.labels = []
      this.DataPie.data.datasets[0].data = []
      this.DataPie.data.labels = this.pieLabel
      this.DataPie.data.datasets[0].backgroundColor = this.dataColor
      this.DataPie.data.datasets[0].borderColor = this.dataColor
      this.DataPie.data.datasets[0].data = this.pieData
      this.DataPie.data.datasets[0]._meta = []
      console.log(this.DataPie.data.datasets[0]._meta)
      this.createChart('Graf_Pie', this.DataPie)
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
          this.Temporal.push({ 'mantenible_id': this.dataSelectMante[a].mantenible_id, 'mantenible_nombre': this.dataSelectMante[a].mantenible_nombre, 'cantidad': 0 })
        }
      }
      /* Sumando cantidades al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          if (this.rowData[b].mantenible_id === this.Temporal[c].mantenible_id && this.Temporal[c].mantenible_id !== 0) {
            this.Temporal[c].cantidad += this.rowData[b].cantidad
          }
        }
      }
      /* Insertando cantidades */
      for (let d = 0; d < this.Temporal.length; d++) {
        this.barLabel.push(this.Temporal[d].mantenible_nombre)
        this.barData.push(this.Temporal[d].cantidad)
        this.dataColor.push(this.getRandomColor())
      }
      /* Actualizando en arreglo de gráfica */
      this.DataBar.data.labels = []
      this.DataBar.data.labels = this.barLabel
      this.DataBar.data.datasets[0].data = []
      this.DataBar.data.datasets[0].backgroundColor = this.dataColor
      this.DataBar.data.datasets[0].borderColor = this.dataColor
      this.DataBar.data.datasets[0].data = this.barData
      this.DataBar.data.datasets[0]._meta = []
      console.log(this.DataBar.data.datasets[0]._meta)
      this.createChart('Graf_Bar', this.DataBar)
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
          this.Temporal.push({ 'mantenible_id': this.modelSelectMante[a].mantenible_id, 'mantenible_nombre': this.modelSelectMante[a].mantenible_nombre, 'cantidad': 0 })
        }
      }
      /* Sumando cantidades al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          if (this.rowData[b].mantenible_id === this.Temporal[c].mantenible_id && this.Temporal[c].mantenible_id !== 0) {
            this.Temporal[c].cantidad += this.rowData[b].cantidad
          }
        }
      }
      /* Insertando cantidades */
      for (let d = 0; d < this.Temporal.length; d++) {
        this.barLabel.push(this.Temporal[d].mantenible_nombre)
        this.barData.push(this.Temporal[d].cantidad)
        this.dataColor.push(this.getRandomColor())
      }
      /* Actualizando en arreglo de gráfica */
      const temp = this.DataBar
      this.DataBar = null
      this.DataBar = temp
      this.DataBar.data.labels = []
      this.DataBar.data.labels = this.barLabel
      this.DataBar.data.datasets[0].data = []
      this.DataBar.data.datasets[0].backgroundColor = this.dataColor
      this.DataBar.data.datasets[0].borderColor = this.dataColor
      this.DataBar.data.datasets[0].data = this.barData
      this.DataBar.data.datasets[0]._meta = []
      console.log(this.DataBar.data.datasets[0]._meta)
      this.createChart('Graf_Bar', this.DataBar)
      this.Temporal = []
    },
    getLineMantenible () {
      console.log('function: getLineMantenible(). ')
      this.lineLabel = []
      this.lineData = []
      this.Temporal = []
      /* Arreglo general */
      for (let a = 0; a < this.dataSelectMante.length; a++) {
        if (a >= this.iniArr && a <= this.finArr && this.dataSelectMante[a].mantenible_nombre !== 'Todo') {
          this.Temporal.push({ 'mantenible_id': this.dataSelectMante[a].mantenible_id, 'mantenible_nombre': this.dataSelectMante[a].mantenible_nombre, 'precioarticulo': 0 })
        }
      }
      /* Sumando costos al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          if (this.rowData[b].mantenible_id === this.Temporal[c].mantenible_id && this.Temporal[c].mantenible_id !== 0) {
            // this.Temporal[c].precioarticulo += this.rowData[b].precioarticulo
            if (this.agrupar == true) {
              this.Temporal[c].precioarticulo += this.rowData[b].precioarticulo
              //this.rowData[b].CostoTotalArticulo = this.rowData[b].cantidad * this.rowData[b].precioarticulo
            } else {
              var precioSumar = parseFloat(this.rowData[b].precioarticulo.replace('$',''))
              this.Temporal[c].precioarticulo += precioSumar
              //this.rowData[b].CostoTotalArticulo = this.rowData[b].cantidad * precioSumar
            }
            /*
            var precioSumar = parseFloat(this.rowData[b].precioarticulo.replace('$',''))
            this.Temporal[c].precioarticulo += precioSumar
            */
          }
        }
      }
      /* Insertando cantidades */
      for (let d = 0; d < this.Temporal.length; d++) {
        this.lineLabel.push(this.Temporal[d].mantenible_nombre)
        this.lineData.push(this.Temporal[d].precioarticulo)
        this.dataColor.push(this.getRandomColor())
      }
      /* Actualizando en arreglo de gráfica */
      //region Graf
      this.DataLine.data.labels = []
      this.DataLine.data.labels = this.lineLabel
      this.DataLine.data.datasets[0].data = []
      this.DataLine.data.datasets[0].backgroundColor = this.dataColor
      this.DataLine.data.datasets[0].borderColor = this.dataColor
      this.DataLine.type = this.modelTipoGrafica
      this.DataLine.data.datasets[0].data = this.lineData
      this.DataLine.data.datasets[0]._meta = []
      console.log(this.DataLine.data.datasets[0]._meta)
      this.createChart('Graf_Line', this.DataLine)
      //endregion Graf
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
        'precioarticulo': 0
      })
      for (let a = 0; a < this.selectSucursal.length; a++) {
        if (a >= this.iniArr && a <= this.finArr && this.selectSucursal[a].sucursal_nombre !== 'Todo') {
          this.Temporal.push({
            'sucursal_id': this.selectSucursal[a].sucursal_id,
            'sucursal_nombre': this.selectSucursal[a].sucursal_nombre,
            'precioarticulo': 0
          })
        }
      }
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          if (this.rowData[b].sucursal_id === this.Temporal[c].sucursal_id) {
            if (this.agrupar == true) {
              this.Temporal[c].precioarticulo += this.rowData[b].precioarticulo
            } else {
              var precioSumar = parseFloat(this.rowData[b].precioarticulo.replace('$',''))
              this.Temporal[c].precioarticulo += precioSumar
            }
          }
        }
      }
      for (let d = 0; d < this.Temporal.length; d++) {
        this.lineLabel.push(this.Temporal[d].sucursal_nombre)
        this.lineData.push(this.Temporal[d].precioarticulo)
        this.dataColor.push(this.getRandomColor())
      }
      /* Actualizando en arreglo de gráfica */
      //region Graf
      this.DataLine.data.labels = []
      this.DataLine.data.labels = this.lineLabel
      this.DataLine.data.datasets[0].data = []
      this.DataLine.data.datasets[0].backgroundColor = this.dataColor
      this.DataLine.data.datasets[0].borderColor = this.dataColor
      this.DataLine.type = this.modelTipoGrafica
      this.DataLine.data.datasets[0].data = this.lineData
      this.DataLine.data.datasets[0]._meta = []
      console.log(this.DataLine.data.datasets[0]._meta)
      this.createChart('Graf_Line', this.DataLine)
      //endregion Graf
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
        'precioarticulo': 0
      })
      for (let a = 0; a < this.dataSelectTMant.length; a++) {
        if (a >= this.iniArr && a <= this.finArr && this.dataSelectTMant[a].tipovehiculo_nombre !== 'Todo') {
          this.Temporal.push({
            'tipovehiculo_id': this.dataSelectTMant[a].tipovehiculo_id,
            'tipovehiculo_nombre': this.dataSelectTMant[a].tipovehiculo_nombre,
            'precioarticulo': 0
          })
        }
      }
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          if (this.rowData[b].tipoMantenible_id === this.Temporal[c].tipovehiculo_id) {
            // this.Temporal[c].precioarticulo += this.rowData[b].precioarticulo
            if (this.agrupar == true) {
              this.Temporal[c].precioarticulo += this.rowData[b].precioarticulo
            } else {
              var precioSumar = parseFloat(this.rowData[b].precioarticulo.replace('$',''))
              this.Temporal[c].precioarticulo += precioSumar
            }
          }
        }
      }
      for (let d = 0; d < this.Temporal.length; d++) {
        this.lineLabel.push(this.Temporal[d].tipovehiculo_nombre)
        this.lineData.push(this.Temporal[d].precioarticulo)
        this.dataColor.push(this.getRandomColor())
      }
      /* Actualizando en arreglo de gráfica */
      //region Graf
      this.DataLine.data.labels = []
      this.DataLine.data.labels = this.lineLabel
      this.DataLine.data.datasets[0].data = []
      this.DataLine.data.datasets[0].backgroundColor = this.dataColor
      this.DataLine.data.datasets[0].borderColor = this.dataColor
      this.DataLine.type = this.modelTipoGrafica
      this.DataLine.data.datasets[0].data = this.lineData
      this.DataLine.data.datasets[0]._meta = []
      console.log(this.DataLine.data.datasets[0]._meta)
      this.createChart('Graf_Line', this.DataLine)
      //endregion Graf
      this.Temporal = []
    },
    getLine () {
      console.log('function: getLine(). ')
      this.lineLabel = []
      this.lineData = []
      this.Temporal = []
      /* Se valida que se tengan seleccionado vehículos */
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
      for (let a = 0; a < this.modelSelectMante.length; a++) {
        if (this.modelSelectMante[a].mantenible_nombre !== 'Todo') {
          this.Temporal.push({ 'mantenible_id': this.modelSelectMante[a].mantenible_id, 'mantenible_nombre': this.modelSelectMante[a].mantenible_nombre, 'precioarticulo': 0 })
        }
      }
      /* Sumando costos al arreglo temporal */
      for (let b = 0; b < this.rowData.length; b++) {
        for (let c = 0; c < this.Temporal.length; c++) {
          if (this.rowData[b].mantenible_id === this.Temporal[c].mantenible_id && this.Temporal[c].mantenible_id !== 0) {
            var precioSumar = parseFloat(this.rowData[b].precioarticulo.replace('$',''))
            this.Temporal[c].precioarticulo += precioSumar
            // this.Temporal[c].precioarticulo += parseFloat(this.rowData[b].precioarticulo)
          }
        }
      }
      /* Insertando cantidades */
      for (let d = 0; d < this.Temporal.length; d++) {
        this.lineLabel.push(this.Temporal[d].mantenible_nombre)
        this.lineData.push(this.Temporal[d].precioarticulo)
        this.dataColor.push(this.getRandomColor())
      }
      /* Actualizando en arreglo de gráfica */

      const temp = this.DataLine
      this.DataLine = []
      this.DataLine = temp
      this.DataLine.data.labels = []
      this.DataLine.data.datasets[0].data = []
      this.DataLine.data.datasets[0].backgroundColor = this.dataColor
      this.DataLine.data.datasets[0].borderColor = this.dataColor
      this.DataLine.type = this.modelTipoGrafica
      this.DataLine.data.labels = this.lineLabel
      console.log(this.lineLabel)
      this.DataLine.data.datasets[0].data = this.lineData
      this.DataLine.data.datasets[0]._meta = []
      console.log(this.DataLine.data.datasets[0]._meta)
      this.createChart('Graf_Line', this.DataLine)
      this.Temporal = []
    },
    getDataArr () {
      const vm = this
      console.log('function: getDataArr(). ')

      // Recupera sucursales
      unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarSucursales')
        .send({ 'EmpresaID': vm.getEmpresa() })
        .end(function (res) {
          if (res.error) {
            vm.msjAlerta = 'No se encontró información de sucursal'
            vm.msjException = true
            throw new Error(res.error)
          }
          vm.selectSucursal = res.body.obj
          console.log('Sucursales: ')
          console.log(res.body)
        })

      // Recupera tipo de vehículos
      unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarTipoVehiculos')
        .send({ 'EmpresaID': vm.getEmpresa() })
        .end(function (res) {
          if (res.error) {
            vm.msjAlerta = 'No se encontró información de vehículo'
            vm.msjException = true
            throw new Error(res.error)
          }
          vm.dataSelectTMant = res.body.obj
          console.log('Tipos de vehículo: ')
          console.log(res.body)
        })

      // Recupera tipo de servicios
      unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarTipoServicios')
        .send({ 'EmpresaID': vm.getEmpresa() })
        .end(function (res) {
          if (res.error) {
            vm.msjAlerta = 'No se encontró información de tipo de servicio'
            vm.msjException = true
            throw new Error(res.error)
          }
          vm.dataSelectTmmnto = res.body.obj
          console.log('Tipo de servicios: ')
          console.log(res.body)
        })

      // Recupera tipo de vehículos
      unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarMantenibles')
        .send({ 'EmpresaID': vm.getEmpresa() })
        .end(function (res) {
          if (res.error) {
            vm.text = 'No se encontró información de mantenible'
            vm.msjException = true
            throw new Error(res.error)
          }
          vm.dataSelectMante = res.body.obj
          console.log('Mantenbiles: ')
          console.log(res.body)
        })
    },
    getDataGrafica () {
      let vm = this
      console.log('getDataGrafica')
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
    getTipoServicio () {
      const vm = this
      console.log('function: getTipoMantenible(). ')
      let dato = 0
      if (vm.modelSelectTMmnto != null) {
        if (vm.modelSelectTMmnto.length > 0) {
          dato = vm.modelSelectTMmnto[0].tipoMantenimiento_id
        } else {
          vm.msjAlerta = 'No se tiene en selección un tipo de servicio.'
          vm.msjException = true
          return;
        }
      } else {
        vm.msjAlerta = 'No se tiene en selección un tipo de servicio.'
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
      /*
      const empresa = vm.getEmpresa()
      const sucursal = vm.getSucursal()
      const tipoMantenible = vm.getTipoMantenible()
      const tipoServicio = vm.getTipoServicio()
      const mantenible = vm.getMantenible()
      */
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
        // Sucursal
        if (vm.consultar.tipo == 1) {
          const datos = vm.getSucursal()
          vm.overlay = true
          unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarConsumoRefaccion')
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
            console.log(vm.rowData)
            if (vm.rowData == null) {
              vm.rowData = []
            }
            if (vm.rowData.length > 0) {
              console.log('Arreglo: ')
              console.log(vm.rowData)
              if (vm.agrupar == true) {
                vm.rowDataTable = vm.SumDataArr(vm.rowData)
              } else {
                vm.rowDataTable = vm.FormatearDatos(vm.rowData)
                // vm.rowDataTable = vm.rowData
              }
            } else {
              console.log('Sin datos para mostrar')
              vm.msjAlerta = res.body.mensaje
              vm.msjException = true
              return
            }
          })
        }
        // Tipo mantenible
        if (vm.consultar.tipo == 2) {
          const datos = vm.getTipoMantenible()
          vm.overlay = true
          unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarConsumoRefaccion')
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
            console.log(vm.rowData)
            if (vm.rowData == null) {
              vm.rowData = []
            }
            if (vm.rowData.length > 0) {
              console.log('Arreglo: ')
              console.log(vm.rowData)
              if (vm.agrupar == true) {
                vm.rowDataTable = vm.SumDataArr(vm.rowData)
              } else {
                vm.rowDataTable = vm.FormatearDatos(vm.rowData)
                // vm.rowDataTable = vm.rowData
              }
            } else {
              console.log('Sin datos para mostrar')
              vm.msjAlerta = res.body.mensaje
              vm.msjException = true
              return
            }
          })
        }
        // Mantenible
        if (vm.consultar.tipo == 3) {
          const datos = vm.getMantenible()
          vm.overlay = true
          unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarConsumoRefaccion')
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
            console.log(vm.rowData)
            if (vm.rowData == null) {
              vm.rowData = []
            }
            if (vm.rowData.length > 0) {
              console.log('Arreglo: ')
              console.log(vm.rowData)
              if (vm.agrupar == true) {
                vm.rowDataTable = vm.SumDataArr(vm.rowData)
              } else {
                vm.rowDataTable = vm.FormatearDatos(vm.rowData)
                // vm.rowDataTable = vm.rowData
              }
            } else {
              console.log('Sin datos para mostrar')
              vm.msjAlerta = res.body.mensaje
              vm.msjException = true
              return
            }
          })
        }
      }
      /*
      if (sucursal == null || sucursal <= 0) {
        vm.msjAlerta = 'No se tiene una dato de sucursal.'
        vm.msjException = true
        return;
      }
      if (tipoMantenible == null || tipoMantenible <= 0) {
        vm.msjAlerta = 'No se tiene una dato de tipo de mantenible.'
        vm.msjException = true
        return;
      }
      if (tipoServicio == null || tipoServicio <= 0) {
        vm.msjAlerta = 'No se tiene una dato de tipo de servicio.'
        vm.msjException = true
        return;
      }
      if (mantenible == null || mantenible <= 0) {
        vm.msjAlerta = 'No se tiene una dato de mantenible.'
        vm.msjException = true
        return;
      }
      */
      /*
      vm.overlay = true
      unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarConsumoRefaccion')
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
          console.log(vm.rowData)
          if (vm.rowData == null) {
            vm.rowData = []
          }
          if (vm.rowData.length > 0) {
            console.log('Arreglo: ')
            console.log(vm.rowData)
            if (vm.agrupar == true) {
              vm.rowDataTable = vm.SumDataArr(vm.rowData)
            } else {
              vm.rowDataTable = vm.FormatearDatos(vm.rowData)
              // vm.rowDataTable = vm.rowData
            }
          } else {
            console.log('Sin datos para mostrar')
            vm.msjAlerta = res.body.mensaje
            vm.msjException = true
            return
          }
        })
      */
    },
    SumDataArr(arr) {
      let vm = this
      console.log('function: SumDataArr(). ')
      var areglo = []
      // Se crean los valores de los vehículos a utilizar
      for (var a = 0; a < vm.dataSelectMante.length; a++) {
        areglo.push({
          mantenible_id: vm.dataSelectMante[a].mantenible_id,
          mantenible_nombre: vm.dataSelectMante[a].mantenible_nombre,
          tipoMantenible_nombre: '',
          tipoMantenimiento_nombre: '',
          itemCodigo: '',
          ItemDescripcion: '',
          cantidad: 0,
          precioarticulo: 0.0,
          CostoTotalArticulo: 0.0,
          servicio_nombre: '',
          fechaTaller: '',
        })
      }
      for (var b = 0; b < areglo.length; b++) {
        for (var c = 0; c < arr.length; c++) {
          if (areglo[b].mantenible_id == arr[c].mantenible_id) {
            areglo[b].sucursal_id = (arr[c].sucursal_id == null) ? 0 : arr[c].sucursal_id
            areglo[b].sucursal_nombre = (arr[c].sucursal_nombre == null) ? "SIN ASIGNAR" : arr[c].sucursal_nombre
            areglo[b].itemCodigo = arr[c].itemCodigo
            areglo[b].ItemDescripcion = arr[c].ItemDescripcion
            areglo[b].cantidad += arr[c].cantidad
            areglo[b].precioarticulo += arr[c].precioarticulo
            areglo[b].CostoTotalArticulo += arr[c].CostoTotalArticulo
            areglo[b].servicio_nombre = arr[c].servicio_nombre
            areglo[b].tipoMantenible_nombre = arr[c].tipoMantenible_nombre
            areglo[b].fechaTaller = arr[c].fechaTaller
            areglo[b].tipoMantenimiento_nombre = arr[c].tipoMantenimiento_nombre
          }
        }
      }
      areglo = vm.FormatearDatos(areglo)
      return areglo
    },
    FormatearDatos(arr) {
      let vm = this;
      console.log('function: FormatearDatos(). ')
      for (var i = 0; i < arr.length; i++) {
        arr[i].sucursal_id = (arr[i].sucursal_id == null) ? 0 : arr[i].sucursal_id
        arr[i].sucursal_nombre = (arr[i].sucursal_nombre == null) ? 'SIN ASIGNAR' : arr[i].sucursal_nombre
        arr[i].precioarticulo = vm.moneyToMNX(arr[i].precioarticulo)
        arr[i].CostoTotalArticulo = vm.moneyToMNX(arr[i].CostoTotalArticulo)
      }
      return arr
    },
    moneyToMNX(numero) {
      let vm = this
      var Formato  =  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(numero)
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
    getNombreSucursal(sucursal_id) {
      let vm = this
      console.log('function: getNombreSucursal(). ')
      var sucursal_nombre = ''
      for (var i=0; i<vm.selectSucursal.length; i++) {
        if (vm.selectSucursal[i].sucursal_id == sucursal_id) {
          sucursal_nombre = vm.selectSucursal[i].sucursal_nombre
        }
      }
      return sucursal_nombre
    },
    /* GetDatosWebService */
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
      { text: 'MANTENIBLE', value: 'mantenible_nombre', width: 150 },
      // { text: 'tipovehiculo_id', value: 'tipovehiculo_id', hide: true },
      { text: 'TIPO MANTENIBLE', value: 'tipoMantenible_nombre' },
      // { text: 'combustible_id', value: 'tipoCombustible_id', hide: true },
      // { text: 'combustible', value: 'tipoCombustible_nombre', hide: true },
      // { text: 'litros', value: 'litros', width: 100, hide: true },
      // { text: 'recargas', value: 'recargas', width: 100, hide: true },
      { text: 'SKU', value: 'itemCodigo', width: 100 },
      { text: 'CANTIDAD', value: 'cantidad', width: 100 },
      { text: 'PRECIO', value: 'precioarticulo', width: 100 },
      { text: 'TOTAL', value: 'CostoTotalArticulo', width: 100 },
      // { text: 'km / hr', value: 'distancia', width: 100, hide: true },
      // { text: 'rendimiento', value: 'rendimiento', width: 100, hide: true },
      // { text: 'tipoMantenimiento_id', value: 'tipoMantenimiento_id', hide: true },
      { text: 'TIPO DE MMTO', value: 'tipoMantenimiento_nombre', width: 150 },
      // { text: 'descripcion_matenible', value: 'descripcion_matenible', hide: true },
      { text: 'DESCIPCION DE SKU', value: 'ItemDescripcion' }
    ]

    this.DataPie = {
      type: 'pie',
      data: {
        labels: this.pieLabel,
        datasets: [
          {
            label: 'Cantidad por sucursal',
            data: this.pieData,
            backgroundColor: [
              '#ef9a9a',
              '#f48fb1',
              '#ce93d8',
              '#b39ddb',
              '#9fa8da',
              '#90caf9',
              '#81d4fa',
              '#80deea',
              '#80cbc4',
              '#1de9b6',
              '#00bfa5',
              '#a5d6a7',
              '#1de9b6',
              '#c5e1a5',
              '#1de9b6',
              '#e6ee9c'
            ],
            borderColor: [
              '#ef9a9a',
              '#f48fb1',
              '#ce93d8',
              '#b39ddb',
              '#9fa8da',
              '#90caf9',
              '#81d4fa',
              '#80deea',
              '#80cbc4',
              '#1de9b6',
              '#00bfa5',
              '#a5d6a7',
              '#1de9b6',
              '#c5e1a5',
              '#1de9b6',
              '#e6ee9c'
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
            label: 'Cantidad',
            data: this.barData,
            backgroundColor: [
              '#ef9a9a',
              '#f48fb1',
              '#ce93d8',
              '#b39ddb',
              '#9fa8da',
              '#90caf9',
              '#81d4fa',
              '#80deea',
              '#80cbc4',
              '#1de9b6',
              '#00bfa5',
              '#a5d6a7',
              '#1de9b6',
              '#c5e1a5',
              '#1de9b6',
              '#e6ee9c'
            ],
            borderColor: [
              '#ef9a9a',
              '#f48fb1',
              '#ce93d8',
              '#b39ddb',
              '#9fa8da',
              '#90caf9',
              '#81d4fa',
              '#80deea',
              '#80cbc4',
              '#1de9b6',
              '#00bfa5',
              '#a5d6a7',
              '#1de9b6',
              '#c5e1a5',
              '#1de9b6',
              '#e6ee9c'
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
      type: 'bar', //this.modelTipoGrafica,
      data: {
        labels: this.lineLabel,
        datasets: [
          {
            label: 'Costos por mantenible',
            data: this.lineData,
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
              'rgba(71, 183,132,.5)'
            ],
            borderColor: [
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
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)'
            ],
            borderWidth: 3
          }
        ]
      },
      options: {
        animation: {
          duration: 0
        },
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
          {
            label: 'Costos por mantenible',
            data: this.lineData,
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
              'rgba(71, 183,132,.5)'
            ],
            borderColor: [
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
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)',
              'rgba(71, 183,132,.5)'
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
        this.DataLine_bar.type = 'line'
        document.getElementById('Graf_Line_bar').style.display = "none"
      } else {
        var temp = this.DataLine
        this.DataLine_bar = temp
        this.DataLine_bar.type = 'line'
        this.createChart('Graf_Line_bar', this.DataLine_bar)
        document.getElementById('Graf_Line_bar').style.display = "block"
      }
    }
  },
}
</script>
