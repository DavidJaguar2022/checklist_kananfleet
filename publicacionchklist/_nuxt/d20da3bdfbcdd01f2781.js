(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1143:function(t,n,e){"use strict";var r=e(795);e.n(r).a},1144:function(t,n,e){(n=e(26)(!1)).push([t.i,".theme--light.v-list{background:none;color:rgba(0,0,0,.87)}",""]),t.exports=n},1145:function(t,n,e){var content=e(1146);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(27).default)("63c9496b",content,!0,{sourceMap:!1})},1146:function(t,n,e){(n=e(26)(!1)).push([t.i,".theme--light.v-list{background:none;color:rgba(0,0,0,.87)}.v-snack{align-items:center;color:#fff;display:flex;font-size:.875rem;left:8px;pointer-events:none;position:fixed;right:8px;transition-duration:.15s;transition-timing-function:cubic-bezier(0,0,.2,1);z-index:1000}.v-application--is-ltr .v-snack{text-align:left}.v-application--is-rtl .v-snack{text-align:right}.v-snack--absolute{position:absolute}.v-snack--top{top:8px}.v-snack--bottom{bottom:8px}.v-snack__wrapper{align-items:center;background-color:#323232;border-radius:4px;display:flex;margin:0 auto;pointer-events:auto;transition:inherit;transition-property:opacity,transform;min-width:100%;box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.v-snack__content{align-items:center;display:flex;min-height:48px;justify-content:space-between;overflow:hidden;padding:8px 16px;width:100%}.v-snack__content .v-btn{flex:0 0 auto;height:auto;min-width:auto;padding:8px;width:auto}.v-snack__content .v-btn--icon,.v-snack__content .v-btn--outlined,.v-snack__content .v-btn--text{color:#fff}.v-application--is-ltr .v-snack__content .v-btn{margin:0 -8px 0 24px}.v-application--is-rtl .v-snack__content .v-btn{margin:0 24px 0 -8px}.v-snack__content .v-btn__content{margin:-2px}.v-snack--multi-line .v-snack__content{height:auto;min-height:68px}.v-snack--vertical .v-snack__content{align-items:stretch;flex-direction:column;height:auto;padding:16px 16px 8px}.v-snack--vertical .v-snack__content .v-btn.v-btn{align-self:flex-end;justify-self:flex-end;margin-top:18px}.v-application--is-ltr .v-snack--vertical .v-snack__content .v-btn.v-btn{margin-left:0}.v-application--is-rtl .v-snack--vertical .v-snack__content .v-btn.v-btn{margin-right:0}.v-snack--vertical .v-snack__content .v-btn__content{flex:0 0 auto;margin:0}@media only screen and (min-width:600px){.v-snack__wrapper{min-width:344px;max-width:672px}.v-snack--left .v-snack__wrapper{margin-left:0}.v-snack--right .v-snack__wrapper{margin-right:0}.v-application--is-ltr .v-snack__content .v-btn:first-of-type{margin-left:42px}.v-application--is-rtl .v-snack__content .v-btn:first-of-type{margin-right:42px}}.v-snack-transition-enter .v-snack__wrapper{transform:scale(.8)}.v-snack-transition-enter .v-snack__wrapper,.v-snack-transition-leave-to .v-snack__wrapper{opacity:0}",""]),t.exports=n},1156:function(t,n,e){"use strict";e.r(n);var r=e(580),o=e.n(r),c={props:{source:String},data:function(){return{logginOK:!1,userinfo:{usuario:null,contrasenia:null},snackbar:!1,text:"My timeout is set to 2000.",timeout:4e3}},methods:{loginKananfleet:function(t){var n=this;return null===t.usuario||""===t.usuario?(this.text="Ingrese un usuario válido",void(this.snackbar=!0)):null===t.contrasenia||""===t.contrasenia?(this.text="Ingrese un password válido",void(this.snackbar=!0)):void o()("POST","http://localhost:51104//api/EmpleadoUsuario/LoginSAPbyUser").send({userName:t.usuario,password:t.contrasenia}).end((function(t){if(t.error)throw n.text="Usuario o Contraseña no válidos intente con otras credenciales",n.snackbar=!0,new Error(t.error);var e=t.body.Dependencia.EmpresaID;window.vm.loginOK=e,window.parametroURL=e,window.vm.$router.push("/kananfleet/Inspeccion/?id="+e)}))}}},l=(e(1143),e(56)),f=e(73),v=e.n(f),d=e(737),h=e(875),m=e(279),k=e(641),_=e(259),w=e(606),x=e(165),y=e(262),O=(e(31),e(1145),e(54)),j=e(122),P=e(129),S=e(19),V=e(14),C=Object(S.a)(O.a,j.a,Object(P.b)(["absolute","top","bottom","left","right"])).extend({name:"v-snackbar",props:{multiLine:Boolean,timeout:{type:Number,default:6e3},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--active":this.isActive,"v-snack--absolute":this.absolute,"v-snack--bottom":this.bottom||!this.top,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--top":this.top,"v-snack--vertical":this.vertical}}},watch:{isActive:function(){this.setTimeout()}},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(V.d)("auto-height",this)},mounted:function(){this.setTimeout()},methods:{setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout),this.isActive&&this.timeout&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),this.timeout))}},render:function(t){return t("transition",{attrs:{name:"v-snack-transition"}},[this.isActive&&t("div",{staticClass:"v-snack",class:this.classes,on:this.$listeners},[t("div",this.setBackgroundColor(this.color,{staticClass:"v-snack__wrapper",attrs:{role:"alert"}}),[t("div",{staticClass:"v-snack__content"},this.$slots.default)])])])}}),B=e(1154),E=e(607),T=e(699),$=e(471),component=Object(l.a)(c,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[e("v-row",{attrs:{align:"center",justify:"center"}},[e("v-col",{attrs:{cols:"12",sm:"8",md:"4"}},[e("v-card",{staticClass:"elevation-5"},[e("v-img",{attrs:{src:"/logo.png"}}),t._v(" "),e("v-toolbar",{attrs:{dark:"",flat:""}},[e("v-toolbar-title",{staticClass:"title text-center"},[t._v("Iniciar Sesión")]),t._v(" "),e("v-spacer")],1),t._v(" "),e("v-card-text",[e("v-form",[e("v-text-field",{attrs:{label:"Usuario",name:"login","prepend-icon":"mdi-account-circle",type:"text",required:""},model:{value:t.userinfo.usuario,callback:function(n){t.$set(t.userinfo,"usuario",n)},expression:"userinfo.usuario"}}),t._v(" "),e("v-text-field",{attrs:{id:"password",label:"Contraseña",name:"password","prepend-icon":"mdi-lock",type:"password",required:""},model:{value:t.userinfo.contrasenia,callback:function(n){t.$set(t.userinfo,"contrasenia",n)},expression:"userinfo.contrasenia"}})],1)],1),t._v(" "),e("v-card-actions",[e("v-btn",{attrs:{color:"blue-grey lighten-1",dark:"",block:"",small:""},on:{click:function(n){return t.loginKananfleet(t.userinfo)}}},[t._v("Iniciar Sesión")])],1)],1)],1)],1),t._v(" "),e("v-snackbar",{attrs:{timeout:t.timeout,color:"red",top:""},model:{value:t.snackbar,callback:function(n){t.snackbar=n},expression:"snackbar"}},[t._v("\n    "+t._s(t.text)+"\n    "),e("v-btn",{attrs:{color:"#fff",text:""},on:{click:function(n){t.snackbar=!1}}},[t._v("\n      Cerrar\n    ")])],1)],1)}),[],!1,null,null,null);n.default=component.exports;v()(component,{VBtn:d.a,VCard:h.a,VCardActions:m.a,VCardText:m.b,VCol:k.a,VContainer:_.a,VForm:w.a,VImg:x.a,VRow:y.a,VSnackbar:C,VSpacer:B.a,VTextField:E.a,VToolbar:T.a,VToolbarTitle:$.b})},445:function(t,n){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},569:function(t,n,e){"use strict";e(119)("small",(function(t){return function(){return t(this,"small","","")}}))},581:function(t,n){},582:function(t,n){},583:function(t,n){},584:function(t,n){},585:function(t,n){},586:function(t,n){},587:function(t,n){},588:function(t,n,e){"use strict";e(119)("link",(function(t){return function(n){return t(this,"a","href",n)}}))},606:function(t,n,e){"use strict";e(24),e(9),e(12);var r=e(3),o=(e(116),e(5),e(4),e(120),e(37),e(38),e(19)),c=e(123),l=e(436);function f(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(n){Object(r.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}n.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",inheritAttrs:!1,props:{lazyValidation:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var n=Object.values(t).includes(!0);this.$emit("input",!n)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,n=function(input){return input.$watch("hasError",(function(n){t.$set(t.errorBag,input._uid,n)}),{immediate:!0})},e={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?e.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(e.valid=n(input)))})):e.valid=n(input),e},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var n=this.watchers.find((function(i){return i._uid===t._uid}));n&&(n.valid(),n.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var n=this;return t("form",{staticClass:"v-form",attrs:v({novalidate:!0},this.attrs$),on:{submit:function(t){return n.$emit("submit",t)}}},this.$slots.default)}})},641:function(t,n,e){"use strict";e(24),e(9),e(49),e(37),e(38);var r=e(3),o=(e(32),e(174),e(33),e(5),e(4),e(12),e(31),e(125),e(0)),c=e(74),l=e(2);function f(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}var v=["sm","md","lg","xl"],d=v.reduce((function(t,n){return t[n]={type:[Boolean,String,Number],default:!1},t}),{}),h=v.reduce((function(t,n){return t["offset"+Object(l.C)(n)]={type:[String,Number],default:null},t}),{}),m=v.reduce((function(t,n){return t["order"+Object(l.C)(n)]={type:[String,Number],default:null},t}),{}),k={col:Object.keys(d),offset:Object.keys(h),order:Object.keys(m)};function _(t,n,e){var r=t;if(null!=e&&!1!==e){if(n){var o=n.replace(t,"");r+="-".concat(o)}return"col"!==t||""!==e&&!0!==e?(r+="-".concat(e)).toLowerCase():r.toLowerCase()}}var w=new Map;n.a=o.a.extend({name:"v-col",functional:!0,props:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(n){Object(r.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}({cols:{type:[Boolean,String,Number],default:!1}},d,{offset:{type:[String,Number],default:null}},h,{order:{type:[String,Number],default:null}},m,{alignSelf:{type:String,default:null,validator:function(t){return["auto","start","end","center","baseline","stretch"].includes(t)}},tag:{type:String,default:"div"}}),render:function(t,n){var e=n.props,data=n.data,o=n.children,l=(n.parent,"");for(var f in e)l+=String(e[f]);var v=w.get(l);return v||function(){var t,n;for(n in v=[],k)k[n].forEach((function(t){var r=e[t],o=_(n,t,r);o&&v.push(o)}));var o=v.some((function(t){return t.startsWith("col-")}));v.push((t={col:!o||!e.cols},Object(r.a)(t,"col-".concat(e.cols),e.cols),Object(r.a)(t,"offset-".concat(e.offset),e.offset),Object(r.a)(t,"order-".concat(e.order),e.order),Object(r.a)(t,"align-self-".concat(e.alignSelf),e.alignSelf),t)),w.set(l,v)}(),t(e.tag,Object(c.a)(data,{class:v}),o)}})},795:function(t,n,e){var content=e(1144);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(27).default)("bc049656",content,!0,{sourceMap:!1})}}]);