/* eslint-disable */
<template>
  <v-layout row wrap>
    <v-layout row wrap>
      <v-navigation-drawer
              v-model="drawer"
              :mini-variant="miniVariant"
              :clipped="clipped"
              app
              color="#f0ab00"
              class="display-3 black--text"
              v-if="logueado"
      >
        <v-list>
          <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :to="item.to"
                  router
                  exact
          >
            <v-list-item-action>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content class="white--text">
              <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon color="white">mdi-power-standby</v-icon>
            </v-list-item-action>
            <v-list-item-content class="white--text" @click="logOut" style="cursor: pointer">
              <v-list-item-title v-text="botonSalir"/>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
              color="black"
              :clipped-left="clipped"
              fixed
              app
              dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="logueado"/>
        <v-btn
                slot="activator"
                @click.stop="miniVariant = !miniVariant"
                icon
        >
          <v-icon v-if="logueado">mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"/>
        <v-spacer />
        <img src="/logo.png" width="12%" max-height="5%" alt="Logo Kananfleet"/>
      </v-app-bar>
    </v-layout>
    <v-flex lg12 md12>
      <div class="headline">
        <v-icon color="black">mdi-clipboard-check</v-icon>Gestión Recepción de Taller
        <hr class="my-3">
      </div>
      <!-- -->
      <v-layout row wrap>
        <v-flex xs12 sm12 lg12 md12>
          <div class="headline" style="margin-left: 1%;">
            <v-icon color="black">mdi-clipboard-check</v-icon>Gestión Recepción de Taller
            <hr class="my-3">
          </div>
        </v-flex>
        <v-flex xs2 sm2 md2 style="margin-left: 1%;" d-none>
        <v-text-field v-model="noInspeccion" label="No de Inspección" hint="Número de inspección" prepend-icon="mdi-clipboard-text"></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md2 style="margin-left: 1%;">
          <v-form
            v-model="valid"
            lazy-validation
          >
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
                          v-model="computedInicio"
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
        <v-flex xs12 sm12 md2 style="margin-left: 1%;">
          <v-form
            v-model="validFinal"
            lazy-validation
          >
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
                          v-model="computedFin"
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
        <v-flex xs12 sm12 md2>
          <v-text-field
                  v-model="search"
                  prepend-icon="mdi-magnify"
                  label="Búsqueda Rápida"
                  single-line
                  hide-details
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <div style="margin-left: 3%; margin-top: 5%;">
            <v-btn @click="searchInspeccion" small color="primary">
              <v-icon>mdi-magnify</v-icon>Buscar
            </v-btn>
            <v-btn @click="agregarInspeccion" small dark color="blue-grey lighten-1">
              <v-icon>mdi-plus-circle-outline</v-icon> Agregar
            </v-btn>
          </div>
        </v-flex>
        <ag-grid-vue
          :columnDefs="columnDefs"
          :rowData="rowData"
          :modules="modules"
          :gridOptions="gridOptions"
          :enableFilter="true"
          :localeText="localeText"
          style="width: 100%; height: 410px; margin-left: 1%;"
          class="ag-theme-blue d-none"
        >
        </ag-grid-vue>
        <v-flex xs12 sm12 md12>
          <v-data-table
                  :headers="Encabezado_Tabla"
                  :items="Detalle_Tabla"
                  :search="search"
                  dense
                  class="elevation-1"
                  items-per-page="500"
                  hide-default-footer
                  no-data-text="No hay registros para mostrar"
          >
            <template v-slot:item.action="{ item }">
              <v-icon
                      small
                      class="mr-2"
                      color="#000"
                      @click="editInspeccion(item)"
              >
                mdi-square-edit-outline
              </v-icon>
              <v-icon
                      small
                      color="#000"
                      class="mr-2"
                      @click="printInspeccion(item)"
              >
                mdi-printer
              </v-icon>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <!-- -->
    </v-flex>
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark color="#607D8B">
              <v-btn @click="dialog = false" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title><v-icon>mdi-plus-circle-outline</v-icon> <span v-show="banderaEdit === 0">Agregar Hoja de Recepción de Taller</span><span v-show="banderaEdit === 1">Editar Hoja de Recepción de Taller</span></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
              </v-toolbar-items>
              <v-btn @click="saveInformacion" dark color="success" v-show="banderaEdit === 0">
                <v-icon>mdi-content-save</v-icon> Guardar
              </v-btn>
              <v-btn @click="editarInspeccion" dark color="success" v-show="banderaEdit === 1">
                <v-icon>mdi-content-save</v-icon> Editar
              </v-btn>
            </v-toolbar>
            <template>
              <v-stepper v-model="e6" vertical>
                <v-stepper-step :complete="e6 > 1" step="1">
                  Datos Generales
                  <!--<small>Summarize if needed</small>-->
                </v-stepper-step>
                <div style="margin-left: 87%; margin-top: -5%; width: 100%"><img src="/logo.png" width="12%" max-height="5%" alt="Logo Kananfleet" id="logoSite"/></div>
                <v-stepper-content step="1">
                  <v-card height="500px">
                    <v-row>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="hojaInspeccionID" label="Hoja de Inspección" hint="Ingrese la Hoja de Inspección" prepend-icon="mdi-clipboard-text" @change="getInspeccionxID"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field v-model="nameCliente" label="Nombre del Cliente" hint="Ingrese el nombre del Cliente" prepend-icon="mdi-account-tie"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field v-model="contrato" label="Contrato" hint="Ingrese el número de contrato" prepend-icon="mdi-file-document"></v-text-field>
                      </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                                  v-model="factura"
                                  label="Factura"
                                  hint="Ingrese el número de factura"
                                  prepend-icon="mdi-file-document-box"
                                  required
                          ></v-text-field>
                        </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                                v-model="vehiculoName"
                                label="Vehiculo"
                                prepend-icon="mdi-car"
                        ></v-text-field>
                      </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                                  v-model="estacionDuenia"
                                  label="Estación Dueña"
                                  hint="Ingrese la estación dueña"
                                  prepend-icon="mdi-domain"
                                  required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="marcaYmodelo" label="Marca y Modelo" :disabled="true" prepend-icon="mdi-car-info"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="descripcion" label="Descripción" :disabled="true" prepend-icon="mdi-car-info"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="placas" label="Placas" :disabled="true" prepend-icon="mdi-car-info"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-autocomplete
                                  v-model="inspectorID"
                                  :items="empleados"
                                  item-text="Nombre"
                                  item-value="EmpleadoID"
                                  label="Inspector de Operaciones"
                                  prepend-icon="mdi-account"
                                  required
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    <v-btn small color="primary" @click="e6 = 2">Siguiente</v-btn>
                  </v-card>
                  <!--<v-btn text>Cancel</v-btn>-->
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 2" step="2">Detalles del Servicio</v-stepper-step>

                <v-stepper-content step="2">
                  <v-card height="340px">
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="kilometraje" label="Kilometraje" hint="Ingrese el kilometraje del vehículo" prepend-icon="mdi-speedometer"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                          <v-menu
                                  v-model="finicio_data"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                      v-model="computedfIni"
                                      label="Fecha de Inicio"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="fInicio" @input="finicio_data = false" color="grey darken-4" locale="es"></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                          <v-menu
                                  v-model="fsalida_data"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                      v-model="computedFfin"
                                      label="Fecha de salida"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="fsalida" @input="fsalida_data = false" color="grey darken-4" locale="es"></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-textarea
                                  v-model="detalleVehiculo"
                                  name="input-7-1"
                                  label="Detalles del Servicio"
                                  hint="Ingrese los detalles del Servicio"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    <v-btn small dark color="blue-grey lighten-1" @click="e6 = 1">Regresar</v-btn>
                    <v-btn small color="primary" @click="e6 = 3">Siguiente</v-btn>
                  </v-card>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 2" step="3">Check vehículo</v-stepper-step>

                <v-stepper-content step="3">
                  <v-card height="auto">
                    <v-row>
                      <v-col cols="12" sm="6" md="4" v-for="quiz in cuestionarioEmpresa">
                        <span class="subtitle-1 font-weight-black">{{ quiz.NombreSeccion }}</span>
                        <hr>
                        <v-data-table
                                v-model="selected"
                                :headers="headersTable"
                                :items="quiz.Preguntas"
                                :single-select="singleSelect"
                                item-key="Pregunta"
                                show-select
                                class="elevation-1"
                                hide-default-footer
                        >
                        </v-data-table>
                      </v-col>
                    </v-row>
                    <v-btn small dark color="blue-grey lighten-1" @click="e6 = 2">Regresar</v-btn>
                    <v-btn small color="primary" @click="e6 = 4">Siguiente</v-btn>
                  </v-card>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 2" step="3">Detalles del Vehículo</v-stepper-step>

                <v-stepper-content step="4">
                  <v-col cols="12" sm="6" md="12">
                  <v-btn small color="primary" @click="e6 = 3">Regresar</v-btn>
                  <v-icon color="#ea728c">mdi-checkbox-blank-circle</v-icon> Abolladura
                  <v-icon color="#baf1a1">mdi-checkbox-blank-circle</v-icon> Rayón
                  <v-icon color="#459CD2">mdi-checkbox-blank-circle</v-icon>Daño Genérico
                  </v-col>
                  <v-card class="mb-12" height="350px">
                    <v-row>
                      <v-img
                              :src="imgCarro"
                              :lazy-src="imgCarro"
                              aspect-ratio="1"
                              class="grey lighten-2"
                              max-width="600"
                              max-height="300"
                              draggable="false"
                              @click="getCordenadas"
                              id='img-element'
                      >
                      </v-img>
                      <div v-html="svgTest" ref="incomingDef"></div>
                      <div v-html="pointOne" ref="incomingDef"></div>
                      <div v-html="pointTwo" ref="incomingDef"></div>
                      <div v-html="pointThre" ref="incomingDef"></div>
                      <div v-html="pointFor" ref="incomingDef"></div>
                      <div v-html="pointFive" ref="incomingDef"></div>
                      <div v-html="pointSix" ref="incomingDef"></div>
                      <div v-html="pointSeven" ref="incomingDef"></div>
                      <div v-html="pointEigth" ref="incomingDef"></div>
                      <div v-html="pointNine" ref="incomingDef"></div>
                      <div v-html="pointTen" ref="incomingDef"></div>
                      <div v-html="pointEleven" ref="incomingDef"></div>
                      <div v-html="pointTwelve" ref="incomingDef"></div>
                      <div v-html="pointThirteen" ref="incomingDef"></div>
                      <div v-html="pointFourTeen" ref="incomingDef"></div>
                      <div v-html="pointFifTeen" ref="incomingDef"></div>
                      <div v-html="pointSixTeen" ref="incomingDef"></div>
                      <div v-html="pointSevenTeen" ref="incomingDef"></div>
                      <div v-html="pointEigthTeen" ref="incomingDef"></div>
                      <div v-html="pointNineTeen" ref="incomingDef"></div>
                      <div v-html="pointTwenty" ref="incomingDef"></div>
                      <v-col cols="12" sm="6" md="2">
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="namePoint" label="Nombre Detalle" hint="Ingrese el nombre del detalle"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-autocomplete
                                  :items="tipoAverias"
                                  item-text="TIPO"
                                  item-value="id"
                                  v-model="tipoAveriaID"
                                  label="Tipo"
                                  hint="Elija el tipo de averia"
                          ></v-autocomplete>
                          <v-btn small dark color="success" @click="marketPoint"><v-icon>mdi-plus-circle-outline</v-icon>Agregar </v-btn>
                        </v-col>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        Detalles Vehiculo
                        <v-simple-table dense>
                          <template v-slot:default>
                            <thead>
                            <tr>
                              <th class="text-left">NUMERO</th>
                              <th class="text-left">NOMBRE</th>
                              <th class="text-left">TIPO</th>
                              <th class="text-left">OPT</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(items, index) in pointsMarker" :key="items.NO">
                              <td>{{ items.Numero }}</td>
                              <td>{{ items.Detalle }}</td>
                              <td>{{ items.nameAveria }}</td>
                              <td style="cursor: pointer" @click="deletePoint(index)">
                                <v-icon>mdi-delete</v-icon>
                              </td>
                            </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-stepper-content>
              </v-stepper>
            </template>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
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
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- Impresion -->
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="dialogImpresion" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark color="#607D8B">
              <v-btn @click="dialogImpresion = false" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title><v-icon>mdi-printer</v-icon>Vista Preliminar Inspección {{ viewInspeccionID }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
              </v-toolbar-items>
              <v-btn @click="printInfoRecep" dark color="success">
                <v-icon>mdi-printer</v-icon> Imprimir
              </v-btn>
            </v-toolbar>
            <v-icon>mdi-cogs</v-icon>
            <span class="title">Datos Generales</span>
            <hr class="my-3">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="viewCliente" label="Hoja de Inspección" :disabled="true" prepend-icon="mdi-account-tie"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="viewNameCliente" label="Nombre del Cliente" :disabled="true" prepend-icon="mdi-account-tie"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="viewContrato" label="Contrato" :disabled="true" prepend-icon="mdi-file-document"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="viewFactura" label="Factura" :disabled="true" prepend-icon="mdi-file-document-box"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="viewEstacion" label="Estación Dueña" :disabled="true" prepend-icon="mdi-domain"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="viewVehiculo" label="Vehiculo" :disabled="true" prepend-icon="mdi-car"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field v-model="viewMarcaMod" label="Marca y Modelo" :disabled="true" prepend-icon="mdi-car-info"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field v-model="viewPlaca" label="Placas" :disabled="true" prepend-icon="mdi-car-info"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="viewDescripcion" label="Descripción" :disabled="true" prepend-icon="mdi-car-info"></v-text-field>
              </v-col>
            </v-row>
            <v-icon>mdi-information-outline</v-icon>
            <span class="title">Detalles del Servicio</span>
            <hr class="my-3">
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="viewKm" label="Kilometraje" :disabled="true" prepend-icon="mdi-speedometer"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="viewFechaHraEntrada" label="Fecha y Hora de Entrada" :disabled="true" prepend-icon="mdi-calendar"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="viewFechaHraSalida" label="Fecha y Hora de Salida" :disabled="true" prepend-icon="mdi-calendar"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="viewComentario" label="Detalles del Servicio" :disabled="true" prepend-icon="mdi-comment"></v-text-field>
              </v-col>
            </v-row>
            <v-icon>mdi-car</v-icon>
            <span class="title">Check del Vehículo</span>
            <v-row>
              <v-col cols="12" sm="6" md="4" v-for="quiz in cuestionarioEmpresa">
                <span class="subtitle-1 font-weight-black">{{ quiz.NombreSeccion }}</span>
                <hr>
                <v-data-table
                        v-model="selected"
                        :headers="headersTable"
                        :items="quiz.Preguntas"
                        :single-select="singleSelect"
                        item-key="Pregunta"
                        show-select
                        class="elevation-1"
                        hide-default-footer
                >
                </v-data-table>
              </v-col>
            </v-row>
            <v-icon>mdi-car</v-icon>
            <span class="title">Detalles del Vehículo</span>
            <v-icon color="#ea728c">mdi-checkbox-blank-circle</v-icon> Abolladura
            <v-icon color="#baf1a1">mdi-checkbox-blank-circle</v-icon> Rayón
            <v-icon color="#459CD2">mdi-checkbox-blank-circle</v-icon>Daño Genérico
            <hr class="my-3">
              <v-card class="mb-12" height="350px">
                <v-row>
                  <v-img
                          :src="imgCarro"
                          :lazy-src="imgCarro"
                          aspect-ratio="1"
                          class="grey lighten-2"
                          max-width="600"
                          max-height="300"
                          draggable="false"
                          id='img-element'
                  >
                  </v-img>
                  <div v-html="svgTest" ref="incomingDef"></div>
                  <div v-html="pointOne" ref="incomingDef"></div>
                  <div v-html="pointTwo" ref="incomingDef"></div>
                  <div v-html="pointThre" ref="incomingDef"></div>
                  <div v-html="pointFor" ref="incomingDef"></div>
                  <div v-html="pointFive" ref="incomingDef"></div>
                  <div v-html="pointSix" ref="incomingDef"></div>
                  <div v-html="pointSeven" ref="incomingDef"></div>
                  <div v-html="pointEigth" ref="incomingDef"></div>
                  <div v-html="pointNine" ref="incomingDef"></div>
                  <div v-html="pointTen" ref="incomingDef"></div>
                  <div v-html="pointEleven" ref="incomingDef"></div>
                  <div v-html="pointTwelve" ref="incomingDef"></div>
                  <div v-html="pointThirteen" ref="incomingDef"></div>
                  <div v-html="pointFourTeen" ref="incomingDef"></div>
                  <div v-html="pointFifTeen" ref="incomingDef"></div>
                  <div v-html="pointSixTeen" ref="incomingDef"></div>
                  <div v-html="pointSevenTeen" ref="incomingDef"></div>
                  <div v-html="pointEigthTeen" ref="incomingDef"></div>
                  <div v-html="pointNineTeen" ref="incomingDef"></div>
                  <div v-html="pointTwenty" ref="incomingDef"></div>
                  <v-col cols="12" sm="6" md="6">
                    Detalles Vehiculo
                    <hr>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                        <tr>
                          <th class="text-left">NUMERO</th>
                          <th class="text-left">NOMBRE</th>
                          <th class="text-left">TIPO</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="items in pointsMarker" :key="items.NO">
                          <td>{{ items.Numero }}</td>
                          <td>{{ items.Detalle }}</td>
                          <td>{{ items.nameAveria }}</td>
                        </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-row>
              </v-card>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
    <!-- Impresion -->
  </v-layout>
</template>
<style
        lang="scss">
  .theme--dark .v-menu__content {
    background-color: #424242;
  }
  .theme--light .v-menu__content {
    background-color: #ffffff;
  }
</style>
<script>
import { AgGridVue } from '@ag-grid-community/vue'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
// import { TweenMax } from 'gsap/TweenMax.js'
// import axios from 'axios' /
import unirest from 'unirest'
// import { Carousel3d, Slide } from 'vue-carousel-3d'
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
      fsalida: new Date().toISOString().substr(0, 10),
      fsalida_data: false,
      fcalendarIni: new Date().toISOString().substr(0, 10),
      fInicio: new Date().toISOString().substr(0, 10),
      finicio_data: false,
      columnDefs: null,
      rowData: [],
      modules: AllCommunityModules,
      dialog: false,
      panel: [0],
      e6: 1,
      svgTest: null,
      pointOne: null,
      pointTwo: null,
      pointThre: null,
      pointFor: null,
      pointFive: null,
      pointSix: null,
      pointSeven: null,
      pointEigth: null,
      pointNine: null,
      pointTen: null,
      pointEleven: null,
      pointTwelve: null,
      pointThirteen: null,
      pointFourTeen: null,
      pointFifTeen: null,
      pointSixTeen: null,
      pointSevenTeen: null,
      pointEigthTeen: null,
      pointNineTeen: null,
      pointTwenty: null,
      py: 0,
      px: 0,
      valorimg: 0,
      image_width: 0,
      image_height: 0,
      pointsMarker: [],
      namePoint: null,
      msjException: false,
      msjAlerta: '',
      jsonVehiculos: null,
      vehiculos: [],
      vehiculoName: null,
      marcaYmodelo: null,
      placas: null,
      descripcion: null,
      clientes: [],
      jsonClientes: null,
      clienteName: null,
      userID: null,
      time: null,
      menuHora: false,
      contrato: '',
      factura: '',
      estacionDuenia: '',
      inspectorID: '',
      combustible: 0,
      tipoCombustible: '',
      listaCombustibles: [
        { 'id': 1, 'tipo_combustible': 'GASOLINA MAGNA' },
        { 'id': 2, 'tipo_combustible': 'GASOLINA PREMIUM' },
        { 'id': 3, 'tipo_combustible': 'DIESEL' },
        { 'id': 4, 'tipo_combustible': 'GAS' }
      ],
      lcombustible: ['Empty', '1/16', '1/8', '3/16', '1/4', '5/16', '3/8', '7/16', '1/2', '9/16', '5/8', '11/16', '3/4', '13/16', '7/8', '15/16', 'Full'],
      kilometraje: '',
      hsalida: '',
      detalleVehiculo: '',
      empleados: [],
      empledoName: null,
      jsonEmpleados: null,
      imgCarro: '/recepcion_img.png',
      indiceCurrent: 0,
      resQuiz: [],
      urlTest: 'http://localhost:51104/',
      url: 'http://localhost:51104/',
      noInspeccion: null,
      overlay: false,
      banderaEdit: 0,
      inspeccionID: null,
      dialogImpresion: false,
      viewInspeccionID: '',
      viewContrato: '',
      viewFactura: '',
      viewEstacion: '',
      viewVehiculo: '',
      viewMarcaMod: '',
      viewDescripcion: '',
      viewPlaca: '',
      viewInspector: '',
      viewNoLlantas: '',
      viewCliente: '',
      viewCombustible: '',
      viewTipoCombustible: '',
      viewKm: '',
      viewFechaHraSalida: '',
      viewComentario: '',
      viewNameCliente: '',
      indiceImg: 0,
      infoPrintInspeccion: [],
      cuestionarioEmpresa: [],
      singleSelect: false,
      selected: [],
      headersTable: [{ text: 'Seleccionar todos', value: 'Pregunta' }],
      gridOptions: {},
      tituloIMG: 'FRONTAL',
      tipoChasis: 2,
      arregloImgsCarro: [], //
      nameCliente: '',
      objLlantas: [],
      headerLlantas: [],
      hojaInspeccionID: null,
      viewFechaHraEntrada: null,
      botonSalir: 'Salir',
      clipped: true,
      drawer: false,
      fixed: false,
      logueado: null,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Kananfleet ®',
      tipoAverias: [
        { 'id': 1, 'TIPO': 'RAYON' },
        { 'id': 2, 'TIPO': 'ABOLLADURA' },
        { 'id': 3, 'TIPO': 'DAÑO GENERICO' }
      ],
      tipoAveriaID: null,
      Encabezado_Tabla: [],
      Detalle_Tabla: [],
      search: '',
      proyectos: []
    }
  },
  methods: {
    formatoFecha (date) {
      console.log('function: formatDate(). ')
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    deletePoint (index) {
      const vm = this
      confirm('Estas a punto de eliminar un Detalle deseas continuar?') && vm.pointsMarker.splice(index, 1)
      vm.pointOne = ''
      vm.pointTwo = ''
      vm.pointThre = ''
      vm.pointFor = ''
      vm.pointFive = ''
      vm.pointSix = ''
      vm.pointSeven = ''
      vm.pointEigth = ''
      vm.pointNine = ''
      vm.pointTen = ''
      vm.pointEleven = ''
      vm.pointTwelve = ''
      vm.pointThirteen = ''
      vm.pointFourTeen = ''
      vm.pointFifTeen = ''
      vm.pointSixTeen = ''
      vm.pointSevenTeen = ''
      vm.pointEigthTeen = ''
      vm.pointNineTeen = ''
      vm.pointTwenty = ''
      vm.paintPoints()
    },
    agregarInspeccion () {
      const vm = this
      vm.dialog = true
      vm.svgTest = null
      vm.e6 = 1
      vm.pointsMarker = []
      vm.objLlantas = []
      vm.headerLlantas = []
    },
    getInspeccionxID () {
      const vm = this
      if (event.keyCode === 13) {
        if (vm.hojaInspeccionID === null || vm.hojaInspeccionID === '0') {
          vm.msjException = true
          vm.msjAlerta = 'Ingrese una Hoja de Inspección válida'
        }
        unirest('GET', vm.urlTest + '/api/HojaInspeccion/GetByID/' + vm.hojaInspeccionID)
          .end(function (res) {
            if (res.error) {
              throw new Error(res.error)
            }
            const resultado = res.body.hojasInspeccion
            if (resultado === null) {
              vm.msjException = true
              vm.msjAlerta = 'Ingrese una Hoja de Inspección válida'
              return
            }
            console.log(res.body.hojasInspeccion[0])
            const info = res.body.hojasInspeccion[0]
            vm.nameCliente = info.Cliente.RazonSocial
            vm.contrato = info.Contrato
            vm.factura = info.Factura
            vm.vehiculoName = info.Vehiculo.Nombre
            vm.estacionDuenia = info.Estacion
            vm.marcaYmodelo = info.Vehiculo.Marca + '-' + info.Vehiculo.Modelo
            vm.descripcion = info.Vehiculo.Descripcion
            vm.placas = info.Vehiculo.Placa
          })
      }
    },
    antImg () {
      const vm = this
      vm.svgTest = null
      const indice = vm.indiceCurrent - 1
      if (indice <= 0) {
        vm.imgCarro = vm.arregloImgsCarro[0].img
        vm.indiceImg = 0
        vm.indiceCurrent = 0
        vm.tituloIMG = vm.arregloImgsCarro[0].titulo
      } else {
        vm.imgCarro = vm.arregloImgsCarro[indice].img
        vm.indiceImg = indice
        vm.indiceCurrent = vm.indiceCurrent - 1
        vm.tituloIMG = vm.arregloImgsCarro[indice].titulo
      }
      vm.pointOne = ''
      vm.pointTwo = ''
      vm.pointThre = ''
      vm.pointFor = ''
      vm.pointFive = ''
      vm.pointSix = ''
      vm.pointSeven = ''
      vm.pointEigth = ''
      vm.pointNine = ''
      vm.pointTen = ''
      vm.pointEleven = ''
      vm.pointTwelve = ''
      vm.pointThirteen = ''
      vm.pointFourTeen = ''
      vm.pointFifTeen = ''
      vm.pointSixTeen = ''
      vm.pointSevenTeen = ''
      vm.pointEigthTeen = ''
      vm.pointNineTeen = ''
      vm.pointTwenty = ''
      vm.paintPoints()
    },
    sigImg () {
      const vm = this
      vm.svgTest = null
      const indice = vm.indiceCurrent + 1
      const noImgs = vm.arregloImgsCarro.length - 1
      if (indice >= noImgs) {
        vm.imgCarro = vm.arregloImgsCarro[noImgs].img
        vm.indiceImg = noImgs
        vm.indiceCurrent = noImgs
        vm.tituloIMG = vm.arregloImgsCarro[noImgs].titulo
      } else {
        vm.imgCarro = vm.arregloImgsCarro[indice].img
        vm.indiceImg = indice
        vm.indiceCurrent = vm.indiceCurrent + 1
        vm.tituloIMG = vm.arregloImgsCarro[indice].titulo
      }
      vm.pointOne = ''
      vm.pointTwo = ''
      vm.pointThre = ''
      vm.pointFor = ''

      vm.pointFive = ''
      vm.pointSix = ''
      vm.pointSeven = ''
      vm.pointEigth = ''
      vm.pointNine = ''
      vm.pointTen = ''
      vm.pointEleven = ''
      vm.pointTwelve = ''
      vm.pointThirteen = ''
      vm.pointFourTeen = ''
      vm.pointFifTeen = ''
      vm.pointSixTeen = ''
      vm.pointSevenTeen = ''
      vm.pointEigthTeen = ''
      vm.pointNineTeen = ''
      vm.pointTwenty = ''
      vm.paintPoints()
    },
    saveInformacion () {
      const vm = this
      const datosSend = {}
      if (vm.fsalida === '') {
        vm.msjException = true
        vm.msjAlerta = 'Seleccione un cliente'
        return
      }
      if (vm.fInicio === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese un contrato'
        return
      }
      if (vm.hojaInspeccionID === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese un cliente'
        return
      }
      if (vm.kilometraje === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese la estación dueña'
        return
      }
      if (vm.detalleVehiculo === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija el vehículo'
        return
      }
      if (vm.InspectorID === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija el nombre del Inspector'
        return
      }
      /* {
        "Activo": "true",
        "FechaCreacion": "01/01/2020",
        "FechaFin": "01/01/2020",
        "FechaInicio": "01/01/2020",
        "HojaInspeccionID": "4",
        "Kilometraje": "5600",
        "Sincronizada": "false",
        "TrabajoRealizar": "Se pulirá",
        "Averias": [
        {
          "AveriaID": "0",
          "Detalle": "NA",
          "Numero": "1",
          "EjeX": "1.1",
          "EjeY": "1.1",
          "ImagenID": "1",
          "HojaRecepcionID": "1",
          "HojaInspeccionID": "0"
        }
      ],
        "TipoCombustibleID": "1"
      } */
      datosSend.Activo = true
      datosSend.FechaCreacion = new Date().toISOString().substr(0, 10)
      datosSend.FechaFin = vm.fsalida
      datosSend.FechaInicio = vm.fInicio
      datosSend.HojaInspeccionID = vm.hojaInspeccionID
      datosSend.Kilometraje = vm.kilometraje
      datosSend.Sincronizada = false
      datosSend.TrabajoRealizar = vm.detalleVehiculo
      datosSend.Averias = vm.pointsMarker
      datosSend.TipoCombustibleID = 1
      datosSend.InspectorID = vm.inspectorID
      console.log(JSON.stringify(datosSend))
      unirest('POST', vm.urlTest + '/api/HojaRecepcion/AddHojaRecepcion')
        .headers({ 'Content-Type': 'application/json' })
        .send(JSON.stringify(datosSend))
        .end(function (res) {
          if (res.error) {
            throw new Error(res.error)
          }
          vm.saveCuestionario(res.body.hojasRecepcion[0].HojaRecepcionID)
          vm.getInfoRecepcionxID(res.body.hojasRecepcion[0].HojaRecepcionID)
          vm.searchInspeccion()
          vm.msjException = true
          vm.msjAlerta = 'Hoja de Recepción creada con éxito No: ' + res.body.hojasRecepcion[0].HojaRecepcionID
          vm.dialog = false
        })
    },
    saveCuestionario (HiID) {
      const vm = this ///
      const objCuestionario = {}
      for (let i = 0; i < vm.selected.length; i++) {
        objCuestionario.HojaInspeccionID = HiID
        objCuestionario.PreguntaID = vm.selected[i].PreguntaID
        objCuestionario.RespuestaID = vm.selected[i].Respuestas[0].RespuestaID
        unirest('POST', vm.urlTest + '/api/RespuestaCuestionario/AddRespuestaCuestionario')
          .headers({ 'Content-Type': 'application/json' })
          .send(JSON.stringify(objCuestionario))
          .end(function (res) {
            if (res.error) {
              throw new Error(res.error)
            }
          })
      }
    },
    getRespuestasCuestionario (cuestionarioID) {
      const vm = this
      unirest('GET', vm.urlTest + '/api/RespuestaCuestionario/GetRespuestaByHojaID/' + cuestionarioID)
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          for (let i = 0; i < res.body.RespuestasCuestionario.length; i++) {
            for (let x = 0; x < vm.cuestionarioEmpresa.length; x++) {
              for (let y = 0; y < vm.cuestionarioEmpresa[x].Preguntas.length; y++) {
                if (vm.cuestionarioEmpresa[x].Preguntas[y].PreguntaID === res.body.RespuestasCuestionario[i].Pregunta.PreguntaID) { //
                  vm.selected.push(vm.cuestionarioEmpresa[x].Preguntas[y])
                }
              }
            }
          }
        })
    },
    editarInspeccion () {
      const vm = this
      const datosSend = {}
      if (vm.fsalida === '') {
        vm.msjException = true
        vm.msjAlerta = 'Seleccione un cliente'
        return
      }
      if (vm.fInicio === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese un contrato'
        return
      }
      if (vm.hojaInspeccionID === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese un cliente'
        return
      }
      if (vm.kilometraje === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese la estación dueña'
        return
      }
      if (vm.detalleVehiculo === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija el vehículo'
        return
      }
      if (vm.InspectorID === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija el nombre del Inspector'
        return
      }
      datosSend.Activo = true
      datosSend.HojaRecepcionID = vm.inspeccionID
      datosSend.FechaCreacion = new Date().toISOString().substr(0, 10)
      datosSend.FechaFin = vm.fsalida
      datosSend.FechaInicio = vm.fInicio
      datosSend.HojaInspeccionID = vm.hojaInspeccionID
      datosSend.Kilometraje = vm.kilometraje
      datosSend.Sincronizada = false
      datosSend.TrabajoRealizar = vm.detalleVehiculo
      datosSend.Averias = vm.pointsMarker
      datosSend.TipoCombustibleID = 1
      datosSend.InspectorID = vm.InspectorID
      unirest('POST', vm.urlTest + '/api/HojaRecepcion/UpdateHojaRecepcion')
        .send(datosSend)
        .end(function (res) {
          if (res.error) {
            throw new Error(res.error)
          }
          vm.getInfoRecepcionxID(vm.inspeccionID)
          vm.msjException = true
          vm.msjAlerta = 'Hoja de Recepción Actualizada con Éxito'
          vm.dialog = false
        })
    },
    getInfoRecepcionxID (x) {
      const vm = this
      vm.rowData = []
      vm.overlay = true
      unirest('GET', vm.urlTest + '/api/HojaRecepcion/GetByID/' + x)
        .end(function (res) {
          if (res.error) {
            throw new Error(res.error)
          }
          vm.overlay = false
          vm.rowData.push(res.body.hojasRecepcion[0])
        })
    },
    editInspeccion (x) {
      const vm = this
      let resultado = []
      vm.banderaEdit = 1
      vm.overlay = true
      unirest('GET', vm.urlTest + '/api/HojaRecepcion/GetByID/' + x.HojaRecepcionID)
        .end(function (res) {
          if (res.error) {
            throw new Error(res.error)
          }
          vm.overlay = false
          resultado = res.body.hojasRecepcion[0]
          vm.hojaInspeccionID = resultado.HojaInspeccion.HojaInspeccionID
          vm.inspeccionID = resultado.HojaRecepcionID
          vm.fsalida = new Date(resultado.FechaFin).toISOString().slice(0, 10)
          vm.fInicio = new Date(resultado.FechaInicio).toISOString().slice(0, 10)
          vm.kilometraje = resultado.Kilometraje
          vm.clienteName = resultado.HojaInspeccion.Cliente.ClienteID
          vm.detalleVehiculo = resultado.TrabajoRealizar
          vm.InspectorID = resultado.InspectorID
          const infoAverias = resultado.Averias
          for (let i = 0; i < infoAverias.length; i++) {
            const tipoAveriaName = vm.tipoAverias.filter((item) => {
              if (item.id === infoAverias[i].TipoAveria) {
                return item
              }
            })
            vm.pointsMarker.push({ 'AveriaID': infoAverias[i].AveriaID, 'Numero': infoAverias[i].Numero, 'Detalle': infoAverias[i].Detalle, 'EjeX': infoAverias[i].EjeX, 'EjeY': infoAverias[i].EjeY, 'ImagenID': infoAverias[i].Imagen.ImagenID, 'HojaRecepcionID': vm.HojaInspeccionID, 'TipoAveria': infoAverias[i].TipoAveria, 'nameAveria': tipoAveriaName[0].TIPO })
          }
          vm.contrato = resultado.HojaInspeccion.Contrato
          vm.factura = resultado.HojaInspeccion.Factura
          vm.estacionDuenia = resultado.HojaInspeccion.Estacion
          vm.vehiculoName = resultado.HojaInspeccion.Vehiculo.VehiculoID
          vm.inspectorID = resultado.HojaInspeccion.Inspector.EmpleadoID
          vm.TipoCombustibleID = 1 // vm.tipoCombustible
          vm.marcaYmodelo = resultado.HojaInspeccion.Vehiculo.Marca + '-' + resultado.HojaInspeccion.Vehiculo.Modelo //
          vm.placas = resultado.HojaInspeccion.Vehiculo.Placa
          vm.descripcion = resultado.HojaInspeccion.Vehiculo.Descripcion
          vm.nameCliente = resultado.HojaInspeccion.Cliente.RazonSocial
        })
      vm.dialog = true
      vm.e6 = 1
      setTimeout(() => {
        vm.paintPoints()
      }, 1000)
      vm.getRespuestasCuestionario(x.HojaRecepcionID)
    },
    searchInspeccion () {
      const vm = this
      const parametros = {}
      vm.Detalle_Tabla = []
      /* if (vm.noInspeccion === null || vm.noInspeccion === '' || vm.noInspeccion === 0 || isNaN(vm.noInspeccion) === true) {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese un número de inspección válido' //
        return false
      } */
      if (vm.mfechaEdit === null || vm.mfechaEditFinal === null) {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese un rango de fechas valido'
        return false
      }
      parametros.FechaInicio = vm.fcalendarEdit
      parametros.FechaFin = vm.fcalendarFinal
      parametros.EmpresaID = window.empreaID_session
      vm.overlay = true
      unirest('POST', vm.urlTest + '/api/HojaRecepcion/GetByRango')
        .send(parametros)
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.rowData = res.body.hojasRecepcion
          for (var i = 0; i < vm.rowData.length; i++) {
            var f_ini = new Date(vm.rowData[i].FechaInicio).toISOString().slice(0, 10)
            var finiCF = vm.formatoFecha(f_ini)
            var f_fin = new Date(vm.rowData[i].FechaFin).toISOString().slice(0, 10)
            var ffinCF = vm.formatoFecha(f_fin)
            var cliente = ''
            if(vm.rowData[i].HojaInspeccion.Cliente.RazonSocial){
              cliente = vm.rowData[i].HojaInspeccion.Cliente.RazonSocial
            }else {
              cliente = ''
            }
            vm.Detalle_Tabla.push({'HojaRecepcionID': vm.rowData[i].HojaRecepcionID,
              'HojaInspeccionID': vm.rowData[i].HojaInspeccion.HojaInspeccionID,
              'FechaInicio': finiCF ,
              'FechaFin': ffinCF,
              'Cliente': cliente,
              'Vehiculo': vm.rowData[i].HojaInspeccion.Vehiculo.Nombre,
              'Contrato': vm.rowData[i].HojaInspeccion.Contrato,
              'Kilometraje': vm.rowData[i].Kilometraje,
              'TrabajoRealizar': vm.rowData[i].TrabajoRealizar
            })
          }
          vm.overlay = false
        })
    },
    getEmpleados () {
      const vm = this
      console.log(window.empreaID_session)
      unirest('GET', vm.url + '/api/EmpleadoUsuario/GetAllEmpleadosByEmpresaID/' + window.empreaID_session)
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.empleados = res.body
          vm.jsonEmpleados = res.body.map((item) => {
            return item.EmpleadoID + ' - ' + item.Nombre
          })
        })
    },
    getCuestionario () {
      const vm = this
      unirest('GET', vm.urlTest + '/api/Cuestionario/GetCuestionarioByID/2')
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.cuestionarioEmpresa.push(res.body.cuestionarios[0].Secciones[1])
          vm.cuestionarioEmpresa.push(res.body.cuestionarios[0].Secciones[2])
        })
    },
    getClientes () {
      const vm = this
      unirest('GET', vm.url + '/api/Cliente/GetByEmpresaID/' + window.empreaID_session)
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.clientes = res.body
          vm.jsonClientes = res.body.map((item) => {
            return item.ClienteID + ' - ' + item.Nombre
          })
        })
    },
    getVehiculos () {
      /* axios.get('https://echo.getpostman.com/headers', null, window.configApi)
        .then((response) => {
          console.log('reactNativeDemo', 'response get details: ' + response.data)
        })
        .catch((error) => {
          console.log('axios error:', error)
        }) */
      const vm = this
      unirest('GET', vm.url + '/api/Vehiculo/GetByEmpresaIDNS/' + window.empreaID_session)
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.vehiculos = res.body
          vm.jsonVehiculos = res.body.map((item) => {
            return item.Nombre
          })
        })

      /* const req = unirest('POST', 'http://localhost:51104//api/Alertas/GetAlerta')
      req.headers({
        'postman-token': 'bfeb70f8-813d-cbb3-7df6-3414bf851e1c',
        'cache-control': 'no-cache',
        'x_token': 'HqQNcv2a+9gInnFKB6DUFWa3vZsiza/+iFKCPk8gT5E=',
        'x_time': '2019-08-02',
        'x_public_key': 'da501aae-0b22-407d-857e-243328b526e0'
      })
      req.send({ 'EmpresaID': '50' })
      req.end(function (res) {
        if (res.error) { throw new Error(res.error) }
        console.log(res.body)
      }) */

      /* const req = unirest.post('http://mockbin.com/request')
        .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
        .send({ 'parameter': 23, 'foo': 'bar' })
        .end(function (response) {
          console.log(response.body)
        }) */
    },
    printInspeccion (x) {
      const vm = this
      let resultado = []
      vm.pointsMarker = []
      vm.overlay = true
      unirest('GET', vm.urlTest + '/api/HojaRecepcion/GetByID/' + x.HojaRecepcionID)
        .end(function (res) {
          if (res.error) {
            throw new Error(res.error)
          }
          vm.overlay = false
          vm.dialogImpresion = true
          resultado = res.body.hojasRecepcion[0]//
          vm.infoPrintInspeccion = resultado
          vm.viewCliente = resultado.HojaInspeccion.HojaInspeccionID
          var finiSF = new Date(resultado.FechaInicio).toISOString().slice(0, 10)
          var finiCF = vm.formatoFecha(finiSF)
          var ffinSF = new Date(resultado.FechaFin).toISOString().slice(0, 10)
          var ffinCF = vm.formatoFecha(ffinSF)
          vm.viewFechaHraSalida = ffinCF
          vm.viewFechaHraEntrada = finiCF
          vm.viewKm = resultado.Kilometraje
          vm.viewNameCliente = resultado.HojaInspeccion.Cliente.RazonSocial
          vm.viewDescripcion = resultado.HojaInspeccion.Vehiculo.Descripcion
          vm.InspectorID = resultado.Inspector
          const infoAverias = resultado.Averias
          for (let i = 0; i < infoAverias.length; i++) {
            const tipoAveriaName = vm.tipoAverias.filter((item) => {
              if (item.id === infoAverias[i].TipoAveria) {
                return item
              }
            })
            vm.pointsMarker.push({ 'AveriaID': infoAverias[i].AveriaID, 'Numero': infoAverias[i].Numero, 'Detalle': infoAverias[i].Detalle, 'EjeX': infoAverias[i].EjeX, 'EjeY': infoAverias[i].EjeY, 'ImagenID': infoAverias[i].Imagen.ImagenID, 'HojaRecepcionID': vm.HojaInspeccionID, 'TipoAveria': infoAverias[i].TipoAveria, 'nameAveria': tipoAveriaName[0].TIPO })
          }
          vm.viewContrato = resultado.HojaInspeccion.Contrato
          vm.viewFactura = resultado.HojaInspeccion.Factura
          var estacion = resultado.HojaInspeccion.Estacion
          var lEstacion = vm.proyectos.filter((item) =>{
            if(item.sucursal_id == estacion){
              return item
            }
          })
          vm.viewEstacion = lEstacion[0].sucursal_nombre
          vm.viewVehiculo = resultado.HojaInspeccion.Vehiculo.Nombre
          vm.TipoCombustibleID = 1 // vm.tipoCombustible
          vm.viewMarcaMod = resultado.HojaInspeccion.Vehiculo.Marca + '-' + resultado.HojaInspeccion.Vehiculo.Modelo //
          vm.viewPlaca = resultado.HojaInspeccion.Vehiculo.Placa
          vm.viewComentario = resultado.TrabajoRealizar
        })
      setTimeout(() => {
        vm.paintPoints()
      }, 1000)
      vm.getRespuestasCuestionario(x.HojaRecepcionID)
    },
    selectVehiculo () {
      const vm = this
      console.log(vm.vehiculoName)
      const datosVehiculo = vm.vehiculos.filter((vehiculo) => {
        if (vehiculo.VehiculoID === vm.vehiculoName) {
          return vehiculo
        }
      })
      vm.marcaYmodelo = datosVehiculo[0].Marca + '-' + datosVehiculo[0].Modelo
      vm.placas = datosVehiculo[0].Placa
      vm.descripcion = datosVehiculo[0].Descripcion
      vm.combustible = datosVehiculo[0].TiposCombustible.ID
      vm.estacionDuenia = datosVehiculo[0].Propietario.Nombre
      vm.kilometraje = datosVehiculo[0].Odometro//
      vm.getLlantasVehiculo(datosVehiculo[0].VehiculoID)
    },
    getLlantasVehiculo (x) {
      const vm = this
      unirest('GET', vm.urlTest + '/api/Llantas/GetByVehiculoIDSNV/' + x)
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.objLlantas = res.body //
          const encabezados = vm.objLlantas
          for (let i = 0; i < encabezados.length; i++) {
            vm.headerLlantas.push({ text: encabezados[i].NumeroEconomico, value: 'Marca' })
          }
        })
    },
    marketPoint () {
      const vm = this
      const noPoints = vm.pointsMarker.length
      if (vm.namePoint == null) {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese el nombre del detalle encontrado'
        return
      }
      if (vm.tipoAveriaID == null) {
        vm.msjException = true
        vm.msjAlerta = 'Elija el tipo de Averia'
        return
      }
      if (vm.px === 0 || vm.py === 0) {
        vm.msjException = true
        vm.msjAlerta = 'Elija una ubicación válida'
        return
      }
      for (let i = 0; i < vm.pointsMarker.length; i++) {
        if (vm.pointsMarker[i].Detalle === vm.namePoint) {
          vm.msjException = true
          vm.msjAlerta = 'Ya existe un punto con el nombre: ' + vm.namePoint
          return
        }
      }
      const nameAveria = vm.tipoAverias.filter((item) => {
        if (item.id === vm.tipoAveriaID) {
          return item
        }
      })
      vm.pointsMarker.push({ 'AveriaID': 0, 'Numero': (noPoints + 1), 'Detalle': vm.namePoint, 'EjeX': vm.px, 'EjeY': vm.py, 'ImagenID': vm.indiceImg, 'TipoAveria': vm.tipoAveriaID, 'nameAveria': nameAveria[0].TIPO})
      vm.namePoint = ''
      vm.px = 0
      vm.py = 0
      vm.paintPoints()
    },
    getCordenadas (event) {
      const vm = this
      const i = document.querySelector('#img-element')
      vm.image_width = i.offsetWidth
      vm.image_height = i.offsetHeight
      window.ev = event
      vm.px = (event.offsetX)
      vm.py = (event.offsetY)
      vm.svgTest = null
      const newSvg = `<svg width="100%" id="punto-defectiva" height="100%" style="position: absolute; left: 0px; top: 0px;pointer-events: none; z-index: 1000">
                         <g>
                           <circle cx="${vm.px}" cy="${vm.py}" z="5" r="10" stroke="#C0CA33" stroke-width="4" fill="#C0CA33" />
                           </circle>
                           <text x="${vm.px}" y="${vm.py}" text-anchor="middle" color="white" alignment-baseline="central" fill="black">
                               Point
                            </text>
                         </g>
                      </svg>`

      vm.svgTest = newSvg
      /* if (TweenMax.isTweening(vm.$refs.incomingDef)) {
        TweenMax.killTweensOf(vm.$refs.incomingDef)
        vm.$refs.incomingDef.style.opacity = '1'//
      }
      TweenMax.to(vm.$refs.incomingDef, 0.5, { opacity: 0.3, repeat: -1, yoyo: true }) */
    },
    paintPoints () {
      const vm = this
      vm.svgTest = null
      for (let i = 0; i < vm.pointsMarker.length; i++) {
        var tipoAveria = vm.pointsMarker[i].TipoAveria
        if (tipoAveria == 1){
          var colorPoint = '#baf1a1'
        } else if(tipoAveria == 2) {
          var colorPoint = '#ea728c'
        }else{
          var colorPoint = '#459CD2'
        }
        if (vm.pointsMarker[i].ImagenID === vm.indiceImg) { //
          const newSvg = `<svg width="100%" id="punto-defectiva" height="100%" style="position: absolute; left: 0px; top: 0px;pointer-events: none; z-index: 1000">
                         <g>
                           <circle cx="${vm.pointsMarker[i].EjeX}" cy="${vm.pointsMarker[i].EjeY}" z="5" r="10" stroke="${colorPoint}" stroke-width="4" fill="${colorPoint}" />
                           </circle>
                           <text x="${vm.pointsMarker[i].EjeX}" y="${vm.pointsMarker[i].EjeY}" text-anchor="middle" color="white" alignment-baseline="central" fill="<">
                               ${vm.pointsMarker[i].Numero}
                            </text>
                         </g>
                      </svg>`

          switch (vm.pointsMarker[i].Numero) {
            case 1:
              vm.pointOne = newSvg
              break
            case 2:
              vm.pointTwo = newSvg
              break
            case 3:
              vm.pointThre = newSvg
              break
            case 4:
              vm.pointFor = newSvg
              break
            case 5:
              vm.pointFive = newSvg
              break
            case 6:
              vm.pointSix = newSvg
              break
            case 7:
              vm.pointSeven = newSvg
              break
            case 8:
              vm.pointEigth = newSvg
              break
            case 9:
              vm.pointNine = newSvg
              break
            case 10:
              vm.pointTen = newSvg
              break
            case 11:
              vm.pointEleven = newSvg
              break
            case 12:
              vm.pointTwelve = newSvg
              break
            case 13:
              vm.pointThirteen = newSvg
              break
            case 14:
              vm.pointFourTeen = newSvg
              break
            case 15:
              vm.pointFifTeen = newSvg
              break
            case 16:
              vm.pointSixTeen = newSvg
              break
            case 17:
              vm.pointSevenTeen = newSvg
              break
            case 18:
              vm.pointEigthTeen = newSvg
              break
            case 19:
              vm.pointNineTeen = newSvg
              break
            case 20:
              vm.pointTwenty = newSvg
              break
          }
        }
      }
    },
    printInfoRecep () {
      const vm = this
      const urlImg = '/recepcion_img.png'
      let allPreg = ''
      let respuestaE = ''
      let respuestaS = ''
      let allPoints = ''
      for (let i = 0; i < vm.cuestionarioEmpresa.length; i++) {
        allPreg += '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">' + vm.cuestionarioEmpresa[i].NombreSeccion + '</td>' +
        '<td style="border: 1px solid #ddd;">S</td>' +
        '<td style="border: 1px solid #ddd;">E</td>'
        for (let x = 0; x < vm.cuestionarioEmpresa[i].Preguntas.length; x++) {
          for (let y = 0; y < vm.selected.length; y++) {
            if (vm.selected[y].PreguntaID === vm.cuestionarioEmpresa[i].Preguntas[x].PreguntaID) {
              console.log(vm.cuestionarioEmpresa[i].Preguntas[x].PreguntaID)
              respuestaE = 'X'
              respuestaS = ''
            }
          }
          allPreg += '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">' + vm.cuestionarioEmpresa[i].Preguntas[x].Pregunta + '</td>' +
        '<td style="border: 1px solid #ddd;">' + respuestaE + '</td>' +
        '<td style="border: 1px solid #ddd;">' + respuestaS + '</td>'
          respuestaE = ''
          respuestaS = ''
        }
      }
      var fechaSF = new Date(vm.infoPrintInspeccion.FechaInicio).toISOString().slice(0, 10)
      var fechaCF = vm.formatoFecha(fechaSF)
      var averias = vm.infoPrintInspeccion.Averias
      for (let c = 0; c < averias.length; c++) {
        if (averias[c].EjeX != null && averias[c].EjeY != null) {
          /* if (averias[c].Imagen.ImagenID === 3) {
            var ejeX = averias[c].EjeX
            var ejeY = averias[c].EjeY
          } */
          if(averias[c].EjeX > 400){
            var ejex = averias[c].EjeX - 100
          }else {
            var ejex = averias[c].EjeX - 40
          }
          var ejey = averias[c].EjeY + 110
          if(averias[c].TipoAveria === 1){
            var shape = 'x'
          }else if(averias[c].TipoAveria === 2){
            var shape = '0'
          }else{
            var shape = 'D'
          }
          allPoints += '<span style="position:absolute; margin-top:' + ejey + 'px; margin-left:' + ejex + 'px; z-index: 2">' + shape +'</span>'
        }
      }
      const divToPrint = '<div style="text-align: center; margin-top: -20px"><h3>INVERSIONES GLOBALES S.A DE C.V</h3></div><h6 style="text-align: center; margin-top: -12px">RECEPCION DE TALLER</h6>' +
        '<table style="width: 100%; text-align: left; font-size: 12px; margin-top: -20px">' +
        '<tr>' +
        '<td>Cliente/ Customer Name</td>' +
        '<td>' + vm.infoPrintInspeccion.HojaInspeccion.Cliente.RazonSocial + '</td>' +
        '<td>Marca & Model/ Brand & Model</td>' +
        '<td>' + vm.infoPrintInspeccion.HojaInspeccion.Vehiculo.Marca + '-' + vm.infoPrintInspeccion.HojaInspeccion.Vehiculo.Modelo + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Contrato No/ RA No:</td>' +
        '<td>' + vm.infoPrintInspeccion.HojaInspeccion.Contrato + '</td>' +
        '<td>Color of Vehicle:</td>' +
        '<td></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Factura No/ Receipt No:</td>' +
        '<td>' + vm.infoPrintInspeccion.HojaInspeccion.Factura + '</td>' +
        '<td>Placa No/ Plate No:</td>' +
        '<td>' + vm.infoPrintInspeccion.HojaInspeccion.Vehiculo.Placa + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Estación Dueña/ Owner Station:</td>' +
        '<td>' + vm.infoPrintInspeccion.HojaInspeccion.Estacion + '</td>' +
        '<td>No Vehiculo/ Vehicle No:</td>' +
        '<td>' + vm.infoPrintInspeccion.HojaInspeccion.Vehiculo.VehiculoID + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Inspector de Operaciones</td>' +
        '<td colspan="3">' + vm.infoPrintInspeccion.HojaInspeccion.Inspector.Nombre + ' ' + vm.infoPrintInspeccion.HojaInspeccion.Inspector.Apellido1 + ' ' + vm.infoPrintInspeccion.HojaInspeccion.Inspector.Apellido1 + '<td>' +
        '</tr>' +
        '</table>' +
        '<h6 style="text-align: center; margin-top: -1px">ESTATUS DEL VEHICULO</h6><hr style="margin-top: -21px">' +
        '<table style="border-collapse: collapse; font-size: 13px; width: 100%">' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">Combustible Salida / Check - out fuel</td>' +
        '<td style="border: 1px solid #ddd;">E</td>' +
        '<td style="border: 1px solid #ddd;">1/6</td>' +
        '<td style="border: 1px solid #ddd;">1/8</td>' +
        '<td style="border: 1px solid #ddd;">3/16</td>' +
        '<td style="border: 1px solid #ddd;">1/4</td>' +
        '<td style="border: 1px solid #ddd;">5/16</td>' +
        '<td style="border: 1px solid #ddd;">3/8</td>' +
        '<td style="border: 1px solid #ddd;">7/16</td>' +
        '<td style="border: 1px solid #ddd;">1/2</td>' +
        '<td style="border: 1px solid #ddd;">9/16</td>' +
        '<td style="border: 1px solid #ddd;">5/8</td>' +
        '<td style="border: 1px solid #ddd;">11/16</td>' +
        '<td style="border: 1px solid #ddd;">3/4</td>' +
        '<td style="border: 1px solid #ddd;">13/16</td>' +
        '<td style="border: 1px solid #ddd;">7/8</td>' +
        '<td style="border: 1px solid #ddd;">15/16</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">Kilometraje / Odometer Reoding</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">Fecha Salida/ Date Out</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">Hora Salida/ Time Out</td>' +
        '<td colspan="6" style="border: 1px solid #ddd;">Tipo de Combustible/ Fuel Type</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">' + vm.infoPrintInspeccion.HojaInspeccion.Kilometraje + '</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">' + fechaCF + '</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td colspan="6" style="border: 1px solid #ddd;">' + vm.infoPrintInspeccion.HojaInspeccion.TipoCombustibleID + '</td>' +
        '</tr>' +
        '</table>' +
        '<h6 style="text-align: center; margin-top: 6px">DETALLES DEL VEHICULO</h6><hr style="margin-top: -21px">' +
        '<table style="width: 40%; font-size: 10px;border-collapse: collapse;">' +
        allPreg +
      '</table>' +
      '<div style="width: 57%; height: 30%; position: absolute; margin-left: 297px; margin-top: -463px">' +
        allPoints +
        '<img src="' + urlImg + '" width="95%" alt="Img1" style="margin-top: 155px; margin-left: 20px"/>' +
        '<table style="border-collapse: collapse; font-size: 10px; width: 50%; margin-top: 1px; margin-left: 10px">' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">Observaciones del punto 7</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '</table>' +
        '<table style="border-collapse: collapse; font-size: 10px; width: 45%; margin-top: -71px; margin-left: 232px">' +
        '<tr style="border: 1px solid #ddd; text-align: center">' +
        '<td style="border: 1px solid #ddd;" colspan="2">Rayones y Golpes</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd; text-align: center">' +
        '<td style="border: 1px solid #ddd;">Rayones  = x</td>' +
        '<td style="border: 1px solid #ddd;">Golpes = 0</td>' +
        '</tr>' +
        '</table>' +
        '<div style="font-size: 10px; width: 45%; margin-left: 220px"></div>' +
        '<div style="font-size: 10px; width: 45%; margin-left: 220px; margin-top: 5px"></div>' +
        '<div style="font-size: 10px; width: 45%; margin-left: 220px; margin-top: 5px"></div>' +
        '</div>' +
        '<h6 style="text-align: center; margin-top: 4px">MARCA Y NUMERACION DE LAS LLANTAS</h6><hr style="margin-top: -20px">' +
        '<table style="border-collapse: collapse; font-size: 13px; width: 100%">' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">R</td>' +
        '<td style="border: 1px solid #ddd;">Delantera Izq</td>' +
        '<td style="border: 1px solid #ddd;">R</td>' +
        '<td style="border: 1px solid #ddd;">Trasera Izq</td>' +
        '<td style="border: 1px solid #ddd;">R</td>' +
        '<td style="border: 1px solid #ddd;">Llanta de Repuesto</td>' +
        '<td style="border: 1px solid #ddd;">R</td>' +
        '<td style="border: 1px solid #ddd;">Trasera Der</td>' +
        '<td style="border: 1px solid #ddd;">R</td>' +
        '<td style="border: 1px solid #ddd;">Delantera Der</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '</table>' +
        '<span style="font-size:13px">Trabajo a realizar: ' + vm.infoPrintInspeccion.TrabajoRealizar + '</span>' +
        '<table style="border-collapse: collapse; font-size: 13px; width: 100%; margin-top: 10px;">' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">Combustible Salida / Check - out fuel</td>' +
        '<td style="border: 1px solid #ddd;">E</td>' +
        '<td style="border: 1px solid #ddd;">1/6</td>' +
        '<td style="border: 1px solid #ddd;">1/8</td>' +
        '<td style="border: 1px solid #ddd;">3/16</td>' +
        '<td style="border: 1px solid #ddd;">1/4</td>' +
        '<td style="border: 1px solid #ddd;">5/16</td>' +
        '<td style="border: 1px solid #ddd;">3/8</td>' +
        '<td style="border: 1px solid #ddd;">7/16</td>' +
        '<td style="border: 1px solid #ddd;">1/2</td>' +
        '<td style="border: 1px solid #ddd;">9/16</td>' +
        '<td style="border: 1px solid #ddd;">5/8</td>' +
        '<td style="border: 1px solid #ddd;">11/16</td>' +
        '<td style="border: 1px solid #ddd;">3/4</td>' +
        '<td style="border: 1px solid #ddd;">13/16</td>' +
        '<td style="border: 1px solid #ddd;">7/8</td>' +
        '<td style="border: 1px solid #ddd;">15/16</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">Kilometraje / Odometer Reoding</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">Fecha Salida/ Date Out</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">Hora Salida/ Time Out</td>' +
        '<td colspan="6" style="border: 1px solid #ddd;">Tipo de Combustible/ Fuel Type</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td colspan="6" style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '</table>' +
        '<span style="font-size:10px; margin-top: 20px;"></span>' +
        '<table style="border-collapse: collapse; margin-top: 2px; font-size: 12px; width: 100%">' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">Returning Agent Signature/Firma Vendedor</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">Customer Signature/Firma del Cliente</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">Inspector Operaciones/Operation Inspector</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">__________________________________</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">__________________________________</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">__________________________________</td>' +
        '</tr>' +
        '</table>'
      const newWin = window.open('')
      newWin.document.write(divToPrint)
      setTimeout(function () {
        newWin.print()
        newWin.close() //
      }, 550)
    },
    dateFormatter (params) {
      return new Date(params.value).toISOString().slice(0, 10)
    },
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
    getEmpresa () {
      const empresaID = this.$nuxt._route.query.id
      return empresaID
    },
    getSucursales () {
      const vm = this
      unirest('POST', vm.url + '/api/Reportes/ConsultarSucursales')
        .send({ 'EmpresaID': vm.getEmpresa() })//
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.proyectos = res.body.obj//
        })
    }
  },
  computed: {
    computedInicio () {
      return this.formatoFecha(this.fcalendarEdit)
    },
    computedFin () {
      return this.formatoFecha(this.fcalendarFinal)
    },
    computedfIni (){
      return this.formatoFecha(this.fInicio)
    },
    computedFfin (){
      return this.formatoFecha(this.fsalida)
    }
  },
  beforeMount () {
    this.arregloImgsCarro = [
      { 'img': '/' + this.tipoChasis + '_Frente.png', 'indice': 0, 'titulo': 'FRONTAL' },
      { 'img': '/' + this.tipoChasis + '_Lateral_Der.png', 'indice': 1, 'titulo': 'LATERAL DER' },
      { 'img': '/' + this.tipoChasis + '_Lateral_Izq.png', 'indice': 2, 'titulo': 'LATERAL IZQ' },
      { 'img': '/' + this.tipoChasis + '_Trasera.png', 'indice': 3, 'titulo': 'TRASERA' }
    ]
    window.vm = this
    this.columnDefs = [
      { headerName: 'NO', field: 'HojaRecepcionID', width: 60 },
      { headerName: 'NO INSPECCION', field: 'HojaInspeccion.HojaInspeccionID', width: 110 },
      { headerName: 'F. INICIO', field: 'FechaInicio', width: 120, valueFormatter: this.dateFormatter },
      { headerName: 'F. FIN', field: 'FechaFin', width: 120, valueFormatter: this.dateFormatter },
      { headerName: 'CLIENTE', field: 'HojaInspeccion.Cliente.RazonSocial', width: 120 },
      { headerName: 'VEHICULO', field: 'HojaInspeccion.Vehiculo.Nombre', width: 120 },
      { headerName: 'CONTRATO', field: 'HojaInspeccion.Contrato', width: 120 },
      { headerName: 'KM', field: 'Kilometraje', width: 120 },
      { headerName: 'OBSERVACIONES', field: 'TrabajoRealizar', width: 120 },
      { headerName: 'OPCIONES', filter: false, width: 120, cellRenderer: function boton (params) { return `<span class="v-btn__content"><i class="v-icon notranslate mdi mdi-square-edit-outline" style="cursor: pointer" title="Editar" onclick="vm.editInspeccion(` + params.data.HojaRecepcionID + `)"></i> <i class="v-icon notranslate mdi mdi-printer" style="cursor: pointer" title="Imprimir" onclick="vm.printInspeccion(` + params.data.HojaRecepcionID + `)"></i></span>` } }
    ]
    this.Encabezado_Tabla= [
      { text: 'NO', value: 'HojaRecepcionID', class: ['blue-grey darken-2', 'white--text'], sortable: false },
      { text: 'INSPECCION', value: 'HojaInspeccionID', class: ['blue-grey darken-2', 'white--text'], sortable: false, width:120 },
      { text: 'F. INICIO', value: 'FechaInicio', class: ['blue-grey darken-2', 'white--text'], sortable: false, width: 110},
      { text: 'F. FIN', value: 'FechaFin', class: ['blue-grey darken-2', 'white--text'], sortable: false, width: 110 },
      { text: 'CLIENTE', value: 'Cliente', class: ['blue-grey darken-2', 'white--text'], sortable: false, width: 290 },
      { text: 'VEHICULO', value: 'Vehiculo', class: ['blue-grey darken-2', 'white--text'], sortable: false, width: 130 },
      { text: 'CONTRATO', value: 'Contrato', class: ['blue-grey darken-2', 'white--text'], sortable: false, width: 130 },
      { text: 'KM', value: 'Kilometraje', class: ['blue-grey darken-2', 'white--text'], sortable: false, width: 110 },
      { text: 'OBSERVACIONES', value: 'TrabajoRealizar', class: ['blue-grey darken-2', 'white--text'], sortable: false,width: 200 },
      { text: 'OPCIONES', value: 'action', class: ['blue-grey darken-2', 'white--text'], sortable: false }
    ],
    this.time = new Date().getHours() + ':' + new Date().getMinutes()
    this.rowData = []
    this.gridOptions = {
      floatingFilter: true,
      enableColResize: true,
      defaultColDef: {
        width: 250,
        filterParams: { newRowsAction: 'keep' }
      }
    }
    this.localeText = {
      noRowsToShow: 'No hay registros para mostrar',
      contains: 'Contenga',
      andCondition: 'Y Contenga',
      orCondition: 'O Contenga',
      filterOoo: 'Filtrar...'
    }
    window.parametroURL = window.$nuxt._route.query.id
    window.vm.items = [
      {
        icon: 'mdi-clipboard-text',
        title: 'G.H de Inspección',
        to: '/kananfleet/Inspeccion/?id=' + window.$nuxt._route.query.id
      },
      {
        icon: 'mdi-clipboard-check',
        title: 'G.R de Taller',
        to: '/kananfleet/Recepcion/?id=' + window.$nuxt._route.query.id
      }
    ]
  },
  mounted () {
    window.vm = this
    window.vm.banderaEdit = 0
    window.vm.loginOK = window.$nuxt._route.params.recepcion
    window.empreaID_session = window.$nuxt._route.query.id
    const dataValid = window.$nuxt._route.query.id
    if (dataValid !== window.empreaID_session) {
      location.href = '/'
    }
    window.vm.items = [
      {
        icon: 'mdi-clipboard-text',
        title: 'G.H de Inspección',
        to: '/kananfleet/Inspeccion/?id=' + window.vm.getEmpresa()
      },
      {
        icon: 'mdi-clipboard-check',
        title: 'G.R de Taller',
        to: '/kananfleet/Recepcion/?id=' + window.vm.getEmpresa()
      }
    ]
    // window.vm.getVehiculos(50)
    // window.vm.getClientes()
    window.vm.logueado = true
    window.vm.getSucursales()
    window.vm.searchInspeccion()
    window.vm.getEmpleados()
    window.vm.getCuestionario()
  }
}
</script>
