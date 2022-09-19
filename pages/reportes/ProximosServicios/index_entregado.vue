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
        <v-toolbar-title v-text="title_Page"/>
        <v-spacer />
        <img src="/logo.png" width="12%" max-height="5%" alt="Logo Kananfleet"/>
      </v-app-bar>
    </v-layout>
    <v-flex lg12 md12>
      <div class="headline">
        <!--v-icon color="black">mdi-clipboard-check</v-icon-->
        REPORTE ESTATUS ORDEN DE SERVICIO (O.S.)/PRÓXIMOS SERVICIOS
        <hr class="my-3">
      </div>
      <div class="headline">
        <!--v-icon color="black">mdi-clipboard-check</v-icon-->
        REPORTE ESTATUS ORDEN DE SERVICIO (O.S.)/PRÓXIMOS SERVICIOS
        <hr class="my-3">
      </div>
      <!-- page-->
      <v-layout row wrap>
        <v-flex xs2>
          <div style="margin-left: 3%; margin-top: 7%;">
            <v-select
              label="sucursal_nombre"
              v-model="modelSelect"
              :options="selectSucursal"
              @change="ChangeProyecto"
              placeholder="Proyecto"
              
            ></v-select>
          </div>
        </v-flex>  
        
        <v-flex xs2>
          <div style="margin-left: 3%; margin-top: 7%; width:300px">
            <v-select
              label="estastus_nombre"
              v-model="modelSelectEstatico"
              :options="selectEstatus"
              @change="ChangeEstatus"
              placeholder="Estatus"
              
            ></v-select>
          </div>
        </v-flex>   
        <!--<v-flex xs2>
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
        </v-flex>
        <v-flex xs2>
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
        </v-flex>-->
        <v-flex xs2 style="max-width: 100px;">
          <div style="margin-left: 110%; margin-top: 14%; width:200px">
            <v-btn @click="excel" small dark color="green">
              <v-icon>mdi-file-excel</v-icon> PREVISIÓN
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs2 style="max-width: 100px;">
          <div style="margin-left: 135%; margin-top: 14%;">
            <v-btn @click="pdf" small dark color="green">
              <v-icon>mdi-file-pdf-box</v-icon> PDF
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs2>
          <div style="margin-left: 55%; margin-top: 7%;">
            <v-btn small color="primary" @click="getGraficaDetalle">
              <v-icon>mdi-magnify</v-icon> Buscar
            </v-btn>
          </div>
        </v-flex>
        <!-- Calendario -->
        <v-flex xs12>
          <v-row class="fill-height">
            <v-col>
            <v-col xs12 sm12 md2>
            <v-icon color="cyan">mdi-brightness-1</v-icon> O.S. Programada
            <v-icon color="yellow">mdi-brightness-1</v-icon> O.S. En Proceso (En Tiempo)
            <v-icon color="orange">mdi-brightness-1</v-icon> O.S. En Proceso (Con Retraso)
            <v-icon color="red lighten-1">mdi-brightness-1</v-icon> O.S. Pasada de Fecha
            <v-icon color="green">mdi-brightness-1</v-icon> O.S. Finalizado (En Tiempo y Forma)
            </v-col>
              <v-sheet height="70">
                <v-toolbar flat color="white">
                  <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                    Hoy
                  </v-btn>
                  <v-btn fab text small color="grey darken-2" @click="prev">
                    <v-icon small>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn fab text small color="grey darken-2" @click="next">
                    <v-icon small>mdi-chevron-right</v-icon>
                  </v-btn>
                  <v-toolbar-title>{{ title }}</v-toolbar-title>
                  <v-menu bottom right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        outlined
                        color="grey darken-2"
                        v-on="on"
                      >
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right>mdi-menu-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list style="background-color: white;"
                    >
                      <v-list-item @click="type = 'day'">
                        <v-list-item-title>Día</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'week'">
                        <v-list-item-title>Semana</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'month'">
                        <v-list-item-title>Mes</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = '4day'">
                        <v-list-item-title>4 días</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar>
              </v-sheet>
              <v-sheet height="600">
                <v-calendar
                  ref="calendar"
                  v-model="focus"
                  color="primary"
                  :events="events"
                  :event-color="getEventColor"
                  :now="today"
                  :type="type"
                  @click:event="showEvent"
                  @click:more="viewDay"
                  @click:date="viewDay"
                  @change="updateRange"
                  locale="es"
                   
                ></v-calendar>
                <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
                  <v-card color="grey lighten-4" min-width="350px" flat>
                    <v-toolbar :color="selectedEvent.color" dark>
                      <!--v-btn icon>
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn-->
                      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                      <v-spacer></v-spacer>
                      <!--v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn-->
                      <!--v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn-->
                    </v-toolbar>
                    <v-card-text>
                      <span v-html="selectedEvent.details"></span>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn text color="secondary" @click="selectedOpen = false">
                        Cerrar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </v-sheet>
            </v-col>
          </v-row>
        </v-flex>
        <!-- Calendario -->
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
      <!-- page -->
    </v-flex>
  </v-layout>
