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
    <v-flex xs12 sm12 lg12 md12>
      <div class="headline">
        <v-icon color="black">
          mdi-clipboard-text
        </v-icon> Gestión Hojas de Inspección
        <hr class="my-3">
      </div>
      <!-- -->
      <v-layout row wrap>
        <v-flex xs12 sm12 lg12 md12>
          <div class="headline" style="margin-left: 1%;">
            <v-icon color="black">
              mdi-clipboard-text
            </v-icon> Gestión Hojas de Inspección
            <hr class="my-3">
          </div>
        </v-flex>
        <v-flex xs12 sm12 md2 style="margin-left: 1%;" d-none>
        <v-text-field v-model="noInspeccion" label="No de Inspección" hint="Número de inspección" prepend-icon="mdi-clipboard-text"></v-text-field>
        </v-flex>
        <v-flex xs2 sm2 md2 style="margin-left: 1%;">
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
                          label="Fecha de Inicial"
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
              <v-toolbar-title><v-icon>mdi-plus-circle-outline</v-icon> <span v-show="banderaEdit === 0">Agregar Hoja de Inspección Vehicular</span><span v-show="banderaEdit === 1">Editar Hoja de Inspección Vehicular</span></v-toolbar-title>
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
                  <v-card height="auto">
                    <v-row>
                      <v-col cols="12" sm="12" md="3">
                        <v-autocomplete
                          :items="clientes"
                          item-text="Nombre"
                          item-value="ClienteID"
                          v-model="clienteName"
                          label="Cliente"
                          hint="Debe de elegir un cliente"
                          prepend-icon="mdi-account-tie"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="12" md="3">
                        <v-text-field v-model="nameCliente" label="Nombre del Cliente" hint="Ingrese el nombre del Cliente" prepend-icon="mdi-account-tie"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="3">
                        <v-autocomplete
                          :items="tiposDocumento"
                          v-model="documentoID"
                          item-text="nombre"
                          item-value="id"
                          label="Tipo de Documento"
                          hint="Elija un tipo de documento"
                          prepend-icon="mdi-file-document-box-outline"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="12" md="3">
                        <v-autocomplete
                         :items="listaChasis"
                         v-model="chasisID"
                         @change="setTipoChasis"
                         item-text="nombre"
                         item-value="id"
                         label="Tipo de Chasis"
                         hint="Elija un tipo de chasis"
                         prepend-icon="mdi-car-estate"
                        ></v-autocomplete>
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
                        <v-autocomplete
                                @change="selectVehiculo"
                                v-model="vehiculoName"
                                label="Vehiculo"
                                :items="vehiculos"
                                item-text="Nombre"
                                item-value="VehiculoID"
                                hint="Debe de elegir un vehículo"
                                prepend-icon="mdi-car"
                        ></v-autocomplete>
                      </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-autocomplete
                                  v-model="estacionDuenia"
                                  label="Estación Dueña"
                                  :items="proyectos"
                                  item-text="sucursal_nombre"
                                  item-value="sucursal_id"
                                  hint="Ingrese la estación dueña"
                                  prepend-icon="mdi-domain"
                                  required
                          ></v-autocomplete>
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
                          <span class="subtitle-1 font-weight-bold">Llantas</span>
                      </v-col>
                      <v-col cols="4" sm="3" md="2" v-for="x in objLlantas">
                        <v-card
                                class="mx-auto"
                                max-width="344"
                                outlined
                        >
                          <v-card-text>
                              NS: {{x.SN}}<br> ECO: {{x.NumeroEconomico}}<br> MARC: {{x.Marca}}<br>MOD: {{x.Modelo}}
                         </v-card-text>
                        </v-card>
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
                <v-stepper-step :complete="e6 > 2" step="2">Estatus Inicial del vehículo</v-stepper-step>
                <v-stepper-content step="2">
                  <v-card height="auto">
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                                  v-model="tipoCombustible"
                                  label="Combustible"
                                  :items="lcombustible"
                                  hint="Debe de elegir un tipo de combustible"
                                  prepend-icon="mdi-fuel"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                                  v-model="combustible"
                                  label="Tipo de Combustible"
                                  :items="listaCombustibles"
                                  item-text="tipo_combustible"
                                  item-value="id"
                                  hint="Debe de elegir un combustible"
                                  prepend-icon="mdi-gas-station"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="kilometraje" label="Kilometraje" hint="Ingrese el kilometraje del vehículo" prepend-icon="mdi-speedometer"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
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
                                      v-model="computedFSalida"
                                      label="Fecha de salida"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="fsalida" @input="fsalida_data = false" color="grey darken-4" locale="es"></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                                  ref="menu"
                                  v-model="menuHora"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  :return-value.sync="time"
                                  transition="scale-transition"
                                  offset-y
                                  max-width="290px"
                                  min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                      v-model="time"
                                      label="Hora de salida"
                                      prepend-icon="mdi-clock-outline"
                                      readonly
                                      v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                    v-if="menuHora"
                                    v-model="time"
                                    full-width
                                    @click:minute="$refs.menu.save(time)"
                                    color="grey darken-4"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-textarea
                                  v-model="detalleVehiculo"
                                  name="input-7-1"
                                  label="Detalles del vehículo"
                                  hint="Ingrese los detalles del vehículo"
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

                <v-stepper-step :complete="e6 > 3" step="4">Detalles del Vehículo</v-stepper-step>

                <v-stepper-content step="4">
                  <v-row>
                  <v-col cols="12" sm="6" md="12">
                  <v-btn small color="primary" @click="e6 = 3">Regresar</v-btn>
                    <v-icon color="#ea728c">mdi-checkbox-blank-circle</v-icon> Abolladura
                    <v-icon color="#baf1a1">mdi-checkbox-blank-circle</v-icon> Rayón
                    <v-icon color="#459CD2">mdi-checkbox-blank-circle</v-icon>Daño Genérico
                  </v-col>
                  </v-row>
                  <v-card class="mb-12" height="350px">
                    <v-row>
                      <v-img
                              :src="imgCarro"
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
                                item-value="TIPO"
                                v-model="tipoAveriaID"
                                label="Tipo"
                                hint="Elija el tipo de averia"
                        ></v-autocomplete>
                        <v-btn small dark color="success" @click="marketPoint"><v-icon>mdi-plus-circle-outline</v-icon> Agregar</v-btn>
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
                              <th class="text-left">IMAGEN</th>
                              <th class="text-left">OPT</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(items, index) in pointsMarker" :key="items.NO">
                              <td>{{ items.Numero }}</td>
                              <td>{{ items.Detalle }}</td>
                              <td>{{ items.AveriaName }}</td>
                              <td>{{ items.Nombre }}</td>
                              <td style="cursor: pointer" @click="deletePoint(index)">
                                <v-icon>mdi-delete</v-icon>
                              </td>
                            </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                    <v-btn small dark color="blue-grey lighten-1" @click="antImg">Anterior</v-btn>
                    <v-btn small dark color="blue-grey lighten-1" @click="sigImg">Siguiente</v-btn>
                    ==== {{ tituloIMG }} ====
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
              <v-btn @click="printInfo" dark color="success">
                <v-icon>mdi-printer</v-icon> Imprimir
              </v-btn>
            </v-toolbar>
            <v-icon>mdi-cogs</v-icon>
            <span class="title">Datos Generales</span>
            <hr class="my-3">
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="viewCliente" label="Cliente" :disabled="true" prepend-icon="mdi-account-tie"></v-text-field>
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
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="viewNoLlantas" label="Vehiculo" :disabled="true" prepend-icon="mdi-car-info"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="viewInspector" label="Vehiculo" :disabled="true" prepend-icon="mdi-account"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <span class="subtitle-1 font-weight-bold">Llantas</span>
              </v-col>
              <v-col cols="4" sm="3" md="2" v-for="x in objLlantas">
                <v-card
                        class="mx-auto"
                        max-width="344"
                        outlined
                >
                  <v-card-text>
                    NS: {{x.SN}}<br> ECO: {{x.NumeroEconomico}}<br> MARC: {{x.Marca}}<br>MOD: {{x.Modelo}}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-icon>mdi-information-outline</v-icon>
            <span class="title">Estatus Inicial del Vehículo</span>
            <hr class="my-3">
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="viewCombustible" label="Combustible" :disabled="true" prepend-icon="mdi-gas-station"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="viewTipoCombustible" label="Tipo de Combustible" :disabled="true" prepend-icon="mdi-fuel"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="viewKm" label="Kilometraje" :disabled="true" prepend-icon="mdi-speedometer"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="viewFechaHraSalida" label="Fecha y Hora de Salida" :disabled="true" prepend-icon="mdi-calendar"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="viewComentario" label="Detalles del vehículo" :disabled="true" prepend-icon="mdi-comment"></v-text-field>
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
                          <th class="text-left">IMAGEN</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="items in pointsMarker" :key="items.NO">
                          <td>{{ items.Numero }}</td>
                          <td>{{ items.Detalle }}</td>
                          <td>{{ items.AveriaName }}</td>
                          <td>{{ items.Nombre }}</td>
                        </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-row>
                <v-btn small dark color="blue-grey lighten-1" @click="antImg">Anterior</v-btn>
                <v-btn small dark color="blue-grey lighten-1" @click="sigImg">Siguiente</v-btn>
                ==== {{ tituloIMG }} ====
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
// import { TweenMax } from 'gsap/TweenMax.js' //
// import axios from 'axios' //
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
      estacionDuenia: null,
      inspectorID: '',
      combustible: 0,
      tipoCombustible: '',
      listaCombustibles: [
        { 'id': 0, 'tipo_combustible': 'GASOLINA MAGNA' },
        { 'id': 1, 'tipo_combustible': 'GASOLINA PREMIUM' },
        { 'id': 2, 'tipo_combustible': 'DIESEL' },
        { 'id': 3, 'tipo_combustible': 'GAS' }
      ],
      lcombustible: ['Empty', '1/16', '1/8', '3/16', '1/4', '5/16', '3/8', '7/16', '1/2', '9/16', '5/8', '11/16', '3/4', '13/16', '7/8', '15/16', 'Full'],
      kilometraje: '',
      hsalida: '',
      detalleVehiculo: '',
      empleados: [],
      empledoName: null,
      jsonEmpleados: null,
      imgCarro: '',
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
      tipoChasis: null,
      arregloImgsCarro: [], //
      nameCliente: '',
      objLlantas: [],
      headerLlantas: [],
      tipoAverias: [
        { 'id': 1, 'TIPO': 'RAYON' },
        { 'id': 2, 'TIPO': 'ABOLLADURA' },
        { 'id': 3, 'TIPO': 'DAÑO GENERICO' }
      ],
      tipoAveriaID: null,
      listaChasis: [{ 'id': 1, 'nombre': 'AUTOBUS' }, { 'id': 2, 'nombre': 'CAMIONETA' }, { 'id': 3, 'nombre': 'SEDAN' }, { 'id': 4, 'nombre': 'PICKUP' }],
      chasisID: null,
      tiposDocumento: [{ 'id': 1, 'nombre': 'RENTA' }, { 'id': 2, 'nombre': 'DEVOLUCION' }],
      documentoID: null,
      botonSalir: 'Salir',
      clipped: true,
      drawer: false,
      fixed: false,
      logueado: null,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Kananfleet ®',
      proyectos: [],
      Encabezado_Tabla: [],
      Detalle_Tabla: [],
      search: ''
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
      vm.e6 = 1
      vm.pointsMarker = []
      vm.objLlantas = []
      vm.headerLlantas = []
      vm.px = null
      vm.py = null
      vm.chasisID = null
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
      if (vm.clienteName === '') {
        vm.msjException = true
        vm.msjAlerta = 'Seleccione un cliente'
        return
      }
      if (vm.contrato === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese un contrato'
        return
      }
      if (vm.factura === '') {
        //vm.msjException = true
        //vm.msjAlerta = 'Ingrese la factura'
        //return
      }
      if (vm.estacionDuenia === null) {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese la estación dueña'
        return
      }
      if (vm.vehiculoName === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija el vehículo'
        return
      }
      if (vm.inspectorID === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija un Inspector'
        return
      }
      if (vm.combustible === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija el combutible'
        return
      }
      if (vm.tipoCombustible === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija el tipo de combutible'
        return
      }
      if (vm.kilometraje === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese el Kilometraje'
        return
      }
      if (vm.fsalida === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija la fecha de salida'
        return
      }
      if (vm.time === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese la hora de salida'
        return
      }
      if (vm.TipoInspeccion === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija el tipo de documento'
        return
      }
      datosSend.FechaRegistro = new Date().toISOString().substr(0, 10)
      datosSend.ClienteID = vm.clienteName
      datosSend.Contrato = vm.contrato
      datosSend.Factura = vm.factura
      datosSend.Estacion = vm.estacionDuenia
      datosSend.VehiculoID = vm.vehiculoName
      datosSend.InspectorID = vm.inspectorID
      datosSend.TipoCombustibleID = vm.combustible
      datosSend.Kilometraje = vm.kilometraje
      datosSend.FechaSalida = vm.fsalida
      datosSend.HoraSalida = vm.time /////
      datosSend.DetalleVehiculo = vm.detalleVehiculo
      datosSend.Activo = 1
      datosSend.NombreCliente = vm.nameCliente
      datosSend.TipoInspeccion = vm.documentoID
      datosSend.TipoChasisID = vm.chasisID
      datosSend.Averias = vm.pointsMarker
      datosSend.Combustible = vm.tipoCombustible
      unirest('POST', vm.url + '/api/HojaInspeccion/AddHojaInspeccion')
        .headers({ 'Content-Type': 'application/json' })
        .send(JSON.stringify(datosSend))
        .end(function (res) {
          if (res.error) {
            throw new Error(res.error)
          }
          vm.saveCuestionario(res.body.hojasInspeccion[0].HojaInspeccionID)
          vm.getInfoInspeccionxID(res.body.hojasInspeccion[0].HojaInspeccionID)
          vm.msjException = true
          vm.msjAlerta = 'Hoja de Inspección creada con éxito No: ' + res.body.hojasInspeccion[0].HojaInspeccionID
          vm.dialog = false
          vm.searchInspeccion()
        })
    },
    saveCuestionario (HiID) {
      const vm = this
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
      vm.px = null
      vm.py = null
      vm.chasisID = null
      if (vm.clienteName === '') {
        vm.msjException = true
        vm.msjAlerta = 'Seleccione un cliente'
        return
      }
      if (vm.contrato === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese un contrato'
        return
      }
      if (vm.factura === '') {
        //vm.msjException = true
        //vm.msjAlerta = 'Ingrese una Factura'
        //return
      }
      if (vm.estacionDuenia === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese la estación dueña'
        return
      }
      if (vm.vehiculoName === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija el vehículo'
        return
      }
      if (vm.inspectorID === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija un Inspector'
        return
      }
      if (vm.combustible === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija el combutible'
        return
      }
      if (vm.tipoCombustible === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija el tipo de combutible'
        return
      }
      if (vm.kilometraje === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese el Kilometraje'
        return
      }
      if (vm.fsalida === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija la fecha de salida'
        return
      }
      if (vm.time === '') {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese la hora de salida'
        return
      }
      if (vm.TipoInspeccion === '') {
        vm.msjException = true
        vm.msjAlerta = 'Elija el tipo de documento'
        return
      }

      datosSend.HojaInspeccionID = vm.inspeccionID
      datosSend.FechaRegistro = new Date().toISOString().substr(0, 10)
      datosSend.ClienteID = vm.clienteName
      datosSend.Contrato = vm.contrato
      datosSend.Factura = vm.factura
      datosSend.Estacion = vm.estacionDuenia
      datosSend.VehiculoID = vm.vehiculoName
      datosSend.InspectorID = vm.inspectorID
      datosSend.TipoCombustibleID = vm.combustible // vm.tipoCombustible,--
      datosSend.Kilometraje = vm.kilometraje
      datosSend.FechaSalida = vm.fsalida
      datosSend.HoraSalida = vm.time
      datosSend.DetalleVehiculo = vm.detalleVehiculo
      datosSend.Activo = 1
      datosSend.NameCliente = vm.nameCliente
      datosSend.TipoInspeccion = vm.documentoID
      datosSend.TipoChasisID = vm.chasisID
      datosSend.Combustible = vm.tipoCombustible
      datosSend.Averias = vm.pointsMarker
      console.log(JSON.stringify(datosSend))
      unirest('POST', vm.url + '/api/HojaInspeccion/UpdateHojaInspeccion')
        .send(datosSend)
        .end(function (res) {
          if (res.error) {
            throw new Error(res.error)
          }
          vm.msjException = true
          vm.msjAlerta = 'Hoja de Inspección Actualizada con éxito'
          vm.dialog = false
        })
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
    getInfoInspeccionxID (x) {
      const vm = this
      vm.overlay = true
      unirest('GET', vm.urlTest + '/api/HojaInspeccion/GetByID/' + x)
        .end(function (res) {
          if (res.error) {
            throw new Error(res.error)
          }
          vm.overlay = false
          vm.rowData.push(res.body.hojasInspeccion[0])
        })
    },
    editInspeccion (x) {
      console.log(x)
      const vm = this
      let resultado = []
      vm.selected = []
      vm.banderaEdit = 1
      vm.overlay = true
      unirest('GET', vm.url + '/api/HojaInspeccion/GetByID/' + x.HojaInspeccionID)
        .end(function (res) {
          if (res.error) {
            throw new Error(res.error)
          }
          vm.pointsMarker = []
          vm.overlay = false
          resultado = res.body.hojasInspeccion[0]
          vm.inspeccionID = resultado.HojaInspeccionID
          vm.clienteName = resultado.Cliente.ClienteID
          vm.nameCliente = resultado.NombreCliente
          vm.contrato = resultado.Contrato
          vm.factura = resultado.Factura
          vm.estacionDuenia = parseInt(resultado.Estacion)
          vm.vehiculoName = resultado.Vehiculo.VehiculoID
          vm.inspectorID = resultado.Inspector.EmpleadoID
          vm.TipoCombustibleID = vm.combustible // vm.tipoCombustible
          vm.kilometraje = resultado.Kilometraje
          vm.fsalida = new Date(resultado.FechaSalida).toISOString().slice(0, 10)
          vm.time = resultado.HoraSalida
          vm.detalleVehiculo = resultado.DetalleVehiculo
          vm.marcaYmodelo = resultado.Vehiculo.Marca + '-' + resultado.Vehiculo.Modelo //
          vm.placas = resultado.Vehiculo.Placa
          vm.descripcion = resultado.Vehiculo.Descripcion
          vm.documentoID = resultado.TipoInspeccion
          vm.chasisID = resultado.TipoChasisID
          vm.tipoCombustible = resultado.Combustible
          vm.arregloImgsCarro = [
            { 'img': '/' + resultado.TipoChasisID + '_Frente.png', 'indice': 0, 'titulo': 'FRONTAL' },
            { 'img': '/' + resultado.TipoChasisID + '_Lateral_Der.png', 'indice': 1, 'titulo': 'LATERAL DER' },
            { 'img': '/' + resultado.TipoChasisID + '_Lateral_Izq.png', 'indice': 2, 'titulo': 'LATERAL IZQ' },
            { 'img': '/' + resultado.TipoChasisID + '_Trasera.png', 'indice': 3, 'titulo': 'TRASERA' }
          ]
          vm.imgCarro = '/' + resultado.TipoChasisID + '_Frente.png'
          vm.getLlantasVehiculo(resultado.Vehiculo.VehiculoID)
          // vm.nameCliente = resultado.NombreCliente
          const infoAverias = resultado.Averias
          for (let i = 0; i < infoAverias.length; i++) {
            const tipoAveriaName = vm.tipoAverias.filter((item) => {
              if (item.id === infoAverias[i].TipoAveria) {
                return item
              }
            })
            vm.pointsMarker.push({ 'AveriaID': infoAverias[i].AveriaID, 'Numero': infoAverias[i].Numero, 'Detalle': infoAverias[i].Detalle, 'EjeX': infoAverias[i].EjeX, 'EjeY': infoAverias[i].EjeY, 'ImagenID': infoAverias[i].Imagen.ImagenID, 'TipoAveria': tipoAveriaName[0].id, 'Nombre': vm.arregloImgsCarro[infoAverias[i].Imagen.ImagenID].titulo, 'AveriaName': tipoAveriaName[0].TIPO  })
          }
        })
      vm.dialog = true
      vm.e6 = 1
      setTimeout(() => {
        vm.paintPoints()
      }, 1000)
      vm.getRespuestasCuestionario(x.HojaInspeccionID)
    },
    searchInspeccion () {
      const vm = this
      const parametros = {}
      vm.Detalle_Tabla = []
      /* if (vm.noInspeccion === null || vm.noInspeccion === '' || vm.noInspeccion === 0 || isNaN(vm.noInspeccion) === true) {
        vm.msjException = true
        vm.msjAlerta = 'Ingrese un número de inspección válido'
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
      unirest('POST', vm.url + '/api/HojaInspeccion/GetByRango')
        .send(parametros)
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          if(vm.proyectos.length === 0) {
            vm.getSucursales()
          }
          vm.rowData = res.body.hojasInspeccion
          for (var i = 0; i < vm.rowData.length; i++) {
            if(isNaN(parseInt(vm.rowData[i].Estacion))){
              vm.rowData[i].Estacion_Name = vm.rowData[i].Estacion
            } else {
              var NameEstacion = vm.proyectos.filter((item) => {
                if (item.sucursal_id === parseInt(vm.rowData[i].Estacion)) {
                  return item
                }
              })
              vm.rowData[i].Estacion_Name = NameEstacion[0].sucursal_nombre

            }
            if (vm.rowData[i].TipoInspeccion === 1) {
              var tipoText = 'RENTA'
            } else {
              var tipoText = 'DEVOLUCION'
            }
            var fechaFormateada = new Date(vm.rowData[i].FechaRegistro).toISOString().slice(0, 10)
            var formatFecha =  vm.formatoFecha(fechaFormateada)
            var inspectorName = vm.rowData[i].Inspector.Nombre //+ ' ' + vm.rowData[i].Inspector.Apellido1
            vm.Detalle_Tabla.push({'HojaInspeccionID': vm.rowData[i].HojaInspeccionID,
                                   'TipoInspeccion': tipoText,
                                   'FechaRegistro': formatFecha ,
                                   'Cliente': vm.rowData[i].Cliente.RazonSocial,
                                   'Contrato': vm.rowData[i].Contrato,
                                   'Vehiculo': vm.rowData[i].Vehiculo.Nombre,
                                   'Factura': vm.rowData[i].Factura,
                                   'Estacion': vm.rowData[i].Estacion_Name,
                                   'Inspector': inspectorName
                                  })
          }
          vm.overlay = false
        })
    },
    getEmpleados () {
      const vm = this
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
      unirest('GET', vm.urlTest + '/api/Cuestionario/GetCuestionarioByID/1')
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.cuestionarioEmpresa = res.body.cuestionarios[0].Secciones
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
      const vm = this
      unirest('GET', vm.url + '/api/Vehiculo/GetByEmpresaIDNS/' + window.empreaID_session)
        .end(function (res) {
          if (res.error) { throw new Error(res.error) }
          vm.vehiculos = res.body
          vm.jsonVehiculos = res.body.map((item) => {
            return item.Nombre
          })
        })
    },
    printInspeccion (x) {
      const vm = this
      let resultado = []
      vm.overlay = true
      vm.px = null
      vm.py = null
      unirest('GET', vm.urlTest + '/api/HojaInspeccion/GetByID/' + x.HojaInspeccionID)
        .end(function (res) {
          if (res.error) {
            throw new Error(res.error)
          }
          vm.pointsMarker = []
          vm.dialogImpresion = true
          vm.overlay = false
          resultado = res.body.hojasInspeccion[0]
          vm.infoPrintInspeccion = resultado
          vm.viewInspeccionID = resultado.HojaInspeccionID
          vm.viewCliente = resultado.Cliente.RazonSocial
          vm.viewNameCliente = resultado.NombreCliente
          vm.viewContrato = resultado.Contrato
          vm.viewFactura = resultado.Factura
          var estacion = parseInt(resultado.Estacion)
          vm.viewVehiculo = resultado.Vehiculo.Nombre
          vm.viewMarcaMod = resultado.Vehiculo.Marca + '-' + resultado.Vehiculo.Modelo
          vm.viewDescripcion = resultado.Vehiculo.Descripcion
          vm.viewPlaca = resultado.Vehiculo.Placa
          vm.viewInspector = resultado.Inspector.Nombre + '-' + resultado.Inspector.Apellido1 + '-' + resultado.Inspector.Apellido2
          vm.viewNoLlantas = ''
          vm.viewCombustible = resultado.Combustible
          var tipoCombus = vm.listaCombustibles.filter((item) =>{
            if(item.id == resultado.TipoCombustibleID){
              return item
            }
          })
          vm.viewTipoCombustible = tipoCombus[0].tipo_combustible
          vm.viewComentario = resultado.DetalleVehiculo
          vm.viewKm = resultado.Kilometraje
          var HoraTime = resultado.HoraSalida
          var fechaSF = new Date(resultado.FechaSalida).toISOString().slice(0, 10)
          var fechaCF = vm.formatoFecha(fechaSF)
          vm.viewFechaHraSalida = fechaCF + ' : ' + HoraTime
          //vm.viewComentario = resultado.Detalles
          vm.chasisID = resultado.TipoChasisID
          var comodinEstacion = vm.proyectos.filter((item)=>{
            if(item.sucursal_id === estacion){
              return item
            }
          })
          vm.viewEstacion = comodinEstacion[0].sucursal_nombre
          vm.arregloImgsCarro = [
            { 'img': '/' + resultado.TipoChasisID + '_Frente.png', 'indice': 0, 'titulo': 'FRONTAL' },
            { 'img': '/' + resultado.TipoChasisID + '_Lateral_Der.png', 'indice': 1, 'titulo': 'LATERAL DER' },
            { 'img': '/' + resultado.TipoChasisID + '_Lateral_Izq.png', 'indice': 2, 'titulo': 'LATERAL IZQ' },
            { 'img': '/' + resultado.TipoChasisID + '_Trasera.png', 'indice': 3, 'titulo': 'TRASERA' }
          ]
          vm.imgCarro = '/' + resultado.TipoChasisID + '_Frente.png'
          vm.getLlantasVehiculo(resultado.Vehiculo.VehiculoID)
          const infoAverias = resultado.Averias
          for (let i = 0; i < infoAverias.length; i++) {
            const tipoAveriaName = vm.tipoAverias.filter((item) => {
              if (item.id === infoAverias[i].TipoAveria) {
                return item
              }
            })
            console.log(tipoAveriaName)
            vm.pointsMarker.push({ 'AveriaID': infoAverias[i].AveriaID, 'Numero': infoAverias[i].Numero, 'Detalle': infoAverias[i].Detalle, 'EjeX': infoAverias[i].EjeX, 'EjeY': infoAverias[i].EjeY, 'ImagenID': infoAverias[i].Imagen.ImagenID, 'TipoAveria': tipoAveriaName[0].id, 'Nombre': vm.arregloImgsCarro[infoAverias[i].Imagen.ImagenID].titulo, 'AveriaName': tipoAveriaName[0].TIPO})
          }
        })
      setTimeout(() => {//
        vm.paintPoints()
      }, 1000)
      vm.getRespuestasCuestionario(x.HojaInspeccionID)
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
          return//
        }
      }
      var tipoID = vm.tipoAverias.filter((item)=>{
        if(item.TIPO === vm.tipoAveriaID) {
         return item.id;
        }
      })
      vm.pointsMarker.push({ 'AveriaID': 0, 'Numero': (noPoints + 1), 'Detalle': vm.namePoint, 'EjeX': vm.px, 'EjeY': vm.py, 'ImagenID': vm.indiceImg, 'TipoAveria': tipoID[0].id, 'Nombre': vm.arregloImgsCarro[vm.indiceImg].titulo, 'AveriaName': vm.tipoAveriaID })
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
                           <circle cx="${vm.px}" cy="${vm.py}" z="5" r="10" stroke="#f0ab00" stroke-width="4" fill="#f0ab00" />
                           </circle>
                           <text x="${vm.px}" y="${vm.py}" text-anchor="middle" color="white" alignment-baseline="central" fill="black">
                               Point
                            </text>
                         </g>
                      </svg>`

      vm.svgTest = newSvg
      /* if (TweenMax.isTweening(vm.$refs.incomingDef)) {
        TweenMax.killTweensOf(vm.$refs.incomingDef)
        vm.$refs.incomingDef.style.opacity = '1'
      }
      TweenMax.to(vm.$refs.incomingDef, 0.5, { opacity: 0.3, repeat: -1, yoyo: true }) */
    },
    paintPoints () {
      const vm = this
      for (let i = 0; i < vm.pointsMarker.length; i++) {
        var tipoAveria = vm.pointsMarker[i].AveriaName
        if (tipoAveria == 'RAYON'){
          var colorPoint = '#baf1a1'
        } else if(tipoAveria == 'ABOLLADURA') {
          var colorPoint = '#ea728c'
        }else{
          var colorPoint = '#459CD2'
        }
        if (vm.pointsMarker[i].ImagenID === vm.indiceImg) { //
          const newSvg = `<svg width="100%" id="punto-defectiva" height="100%" style="position: absolute; left: 0px; top: 0px;pointer-events: none; z-index: 1000">
                         <g>
                           <circle cx="${vm.pointsMarker[i].EjeX}" cy="${vm.pointsMarker[i].EjeY}" z="5" r="10" stroke="${colorPoint}" stroke-width="4" fill="${colorPoint}" />
                           </circle>
                           <text x="${vm.pointsMarker[i].EjeX}" y="${vm.pointsMarker[i].EjeY}" text-anchor="middle" color="white" alignment-baseline="central" fill="black">
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
    printInfo () {
      const vm = this
      let allPreg = ''
      let respuestaE = ''
      let respuestaS = ''
      let allPoints = ''
      var pointTest = ''
      for (let i = 0; i < vm.cuestionarioEmpresa.length; i++) {
        allPreg += '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">' + vm.cuestionarioEmpresa[i].NombreSeccion + '</td>' +
        '<td style="border: 1px solid #ddd;">S</td>' +
        '<td style="border: 1px solid #ddd;">E</td>'
        for (let x = 0; x < vm.cuestionarioEmpresa[i].Preguntas.length; x++) {
          for (let y = 0; y < vm.selected.length; y++) {
            if (vm.selected[y].PreguntaID === vm.cuestionarioEmpresa[i].Preguntas[x].PreguntaID) {
              respuestaE = 'x'
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
      var averias = vm.infoPrintInspeccion.Averias
      for (let c = 0; c < averias.length; c++) {
        if (averias[c].EjeX != null && averias[c].EjeY != null) {
          if (averias[c].Imagen.ImagenID === 0) {
            if(averias[c].EjeX > 300) {
              var factorSuma = 56;
            }else{
              var factorSuma = 10;
            }
            var ejeX = averias[c].EjeX - factorSuma
            var ejeY = averias[c].EjeY + 185
          }
          else if(averias[c].Imagen.ImagenID === 1){
            var ejeX = averias[c].EjeX - 45
            var ejeY = averias[c].EjeY - 85
          }else if(averias[c].Imagen.ImagenID === 2){
            var ejeX = averias[c].EjeX - 100
            var ejeY = averias[c].EjeY + 50
          }else if(averias[c].Imagen.ImagenID === 3){
            if(averias[c].EjeY > 140) {
              var factorSuma = 315;
            }else{
              var factorSuma = 390;
            }
            if(averias[c].EjeX > 300) {
              var factorEjeX = 56;
            }else{
              var factorEjeX = 0;
            }
            var ejeX = averias[c].EjeX - factorEjeX
            var ejeY = averias[c].EjeY + factorSuma
          }
          else{
            var ejeX = averias[c].EjeX
            var ejeY = averias[c].EjeY
          }///
          if(averias[c].TipoAveria === 1){
             var shape = 'X'
          }else if(averias[c].TipoAveria === 2){
            var shape = '0'
          }else{
            var shape = 'D'
          }
          allPoints += '<span style="position:absolute; margin-top:' + ejeY + 'px; margin-left:' + ejeX + 'px; z-index: 2">' + shape +'</span>'
        }
      }
      var fechaSF = new Date(vm.infoPrintInspeccion.FechaSalida).toISOString().slice(0, 10)
      var fechaCF = vm.formatoFecha(fechaSF)

      const urlImgFrente = '/' + vm.infoPrintInspeccion.TipoChasisID + '_Frente_imp.png'
      const urlImgLatIzq = '/' + vm.infoPrintInspeccion.TipoChasisID + '_Lateral_Izq_imp.png'
      const urlImgLatDer = '/' + vm.infoPrintInspeccion.TipoChasisID + '_Lateral_Der_imp.png'
      const urlImgTrasera = '/' + vm.infoPrintInspeccion.TipoChasisID + '_Trasera_imp.png'
      const divToPrint = '<div style="text-align: center; margin-top: -20px"><h3>INVERSIONES GLOBALES S.A DE C.V</h3></div><h6 style="text-align: center; margin-top: -12px">HOJA DE INSPECCION DEL VEHICULO/VEHICLE INSPECTION SHEET</h6>' +
        '<table style="width: 100%; text-align: left; font-size: 12px; margin-top: -20px">' +
        '<tr>' +
        '<td>Cliente/ Customer Name</td>' +
        '<td>' + vm.infoPrintInspeccion.Cliente.Nombre + '</td>' +
        '<td>Marca & Model/ Brand & Model</td>' +
        '<td>' + vm.infoPrintInspeccion.Vehiculo.Marca + '-' + vm.infoPrintInspeccion.Vehiculo.Modelo + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Contrato No/ RA No:</td>' +
        '<td>' + vm.infoPrintInspeccion.Contrato + '</td>' +
        '<td>Color of Vehicle:</td>' +
        '<td></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Factura No/ Receipt No:</td>' +
        '<td>' + vm.infoPrintInspeccion.Factura + '</td>' +
        '<td>Placa No/ Plate No:</td>' +
        '<td>' + vm.infoPrintInspeccion.Vehiculo.Placa + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Estación Dueña/ Owner Station:</td>' +
        '<td>' + vm.infoPrintInspeccion.Estacion + '</td>' +
        '<td>No Vehiculo/ Vehicle No:</td>' +
        '<td>' + vm.infoPrintInspeccion.Vehiculo.VehiculoID + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Inspector de Operaciones</td>' +
        '<td colspan="3">' + vm.infoPrintInspeccion.Inspector.Nombre + ' ' + vm.infoPrintInspeccion.Inspector.Apellido1 + ' ' + vm.infoPrintInspeccion.Inspector.Apellido1 + '<td>' +
        '</tr>' +
        '</table>' +
        '<h6 style="text-align: center; margin-top: -1px">ESTATUS DEL VEHICULO AL INICIO DEL ALQUILER / VEHICLE STATUS AT CHECK OUT TIME</h6><hr style="margin-top: -21px">' +
        '<table style="border-collapse: collapse; font-size: 11px; width: 100%">' +
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
        '<td style="border: 1px solid #ddd;">' + vm.infoPrintInspeccion.Kilometraje + '</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">' + fechaCF + '</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td colspan="6" style="border: 1px solid #ddd;">' + vm.infoPrintInspeccion.TipoCombustibleID + '</td>' +
        '</tr>' +
        '</table>' +
        '<h6 style="text-align: center; margin-top: 6px">DETALLES DEL VEHICULO / VEHICLE DETAILS</h6><hr style="margin-top: -21px">' +
        '<table style="width: 40%; font-size: 9px;border-collapse: collapse;">' +
        allPreg +
      '</table>' +
      '<div style="width: 57%; height: 30%; position: absolute; margin-left: 297px; margin-top: -730px">' +
        allPoints +
        '<div style="margin-left: 100px"><img src="' + urlImgLatDer + '" width="80%" alt="Img1"/></div>' +
        '<div style="margin-top: 10px; margin-left: 100px"><img src="' + urlImgLatIzq + '" width="80%" alt="Img2"/></div>' +
        '<div style="margin-top: 25px; margin-left: 150px"><img src="' + urlImgFrente + '" width="60%" alt="Img3"/></div>' +
        '<div style="margin-top: 20px; margin-left: 150px"><img src="' + urlImgTrasera + '" width="65%" alt="Img4"/></div>' +
        '<table style="border-collapse: collapse; font-size: 10px; width: 50%; margin-top: 36px; margin-left: 20px">' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">Observaciones del punto 7</td>' +
        '<td style="border: 1px solid #ddd;">S</td>' +
        '<td style="border: 1px solid #ddd;">E</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd;">' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '</table>' +
        '<table style="border-collapse: collapse; font-size: 10px; width: 45%; margin-top: -96px; margin-left: 250px">' +
        '<tr style="border: 1px solid #ddd; text-align: center">' +
        '<td style="border: 1px solid #ddd;" colspan="2">Rayones y Golpes</td>' +
        '</tr>' +
        '<tr style="border: 1px solid #ddd; text-align: center">' +
        '<td style="border: 1px solid #ddd;">Rayones  = x</td>' +
        '<td style="border: 1px solid #ddd;">Golpes = 0</td>' +
        '</tr>' +
        '</table>' +
        '<div style="font-size: 10px; width: 45%; margin-left: 250px">Observaciones al momento del alquiler / Further Observations at Check - Out Time</div>' +
        '<div style="font-size: 10px; width: 45%; margin-left: 250px; margin-top: 5px">______________________________________</div>' +
        '<div style="font-size: 10px; width: 45%; margin-left: 250px; margin-top: 5px">______________________________________</div>' +
        '</div>' +
        '<h6 style="text-align: center; margin-top: 90px">MARCA Y NUMERACION DE LAS LLANTAS / BRAND AND DIMENSION ON TIRES</h6><hr style="margin-top: -20px">' +
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
        '<span style="font-size:10px">Sales Inspector Signature/Firma Vendedor o Inspector Operaciones: __________________________     Customer Signature/Firma del Cliente: _______________________________</span>' +
        '<h6 style="text-align: center; margin-top: 10px">ESTATUS DEL VEHICULO AL MOMENTO DE ENTREGAR VEHICULO/ VEHICLE STATUS AT CHECK OUT TIME</h6><hr style="margin-top: -20px">' +
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
        '<td style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td colspan="5" style="border: 1px solid #ddd;">&nbsp;</td>' +
        '<td colspan="6" style="border: 1px solid #ddd;">&nbsp;</td>' +
        '</tr>' +
        '</table>' +
        '<span style="font-size:10px; margin-top: 20px;">Observaciones de Entrada/Final Observations:_________________________________________________________________________________________________________</span>' +
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
        newWin.close()
      }, 550)
    },
    dateFormatter (params) {
      return new Date(params.value).toISOString().slice(0, 10)
    },
    setTipoChasis () {
      const vm = this
      vm.tipoChasis = vm.chasisID
      vm.arregloImgsCarro = [
        { 'img': '/' + this.tipoChasis + '_Frente.png', 'indice': 0, 'titulo': 'FRONTAL' },
        { 'img': '/' + this.tipoChasis + '_Lateral_Der.png', 'indice': 1, 'titulo': 'LATERAL DER' },
        { 'img': '/' + this.tipoChasis + '_Lateral_Izq.png', 'indice': 2, 'titulo': 'LATERAL IZQ' },
        { 'img': '/' + this.tipoChasis + '_Trasera.png', 'indice': 3, 'titulo': 'TRASERA' }
      ]
      vm.imgCarro = '/' + this.tipoChasis + '_Frente.png'
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
      return this.formatoFecha(this.fcalendarEdit)//
    },
    computedFin () {
      return this.formatoFecha(this.fcalendarFinal)
    },
    computedFSalida (){
      return this.formatoFecha(this.fsalida)
    }
  },
  beforeMount () {
    window.vm = this
    this.columnDefs = [
      { headerName: 'NO', field: 'HojaInspeccionID', width: 60 },
      { headerName: 'TIPO', field: 'TipoInspeccion', width: 110, cellRenderer: (data) => { if (data.data.TipoInspeccion === 1) { return 'RENTA' } else if (data.data.TipoInspeccion === 2) { return 'DEVOLUCION' } } },
      { headerName: 'FECHA', field: 'FechaRegistro', width: 110, valueFormatter: this.dateFormatter },
      { headerName: 'CLIENTE', field: 'Cliente.RazonSocial' },
      { headerName: 'CONTRATO', field: 'Contrato', width: 120 },
      { headerName: 'VEHICULO', field: 'Vehiculo.Nombre', width: 120 },
      { headerName: 'FACTURA', field: 'Factura', width: 120 },
      { headerName: 'ESTACION', field: 'Estacion_Name', width: 130 },
      { headerName: 'INSPECTOR', field: 'Inspector.Nombre', width: 120 },
      { headerName: 'OPCIONES', filter: false, width: 120, cellRenderer: function boton (params) { return `<span class="v-btn__content"><i class="v-icon notranslate mdi mdi-square-edit-outline" style="cursor: pointer" title="Editar" onclick="vm.editInspeccion(` + params.data.HojaInspeccionID + `)"></i> <i class="v-icon notranslate mdi mdi-printer" style="cursor: pointer" title="Imprimir" onclick="vm.printInspeccion(` + params.data.HojaInspeccionID + `)"></i></span>` } }
    ]
    this.Encabezado_Tabla= [
      { text: 'NO', value: 'HojaInspeccionID', class: ['blue-grey darken-2', 'white--text'], sortable: false },
      { text: 'TIPO', value: 'TipoInspeccion', class: ['blue-grey darken-2', 'white--text'], sortable: false },
      { text: 'FECHA', value: 'FechaRegistro', class: ['blue-grey darken-2', 'white--text'], sortable: false, width: 110},
      { text: 'CLIENTE', value: 'Cliente', class: ['blue-grey darken-2', 'white--text'], sortable: false, width: 290 },
      { text: 'CONTRATO', value: 'Contrato', class: ['blue-grey darken-2', 'white--text'], sortable: false },
      { text: 'VEHICULO', value: 'Vehiculo', class: ['blue-grey darken-2', 'white--text'], sortable: false, width: 130 },
      { text: 'FACTURA', value: 'Factura', class: ['blue-grey darken-2', 'white--text'], sortable: false, width: 130 },
      { text: 'ESTACION', value: 'Estacion', class: ['blue-grey darken-2', 'white--text'], sortable: false, width: 190 },
      { text: 'INSPECTOR', value: 'Inspector', class: ['blue-grey darken-2', 'white--text'], sortable: false, width: 130 },
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
  },
  mounted () {
    window.vm = this
    window.vm.banderaEdit = 0
    window.vm.loginOK = window.$nuxt._route.params.hoja
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
    window.vm.logueado = true
    window.vm.getSucursales()
    window.vm.getVehiculos()
    window.vm.getClientes()
    window.vm.getEmpleados()
    window.vm.getCuestionario()
    window.vm.searchInspeccion()
  }
}
</script>
