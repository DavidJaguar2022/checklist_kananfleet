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
    <v-flex lg12 md12 d-none>
      <v-tabs
              v-model="tab"
              background-color="white"
              centered
              icons-and-text
              color="lime darken-4"
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          T.P entre Fallas
          <v-icon>mdi-chart-bell-curve-cumulative</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          T.P de Reparaciones
          <v-icon>mdi-chart-areaspline-variant</v-icon>
        </v-tab>

        <v-tab href="#tab-3">
          Uso por hora del Activo
          <v-icon>mdi-chart-bar-stacked</v-icon>
        </v-tab>

        <v-tab href="#tab-4">
          Disponibilidad del Equipo
          <v-icon>mdi-chart-bar</v-icon>
        </v-tab>

        <v-tab href="#tab-5">
          Costos de Mantenimiento
          <v-icon>mdi-finance</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
                :key="1"
                :value="'tab-1'"
        >
          <v-card flat>
            <v-card-text>
              <div class="subtitle-1">
                Tiempo promedio entre fallas
                <hr class="my-3">
              </div>
              <v-layout row wrap>
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
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
                                  v-model="fcalendarEdit"
                                  label="Fecha de salida"
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
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
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
                                  v-model="fcalendarFinal"
                                  label="Fecha de salida"
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
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
                <v-autocomplete
                        v-model="optSelected"
                        label="Opciones"
                        :items="listaOpciones"
                        item-text="tipo"
                        item-value="id"
                        prepend-icon="mdi-settings"
                        @change="generaNewInfo"
                ></v-autocomplete>
                </v-flex>
                <v-flex xs3 sm3 md3>
                  <div style="margin-left: 3%; margin-top: 5%;">
                    <v-btn small color="primary"><v-icon>mdi-magnify</v-icon>Buscar </v-btn>
                    <v-btn small dark color="blue-grey lighten-1"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> Generar Gráfica </v-btn>
                  </div>
                </v-flex>
              </v-layout>
              <v-data-table
                      :headers="headers"
                      :items="desserts"
                      item-key="name"
                      dense
                      group-by="Periodo"
                      class="elevation-1"
                      show-group-by
                      hide-default-footer
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
          :key="2"
          :value="'tab-2'"
        >
          <v-card flat>
            <v-card-text>
              <div class="subtitle-1">
                Tiempo promedio de Reparaciones
                <hr class="my-3">
              </div>
              <v-layout row wrap>
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
                  <v-form
                          v-model="valid"
                          lazy-validation>
                    <v-flex xs12 sm12 md12>
                      <v-menu
                              v-model="finiflag"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                                  v-model="fini"
                                  label="Fecha de salida"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="fini" @input="finiflag = false" color="grey darken-4" locale="es"></v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-form>
                </v-flex>
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
                  <v-form
                          v-model="validFinal"
                          lazy-validation>
                    <v-flex xs12 sm12 md12>
                      <v-menu
                              v-model="ffinflag"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                                  v-model="ffin"
                                  label="Fecha de salida"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="ffin" @input="ffinflag = false" color="grey darken-4" locale="es"></v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-form>
                </v-flex>
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
                  <v-autocomplete
                          v-model="optSelected"
                          label="Opciones"
                          :items="listaOpciones"
                          item-text="tipo"
                          item-value="id"
                          prepend-icon="mdi-settings"
                          @change="graficaDinamica"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs3 sm3 md3>
                  <div style="margin-left: 3%; margin-top: 5%;">
                    <v-btn small color="primary"><v-icon>mdi-magnify</v-icon>Buscar </v-btn>
                    <v-btn @click="generaGraficaBar" small dark color="blue-grey lighten-1"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> Generar Gráfica </v-btn>
                  </div>
                </v-flex>
              </v-layout>
              <v-data-table
                      :headers="headersTPR"
                      :items="dessertsTPR"
                      item-key="name"
                      dense
                      group-by="Periodo"
                      class="elevation-1"
                      show-group-by
                      hide-default-footer
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
          :key="3"
          :value="'tab-3'"
        >
          <v-card flat>
            <v-card-text>
              <div class="subtitle-1">
                Reporte de uso por hora del activo
                <hr class="my-3">
              </div>
              <v-layout row wrap>
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
                  <v-form
                          v-model="valid"
                          lazy-validation>
                    <v-flex xs12 sm12 md12>
                      <v-menu
                              v-model="finir2flag"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                                  v-model="fini_r2"
                                  label="Fecha de salida"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="fini_r2" @input="finir2flag = false" color="grey darken-4" locale="es"></v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-form>
                </v-flex>
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
                  <v-form
                          v-model="validFinal"
                          lazy-validation>
                    <v-flex xs12 sm12 md12>
                      <v-menu
                              v-model="ffinr2flag"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                                  v-model="ffin_r2"
                                  label="Fecha de salida"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="ffin_r2" @input="ffinr2flag = false" color="grey darken-4" locale="es"></v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-form>
                </v-flex>
                <v-flex xs2 sm2 md2 style="margin-left: 1%;" d-none>
                  <v-autocomplete
                          v-model="optSelected"
                          label="Opciones"
                          :items="listaOpciones"
                          item-text="tipo"
                          item-value="id"
                          prepend-icon="mdi-settings"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs3 sm3 md3>
                  <div style="margin-left: 3%; margin-top: 5%;">
                    <v-btn small color="primary"><v-icon>mdi-magnify</v-icon>Buscar </v-btn>
                    <v-btn @click="generaGraficaUsoPromedio" small dark color="blue-grey lighten-1"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> Generar Gráfica </v-btn>
                  </div>
                </v-flex>
              </v-layout>
              <v-data-table
                      :headers="headersTPA"
                      :items="dessertsTPA"
                      item-key="name"
                      dense
                      group-by="area"
                      class="elevation-1"
                      hide-default-footer
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
          :key="4"
          :value="'tab-4'"
        >

        </v-tab-item>
        <v-tab-item
          :key="5"
          :value="'tab-5'"
        >
          <v-card flat>
            <v-card-text>
              <div class="subtitle-1">
                Reporte Costos de mantenimiento
                <hr class="my-3">
              </div>
              <v-layout row wrap>
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
                  <v-form
                          v-model="valid"
                          lazy-validation>
                    <v-flex xs12 sm12 md12>
                      <v-menu
                              v-model="fini4flag"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                                  v-model="fini_r4"
                                  label="Fecha de salida"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="fini_r4" @input="fini4flag = false" color="grey darken-4" locale="es"></v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-form>
                </v-flex>
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
                  <v-form
                          v-model="validFinal"
                          lazy-validation>
                    <v-flex xs12 sm12 md12>
                      <v-menu
                              v-model="ffin4flag"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                                  v-model="ffin_r4"
                                  label="Fecha de salida"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="ffin_r4" @input="ffin4flag = false" color="grey darken-4" locale="es"></v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-form>
                </v-flex>
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
                  <v-autocomplete
                          v-model="optSelected"
                          label="Opciones"
                          :items="listaOpciones"
                          item-text="tipo"
                          item-value="id"
                          prepend-icon="mdi-settings"
                          @change="infoDinamicaCM"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs3 sm3 md3>
                  <div style="margin-left: 3%; margin-top: 5%;">
                    <v-btn small color="primary"><v-icon>mdi-magnify</v-icon>Buscar </v-btn>
                    <v-btn @click="generaGraficaCM" small dark color="blue-grey lighten-1"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> Generar Gráfica </v-btn>
                  </div>
                </v-flex>
              </v-layout>
              <v-data-table
                      :headers="headersCM"
                      :items="dessertsCM"
                      item-key="name"
                      dense
                      group-by="Periodo"
                      class="elevation-1"
                      hide-default-footer
              ></v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <!-- -->
    </v-flex>
    <v-flex lg12 md12>
      <v-card flat>
        <v-card-text>
          <div class="headline" style="color:black">
            Reporte de Disponibilidad del Equipo
            <hr class="my-3">
          </div>
          <div class="headline" style="color:black">
            Reporte de Disponibilidad del Equipo
            <hr class="my-3">
          </div>
          <v-layout row wrap>
            <v-flex xs1 sm1 md1 style="margin-left: 1%;">
              <v-form
                      v-model="valid"
                      lazy-validation>
                <v-flex xs12 sm12 md12>
                  <v-menu
                          v-model="finir3flag"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                              v-model="computedInicio"
                              label="Fecha Inicial"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="fini_r3" @input="finir3flag = false" color="grey darken-4" locale="es"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-form>
            </v-flex>
            <v-flex xs1 sm1 md1 style="margin-left: 1%;">
              <v-form
                      v-model="validFinal"
                      lazy-validation>
                <v-flex xs12 sm12 md12>
                  <v-menu
                          v-model="ffin3flag"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                              v-model="computedFin"
                              label="Fecha Final"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="ffin_r3" @input="ffin3flag = false" color="grey darken-4" locale="es"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-form>
            </v-flex>
            <v-flex xs2 sm2 md2 style="margin-left: 1%;">
              <v-autocomplete
                      v-model="optSelected"
                      label="Opciones"
                      :items="listaOpciones"
                      item-text="tipo"
                      item-value="id"
                      prepend-icon="mdi-settings"
                      @change="generaInfoDinamica"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs1 sm1 md1 style="margin-left: 1%;">
            <v-text-field
                        v-model="Target"
                        label="Target"
                        hint="Ingrese el Target"
                        prepend-icon="mdi-current-dc"
                        required
                ></v-text-field>
            </v-flex>  
            <v-flex xs3 sm3  >
              
              <div style="margin-left: 3%; margin-top: 5%;">
                
                
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn @click="getReportexFiltroFechas" small color="primary" v-on="on"><v-icon>mdi-magnify</v-icon></v-btn>
                  </template>
                  <span>Buscar</span>
                </v-tooltip>
                <v-btn @click="generaGraficaDispEquipo" small dark color="blue-grey lighten-1"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> Graficar</v-btn>
                <v-btn @click="descargaReporte" small dark color="success"><v-icon>mdi-file-excel</v-icon> Descargar</v-btn>
                <v-btn @click="printReportPDF" small dark color="success"><v-icon>mdi-file-pdf-box</v-icon> PDF</v-btn>
                 
                
               
              </div>
            </v-flex>
          </v-layout>
          <v-data-table
                  :headers="headersDEQ"
                  :items="desserts"
                  item-key="name"
                  dense
                  group-by="Periodo"
                  class="elevation-1"
                  no-data-text="No hay datos para mostrar"
                  hide-default-footer
          ></v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-dialog
            v-model="dialogChart"
            width="90%"
    >
      <v-card>
        <v-card-title
                class="headline grey lighten-2"
                primary-title
        >
          Tiempo Promedio entre fallas
        </v-card-title>

        <v-card-text>
          <LineChart :labelsData="labelsData" :dataInfo="dataInfo" ref="lineBar"></LineChart>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  color="green"
                  text
                  @click="dialogChart = false"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
            v-model="dialogChartBar"
            width="90%"
    >
      <v-card>
        <v-card-title
                class="headline grey lighten-2"
                primary-title
        >
          {{labelDialogChart}}
        </v-card-title>

        <v-card-text>
          <p>* Unidades expresadas en Hrs</p>
          <v-row>
            <v-col cols="7">
              <v-autocomplete
                      v-model="busqueda"
                      :items="itemsBusqueda"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Buscar"
                      multiple
              ></v-autocomplete>
            </v-col>
            <v-col cols="2">
              <v-btn @click="filterGrafica" color="primary">
                <v-icon>mdi-magnify</v-icon> Buscar
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-switch v-model="graficaPuntosVisible" class="ma-2" label="Gráfica de Lineas"></v-switch>
            </v-col>
          </v-row>
          <span class="subtitle-1" v-if="graficaBarrasVisible">Gráfica de Barras</span>
          <BarChart :labelsData="labelsData" :dataInfo="dataInfo" ref="chartBar" v-if="graficaBarrasVisible"></BarChart>
          <template v-if="graficaBarrasVisible">
            <div class="text-center">
              <v-pagination
                      v-model="page"
                      :length="noPaginas"
                      circle
                      @input="next"
              ></v-pagination>
            </div>
          </template>
          <span class="subtitle-1" v-if="graficaPuntosVisible">Gráfica de Lineas</span>
          <LineChart :labelsData="labelsData" :dataInfo="dataInfo" ref="lineBar" v-if="graficaPuntosVisible"></LineChart>
          <template v-if="graficaPuntosVisible">
            <div class="text-center">
              <v-pagination
                      v-model="page"
                      :length="noPaginas"
                      circle
                      @input="next"
              ></v-pagination>
            </div>
          </template>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  color="green"
                  text
                  @click="dialogChartBar = false"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
  </v-layout>