</template>
<script>
  import vSelect from 'vue-select'
  import unirest from 'unirest'
  import XLSX from 'xlsx'
export default {
  components: {
    vSelect,
    XLSX
  },
  data () {
    return {
      informaciondummy: [],
      ReporteExcel: [],
      title_Page: 'Reportes',
      modelSelectMante: [],
      dataSelectMante: [],
      modelSelectTMant: [],
      dataSelectTMant: [],
      modelSelect: [],
      modelSelectEstatico:[],
      selectSucursal: [],
      selectEstatus:[],
      modelSelectTMmnto: [],
      dataSelectTmmnto: [],
      valid: false,
      mfechaEdit: false,
      fcalendarEdit: new Date().toISOString().substr(0, 10),
      validFinal: false,
      mfechaEditFinal: false,
      fcalendarFinal: new Date().toISOString().substr(0, 10),
      columnDefs: [],
      rowData: [],
      expand: false,
      eficienciaDet: true,
      eficiencia: true,
      dialog: false,
      dialog_defaul: false,
      pieLabel: [],
      pieData: [],
      barLabel: [],
      barData: [],
      lineLabel: [],
      lineData: [],
      modelTipoGrafica: 'line',
      tipoGrafica: ['line', 'bar', 'radar', 'pie', 'doughnut', 'polarArea'],
      Temporal: null,
      /* Calendario */
      today: null,
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'MES',
        week: 'SEMANA',
        day: 'DIA',
        '4day': '4 DIAS'
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      overlay: false,
      msjAlerta: '',
      msjException: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      /* Calendario */
      /* Generador arreglo */
      year: new Date().toISOString().substr(0, 4),
      fecha: new Date().toISOString().substr(0, 10)
      /* Generador arreglo */
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
      //for (let f = 0; f < this.modelSelect.length; f++) {
        if(this.modelSelect != null)
        {
          if (this.modelSelect.sucursal_id === 0) {
          this.modelSelect = this.selectSucursal
          }
        }
        
      //}
      console.log(this.modelSelect)
    },
    ChangeEstatus(event)
    {
        if(this.modelSelectEstatico !=null)
        {
          if(this.modelSelectEstatico == 0)
          {
            this.modelSelectEstatico = this.selectEstatus
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
    getDataArr () {
      const vm = this
      console.log('function: getDataArr(). ')

      // Recupera sucursales
      unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarSucursales')
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
      unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarTipoVehiculos')
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
      unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarMantenibles')
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
    getGraficaDetalle () {
      const vm = this
      console.log('function: getGraficaDetalle().')
      const empresa = vm.getEmpresa()
      const sucursal = vm.getSucursal()
      const tipoMantenible = vm.getTipoMantenible()
      const mantenible = vm.getMantenible()
      const estatus = vm.getEstatus()
      /*console.log(empresa)
      console.log(sucursal)
      console.log(tipoMantenible)
      console.log(mantenible)*/
      vm.overlay = true
      unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarReporteProximosServicios')
        .send({
          'EmpresaID': empresa,
          "sucursal_id": sucursal,
          "tipoMantenible_id": tipoMantenible,
          "tipomantenimientoid": 0,
          "estatus_id":estatus,
          "mantenible_id":[ mantenible ]
        }).end(function (res) {
        vm.overlay = false
          if (res.error) {
            vm.msjAlerta = 'No se encontraron datos para mostrar'
            this.msjException = true
            throw new Error(res.error)
          }
          
          //vm.rowData = vm.informaciondummy;
          vm.rowData = res.body.obj
          vm.generaCalendario()

          console.log('Arreglo: ')
          console.log(res.body)
        })
    },
    getEmpresa () {
      // const vm = this
      console.log('function: getEmpresa(). ')
      const dato = this.$nuxt._route.query.id
      return dato
    },
    getSucursal () {
      const vm = this
      console.log('function: getSucursal(). ')
      let dato = 0
      if (vm.modelSelect != null) {
        /*if (vm.modelSelect.length > 0) {
          dato = vm.modelSelect[0].sucursal_id
        }*/
        if(vm.modelSelect != null)
        {
          dato = vm.modelSelect.sucursal_id
        }
      }
      
      /*
      for (let i = 0; i < vm.modelSelect.length; i++) {
        if (dato === '') {
          dato += vm.modelSelect[i].sucursal_id
        } else {
          dato += ',' + vm.modelSelect[i].sucursal_id
        }
      }
      */
      return dato
    },
    getEstatus () {
      const vm = this
      console.log('function: getEstatus(). ')
      let dato = 0
      if (vm.modelSelectEstatico != null) {
        if (vm.modelSelectEstatico.length > 0) {
          dato = vm.modelSelect.estatus_id
        }
        if(vm.modelSelectEstatico != null)
        {
          dato = vm.modelSelectEstatico.estatus_id
        }
      } 
      return dato
    },
    getTipoMantenible () {
      const vm = this
      console.log('function: getTipoMantenible(). ')
      let dato = 0
      if (vm.modelSelectTMant != null) {
        if (vm.modelSelectTMant.length > 0 ) {
          dato = vm.modelSelectTMant[0].tipovehiculo_id
        }
      }
      /*
      for (let i = 0; i < vm.modelSelectTMant.length; i++) {
        if (dato === '') {
          dato += vm.modelSelectTMant[i].tipovehiculo_id
        } else {
          dato += ',' + vm.modelSelectTMant[i].tipovehiculo_id
        }
      }
      */
      return dato
    },
    getMantenible () {
      const vm = this
      console.log('function: getMantenible(). ')
      let dato = ''
      if (vm.modelSelectMante != null) {
        if (vm.modelSelectMante.length > 0) {
          for (let i = 0; i < vm.modelSelectMante.length; i++) {
            if (dato === '') {
              dato = '' + vm.modelSelectMante[i].mantenible_id + ''
            } else {
              dato += ', ' + '' + vm.modelSelectMante[i].mantenible_id + ''
            }
          }
        }
      }
      return dato
    },

    /* Calendario */
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    generaCalendario() {
      let vm = this
      console.log('function: generaCalendario(). ')
      var color = ''
      vm.events = []
      if (vm.rowData == null) {
        return
      }
      for (var i=0; i<vm.rowData.length; i++) {
        var fecha_arr = new Date(vm.rowData[i].FechaRecepcion)
        var fecha_arr2 = new Date(vm.rowData[i].FechaSalida)
        var SumaDias = 1; //parseInt(vm.rowData[i].recurrencia_dias_servicio)
        var StringAnio = new Date().toISOString().substr(0, 4)
        var StringPro = fecha_arr.toISOString().substr(0, 4)
        var AnioAhora = parseInt(StringAnio)
        AnioAhora = AnioAhora + 1
        var AnioPro = parseInt(StringPro)
        //while (AnioAhora >= AnioPro) {
          //fecha_arr.setDate(fecha_arr.getDate() );
          var etiquetaestatus;
          var HoraInicio =  fecha_arr.toISOString().substr(0, 10) + " " + (fecha_arr.getHours()>9?fecha_arr.getHours(): "0"+fecha_arr.getHours()   )+ ":" + ( fecha_arr.getMinutes()>9? fecha_arr.getMinutes(): "0"+ fecha_arr.getMinutes()) ; //"2020-05-01 08:00";  //
          var HoraFin =  fecha_arr2.toISOString().substr(0, 10) + " " +  (fecha_arr2.getHours()>9?fecha_arr2.getHours(): "0"+fecha_arr2.getHours()   )+ ":" + (fecha_arr2.getMinutes()>9?fecha_arr2.getMinutes(): "0"+fecha_arr2.getMinutes() ); //"2020-05-01 10:00" ;//
           console.log(i);
          console.log(HoraInicio + " " + fecha_arr);
          console.log(HoraFin + " " + fecha_arr2);
          
          switch (vm.rowData[i].Estatus) {
            case "1":
              color = 'cyan'  // Programado
              etiquetaestatus = "Programado";
              break
            case "2":
              color = 'yellow' // En proceso
              etiquetaestatus = "En Proceso (En tiempo)";
              break
            case "3":
              color = 'red lighten-1' // 
              etiquetaestatus = "Pasado de Fecha";
              break
            case "4":
              color = 'green'
              etiquetaestatus = "En Tiempo y Forma";
              break
            case "5":
              color = 'orange'
              etiquetaestatus = "En Proceso (Con Retraso)";
              break
             
          }
          // Validar que se no se repitan los colores rojos
          var refacciones = "";
          for(var j=0; j<vm.rowData[i].listRefaccion.length; j++)
          {
              refacciones += "<tr><td><center>" + vm.rowData[i].listRefaccion[j].cantidadArticulo + "</center></td><td>" + vm.rowData[i].listRefaccion[j].articulocodigo + "</td><td>" + vm.rowData[i].listRefaccion[j].nombrearticulo + "</td> ";
          }

          var herramienta = "";
          for(var j=0; j<vm.rowData[i].listHerramienta.length; j++)
          {
              herramienta += "<tr><td><center>" + vm.rowData[i].listHerramienta[j].cantidadHerramienta + "</center></td><td>" + vm.rowData[i].listHerramienta[j].HerramientaCodigo + "</td><td>" + vm.rowData[i].listHerramienta[j].HerramientaNombre + "</td> ";
          }

          vm.events.push({
            name: vm.rowData[i].FolioOrden + "-" + etiquetaestatus ,
            start: HoraInicio,
            end: HoraFin,
            color: color,
            details: "<b>Folio: </b><br>" + vm.rowData[i].FolioOrden + "<br>" +
                      "<b>Vehículo/Mantenible:</b><br>"  +
                       vm.rowData[i].mantenible_nombre + 
                      "<br><b>Rutina:</b> <br>" + 
                      vm.rowData[i].nombre_rutina + "<br>" + 
                      "<b>Sucursal:</b> <br>" + 
                      vm.rowData[i].sucursal_nombre + "<br>" + 
                      "<b>Estatus de la Orden:</b> <br>" + 
                      vm.rowData[i].estatusOrden + "<br>" + 
                      "<b>F. Recepción:</b> <br>" + 
                      HoraInicio + " <br>" +
                      "<b>F. Salida:</b> <br>" +
                      //vm.rowData[i].FechaSAlida.toISOString().substr(0, 10) + " " +  (vm.rowData[i].FechaSAlida.getHours()>9?vm.rowData[i].FechaSAlida.getHours(): "0"+vm.rowData[i].FechaSAlida.getHours()   )+ ":" + vm.rowData[i].FechaSAlida.getMinutes() + "<br>" + 
                      HoraFin + " <br>" +
                      "<br> <b>Refacciones: </b> <br>" + 
                      "<table  border='1' cellspacing='0' cellpadding='1' align='center'> <tr bgcolor='" + color + "'  > <th style='color:#FFFFFF';>Cant. </th> <th style='color:#FFFFFF';>Cod. </th> <th style='color:#FFFFFF';>Desc. </th></tr>"+refacciones+"</table>" + 
                      "<br> <b>Herramientas: </b> <br>" + 
                      "<table border='1' cellspacing='0' cellpadding='1' align='center' > <tr bgcolor='" + color + "'> <th style='color:#FFFFFF';>Cant. </th> <th style='color:#FFFFFF';>Cod. </th> <th style='color:#FFFFFF';>Desc. </th></tr>"+herramienta+"</table>"
          })
          //var FechaWhile = new Date(fecha_arr).toISOString().substr(0, 10)
          StringPro = fecha_arr.toISOString().substr(0, 4)
          AnioPro = parseInt(StringPro)
        //}
      }
      console.log(vm.events)
    },
    procesarArchivoExcel( )
    {
      const vm = this
      const empresa = vm.getEmpresa()
      const sucursal = vm.getSucursal()
      const tipoMantenible = vm.getTipoMantenible()
      const mantenible = vm.getMantenible()
      var meses = ["ENERO","FEBRERO","MARZO","ABRIL", "MAYO", "JUNIO", "JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
      vm.ReporteExcel = [];
      /*console.log(empresa)
      console.log(sucursal)
      console.log(tipoMantenible)
      console.log(mantenible)*/
      vm.overlay = true
      unirest('POST', 'http://localhost:51104//api/Reportes/ConsultarReporteProximosServicios')
        .send({
          'EmpresaID': empresa,
          "sucursal_id": sucursal,
          "tipoMantenible_id": tipoMantenible,
          "tipomantenimientoid": 0,
          "mantenible_id":[ mantenible ]
        }).end(function (res) {
        vm.overlay = false
          if (res.error) {
            vm.msjAlerta = 'No se encontraron datos para mostrar'
            this.msjException = true
            throw new Error(res.error)
          }
          
          //vm.rowData = vm.informaciondummy;
          vm.rowData = res.body.obj
          var fechaActual =  Date.now();
          var fechaparames = new Date();
          var mes = fechaparames.getMonth() + 1;
          var dia = fechaparames.getDate();
          var anio = fechaparames.getFullYear();
          var fechadiahoy = new Date(anio,mes,dia);
          for (var i=0; i<vm.rowData.length; i++) {
            var fecha_evento = new Date(vm.rowData[i].FechaRecepcion)
            var anioEvento = fecha_evento.toISOString().substr(0, 4);
            var mesEvento = fecha_evento.toISOString().substr(5, 2);
            var diaEvento = fecha_evento.toISOString().substr(7, 2);
            var fechaEvento =  new Date(anioEvento, mesEvento, diaEvento);
             
            for(var j=0; j<vm.rowData[i].listRefaccion.length; j++)
            {
              if(fechaEvento>= fechadiahoy)
              {
                let articulo = {
                  "NumeroArticulo":vm.rowData[i].listRefaccion[j].articulocodigo ,
                  "Descripcion":vm.rowData[i].listRefaccion[j].nombrearticulo ,
                  "Almacen":vm.rowData[i].listRefaccion[j].almacenSAP
                  
                };
                
                const found = vm.ReporteExcel.find(element => element.NumeroArticulo == vm.rowData[i].listRefaccion[j].articulocodigo);
                if(found == null)
                {
                  for(var k=parseInt(mes)  ; k <  parseInt(mes) + 6; k++)
                  {
                    
                    if(k>12)
                      if(k == parseInt(mesEvento -1))
                        articulo[meses[k ]] = vm.rowData[i].listRefaccion[j].cantidadArticulo;
                      else
                        articulo[meses[k ]] = 0;
                    else
                      if(k == parseInt(mesEvento-1))
                        articulo[meses[k ]] = vm.rowData[i].listRefaccion[j].cantidadArticulo;
                      else
                        articulo[meses[k ]] = 0;
                  }
                  vm.ReporteExcel.push(articulo);
                }                  
                else
                {
                  
                  for(var x = 0; x<  vm.ReporteExcel.length; x++)
                  {
                    
                    if(vm.ReporteExcel[x].NumeroArticulo == vm.rowData[i].listRefaccion[j].articulocodigo )
                    {
                       for(var y=parseInt(mes)    ; y < parseInt(mes) + 6; y++)
                      {
 
                        if(y == parseInt(mesEvento)-1)
                        {
                          var c = 0;
                          c = vm.ReporteExcel[x][meses[y  ]];
                          c += vm.rowData[i].listRefaccion[j].cantidadArticulo;                           
                          vm.ReporteExcel[x][meses[y  ]] = c; 

                        }
                        
                      }
                    }
                
                    
                      
                  }
 
                }
              }
            }
            
          }
          //Esta línea descarga el excel.
          let data = XLSX.utils.json_to_sheet(vm.ReporteExcel)
          const workbook = XLSX.utils.book_new()
          const filename = 'Estatus Prevision Refac KF '+dia + "-"+mes+"-"+anio ;
          const worksheet = 'hoja.'+dia + "."+mes+"."+anio
          XLSX.utils.book_append_sheet(workbook, data, worksheet)
          XLSX.writeFile(workbook, `${filename}.xlsx`)
          //console.log('Arreglo: ')
          //console.log(res.body)
        })
 
        
       



    },
    excel () {
      let vm = this
      console.log('function: Excel().')
      //informaciondummy vm.events
      vm.procesarArchivoExcel( );
      /*let data = XLSX.utils.json_to_sheet(vm.ReporteExcel)
      const workbook = XLSX.utils.book_new()
      const filename = 'Proximos_Servicios'
      XLSX.utils.book_append_sheet(workbook, data, filename)
      XLSX.writeFile(workbook, `${filename}.xlsx`)*/
    },
    pdf() {
      let vm = this
      console.log('function: PDF().')
      if (vm.events.length === 0) {
        vm.msjException = true
        vm.msjAlerta = 'Debe de realizar una búsqueda para poder descargar el reporte'
        return false
      }
      var headerTable = ''
      var detalle = ''
      var nombre = 'REPORTE ESTATUS O.S./PRÓXIMOS SERVICIOS'
      if(vm.events.length > 0) {
        headerTable += '' +
/**/          '<td style="border: 1px solid #ddd;">FOLIO</td>' +
          '<td style="border: 1px solid #ddd;">VEHÍCULO/MANTENIBLE</td>' +
          '<td style="border: 1px solid #ddd;">RUTINA</td>' +
         '<td style="border: 1px solid #ddd;">SUCURSAL</td>' + 
          '<td style="border: 1px solid #ddd;">ESTATUS</td>' +
          '<td style="border: 1px solid #ddd;">INICIO</td>' +
          '<td style="border: 1px solid #ddd;">FIN</td>';
          /*"<b>Folio: </b><br>" +vm.rowData[i].FolioOrden + "<br>" +
                      "<b>Vehículo/Mantenible:</b><br>"  +
                       vm.rowData[i].mantenible_nombre + 
                      "<br><b>Rutina:</b> <br>" + 
                      vm.rowData[i].nombre_rutina + "<br>" + 
                      "<b>Sucursal:</b> <br>" + 
                      vm.rowData[i].sucursal_nombre + "<br>" + 
                      "<b>Estatus de la Orden:</b> <br>" + 
                      vm.rowData[i].estatusOrden + "<br>" + 
                      "<b>F. Recepción:</b> <br>" + 
                      HoraInicio + " <br>" +
                      "<b>F. Salida:</b> <br>" +
                      //vm.rowData[i].FechaSAlida.toISOString().substr(0, 10) + " " +  (vm.rowData[i].FechaSAlida.getHours()>9?vm.rowData[i].FechaSAlida.getHours(): "0"+vm.rowData[i].FechaSAlida.getHours()   )+ ":" + vm.rowData[i].FechaSAlida.getMinutes() + "<br>" + 
                      HoraFin + " <br>" +
                      "<br> <b>Refacciones: </b> <br>" + 
                      "<table  border='1' cellspacing='0' cellpadding='1' align='center'> <tr bgcolor='" + color + "'  > <th style='color:#FFFFFF';>Cant. </th> <th style='color:#FFFFFF';>Cod. </th> <th style='color:#FFFFFF';>Desc. </th></tr>"+refacciones+"</table>" + 
                      "<br> <b>Herramientas: </b> <br>" + 
                      "<table border='1' cellspacing='0' cellpadding='1' align='center' > <tr bgcolor='" + color + "'> <th style='color:#FFFFFF';>Cant. </th> <th style='color:#FFFFFF';>Cod. </th> <th style='color:#FFFFFF';>Desc. </th></tr>"+herramienta+"</table>"
         */ 



        for(var x = 0; x < vm.rowData.length; x++) {
          var fecha_arr = new Date(vm.rowData[x].FechaRecepcion)
          var fecha_arr2 = new Date(vm.rowData[x].FechaSalida)
          var HoraInicio =  fecha_arr.toISOString().substr(0, 10) + " " + (fecha_arr.getHours()>9?fecha_arr.getHours(): "0"+fecha_arr.getHours()   )+ ":" + ( fecha_arr.getMinutes()>9? fecha_arr.getMinutes(): "0"+ fecha_arr.getMinutes()) ; //"2020-05-01 08:00";  //
          var HoraFin =  fecha_arr2.toISOString().substr(0, 10) + " " +  (fecha_arr2.getHours()>9?fecha_arr2.getHours(): "0"+fecha_arr2.getHours()   )+ ":" + (fecha_arr2.getMinutes()>9?fecha_arr2.getMinutes(): "0"+fecha_arr2.getMinutes() ); //"2020-05-01 10:00" ;//
          
          detalle += '<tr style="border: 1px solid #ddd;">' +
            /**/'<td style="border: 1px solid #ddd;">' + vm.rowData[x].FolioOrden + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowData[x].mantenible_nombre  + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowData[x].nombre_rutina + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowData[x].sucursal_nombre + '</td>' +
            '<td style="border: 1px solid #ddd;">' + vm.rowData[x].estatusOrden + '</td>' +
            '<td style="border: 1px solid #ddd;">' + HoraInicio + '</td>' +
            '<td style="border: 1px solid #ddd;">' + HoraFin + '</td>' +
 
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
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    openDetalle() {
      let vm = this
      console.log('function: openDetalle(). ')
      vm.selectedOpen = true
      console.log(vm.selectedOpen)
    },
    closeDetalle() {
      let vm = this
      console.log('function: closeDetalle(). ')
      vm.selectedOpen = false
      console.log(vm.selectedOpen)
    },
    showEvent ({ nativeEvent, event }) {
      console.log('showEvent')
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        // eslint-disable-next-line no-return-assign
        setTimeout(() => this.selectedOpen = true, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      console.log('updateRange')
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        })
      }

      this.start = start
      this.end = end
      /* this.events = events */
    },
    nth (d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    formatDate (a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
    }
    /* Calendario */
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth

      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear

      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)

      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      console.log('monthFormatter')
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long'
      })
    }
  },
  mounted () {
    const vm = this
    this.$refs.calendar.checkChange()
    vm.getDataArr()
  },
  beforeMount () {
    this.events = [
      { name: 'vh1', start: '2020-1-1 14:00', end: '2020-1-1 17:35', color: 'cyan', details: 'Detalle de vh1' },
      { name: 'vh2', start: '2020-1-2 14:00', end: '2020-1-2 17:35', color: 'yellow', details: 'Detalle de vh2' },
      { name: 'vh3', start: '2020-1-3 14:00', end: '2020-1-3 17:35', color: 'red lighten-1', details: 'Detalle de vh3' },
      { name: 'vh4', start: '2020-1-7 14:00', end: '2020-1-7 17:35', color: 'yellow', details: 'Detalle de vh4' },
      { name: 'ac1', start: '2020-1-8 14:00', end: '2020-1-10 17:35', color: 'green', details: 'Detalle de ac1' },
      { name: 'ac2', start: '2020-1-14 14:00', end: '2020-1-14 17:35', color: 'red lighten-1', details: 'Detalle de ac2' },
      { name: 'ac3', start: '2020-1-21 14:00', end: '2020-1-21 17:35', color: 'green', details: 'Detalle de ac3' },
      { name: 'ac4', start: '2020-1-21 18:00', end: '2020-1-21 21:35', color: 'cyan', details: 'Detalle de ac4' }
    ]

    this.rowData = [
      {
        mantenible_id: 1,
        mantenible_nombre: 'vh_1',
        servicio_id: 1,
        servicio_nombre: 'Afinacion menor',
        Fecha_Ultimo_Servicio: '2020-02-21',
        recurrencia_dias_servicio: '2',
        estatus: 1
      },
      {
        mantenible_id: 2,
        mantenible_nombre: 'vh_2',
        servicio_id: 2,
        servicio_nombre: 'revision frenos',
        Fecha_Ultimo_Servicio: '2020-02-25',
        recurrencia_dias_servicio: '5',
        estatus: 2
      },
      {
        mantenible_id: 3,
        mantenible_nombre: 'vh_3',
        servicio_id: 3,
        servicio_nombre: 'revision motor',
        Fecha_Ultimo_Servicio: '2020-02-27',
        recurrencia_dias_servicio: '7',
        estatus: 3
      },
      {
        mantenible_id: 4,
        mantenible_nombre: 'vh_4',
        servicio_id: 4,
        servicio_nombre: 'revision transmision',
        Fecha_Ultimo_Servicio: '2020-02-28',
        recurrencia_dias_servicio: '14',
        estatus: 4
      },
    ]

    this.rowTable = [
      { text: 'mantenible_id', value: 'mantenible_id', width: 100 },
      { text: 'mantenible_nombre', value: 'mantenible_nombre', width: 150 },
      { text: 'servicio_id', value: 'servicio_id' },
      { text: 'servicio_nombre', value: 'servicio_nombre' },
      { text: 'Fecha_Ultimo_Servicio', value: 'Fecha_Ultimo_Servicio', width: 100 },
      { text: 'recurrencia_dias_servicio', value: 'recurrencia_dias_servicio', width: 100 },
      { text: 'estatus', value: 'estatus', width: 100 },
    ]

    this.selectSucursal = [
      { sucursal_id: 0, sucursal_nombre: 'Todo' },
      { sucursal_id: 1, sucursal_nombre: 'Filo 1' },
      { sucursal_id: 2, sucursal_nombre: 'Filo 2' },
      { sucursal_id: 3, sucursal_nombre: 'Filo 3' },
      { sucursal_id: 4, sucursal_nombre: 'Filo 4' }
    ]

    this.selectEstatus = [
      {estatus_id:0,estastus_nombre:'Todo'},
      {estatus_id:1,estastus_nombre:'O.S. Programada'},
      {estatus_id:2,estastus_nombre:'O.S. En Proceso (En tiempo)'},
      {estatus_id:3,estastus_nombre:'O.S. En Proceso (Con retraso)'},
      {estatus_id:4,estastus_nombre:'O.S. Pasada de fecha'},
      {estatus_id:5,estastus_nombre:'O.S. Finalizado (En Tiempo y Forma)'},
    ]

    this.dataSelectMante = [
      { mantenible_id: 0, tipoMantenible_id: 0, sucursal_id: 0, mantenible_nombre: 'Todo' },
      { mantenible_id: 1, tipoMantenible_id: 1, sucursal_id: 1, mantenible_nombre: 'vh1' },
      { mantenible_id: 2, tipoMantenible_id: 1, sucursal_id: 1, mantenible_nombre: 'vh2' },
      { mantenible_id: 3, tipoMantenible_id: 1, sucursal_id: 2, mantenible_nombre: 'vh3' },
      { mantenible_id: 4, tipoMantenible_id: 1, sucursal_id: 2, mantenible_nombre: 'vh4' },
      { mantenible_id: 5, tipoMantenible_id: 2, sucursal_id: 3, mantenible_nombre: 'ac1' },
      { mantenible_id: 6, tipoMantenible_id: 2, sucursal_id: 3, mantenible_nombre: 'ac2' },
      { mantenible_id: 7, tipoMantenible_id: 2, sucursal_id: 4, mantenible_nombre: 'ac3' },
      { mantenible_id: 8, tipoMantenible_id: 2, sucursal_id: 4, mantenible_nombre: 'ac4' }
    ]
  }
}
</script>
