(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{1158:function(e,n,l){"use strict";l.r(n);var main=l(688),t=l(673),r={components:{AgGridVue:main.AgGridVue},data:function(){return{valid:!1,mfechaEdit:!1,fcalendarEdit:(new Date).toISOString().substr(0,10),validFinal:!1,mfechaEditFinal:!1,fcalendarFinal:(new Date).toISOString().substr(0,10),columnDefs:null,rowData:null,modules:t.a}},beforeMount:function(){this.columnDefs=[{headerName:"HEADER 1",field:"make"},{headerName:"HEADER 2",field:"model"},{headerName:"HEADER 3",field:"price"},{headerName:"HEADER 4",field:"datainfo"},{headerName:"HEADER 5",field:"info"}],this.rowData=[{make:"Info 1",model:"Info 2",price:"Info 3",datainfo:"Info 4",info:"Info 5"},{make:"Info 1",model:"Info 2",price:"Info 3",datainfo:"Info 4",info:"Info 5"},{make:"Info 1",model:"Info 2",price:"Info 3",datainfo:"Info 4",info:"Info 5"}]}},c=l(56),o=l(73),d=l.n(o),f=l(739),v=l(636),m=l(1151),h=l(1152),E=l(609),k=l(873),F=l(1153),x=l(1154),_=l(610),component=Object(c.a)(r,(function(){var e=this,n=e.$createElement,l=e._self._c||n;return l("v-layout",{attrs:{row:"",wrap:""}},[l("v-flex",{attrs:{lg12:"",md12:""}},[l("div",{staticClass:"headline"},[l("v-icon",{attrs:{color:"black"}},[e._v("mdi-clipboard-check")]),e._v("Gestión Recepción de Taller\n      "),l("hr",{staticClass:"my-3"})],1),e._v(" "),l("v-layout",{attrs:{row:"",wrap:""}},[l("v-flex",{staticStyle:{"margin-left":"1%"},attrs:{xs2:"",sm2:"",md2:""}},[l("v-form",{attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(n){e.valid=n},expression:"valid"}},[l("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[l("v-dialog",{ref:"modEdit",attrs:{"return-value":e.fcalendarEdit,persistent:"",lazy:"","full-width":"",width:"290px"},on:{"update:returnValue":function(n){e.fcalendarEdit=n},"update:return-value":function(n){e.fcalendarEdit=n}},scopedSlots:e._u([{key:"activator",fn:function(n){var t=n.on;return[l("v-text-field",e._g({attrs:{label:"Fecha Inicial",hint:"Ingrese una fecha inicial","prepend-icon":"mdi-calendar",readonly:""},model:{value:e.fcalendarEdit,callback:function(n){e.fcalendarEdit=n},expression:"fcalendarEdit"}},t))]}}]),model:{value:e.mfechaEdit,callback:function(n){e.mfechaEdit=n},expression:"mfechaEdit"}},[e._v(" "),l("v-date-picker",{attrs:{scrollable:""},model:{value:e.fcalendarEdit,callback:function(n){e.fcalendarEdit=n},expression:"fcalendarEdit"}},[l("v-spacer"),e._v(" "),l("v-btn",{attrs:{flat:"",color:"red",dark:""},on:{click:function(n){e.mfechaEdit=!1}}},[e._v("Cancel")]),e._v(" "),l("v-btn",{attrs:{flat:"",color:"success"},on:{click:function(n){return e.$refs.modEdit.save(e.fcalendarEdit)}}},[e._v("OK")])],1)],1)],1)],1)],1),e._v(" "),l("v-flex",{staticStyle:{"margin-left":"1%"},attrs:{xs2:"",sm2:"",md2:""}},[l("v-form",{attrs:{"lazy-validation":""},model:{value:e.validFinal,callback:function(n){e.validFinal=n},expression:"validFinal"}},[l("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[l("v-dialog",{ref:"fFinal",attrs:{"return-value":e.fcalendarFinal,persistent:"",lazy:"","full-width":"",width:"290px"},on:{"update:returnValue":function(n){e.fcalendarFinal=n},"update:return-value":function(n){e.fcalendarFinal=n}},scopedSlots:e._u([{key:"activator",fn:function(n){var t=n.on;return[l("v-text-field",e._g({attrs:{label:"Fecha Final",hint:"Ingrese una fecha inicial","prepend-icon":"mdi-calendar",readonly:""},model:{value:e.fcalendarFinal,callback:function(n){e.fcalendarFinal=n},expression:"fcalendarFinal"}},t))]}}]),model:{value:e.mfechaEditFinal,callback:function(n){e.mfechaEditFinal=n},expression:"mfechaEditFinal"}},[e._v(" "),l("v-date-picker",{attrs:{scrollable:""},model:{value:e.fcalendarFinal,callback:function(n){e.fcalendarFinal=n},expression:"fcalendarFinal"}},[l("v-spacer"),e._v(" "),l("v-btn",{attrs:{flat:"",color:"red",dark:""},on:{click:function(n){e.mfechaEditFinal=!1}}},[e._v(" Cancel ")]),e._v(" "),l("v-btn",{attrs:{flat:"",color:"success"},on:{click:function(n){return e.$refs.fFinal.save(e.fcalendarFinal)}}},[e._v(" OK ")])],1)],1)],1)],1)],1),e._v(" "),l("v-flex",{attrs:{xs4:"",sm4:"",md4:""}},[l("div",{staticStyle:{"margin-left":"3%","margin-top":"5%"}},[l("v-btn",{attrs:{small:"",color:"primary"}},[l("v-icon",[e._v("mdi-magnify")]),e._v("Buscar ")],1),e._v(" "),l("v-btn",{attrs:{small:"",dark:"",color:"blue-grey lighten-1"}},[l("v-icon",[e._v("mdi-plus-circle-outline")]),e._v(" Agregar ")],1)],1)]),e._v(" "),l("ag-grid-vue",{staticClass:"ag-theme-blue",staticStyle:{width:"100%",height:"410px","margin-left":"1%"},attrs:{columnDefs:e.columnDefs,rowData:e.rowData,modules:e.modules}})],1)],1)],1)}),[],!1,null,null,null);n.default=component.exports;d()(component,{VBtn:f.a,VDatePicker:v.a,VDialog:m.a,VFlex:h.a,VForm:E.a,VIcon:k.a,VLayout:F.a,VSpacer:x.a,VTextField:_.a})}}]);