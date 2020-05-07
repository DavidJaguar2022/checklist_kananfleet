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
                    <v-btn @click="generaGrafica" small dark color="blue-grey lighten-1"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> Generar Gráfica </v-btn>
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

        </v-tab-item>
        <v-tab-item
          :key="4"
          :value="'tab-4'"
        >
          <v-card flat>
            <v-card-text>
              <div class="subtitle-1">
                Reporte de Disponibilidad del Equipo
                <hr class="my-3">
              </div>
              <v-layout row wrap>
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
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
                                  v-model="fini_r3"
                                  label="Fecha de salida"
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
                <v-flex xs2 sm2 md2 style="margin-left: 1%;">
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
                                  v-model="ffin_r3"
                                  label="Fecha de salida"
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
                <v-flex xs3 sm3 md3>
                  <div style="margin-left: 3%; margin-top: 5%;">
                    <v-btn small color="primary"><v-icon>mdi-magnify</v-icon>Buscar </v-btn>
                    <v-btn @click="generaGraficaDispEquipo" small dark color="blue-grey lighten-1"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> Generar Gráfica </v-btn>
                  </div>
                </v-flex>
              </v-layout>
              <v-data-table
                      :headers="headersDEQ"
                      :items="dessertsDEQ"
                      item-key="name"
                      dense
                      group-by="Periodo"
                      class="elevation-1"
                      hide-default-footer
              ></v-data-table>
            </v-card-text>
          </v-card>
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
          <div class="headline" style="color: #000;">
            Vale del Empleado
            <hr class="my-3">
          </div>
          <div class="headline" style="color: #000;">
            Vale del Empleado
            <hr class="my-3">
          </div>
          <v-layout row wrap>
            <v-flex xs12 sm12 md2 style="margin-left: 1%;">
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
                              v-model="computedInicio"
                              label="Fecha Inicial"
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
            <v-flex xs12 sm12 md2 style="margin-left: 1%;">
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
                              v-model="computedFin"
                              label="Fecha Final"
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
            <v-flex xs12 sm12 md2 style="margin-left: 1%;" d-none>
              <v-autocomplete
                      v-model="optSelected"
                      label="Opciones"
                      :items="listaOpciones"
                      item-text="tipo"
                      item-value="id"
                      prepend-icon="mdi-settings"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm12 md5>
              <div style="margin-left: 3%; margin-top: 5%;">
                <v-btn @click="getReportexFiltroFechas" small color="primary"><v-icon>mdi-magnify</v-icon>Buscar </v-btn>
                <v-btn @click="generaGraficaUsoPromedio" class="d-none" small dark color="blue-grey lighten-1"><v-icon>mdi-chart-bell-curve-cumulative</v-icon> Generar Gráfica </v-btn>
                <v-btn @click="descargaReporte" small dark color="success"><v-icon>mdi-download</v-icon> Descargar</v-btn>
              </div>
            </v-flex>
          </v-layout>
          <v-data-table
                  :headers="headersTPA"
                  :items="desserts"
                  dense
                  class="elevation-1"
                  no-data-text="No hay datos para mostrar"
                  :items-per-page="1000"
                  hide-default-footer
          >
            <template v-slot:item.action="{ item }">
              <v-icon
                      small
                      class="mr-2"
                      color="#1A237E"
                      @click="ValeHerramientas(item)"
              >
                mdi-hammer-wrench
              </v-icon>
              <v-icon
                      small
                      color="#1A237E"
                      class="mr-2"
                      @click="ValeRefacciones(item)"
              >
                mdi-cogs
              </v-icon>
            </template>
          </v-data-table>
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
            width="70%"
    >
      <v-card>
        <v-card-title
                class="headline grey lighten-2"
                primary-title
        >
          {{labelDialogChart}}
        </v-card-title>

        <v-card-text black>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <span class="body-1 font-weight-black"><v-icon>mdi-calendar-range</v-icon> Fecha:</span> <span class="body-1">{{fechaVale}}</span>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <span class="body-1 font-weight-black"><v-icon>mdi-map-marker</v-icon> Ubicación:</span> <span class="body-1">{{UbicacionVale}}</span>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <span class="body-1 font-weight-black"><v-icon>mdi-car</v-icon>Equipo:</span> <span class="body-1">{{idEqVale}}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                    v-model="HorasVale"
                    label="Horas"
                    prepend-icon="mdi-clock-outline"
                    hint="Ingrese el número de horas"
            ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                      v-model="KmVale"
                      label="Km"
                      prepend-icon="mdi-speedometer"
                      hint="Ingrese el kilometraje"
              ></v-text-field>
            </v-col>
          </v-row>
          <span class="subtitle-1 font-weight-black">Detalle del Vale</span>
          <v-data-table
                  :headers="HeaderVale"
                  :items="ItemsVale"
                  dense
                  class="elevation-1"
                  :items-per-page="1000"
                  hide-default-footer
          >
            <template v-slot:item.action="{ item }">
              <v-icon
                      small
                      class="mr-2"
                      color="#1A237E"
                      @click="EditarItem(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-autocomplete
                      v-model="recibio"
                      label="Recibió"
                      :items="mecanicos"
                      item-text="Nombre"
                      item-value="Empleadoid"
                      hint="Elija Quién recibió"
                      prepend-icon="mdi-account"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-autocomplete
                      v-model="aprobo"
                      label="Aprobó"
                      :items="aprobador"
                      item-text="Nombre"
                      item-value="Empleadoid"
                      hint="Elija Quién Aprobó"
                      prepend-icon="mdi-account"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-autocomplete
                      v-model="entrego"
                      label="Entregó"
                      :items="validador"
                      item-text="Nombre"
                      item-value="Empleadoid"
                      hint="Elija Quién Entregó"
                      prepend-icon="mdi-account"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  color="black"
                  text
                  @click="printFormato"
          >
           <v-icon>mdi-printer</v-icon> Imprimir
          </v-btn>
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
    <v-dialog v-model="modalEdit" persistent max-width="290">
      <v-card>
        <v-card-title>
          <span class="title">Mensaje del sistema</span>
        </v-card-title>
        <v-card-text>
          <p class="body-2 text-md-center">Ingrese la nueva cantidad Surtida</p>
          <v-text-field
                  v-model="cantidadSurtirVale"
                  label="Cantidad a Surtir"
                  prepend-icon="mdi-checkbox-marked-circle"
                  hint="Ingrese la cantidad surtida"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" dark text @click="guardarCambios">Guardar</v-btn>
          <v-btn color="red darken-1" dark text @click="modalEdit = false">Cancelar</v-btn>
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
        { 'id': 1, 'tipo': 'Proyecto' },
        { 'id': 2, 'tipo': 'Equipo' }
      ],
      HeaderVale: [
        { text: 'Cantidad Solicitada', align: 'left', value: 'Cantidad' },
        { text: 'Unidad de Medida', value: 'UnidadMedida' },
        { text: 'Código', value: 'Codigo' },
        { text: 'Descripción', value: 'Nombre' },
        { text: 'Cantidad Entregada', value: 'cantidadEntregada' },
        { text: 'Opciones', value: 'action', sortable: false }
      ],
      ItemsVale: [],
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
        { Periodo: '2020', mes: 'ENERO', filos: 10, san_julian: 15, totales: 25 },
        { Periodo: '2020', mes: 'FEBRERO', filos: 20, san_julian: 10, totales: 30 },
        { Periodo: '2019', mes: 'MARZO', filos: 25, san_julian: 17, totales: 32 },
        { Periodo: '2020', mes: 'ABRIL', filos: 30, san_julian: 28, totales: 58 },
        { Periodo: '2019', mes: 'NOVIEMBRE', filos: 37, san_julian: 26, totales: 53 },
        { Periodo: '2020', mes: 'NOVIEMBRE', filos: 29, san_julian: 19, totales: 48 },
        { Periodo: '2019', mes: 'DICIEMBRE', filos: 40, san_julian: 27, totales: 67 },
        { Periodo: '2020', mes: 'DICIEMBRE', filos: 12, san_julian: 37, totales: 49 }
      ],
      headersTPA: [
        { text: 'FOLIO', value: 'Folio', class: ['blue-grey darken-2', 'white--text'] },
        { text: 'COSTO', value: 'Costo', class: ['blue-grey darken-2', 'white--text'] },
        { text: 'ESTATUS', value: 'EstatusOrden.Nombre', class: ['blue-grey darken-2', 'white--text'] },
        { text: 'FECHA', value: 'f_formateada', class: ['blue-grey darken-2', 'white--text'] },
        { text: 'DESCRIPCION', value: 'Descripcion', class: ['blue-grey darken-2', 'white--text'] },
        { text: 'OPCIONES', value: 'action', sortable: false, class: ['blue-grey darken-2', 'white--text'] }
      ],
      dessertsTPA: [
      ],
      labelDialogChart: '',
      headersDEQ: [
      ],
      dessertsDEQ: [
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
      urlTest: 'http://webapifdt.administraflotilla.com',
      url: 'http://webapiandroidtest.administraflotilla.com',
      overlay: false,
      msjException: false,
      msjAlerta: '',
      mesesAll: ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'],
      title: 'Reportes',
      fechaVale: '',
      UbicacionVale: '',
      idEqVale: '',
      HorasVale: 0,
      KmVale: 0,
      cantidadSurtirVale: null,
      modalEdit: false,
      itemEditando: [],
      itemPrint: [],
      recibio: '---',
      aprobo: '---',
      entrego: '---',
      empleados: [],
      mecanicos: [],
      validador: [],
      aprobador: [],
      dessertPrint: []
    }
  },
  methods: {
    getEmpleados () {
      const vm = this
      unirest('GET', vm.url + '/api/EmpleadoUsuario/GetAllEmpleadosByEmpresaID/' + vm.getEmpresa())
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.empleados = res.body
        })
    },
    getEmpleadosMecanicos () {
      const vm = this
      unirest('POST', vm.url + '/api/Reportes/GetMecanico'  )
        .send({ 'EmpresaID': vm.getEmpresa() })//
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.mecanicos = res.body.empleado
        })
    },
    getEmpleadosValidadores () {
      const vm = this
      unirest('POST', vm.url + '/api/Reportes/GetValidador'  )
      .send({ 'EmpresaID': vm.getEmpresa() })//
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.validador = res.body.empleado
        })
    },
    getEmpleadosAprobadores () {
      const vm = this
      unirest('POST', vm.url + '/api/Reportes/GetAprobador' )
      .send({ 'EmpresaID': vm.getEmpresa() })//
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.aprobador = res.body.empleado
        })
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
      for(var i =  0; i < vm.desserts.length; i++) {
        const obj = []
        obj['FOLIO'] = vm.desserts[i].Folio
        obj['COSTO'] = vm.desserts[i].Costo
        obj['ESTATUS'] = vm.desserts[i].EstatusOrden.Nombre
        obj['FECHA'] = vm.desserts[i].f_formateada
        obj['DESCRIPCION'] = vm.desserts[i].Descripcion
        vm.dessertPrint.push(obj)
      }
      let data = XLSX.utils.json_to_sheet(vm.dessertPrint)
      const workbook = XLSX.utils.book_new()
      const filename = 'Vale_De_Empleado'
      XLSX.utils.book_append_sheet(workbook, data, filename)
      XLSX.writeFile(workbook, `${filename}.xlsx`)
    },
    ValeHerramientas (item) {
      const vm = this
      vm.ItemsVale = []
      vm.KmVale = 0
      vm.HorasVale = 0
      const DetHerramientas = item.HerramientasDto
      if (DetHerramientas.length === 0) {
        vm.msjException = true
        vm.msjAlerta = 'No existen Herramientas para mostrar'
        return false
      }
      for (var i = 0; i < DetHerramientas.length; i++){
        vm.ItemsVale.push({'Cantidad': DetHerramientas[i].Cantidad, 'UnidadMedida': 'PIEZA_ADDON', 'Codigo': DetHerramientas[i].CodigoHerramienta, 'cantidadEntregada': 0, 'Nombre': DetHerramientas[i].HerramientaDesc})
      }
      vm.dialogChartBar = true
      vm.labelDialogChart = 'Vale de Salida de Herramientas'
      vm.fechaVale = new Date(item.Fecha).toISOString().slice(0, 10)
      vm.UbicacionVale = item.SucursalOrden.Direccion
      vm.idEqVale = item.DetalleOrdenDto[0].NombreMantenible
      vm.itemPrint = item
    },
    ValeRefacciones (item) {
      const vm = this
      vm.ItemsVale = []
      vm.KmVale = 0
      vm.HorasVale = 0
      const DetRefacciones = item.RefaccionesDto
      if (DetRefacciones.length === 0) {
        vm.msjException = true
        vm.msjAlerta = 'No existen Refacciones para mostrar '
        return false
      }
      for (var i = 0; i < DetRefacciones.length; i++){
        vm.ItemsVale.push({'Cantidad': DetRefacciones[i].Cantidad, 'UnidadMedida': 'PIEZA_ADDON', 'Codigo': DetRefacciones[i].Codigo, 'cantidadEntregada': 0, 'Nombre': DetRefacciones[i].Nombre })
      }
      vm.dialogChartBar = true
      vm.labelDialogChart = 'Vale de Salida de Almacén'
      vm.fechaVale = new Date(item.Fecha).toISOString().slice(0, 10)
      vm.UbicacionVale = item.SucursalOrden.Direccion
      vm.idEqVale = item.DetalleOrdenDto[0].NombreMantenible
      vm.itemPrint = item
    },
    EditarItem (item) {
      const vm = this
      vm.cantidadSurtirVale = item.cantidadEntregada
      vm.itemEditando = item
      vm.modalEdit = true
    },
    guardarCambios () {
      const vm = this
      var indexItem = vm.ItemsVale.indexOf(vm.itemEditando)
      vm.ItemsVale[indexItem].cantidadEntregada = vm.cantidadSurtirVale
      vm.cantidadSurtirVale = 0
      vm.itemEditando = []
      vm.modalEdit = false
    },
    printFormato () {
      const vm = this
      if(vm.itemPrint.length === 0) {
        vm.msjException = true
        vm.msjAlerta = 'Elija un vale para poder imprimir'
        return false
      }
      vm.fechaVale = new Date(vm.itemPrint.Fecha).toISOString().slice(0, 10)
      vm.UbicacionVale = vm.itemPrint.SucursalOrden.Direccion
      vm.idEqVale = vm.itemPrint.DetalleOrdenDto[0].NombreMantenible
      var hrs_format = parseInt(vm.HorasVale)
      var km_format = parseInt(vm.KmVale)
      var detalle = ''
      var complementoLines = ''
      for (var i = 0; i < vm.ItemsVale.length; i++) {
        detalle += '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">' +vm.ItemsVale[i].Cantidad+ '</td>' +
        '<td style="border: 1px solid #ddd;">' +vm.ItemsVale[i].UnidadMedida+ '</td>' +
        '<td style="border: 1px solid #ddd;">' +vm.ItemsVale[i].Codigo+ '</td>' +
        '<td style="border: 1px solid #ddd;">' +vm.ItemsVale[i].Nombre+ '</td>' +
        '<td style="border: 1px solid #ddd;">' +vm.ItemsVale[i].cantidadEntregada+ '</td>' +
        '</tr>'
      }
      if(vm.ItemsVale.length < 10) {
        var noLineasExtra = 10 - vm.ItemsVale.length
        for(var x = 0; x < noLineasExtra; x++) {
          complementoLines += '<tr style="border: 1px solid #ddd;">' +
            '<td style="border: 1px solid #ddd;">&nbsp</td>' +
            '<td style="border: 1px solid #ddd;">&nbsp</td>' +
            '<td style="border: 1px solid #ddd;">&nbsp</td>' +
            '<td style="border: 1px solid #ddd;">&nbsp</td>' +
            '<td style="border: 1px solid #ddd;">&nbsp</td>' +
            '</tr>'
        }
      }
      var formatoPrint = '<div style="text-align: center; margin-top: 30px; font-family: verdana;"><h3>' + vm.labelDialogChart + '</h3></div>' +
        '<h4 style="margin-top: -40px; margin-left: 580px; color: #FF0000; font-family: verdana;">FOLIO: ' + vm.itemPrint.Folio + '</h4>' +
        '<table style="border-collapse: collapse; font-size: 13px; width: 100%; margin-top: -1px;  font-family: verdana;">' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd; text-align: right;">FECHA </td>' +
        '<td style="border: 1px solid #ddd;" colspan="5"> ' + vm.fechaVale + '</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd; text-align: right;">UBICACION </td>' +
        '<td style="border: 1px solid #ddd;" colspan="5"> ' + vm.UbicacionVale + '</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd; text-align: right;">ID EQUIPO </td>' +
        '<td style="border: 1px solid #ddd;" colspan="5"> ' + vm.idEqVale + '</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd; text-align: right;">HORAS </td>' +
        '<td style="border: 1px solid #ddd;" colspan="2"> ' + hrs_format.toLocaleString('en-IN') + '</td>' +
        '<td style="border: 1px solid #ddd; text-align: right;">KM </td>' +
        '<td style="border: 1px solid #ddd;" colspan="2"> ' + km_format.toLocaleString('en-IN') + '</td>' +
        '</tr>' +
        '</table>' +
        '<h4></h4>' +
        '<table style="border-collapse: collapse; font-size: 13px; width: 100%; text-align: center; margin-top: -1px; font-family: verdana;">' +
        '<tr style="border: 1px solid #ddd; font-weight: bold">' +
        '<td style="border: 1px solid #ddd;">CANTIDAD SOLICITADA</td>' +
        '<td style="border: 1px solid #ddd;">UNIDAD DE MEDIDA</td>' +
        '<td style="border: 1px solid #ddd;">CODIGO</td>' +
        '<td style="border: 1px solid #ddd;">DESCRIPCION</td>' +
        '<td style="border: 1px solid #ddd;">CANTIDAD ENTREGADA</td>' +
        '</tr>' +
        detalle + complementoLines +
        '<table style="font-size: 13px; width: 100%; text-align: left; margin-top: 30px; margin-left: 10px; font-family: verdana;">' +
        '<tr>' +
        '<td>RECIBIO</td>' +
        '<td colspan="5" style="font-weight: bold">' + vm.recibio + '</td>' +
        '<td>FIRMA</td>' +
        '<td colspan="5">__________________________________</td>' +
        '</tr>' +
        '<tr>' +
        '<td>APROBO</td>' +
        '<td colspan="5" style="font-weight: bold">' + vm.aprobo + '</td>' +
        '<td>FIRMA</td>' +
        '<td colspan="5">__________________________________</td>' +
        '</tr>' +
        '<tr>' +
        '<td>ENTREGO</td>' +
        '<td colspan="5" style="font-weight: bold">' + vm.entrego + '</td>' +
        '<td>FIRMA</td>' +
        '<td colspan="5">__________________________________</td>' +
        '</tr>' +
        '</table>'

      const newWin = window.open('')
      newWin.document.write(formatoPrint)
      setTimeout(function () {
        newWin.print()
        newWin.close() //
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
    generaGrafica () {
      const vm = this
      if (vm.optSelected === null) {
        vm.labelsData = ['ENERO 2019', 'MARZO 2019', 'ABRIL 2019', 'NOVIEMBRE 2019', 'DICIEMBRE 2019', 'ENERO 2020']
        vm.dataInfo = [ //
          { 'Periodo': 2019, 'cantidad': 40 },
          { 'Periodo': 2019, 'cantidad': 20 },
          { 'Periodo': 2019, 'cantidad': 12 },
          { 'Periodo': 2019, 'cantidad': 39 },
          { 'Periodo': 2019, 'cantidad': 10 },
          { 'Periodo': 2020, 'cantidad': 0 },
          { 'Periodo': 2020, 'cantidad': 0 },
          { 'Periodo': 2020, 'cantidad': 0 },
          { 'Periodo': 2020, 'cantidad': 0 },
          { 'Periodo': 2020, 'cantidad': 20 },
          { 'Periodo': 2020, 'cantidad': 40 }
        ]
        setTimeout(function () {
          vm.refreshGrafica()
        }, 250)
      }
      if (vm.optSelected === 1) {
        vm.labelsData = []
        vm.dataInfo = []
        vm.labelsData = ['ENERO 2019 FILOS', 'ENERO 2019 SAN JULIAN', 'ABRIL 2019 FILOS', 'ABRIL 2019 SAN JULIAN', 'ENERO 2020 FILOS', 'ENERO 2020 SAN JULIAN']
        vm.dataInfo = [ //
          { 'Periodo': 2019, 'cantidad': 40 },
          { 'Periodo': 2019, 'cantidad': 20 },
          { 'Periodo': 2019, 'cantidad': 12 },
          { 'Periodo': 2019, 'cantidad': 39 },
          { 'Periodo': 2019, 'cantidad': 10 },
          { 'Periodo': 2020, 'cantidad': 3 },
          { 'Periodo': 2020, 'cantidad': 10 },
          { 'Periodo': 2020, 'cantidad': 6 },
          { 'Periodo': 2020, 'cantidad': 9 },
          { 'Periodo': 2020, 'cantidad': 20 },
          { 'Periodo': 2020, 'cantidad': 40 }
        ]
        setTimeout(function () {
          vm.refreshGrafica()
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
          vm.refreshGrafica()
        }, 250)
      }
      vm.dialogChart = true
    },
    refreshGrafica () {
      const vm = this
      vm.$refs.lineBar.generaGrafica()
      vm.optSelected = null
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
    getUniqueLabels () {
      const vm = this
      const distinto = (valor, indice, self) => {
        return self.indexOf(valor) === indice
      }
      const allData = vm.desserts.map((item) => {
        return item.equipo
      })
      vm.labelsData = allData.filter(distinto)
    },
    generaGraficaUsoPromedio () {
      const vm = this
      if (vm.desserts.length === 0) {
        vm.msjException = true
        vm.msjAlerta = 'Debe de realizar una búsqueda para poder graficar'
        return false
      }
      vm.labelDialogChart = 'Uso Promedio del Activo'
      vm.dialogChartBar = true
      vm.getUniqueLabels()
      for (let i = 0; i < vm.desserts.length; i++) {
        for (let x = 0; x < vm.labelsData.length; x++) {
         if(vm.labelsData[x] === vm.desserts[i].equipo) {
           vm.dataInfo.push({ 'Periodo': vm.desserts[i].equipo, 'cantidad': vm.desserts[i].promedio })
         } else {
           vm.dataInfo.push({ 'Periodo': vm.labelsData[i], 'cantidad': 0 })
         }
        }
      }
      setTimeout(function () {
        vm.refreshBarChart()
      }, 250)
    },
    generaGraficaDispEquipo () {
      const vm = this
      vm.labelDialogChart = 'Disponibilidad de Equipo'
      if (vm.optSelected === null) {
        vm.labelsData = ['SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE', 'ENERO']
        vm.dataInfo = [ //
          { 'Periodo': 2019, 'cantidad': 0.825 }
        ]
      }
      if (vm.optSelected === 1) {
        vm.labelsData = ['FILOS SEPTIEMBRE', 'FILOS OCTUBRE', 'SAN JULIAN SEPTIEMBRE', 'SAN JULIAN OCTUBRE', ' FILOS SEPTIEMBRE', 'FILOS OCTUBRE']
        vm.dataInfo = [ //
          { 'Periodo': 2019, 'cantidad': 0.825 }
        ]
      }
      if (vm.optSelected === 2) {
        vm.labelsData = ['TR-01 SEP', 'TR-01 FILOS OCT', 'TR-01 SAN J. SEP', 'TR-02 SAN J. OCT', 'TR-03 FILOS SEPT', 'TR-04 FILOS DIC', 'TR-05 FILOS DIC']
        vm.dataInfo = [ //
          { 'Periodo': 2019, 'cantidad': 0.825 }
        ]
      }
      vm.dialogChartBar = true
      setTimeout(function () {
        vm.refreshBarChart()
      }, 250)
    },
    generaInfoDinamica () {
      const vm = this
      if (vm.optSelected === 1) {
        vm.headersDEQ = []
        vm.dessertsDEQ = []
        vm.headersDEQ.push({ text: 'PERIODO', align: 'left', value: 'Periodo' })
        vm.headersDEQ.push({ text: 'MES', value: 'mes' })
        vm.headersDEQ.push({ text: 'PROMEDIO META FILOS', value: 'meta_filos' })
        vm.headersDEQ.push({ text: 'PROMEDIO REAL FILOS', value: 'real_filos' })
        vm.headersDEQ.push({ text: 'PROMEDIO META SAN JULIAN', value: 'meta_san_julian' })
        vm.headersDEQ.push({ text: 'PROMEDIO REAL SAN JULIAN', value: 'real_san_julian' })
      }
      if (vm.optSelected === 2) {
        vm.headersDEQ = []
        vm.dessertsDEQ = []
        vm.headersDEQ.push({ text: 'PERIODO', align: 'left', value: 'Periodo' })
        vm.headersDEQ.push({ text: 'MES', value: 'mes' })
        vm.headersDEQ.push({ text: 'META FILOS TR-01', value: 'tr_1' })
        vm.headersDEQ.push({ text: 'PROM FILOS TR-01', value: 'tr_2' })
        vm.headersDEQ.push({ text: 'PROM FILOS', value: 'totales_filos' })
        vm.headersDEQ.push({ text: 'META SAN JULIAN TR-01', value: 'tr_4' })
        vm.headersDEQ.push({ text: 'PROM SAN JULIAN TR-02', value: 'tr_5' })
        vm.headersDEQ.push({ text: 'PROM SAN JULIAN', value: 'totales_sn' })
      }
    },
    generaGraficaCM () {
      const vm = this
      vm.labelDialogChart = 'Costos de Mantenimiento'
      if (vm.optSelected === null) {
        vm.labelsData = ['SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE', 'ENERO', 'DICIEMBRE', 'ENERO']
        vm.dataInfo = [ //
          { 'Periodo': 2019, 'cantidad': 9500 },
          { 'Periodo': 2019, 'cantidad': 8000 },
          { 'Periodo': 2019, 'cantidad': 10500 },
          { 'Periodo': 2019, 'cantidad': 1100 },
          { 'Periodo': 2019, 'cantidad': 9000 },
          { 'Periodo': 2019, 'cantidad': 4000 },
          { 'Periodo': 2019, 'cantidad': 6000 },
          { 'Periodo': 2019, 'cantidad': 1 }
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
        vm.headersCM.push({ text: 'MES', value: 'mes' })
        vm.headersCM.push({ text: 'COSTO MO FILOS', value: 'mo_filos' })
        vm.headersCM.push({ text: 'COSTO MO SAN JULIAN', value: 'mo_sn' })
        vm.headersCM.push({ text: 'COSTO REFAC FILOS', value: 'refac_filos' })
        vm.headersCM.push({ text: 'COSTO REFAC SAN JULIAN', value: 'refac_sn' })
        vm.headersCM.push({ text: 'COSTO TOTAL MO', value: 'total_mo' })
        vm.headersCM.push({ text: 'COSTO TOTAL SAN JULIAN', value: 'total_sn' })
      }

      if (vm.optSelected === 2) {
        vm.headersCM = []
        vm.dessertsCM = []
        vm.headersCM.push({ text: 'PERIODO', align: 'left', value: 'Periodo' })
        vm.headersCM.push({ text: 'MES', value: 'mes' })
        vm.headersCM.push({ text: 'C. MO ALPHA FILOS', value: 'mo_filos' })
        vm.headersCM.push({ text: 'C. MO TORNADO FILOS', value: 'mo_filos' })
        vm.headersCM.push({ text: 'C. REFAC ALPHA FILOS', value: 'refac_filos' })
        vm.headersCM.push({ text: 'C. REFAC TORNADO FILOS', value: 'refac_sn' })
        vm.headersCM.push({ text: 'C. MO ALPHA SJ', value: 'mo_filos' })
        vm.headersCM.push({ text: 'C. MO TORNADO SJ', value: 'mo_filos' })
        vm.headersCM.push({ text: 'C. REFAC ALPHA SJ', value: 'refac_filos' })
        vm.headersCM.push({ text: 'C. REFAC TORNADO SJ', value: 'refac_sn' })
        vm.headersCM.push({ text: 'C. TOTAL MO', value: 'total_mo' })
        vm.headersCM.push({ text: 'C. TOTAL SAN JULIAN', value: 'total_sn' })
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
    getReportexFiltroFechas () {
      const vm = this
      vm.desserts = []
      vm.dessertsOculto = []
      vm.labelsData = []
      vm.dataInfo = []
      vm.optSelected = null
      vm.overlay = true
      unirest('POST', vm.url + '/api/OrdenServicio/Consultar')
        .send({ 'EmpresaID': vm.getEmpresa(),'FechaInicio': vm.fini_r2,
          'FechaFin': vm.ffin_r2,
          'TimeZone': vm.getTimeZone()})//
        .end(function (res) {//
          if (res.error) { throw new Error(res.error) }
          vm.overlay = false
          vm.responseReporte = res.body
          for (var i = 0; i < res.body.length; i++) {
            vm.responseReporte[i].f_formateada = new Date(res.body[i].Fecha).toISOString().slice(0, 10)
            var cantidad = res.body[i].Costo
            vm.responseReporte[i].Costo = '$' + cantidad.toLocaleString('en-IN')
          }
          vm.desserts =  vm.responseReporte
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
    }
  },
  computed: {
    computedInicio () {
      return this.formatoFecha(this.fini_r2)
    },
    computedFin () {
      return this.formatoFecha(this.ffin_r2)
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
    window.vm.getEmpleados()
    window.vm.getEmpleadosMecanicos();
    window.vm.getEmpleadosValidadores();
    window.vm.getEmpleadosAprobadores();
  }
}
</script>