</template>
<style>
  .theme--dark .v-menu__content {
    background-color: #424242;
  }
  .theme--light .v-menu__content {
    background-color: #ffffff;
  }
</style>
<script>
// import { AgGridVue } from '@ag-grid-community/vue'
// import { AllCommunityModules } from '@ag-grid-community/all-modules'
import unirest from 'unirest'
import XLSX from 'xlsx'
import LineChart from '../../../components/LineChart'
import BarChart from '../../../components/BarChart'
export default {
  components: {
    LineChart,
    BarChart,
    XLSX
  },
  data () {
    return {
      Target: 0,
      valid: false,
      mfechaEdit: false,
      finiflag: false,
      ffinflag: false,
      finir2flag: false,
      ffinr2flag: false,
      fini3flag: false,
      ffin3flag: false,
      fini4flag: false,
      ffin4flag: false,
      fcalendarEdit: new Date().toISOString().substr(0, 10),
      validFinal: false,
      mfechaEditFinal: false,
      fcalendarFinal: new Date().toISOString().substr(0, 10),
      fini: new Date().toISOString().substr(0, 10),
      ffin: new Date().toISOString().substr(0, 10),
      fini_r2: new Date().toISOString().substr(0, 10),
      ffin_r2: new Date().toISOString().substr(0, 10),
      fini_r3: new Date().toISOString().substr(0, 10),
      ffin_r3: new Date().toISOString().substr(0, 10),
      fini_r4: new Date().toISOString().substr(0, 10),
      ffin_r4: new Date().toISOString().substr(0, 10),
      columnDefs: null,
      rowData: null,
      // modules: AllCommunityModules,
      tab: null,
      proyectos: [],
      headers: [
        { text: 'PERIODO', align: 'left', value: 'Periodo' },
        { text: 'MES', value: 'mes' },
        { text: 'PROYECTO', value: 'proyecto' },
        { text: 'MTBF', value: 'mtbf' },
        { text: 'LL', value: 'll' }
      ],
      desserts: [],
      listaOpciones: [
        { 'id': 1, 'tipo': 'Proyecto/Sucursal' },
        { 'id': 3, 'tipo': 'Tipo de Vehículo/Tipo de Mantenible' },
        { 'id': 2, 'tipo': 'Vehículo/Mantenible' }
      ],
      optSelected: null,
      dialogChart: false,
      dialogChartBar: false,
      labelsData: [],
      dataInfo: [],
      dessertsOculto: [],
      headersTPR: [
        { text: 'PERIODO', align: 'left', value: 'Periodo' },
        { text: 'MES', value: 'mes' },
        { text: 'TOTAL', value: 'totales' }
      ],
      dessertsTPR: [
        { Periodo: '2020', mes: 'ENERO', filos: 10, san_julian: 15, totales: 25 }
      ],
      headersTPA: [
        { text: 'AREA', value: 'area' },
        { text: 'EQUIPO', value: 'equipo' },
        { text: 'DESCRIPCION', value: 'descripcion' },
        { text: 'HORAS USO', value: 'horas' },
        { text: 'HORAS PROMEDIO', value: 'promedio' }////
      ],
      dessertsTPA: [
        { area: 'FILOS', equipo: 'AL-0001', descripcion: 'Alpha 001', horas: '70', promedio: '10' }
      ],
      labelDialogChart: '',
      headersDEQ: [
        { text: 'PERIODO', value: 'Periodo', class: ['blue-grey darken-2', 'white--text'] },
        { text: 'MES', value: 'mes', class: ['blue-grey darken-2', 'white--text'] },
        { text: 'TOTAL PROMEDIO META', value: 'promedio_meta', class: ['blue-grey darken-2', 'white--text'] },
        { text: 'TOTAL PROMEDIO REAL', value: 'promedio_real', class: ['blue-grey darken-2', 'white--text'] }
      ],
      dessertsDEQ: [
        { Periodo: '2019', mes: 'SEPTIEMBRE', promedio_meta: '0.9', promedio_real: '0.825' },
        { Periodo: '2019', mes: 'OCTUBRE', promedio_meta: '0.9', promedio_real: '0.845' },
        { Periodo: '2019', mes: 'NOVIEMBRE', promedio_meta: '0.9', promedio_real: '0.889' },
        { Periodo: '2019', mes: 'DICIEMBRE', promedio_meta: '0.9', promedio_real: '0.83' },
        { Periodo: '2019', mes: 'ENERO', promedio_meta: '0.9', promedio_real: '0.86' }
      ],
      headersCM: [
        { text: 'PERIODO', value: 'Periodo' },
        { text: 'MES', value: 'mes' },
        { text: 'TOTAL COSTO MANO OBRA', value: 'costo_mo' },
        { text: 'TOTAL REFACCIONE', value: 'costo_refaccion' }
      ],
      dessertsCM: [
        { Periodo: '2019', mes: 'SEPTIEMBRE', costo_mo: '9,500', costo_refaccion: '10,500' },
        { Periodo: '2019', mes: 'OCTUBRE', costo_mo: '7,500', costo_refaccion: '8,500' },
        { Periodo: '2019', mes: 'NOVIEMBRE', costo_mo: '2,000', costo_refaccion: '5,500' },
        { Periodo: '2019', mes: 'DICIEMBRE', costo_mo: '1300', costo_refaccion: '6,000' },
        { Periodo: '2019', mes: 'ENERO', costo_mo: '12,400', costo_refaccion: '500' }
      ],
      vehiculosEmpresa: [],
      lAnios: [],
      lProyectos: [],
      lmeses: [],
      finir3flag: false,
      urlTest: 'http://localhost:51104/',
      url: 'http://localhost:51104/',
      overlay: false,
      msjException: false,
      msjAlerta: '',
      mesesAll: ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'],
      title: 'Reportes',
      tiposVehiculo: [],
      ltipos_vehiculo: [],
      dessertPrint: [],
      graficaPuntosVisible: false,
      graficaBarrasVisible: true,
      page: 1,
      noPaginas: 1,
      noRegistros: 5,
      datosGraficar: [],
      busqueda: [],
      itemsBusqueda: []

    }
  },
  methods: {
    filterGrafica(){
      const vm = this
      vm.datosGraficar = []
      for(var x = 0; x < vm.busqueda.length; x++){
        for(var i = 0; i < vm.dataInfo.length; i++){
          if(vm.busqueda[x] == vm.dataInfo[i].Periodo){
            vm.datosGraficar.push(vm.dataInfo[i])//
          }
        }
      }
      setTimeout(function () {
        vm.refreshBarChart()
        vm.refreshGrafica()
      }, 250)
    },
    next(page) {
      const vm = this
      vm.datosGraficar = []
      var fin = page * vm.noRegistros
      var inicio = fin - vm.noRegistros
      if(fin > vm.dataInfo.length){
        var fin = vm.dataInfo.length
      }
      if(page == 1){
        var inicio = 0;
        var fin = vm.noRegistros
      }else {
        var inicio = inicio + 1
        var fin = fin + 1
      }
      for(var x = inicio; x < fin; x++){
        console.log(x)
        vm.datosGraficar.push(vm.dataInfo[x])
      }
      setTimeout(function () {
        vm.refreshBarChart()
        vm.refreshGrafica()
      }, 250)
    },
    formatoFecha (date) {
      console.log('function: formatDate(). ')
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    descargaReporte () {
      const vm = this//
      if (vm.desserts.length === 0) {
        vm.msjException = true
        vm.msjAlerta = 'Debe de realizar una búsqueda para poder descargar el reporte'
        return false
      }
      vm.dessertPrint = []
      if(vm.optSelected === null) {
        for(var i =  0; i < vm.desserts.length; i++) {
          const obj = []
          obj['PERIODO'] = vm.desserts[i].Periodo
          obj['MES'] = vm.desserts[i].mes
          obj['PROMEDIO_REAL'] = vm.desserts[i].promedio_real
          obj['PROMEDIO_META'] = vm.desserts[i].promedio_meta
          vm.dessertPrint.push(obj)
        }
      }
      if(vm.optSelected === 1){
        for(var i =  0; i < vm.desserts.length; i++) {
          const obj = []
          obj['PERIODO'] = vm.desserts[i].Periodo
          obj['MES'] = vm.desserts[i].mes
          obj['SUCURSAL'] = vm.desserts[i].sucursal
          obj['PROMEDIO_REAL'] = vm.desserts[i].promedio_hide + ' Hrs'
          obj['PROMEDIO_META'] = vm.Target + ' Hrs' // '100 Hrs'
          vm.dessertPrint.push(obj)
        }
      }
      if(vm.optSelected === 2){
        for(var i =  0; i < vm.dessertsOculto.length; i++) {
          const obj = []
          var prom_real = vm.dessertsOculto[i].promedio_real
          obj['PERIODO'] = vm.dessertsOculto[i].Periodo
          obj['MES'] = vm.dessertsOculto[i].mes
          obj['PROYECTO'] = vm.dessertsOculto[i].proyecto
          obj['TIPO_VEHICULO'] = vm.dessertsOculto[i].MantenibleNombre
          obj['EQUIPO'] = vm.dessertsOculto[i].equipo
          obj['PROMEDIO_REAL'] = prom_real.toFixed(2) + ' Hrs'
          obj['PROMEDIO_META'] =  vm.Target + ' Hrs' //'100 Hrs'
          vm.dessertPrint.push(obj)
        }
      }
      if(vm.optSelected === 3){
        for(var i =  0; i < vm.desserts.length; i++) {
          const obj = []
          obj['PERIODO'] = vm.desserts[i].Periodo
          obj['MES'] = vm.desserts[i].mes
          obj['TIPO_VEHICULO'] = vm.desserts[i].tipo_mantenible
          obj['PROMEDIO_REAL'] = vm.desserts[i].promedio_hide + ' Hrs'
          obj['PROMEDIO_META'] = vm.Target + ' Hrs' //'100 Hrs'
          vm.dessertPrint.push(obj)
        }
      }



      let data = XLSX.utils.json_to_sheet(vm.dessertPrint)
      const workbook = XLSX.utils.book_new()
      const filename = 'Disponibilidad_Equipo'
      XLSX.utils.book_append_sheet(workbook, data, filename)
      XLSX.writeFile(workbook, `${filename}.xlsx`)
    },
    printReportPDF() {
     const vm = this
      vm.dessertPrint = []
      if(vm.optSelected === null) {
        for(var i =  0; i < vm.desserts.length; i++) {
          const obj = []
          obj['PERIODO'] = vm.desserts[i].Periodo
          obj['MES'] = vm.desserts[i].mes
          obj['PROMEDIO_REAL'] = vm.desserts[i].promedio_real
          obj['PROMEDIO_META'] = vm.desserts[i].promedio_meta
          vm.dessertPrint.push(obj)
        }
      }
      if(vm.optSelected === 1){
        for(var i =  0; i < vm.desserts.length; i++) {
          const obj = []
          obj['PERIODO'] = vm.desserts[i].Periodo
          obj['MES'] = vm.desserts[i].mes
          obj['SUCURSAL'] = vm.desserts[i].sucursal
          obj['PROMEDIO_REAL'] = vm.desserts[i].promedio_hide + ' Hrs'
          obj['PROMEDIO_META'] = vm.Target + ' Hrs' // '100 Hrs'
          vm.dessertPrint.push(obj)
        }
      }
      if(vm.optSelected === 2){
        for(var i =  0; i < vm.dessertsOculto.length; i++) {
          const obj = []
          var prom_real = vm.dessertsOculto[i].promedio_real
          obj['PERIODO'] = vm.dessertsOculto[i].Periodo
          obj['MES'] = vm.dessertsOculto[i].mes
          obj['PROYECTO'] = vm.dessertsOculto[i].proyecto
          obj['TIPO_VEHICULO'] = vm.dessertsOculto[i].MantenibleNombre
          obj['EQUIPO'] = vm.dessertsOculto[i].equipo
          obj['PROMEDIO_REAL'] = prom_real.toFixed(2) + ' Hrs'
          obj['PROMEDIO_META'] = vm.Target + ' Hrs' //'100 Hrs'
          vm.dessertPrint.push(obj)
        }
      }
      if(vm.optSelected === 3){
        for(var i =  0; i < vm.desserts.length; i++) {
          const obj = []
          obj['PERIODO'] = vm.desserts[i].Periodo
          obj['MES'] = vm.desserts[i].mes
          obj['TIPO_VEHICULO'] = vm.desserts[i].tipo_mantenible
          obj['PROMEDIO_REAL'] = vm.desserts[i].promedio_hide + ' Hrs'
          obj['PROMEDIO_META'] = vm.Target + ' Hrs' //'100 Hrs'
          vm.dessertPrint.push(obj)
        }
      }
      vm.reportePDF('Reporte de Disponibilidad del Equipo')
    },
    reportePDF(nombre){
      const vm = this
      if (vm.desserts.length === 0) {
        vm.msjException = true
        vm.msjAlerta = 'Debe de realizar una búsqueda para poder descargar el reporte'
        return false
      }
      var encabezados = Object.keys(vm.dessertPrint[0])
      var headerTable = ''
      var detalle = ''
      if(vm.optSelected === null){
        headerTable += '<td style="border: 1px solid #ddd;">PERIODO</td>' +
          '<td style="border: 1px solid #ddd;">MES</td>' +
          '<td style="border: 1px solid #ddd;">PROMEDIO_REAL</td>' +
          '<td style="border: 1px solid #ddd;">PROMEDIO_META</td>'

        for(var x = 0; x < vm.dessertPrint.length; x++) {
          detalle += '<tr style="border: 1px solid #ddd;">' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PERIODO + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].MES + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PROMEDIO_REAL + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PROMEDIO_META + '</td>' +
            '</tr>'
        }
      }
      if(vm.optSelected === 1){
        headerTable += '<td style="border: 1px solid #ddd;">PERIODO</td>' +
          '<td style="border: 1px solid #ddd;">MES</td>' +
          '<td style="border: 1px solid #ddd;">PROYECTO</td>' +
          '<td style="border: 1px solid #ddd;">PROMEDIO_REAL</td>' +
          '<td style="border: 1px solid #ddd;">PROMEDIO_META</td>'

        for(var x = 0; x < vm.dessertPrint.length; x++) {
          detalle += '<tr style="border: 1px solid #ddd;">' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PERIODO + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].MES + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].SUCURSAL + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PROMEDIO_REAL + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PROMEDIO_META + '</td>' +
            '</tr>'
        }
      }
      if(vm.optSelected === 2){
        headerTable += '<td style="border: 1px solid #ddd;">PERIODO</td>' +
          '<td style="border: 1px solid #ddd;">MES</td>' +
          '<td style="border: 1px solid #ddd;">PROYECTO</td>' +
          '<td style="border: 1px solid #ddd;">TIPO VEHICULO</td>' +
          '<td style="border: 1px solid #ddd;">EQUIPO</td>' +
          '<td style="border: 1px solid #ddd;">PROMEDIO_REAL</td>' +
          '<td style="border: 1px solid #ddd;">PROMEDIO_META</td>'

        for(var x = 0; x < vm.dessertPrint.length; x++){
          detalle += '<tr style="border: 1px solid #ddd;">' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PERIODO + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].MES + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PROYECTO + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].TIPO_VEHICULO + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].EQUIPO + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PROMEDIO_REAL + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PROMEDIO_META + '</td>' +
            '</tr>'
        }
      }
      if(vm.optSelected === 3){
        headerTable += '<td style="border: 1px solid #ddd;">PERIODO</td>' +
          '<td style="border: 1px solid #ddd;">MES</td>' +
          '<td style="border: 1px solid #ddd;">TIPO VEHICULO</td>' +
          '<td style="border: 1px solid #ddd;">PROMEDIO_REAL</td>' +
          '<td style="border: 1px solid #ddd;">PROMEDIO_META</td>'

        for(var x = 0; x < vm.dessertPrint.length; x++){
          detalle += '<tr style="border: 1px solid #ddd;">' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PERIODO + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].MES + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].TIPO_VEHICULO + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PROMEDIO_REAL + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.dessertPrint[x].PROMEDIO_META + '</td>' +
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
    generaNewInfo () {
      const vm = this
      const contenido = []
      if (vm.optSelected === 1) {
        vm.headers = []
        vm.desserts = []
        vm.desserts = vm.dessertsOculto
        vm.headers.push({ text: 'PERIODO', align: 'left', value: 'Periodo' })
        vm.headers.push({ text: 'MES', value: 'mes' })
        for (let i = 0; i < vm.proyectos.length; i++) {
          vm.headers.push({ text: 'MTBF ' + vm.proyectos[i].Nombre, value: 'mtbf_' + vm.proyectos[i].Id })
          vm.headers.push({ text: 'LL ' + vm.proyectos[i].Nombre, value: 'll_' + vm.proyectos[i].Id })
        }
        for (let x = 0; x < vm.desserts.length; x++) {
          const obj = []
          const periodo = 'Periodo'
          const mes = 'mes'
          // const proyecto = 'proyecto_' + vm.desserts[x].proyecto_id
          const mtbf = 'mtbf_' + vm.desserts[x].proyecto_id
          const ll = 'll_' + vm.desserts[x].proyecto_id
          const proyectoID = 'proyecto_id'
          obj[periodo] = vm.desserts[x].Periodo
          obj[mes] = vm.desserts[x].mes
          // obj[proyecto] = vm.proyectos[vm.desserts[x].proyecto_id].Nombre
          obj[mtbf] = vm.desserts[x].mtbf
          obj[ll] = vm.desserts[x].ll
          obj[proyectoID] = vm.desserts[x].proyecto_id
          contenido.push(obj)
        }

        vm.desserts = []
        vm.desserts = contenido
        // console.log(contenido)
      }
      if (vm.optSelected === 2) {
        vm.headers = []
        vm.desserts = []
        vm.headers.push({ text: 'PERIODO', align: 'left', value: 'Periodo' })
        vm.headers.push({ text: 'MES', value: 'mes' })
        vm.headers.push({ text: 'MBTF AI-01', value: 'mbtf_1' })
        vm.headers.push({ text: 'LL AI-01', value: 'll_1' })
        vm.headers.push({ text: 'MBTF AI-02', value: 'mbtf_2' })
        vm.headers.push({ text: 'LL AI-02', value: 'll_2' })
        vm.headers.push({ text: 'MBTF AI-03', value: 'mbtf_3' })
        vm.headers.push({ text: 'LL AI-04', value: 'll_3' })
        vm.headers.push({ text: 'MBTF AI-05', value: 'mbtf_4' })
        vm.headers.push({ text: 'LL AI-06', value: 'll_4' })
        vm.desserts = []
        vm.desserts = [
          { Periodo: '2020', mtbf_1: 1100, ll_1: 700, mes: 'ENERO' },
          { Periodo: '2020', mtbf_1: 1200, ll_1: 700, mes: 'FEBRERO' },
          { Periodo: '2019', mtbf_2: 900, ll_2: 700, mes: 'MARZO' },
          { Periodo: '2020', mtbf_2: 1100, ll_2: 700, mes: 'ABRIL' },
          { Periodo: '2019', mtbf_3: 500, ll_3: 700, mes: 'NOVIEMBRE' },
          { Periodo: '2020', mtbf_3: 1100, ll_3: 700, mes: 'NOVIEMBRE' },
          { Periodo: '2019', mtbf_4: 800, ll_4: 700, mes: 'DICIEMBRE' },
          { Periodo: '2020', mtbf_4: 400, ll_4: 700, mes: 'DICIEMBRE' }
        ]
      }
    },
    refreshGrafica () {
      const vm = this
      vm.$refs.lineBar.generaGrafica()
    },
    generaGraficaBar () {
      const vm = this
      vm.labelDialogChart = 'Tiempo Promedio de reparaciones'
      if (vm.optSelected === null) {
        vm.labelsData = ['ENERO 2019', 'MARZO 2019', 'ABRIL 2019', 'NOVIEMBRE 2019', 'DICIEMBRE 2019', 'ENERO 2020']
        vm.dataInfo = [ //
          { 'Periodo': 2019, 'cantidad': 40 }
        ]
        setTimeout(function () {
          vm.refreshBarChart()
        }, 250)
      }
      if (vm.optSelected === 1) {
        vm.labelsData = []
        vm.dataInfo = []
        vm.labelsData = ['ENERO 2019 FILOS', 'ENERO 2019 SAN JULIAN', 'ABRIL 2019 FILOS', 'ABRIL 2019 SAN JULIAN', 'ENERO 2020 FILOS', 'ENERO 2020 SAN JULIAN']
        vm.dataInfo = [ //
          { 'Periodo': 2019, 'cantidad': 40 }
        ]
        setTimeout(function () {
          vm.refreshBarChart()
        }, 250)
      }
      if (vm.optSelected === 2) {
        vm.labelsData = []
        vm.dataInfo = []
        vm.labelsData = [
          'ENERO MTBF AI-01',
          'ENERO LL AI-01',
          'FEBRERO MTBF AI-02',
          'FEBRERO LL AI-02',
          'ABRIL MTBF AI-03',
          'ABRIL LL AI-03',
          'MAYO MTBF AI-04',
          'MAYO LL AI-04',
          'JUNIO MTBF AI-05',
          'JUNIO LL AI-05',
          'DICIEMBRE MTBF AI-06',
          'DICIEMBRE LL AI-06'
        ]
        vm.dataInfo = [ //
          { 'Periodo': 2019, 'cantidad': 40 }
        ]
        setTimeout(function () {
          vm.refreshBarChart()
        }, 250)
      }
      vm.dialogChartBar = true
    },
    refreshBarChart () {
      const vm = this
      vm.$refs.chartBar.generaGrafica()
      vm.optSelected = null
    },
    /* refreshGrafica () {
      const vm = this
      vm.$refs.lineBar.generaGrafica()
      vm.optSelected = null
    }, */
    graficaDinamica () {
      const vm = this
      if (vm.optSelected === 1) {
        vm.headersTPR = []
        vm.headersTPR.push({ text: 'PERIODO', align: 'left', value: 'Periodo' })
        vm.headersTPR.push({ text: 'MES', value: 'mes' })
        vm.headersTPR.push({ text: 'FILOS', value: 'filos' })
        vm.headersTPR.push({ text: 'SAN JULIAN', value: 'san_julian' })
        vm.headersTPR.push({ text: 'TOTAL', value: 'totales' })
        vm.dessertsTPR.push({ 'Periodo': '2020', 'mes': 'ENERO', 'filos': 10, 'san_julian': 15, 'totales': 25 })
        vm.dessertsTPR.push({ 'Periodo': '2020', 'mes': 'FEBRERO', 'filos': 20, 'san_julian': 10, 'totales': 30 })
        vm.dessertsTPR.push({ 'Periodo': '2019', 'mes': 'MARZO', 'filos': 25, 'san_julian': 17, 'totales': 32 })
        vm.dessertsTPR.push({ 'Periodo': '2020', 'mes': 'ABRIL', 'filos': 30, 'san_julian': 28, 'totales': 58 })
        vm.dessertsTPR.push({ 'Periodo': '2019', 'mes': 'NOVIEMBRE', 'filos': 37, 'san_julian': 26, 'totales': 53 })
        vm.dessertsTPR.push({ 'Periodo': '2020', 'mes': 'NOVIEMBRE', 'filos': 29, 'san_julian': 19, 'totales': 48 })
        vm.dessertsTPR.push({ 'Periodo': '2019', 'mes': 'DICIEMBRE', 'filos': 40, 'san_julian': 27, 'totales': 67 })
        vm.dessertsTPR.push({ 'Periodo': '2020', 'mes': 'DICIEMBRE', 'filos': 12, 'san_julian': 37, 'totales': 49 })
      }
      if (vm.optSelected === 2) {
        vm.headersTPR = []
        vm.dessertsTPR = []
        vm.headersTPR.push({ text: 'PERIODO', align: 'left', value: 'Periodo' })
        vm.headersTPR.push({ text: 'MES', value: 'mes' })
        vm.headersTPR.push({ text: 'FILOS TR-01', value: 'tr_1' })
        vm.headersTPR.push({ text: 'FILOS TR-02', value: 'tr_2' })
        vm.headersTPR.push({ text: 'FILOS TR-03', value: 'tr_3' })
        vm.headersTPR.push({ text: 'TOTAL FILOS', value: 'totales_filos' })
        vm.headersTPR.push({ text: 'SAN JULIAN TR-01', value: 'tr_4' })
        vm.headersTPR.push({ text: 'SAN JULIAN TR-02', value: 'tr_5' })
        vm.headersTPR.push({ text: 'SAN JULIAN TR-03', value: 'tr_6' })
        vm.headersTPR.push({ text: 'TOTAL SAN JULIAN', value: 'totales_sn' })
      }
    },
    generaGraficaUsoPromedio () {
      const vm = this
      vm.labelDialogChart = 'Uso Promedio del Activo'
      vm.dialogChartBar = true
      vm.labelsData = ['AL-0001', 'AL-0002', 'AL-0003', 'TOR-0001', 'TOR-0002', 'TOR-0003', 'CR-0001']
      vm.dataInfo = [ //
        { 'Periodo': 2019, 'cantidad': 40 }
      ]
      setTimeout(function () {
        vm.refreshBarChart()
      }, 250)
    },
    generaGraficaDispEquipo () {
      const vm = this
      vm.dataInfo = []
      vm.datosGraficar = []
      vm.busqueda = []
      vm.page = 1
      if (vm.optSelected === null) {
        vm.labelDialogChart = 'Disponibilidad de Equipo'
        vm.labelsData = vm.desserts.map((item)=>{
          return item.mes + ' ' + item.Periodo
        })
        for (var i = 0; i < vm.desserts.length; i++) {
          vm.dataInfo.push({'Periodo': 'PROMEDIO REAL', 'cantidad': vm.desserts[i].promedio_real})
          vm.dataInfo.push({'Periodo': 'PROMEDIO META', 'cantidad': vm.Target})
        }
        setTimeout(function () {
          vm.refreshBarChart()
          vm.refreshGrafica()
        }, 250)
      }
      if (vm.optSelected === 1) {//
        vm.labelDialogChart = 'Disponibilidad de Equipo por Equipo/Activo'
        vm.labelsData = vm.desserts.map((item)=>{
          return item.mes + ' ' + item.Periodo +' ' +item.sucursal
        })
        for (var i = 0; i < vm.desserts.length; i++) {
          vm.dataInfo.push({'Periodo': 'PROMEDIO REAL', 'cantidad': vm.desserts[i].promedio_hide})
          vm.dataInfo.push({'Periodo': 'PROMEDIO META', 'cantidad': vm.Target  })
        }
        setTimeout(function () {
          vm.refreshBarChart()
          vm.refreshGrafica()
        }, 250)
      }
      if (vm.optSelected === 2) {//
        vm.labelDialogChart = 'Disponibilidad de Equipo por Equipo/Activo'
        vm.labelsData = vm.labelsData = vm.desserts.map((item)=>{
          return item.mes + ' ' + item.Periodo +' ' +item.equipo
        })
        for (var i = 0; i < vm.desserts.length; i++) {
          vm.dataInfo.push({'Periodo': 'PROMEDIO REAL', 'cantidad': vm.desserts[i].promedio_hide})
          vm.dataInfo.push({'Periodo': 'PROMEDIO META', 'cantidad': vm.Target  })
        }
        setTimeout(function () {
          vm.refreshBarChart()
          vm.refreshGrafica()
        }, 250)
      }
      if (vm.optSelected === 3) {
        vm.labelDialogChart = 'Disponibilidad de Equipo por Tipo de Equipo/Tipo de Activo'
        vm.labelsData = vm.labelsData = vm.desserts.map((item)=>{
          return item.mes + ' ' + item.Periodo +' ' +item.tipo_mantenible
        })
        for (var i = 0; i < vm.desserts.length; i++) {
          vm.dataInfo.push({'Periodo': 'PROMEDIO REAL', 'cantidad': vm.desserts[i].promedio_hide})
          vm.dataInfo.push({'Periodo': 'PROMEDIO META', 'cantidad': vm.Target  })
        }
        setTimeout(function () {
          vm.refreshBarChart()
          vm.refreshGrafica()
        }, 250)
      }
      ///Paginacion//
      var totalPages = (vm.dataInfo.length / vm.noRegistros)
      if(totalPages < 1){
        vm.noPaginas = 1
      }else{
        vm.noPaginas = Math.floor(totalPages)
      }
      for(var x = 0; x < vm.noRegistros; x++){
        vm.datosGraficar.push(vm.dataInfo[x])
      }

      ///Busqueda///
      vm.busqueda = []
      vm.itemsBusqueda = []
      vm.itemsBusqueda = vm.dataInfo.map((item)=>{
        return item.Periodo
      })

      ///////////////

      vm.dialogChartBar = true//
    },
    generaInfoDinamica () {
      const vm = this
      if (vm.desserts.length === 0) {
        vm.msjException = true
        vm.msjAlerta = 'Debe de realizar una búsqueda para poder graficar'
        return false
      }
      if (vm.optSelected === 1) {
        vm.headersDEQ = []
        vm.desserts = []
        const contenido = []
        vm.headersDEQ.push({ text: 'PERIODO', align: 'left', value: 'Periodo', width: 150, class: ['blue-grey darken-2', 'white--text'] })
        vm.headersDEQ.push({ text: 'MES', value: 'mes', width: 150, class: ['blue-grey darken-2', 'white--text'] })
        vm.headersDEQ.push({ text: 'PROM REAL SIN ASIGNAR', value: 'mtbf_00', width: 235, class: ['blue-grey darken-2', 'white--text']})
        vm.headersDEQ.push({ text: 'PROM META SIN ASIGNAR', value: 'promedio_meta_00', width: 235, class: ['blue-grey darken-2', 'white--text']})
        for (let i = 0; i < vm.proyectos.length; i++) {
          vm.headersDEQ.push({ text: 'PROM REAL ' + vm.proyectos[i].sucursal_nombre, value: 'mtbf_' + vm.proyectos[i].sucursal_id, width:235, class: ['blue-grey darken-2', 'white--text'] })
          vm.headersDEQ.push({ text: 'PROM META ' + vm.proyectos[i].sucursal_nombre, value: 'promedio_meta_' + vm.proyectos[i].sucursal_id, width:235, class: ['blue-grey darken-2', 'white--text'] })
        }

        /* for (let x = 0; x < vm.dessertsOculto.length; x++) {
          if(vm.dessertsOculto[x].sucursal_id === null ){
            var sucursal = '00'
            // var sucursal_name = 'SIN ASIGNAR'
          } else {
            var sucursal = vm.dessertsOculto[x].sucursal_id
            // var sucursal_name = vm.dessertsOculto[x].sucursalNombre
          }
          const obj = []
          const periodo = 'Periodo'
          const mes = 'mes'
          const mtbf = 'mtbf_' + sucursal
          const promedio_meta = 'promedio_meta_' + sucursal
          obj[periodo] = vm.dessertsOculto[x].Periodo
          obj[mes] = vm.dessertsOculto[x].mes
          obj[mtbf] = vm.dessertsOculto[x].promedio_real
          obj[promedio_meta] = 100
          contenido.push(obj)
        }*/

        // vm.desserts = []
        // vm.desserts = contenido
        vm.getUniquedataAnios()
        vm.getUniquedataSucursal()
        vm.getUniquedataMes()
        var totalxLinea = 0 //
        for (let x = 0; x < vm.lAnios.length; x++) {
          for (let y = 0; y < vm.lmeses.length; y++) {
            for (let z = 0; z < vm.lProyectos.length; z++) {
              var allDataSuma = vm.dessertsOculto.filter((item) => {
                if (item.Periodo === vm.lAnios[x] && item.mes === vm.lmeses[y] && item.proyecto === vm.lProyectos[z]) {
                  return item.promedio_real
                }
              })
              if (allDataSuma.length === 0) {
                totalxLinea = 0
                var promedio = 0
                var promedio_standard = vm.Target
              } else {
                totalxLinea = allDataSuma.reduce((accumulator, allDataSuma) => {
                  accumulator += allDataSuma.promedio_real
                  return accumulator
                }, 0)
                var promedio = (totalxLinea / allDataSuma.length)
                var promedio_standard = vm.Target
              }
              /* ini*/
              if(allDataSuma[0].sucursal_id === null ){
                var sucursal = '00'
                var sucursal_name = 'SIN ASIGNAR'
              } else {
                var sucursal = allDataSuma[0].sucursal_id
                var sucursal_name = allDataSuma[0].sucursal
              }
              const obj = []
              const periodo = 'Periodo'
              const mes = 'mes'
              const mtbf = 'mtbf_' + sucursal
              const promedio_meta = 'promedio_meta_' + sucursal
              obj[periodo] = allDataSuma[0].Periodo
              obj[mes] = allDataSuma[0].mes
              obj[mtbf] = promedio.toFixed(2) + ' Hrs'
              obj[promedio_meta] = vm.Target + ' Hrs'
              obj['sucursal'] = sucursal_name
              obj['promedio_hide'] = promedio.toFixed(2)
              contenido.push(obj)
              /*vm.desserts.push({
                'Periodo': vm.lAnios[x],//
                'mes': vm.lmeses[y],
                'promedio_real': promedio,
                'promedio_meta': promedio_standard
              })*/
              /* fin */
            }
          }
        }
        vm.desserts = contenido
        console.log(vm.desserts)

      }
      if (vm.optSelected === 2) {
        vm.headersDEQ = []
        vm.desserts = []
        const contenido = []
        vm.headersDEQ.push({ text: 'PERIODO', align: 'left', value: 'Periodo', width: 150, class: ['blue-grey darken-2', 'white--text'] })
        vm.headersDEQ.push({ text: 'MES', value: 'mes', width: 150, class: ['blue-grey darken-2', 'white--text'] })
        vm.headersDEQ.push({ text: 'PROM REAL SIN ASIGNAR', value: 'mtbf_00', width: 235, class: ['blue-grey darken-2', 'white--text']})
        vm.headersDEQ.push({ text: 'PROM META SIN ASIGNAR', value: 'promedio_meta_00', width: 235, class: ['blue-grey darken-2', 'white--text']})
        for (let i = 0; i < vm.vehiculosEmpresa.length; i ++) { //
          vm.headersDEQ.push({ text: 'PROM REAL ' + vm.vehiculosEmpresa[i].mantenible_nombre, value: 'mtbf_' + vm.vehiculosEmpresa[i].mantenible_id, width:240, class: ['blue-grey darken-2', 'white--text'] })
          vm.headersDEQ.push({ text: 'PROM META ' + vm.vehiculosEmpresa[i].mantenible_nombre, value: 'promedio_meta_' + vm.vehiculosEmpresa[i].mantenible_id, width:240, class: ['blue-grey darken-2', 'white--text'] })
        }
        for (let x = 0; x < vm.dessertsOculto.length; x++) {
          if(vm.dessertsOculto[x].sucursal_id === null ){
            var sucursal = '00'
            // var sucursal_name = 'SIN ASIGNAR'
          } else {
            var sucursal = vm.dessertsOculto[x].sucursal_id
            // var sucursal_name = vm.dessertsOculto[x].sucursalNombre
          }
          const obj = []//
          const periodo = 'Periodo'
          const mes = 'mes'
          const mtbf = 'mtbf_' + vm.dessertsOculto[x].equipo_id
          const promedio_meta = 'promedio_meta_' + vm.dessertsOculto[x].equipo_id
          obj[periodo] = vm.dessertsOculto[x].Periodo
          obj[mes] = vm.dessertsOculto[x].mes
          obj[mtbf] = vm.dessertsOculto[x].promedio_real.toFixed(2) + ' Hrs'
          obj[promedio_meta] = vm.Target + ' Hrs'
          obj['equipo'] = vm.dessertsOculto[x].equipo
          obj['promedio_hide'] = vm.dessertsOculto[x].promedio_real.toFixed(2)
          contenido.push(obj)
        }
        vm.desserts = contenido
      }
      if (vm.optSelected === 3) {
        vm.headersDEQ = []
        vm.desserts = []
        const contenido = []
        vm.headersDEQ.push({ text: 'PERIODO', align: 'left', value: 'Periodo', width: 150, class: ['blue-grey darken-2', 'white--text'] })
        vm.headersDEQ.push({ text: 'MES', value: 'mes', width: 150, class: ['blue-grey darken-2', 'white--text'] })
        for (let i = 0; i < vm.tiposVehiculo.length; i ++) {
          vm.headersDEQ.push({ text: 'PROM REAL ' + vm.tiposVehiculo[i].tipovehiculo_nombre, value: 'mtbf_' + vm.tiposVehiculo[i].tipovehiculo_id, width:305, class: ['blue-grey darken-2', 'white--text'] })
          vm.headersDEQ.push({ text: 'PROM META ' + vm.tiposVehiculo[i].tipovehiculo_nombre, value: 'promedio_meta_' + vm.tiposVehiculo[i].tipovehiculo_id, width:240, class: ['blue-grey darken-2', 'white--text'] })
        }
        vm.getUniquedataAnios()
        vm.getUniquedataTipoVehiculo()
        vm.getUniquedataMes()
        var totalxLinea = 0 //
        for (let x = 0; x < vm.lAnios.length; x++) {
          for (let y = 0; y < vm.lmeses.length; y++) {
            for (let z = 0; z < vm.ltipos_vehiculo.length; z++) {
              let allDataSuma = vm.dessertsOculto.filter((item) => {
                if (item.Periodo === vm.lAnios[x] && item.mes === vm.lmeses[y] && item.MantenibleNombre === vm.ltipos_vehiculo[z]) {
                  return item.promedio_real
                }
              })
              if (allDataSuma.length === 0) {
                totalxLinea = 0
                var promedio = 0
                var promedio_standard = vm.Target  
              } else {
                totalxLinea = allDataSuma.reduce((accumulator, allDataSuma) => {
                  accumulator += allDataSuma.promedio_real
                  return accumulator
                }, 0)
                var promedio = (totalxLinea / allDataSuma.length)
                var promedio_standard = vm.Target  
              }
              if(allDataSuma[0].sucursal_id === null ){
                var sucursal = '00'
                var sucursal_name = 'SIN ASIGNAR'
              } else {
                var sucursal = allDataSuma[0].tipoMantenibleID
                var sucursal_name = allDataSuma[0].MantenibleNombre
              }
              const obj = []
              const periodo = 'Periodo'
              const mes = 'mes'
              const mtbf = 'mtbf_' + allDataSuma[0].tipoMantenibleID
              const promedio_meta = 'promedio_meta_' + allDataSuma[0].tipoMantenibleID
              obj[periodo] = vm.dessertsOculto[x].Periodo
              obj[mes] = allDataSuma[0].mes
              obj[mtbf] = promedio.toFixed(2) + ' Hrs'
              obj[promedio_meta] = vm.Target + ' Hrs'
              obj['sucursal'] = sucursal_name
              obj['promedio_hide'] = promedio.toFixed(2)
              obj['tipo_mantenible'] = allDataSuma[0].MantenibleNombre
              contenido.push(obj)
              /*vm.desserts.push({
                'Periodo': vm.lAnios[x],//
                'mes': vm.lmeses[y],
                'promedio_real': promedio,
                'promedio_meta': promedio_standard
              })*/
            }//Fin proyectos
          }//Fin meses
        }//Fin anios
        vm.desserts = contenido
      }
    },
    generaGraficaCM () {
      const vm = this
      vm.labelDialogChart = 'Costos de Mantenimiento'
      if (vm.optSelected === null) {
        vm.labelsData = ['SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE', 'ENERO', 'DICIEMBRE', 'ENERO']
        vm.dataInfo = [ //
          { 'Periodo': 2019, 'cantidad': 9500 }
        ]
      }
      if (vm.optSelected === 1) {
        vm.labelsData = ['MO SEPTIEMBRE', 'MO OCTUBRE', 'MO NOVIEMBRE', 'MO DICIEMBRE', 'MO ENERO', 'REFAC DICIEMBRE', 'REFAC ENERO']
        vm.dataInfo = [ //
          { 'Periodo': 2019, 'cantidad': 9500 }
        ]
      }
      if (vm.optSelected === 2) {
        vm.labelsData = ['ALPHA SEPTIEMBRE', 'TORNADO SEPTIEMBRE', 'ALPHA OCTUBRE', 'TORNADO OCTUBRE', 'ALPHA NOVIEMBRE', 'TORNADO NOVIEMBRE', 'ALPHA DICIEMBRE', 'TORNADO DICIEMBRE', 'ALPHA ENERO', 'TORNADO ENERO']
        vm.dataInfo = [ //
          { 'Periodo': 2019, 'cantidad': 9500 }
        ]
      }
      vm.dialogChartBar = true
      setTimeout(function () {
        vm.refreshBarChart()
      }, 250)
    },
    infoDinamicaCM () {
      const vm = this
      if (vm.optSelected === 1) {
        vm.headersCM = []
        vm.dessertsCM = []
        vm.headersCM.push({ text: 'PERIODO', align: 'left', value: 'Periodo' })
      }

      if (vm.optSelected === 2) {
        vm.headersCM = []
        vm.dessertsCM = []
        vm.headersCM.push({ text: 'PERIODO', align: 'left', value: 'Periodo' })
      }
    },
    getEmpresa () {
      const empresaID = this.$nuxt._route.query.id
      return empresaID
    },
    getTimeZone () {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      return timeZone
    },
    getSucursales () {
      const vm = this
      unirest('POST', vm.url + '/api/Reportes/ConsultarSucursales')
        .send({ 'EmpresaID': vm.getEmpresa() })//
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.proyectos = res.body.obj//
        })
    },
    getVehiculos () {
      const vm = this
      unirest('POST', vm.url + '/api/Reportes/ConsultarMantenibles')
        .send({ 'EmpresaID': vm.getEmpresa() })
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.vehiculosEmpresa = res.body.obj//
        })
    },
    getTiposVehiculo () {
      const vm = this
      unirest('POST', vm.url + '/api/Reportes/ConsultarTipoVehiculos')
        .send({ 'EmpresaID': vm.getEmpresa() })
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.tiposVehiculo = res.body.obj//
        })
    },
    getReportexFiltroFechas () {
      const vm = this
      vm.desserts = []
      vm.dessertsOculto = []
      vm.labelsData = []
      vm.dataInfo = []
      vm.optSelected = null
      vm.overlay = true
      unirest('POST', vm.url + '/api/Reportes/DisponibilidaVehiculo')
        .send({ 'EmpresaID': vm.getEmpresa(),'FechaInicio': vm.fini_r3,
          'FechaFin': vm.ffin_r3,
          'TimeZone': vm.getTimeZone()})//
        .end(function (res) {//
          if (res.error) { throw new Error(res.error) }
          vm.overlay = false
          vm.responseReporte = res.body.obj
          for (let i = 0; i < vm.responseReporte.length; i++) {
            if (vm.responseReporte[i].sucursal_id === null) {
              var sucursal = 'SIN ASIGNAR'
              var sucursal_id = 0
            } else {
              var sucursal = vm.responseReporte[i].sucursal_nombre
              var sucursal_id = vm.responseReporte[i].sucursal_id
            }
            vm.dessertsOculto.push({ 'Periodo': vm.responseReporte[i].Anio,
              'mes': vm.mesesAll[vm.responseReporte[i].Mes - 1],
              'promedio_real': vm.responseReporte[i].Total_Promedio_Real,
              'promedio': vm.responseReporte[i].horas_promedio_uso,
              'sucursal_id': sucursal_id,
              'sucursal': sucursal,
              'proyecto': sucursal,
              'equipo': vm.responseReporte[i].mantenible_nombre,
              'equipo_id': vm.responseReporte[i].mantenible_id,
              'tipoMantenibleID': vm.responseReporte[i].tipoMantenible_id,
              'MantenibleNombre': vm.responseReporte[i].tipoMantenible_nombre
            })
          }
          vm.getUniquedataAnios()
          vm.getUniquedataSucursal()
          vm.getUniquedataMes()
          var totalxLinea = 0 //
          for (let x = 0; x < vm.lAnios.length; x++) {
            for (let y = 0; y < vm.lmeses.length; y++) {
              let allDataSuma = vm.dessertsOculto.filter((item) => {
                if (item.Periodo === vm.lAnios[x] && item.mes === vm.lmeses[y]) {
                  return item.promedio_real
                }
              })
              if (allDataSuma.length === 0){
                totalxLinea = 0
                var promedio = 0
                var promedio_standard = vm.Target
              } else {
                totalxLinea = allDataSuma.reduce((accumulator, allDataSuma) => {
                  accumulator += allDataSuma.promedio_real
                  return accumulator
                }, 0)
                var promedio = (totalxLinea/ allDataSuma.length)
                var promedio_standard = vm.Target
              }
              vm.desserts.push({ 'Periodo': vm.lAnios[x],
                'mes': vm.lmeses[y],
                'promedio_real': promedio.toFixed(2),
                'promedio_meta': vm.Target
              })
            }
          }
          // vm.desserts =  vm.dessertsOculto
        })
    },
    getUniquedataAnios () {
      const vm = this
      const distinto = (valor, indice, self) => {
        return self.indexOf(valor) === indice
      }
      const allAnios = vm.dessertsOculto.map((item) => {
        return item.Periodo
      })
      vm.lAnios = allAnios.filter(distinto)
    },
    getUniquedataSucursal () {
      const vm = this
      const distinto = (valor, indice, self) => {
        return self.indexOf(valor) === indice
      }
      const allData = vm.dessertsOculto.map((item) => {
        return item.proyecto
      })
      vm.lProyectos = allData.filter(distinto)
    },
    getUniquedataMes () {
      const vm = this
      const distinto = (valor, indice, self) => {
        return self.indexOf(valor) === indice
      }
      const allData = vm.dessertsOculto.map((item) => {
        return item.mes
      })
      vm.lmeses = allData.filter(distinto)
    },
    getUniquedataTipoVehiculo () {
      const vm = this
      const distinto = (valor, indice, self) => {
        return self.indexOf(valor) === indice
      }
      const allData = vm.dessertsOculto.map((item) => {
        return item.MantenibleNombre
      })
      vm.ltipos_vehiculo = allData.filter(distinto)
    }
  },
  computed: {
    computedInicio () {
      return this.formatoFecha(this.fini_r3)
    },
    computedFin () {
      return this.formatoFecha(this.ffin_r3)
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
  },
  mounted () {
    window.vm = this
    window.vm.getSucursales()
    window.vm.getVehiculos()
    window.vm.getTiposVehiculo()
  }
}
</script>
