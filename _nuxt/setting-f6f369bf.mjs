import{_ as B,u as D,r as a,o as k,h as S,b as e,w as t,k as T,d as i,t as u,p as E,g as w,j as y}from"./entry-9d92ea7f.mjs";const j={computed:{console:()=>console,window:()=>window},setup(){const l=D();return{theme:l,toggleTheme:()=>{l.global.name.value=l.global.current.value.dark?"light":"dark",localStorage.setItem("theme",l.global.name.value)}}},data(){return{enablePop:!1,unsupportPop:!1,linesPop:"one",enableSound:!1,enableWebhook:!1,enableEmail:!1,enableDark:!0,dialogLogout:!1,swRegistration:null,applicationServerPublicKey:"BAGo2lLF7FcGwdIMn9_UoXz8EeMWpmFy-pNUGYExkAq4zl-8C-ohU0mZBAUmG9KGxUJj1MII0q4Qs_D98EkVkQg"}},beforeMount(){this.enableSound=JSON.parse(localStorage.getItem("enableSound")===null?"false":localStorage.getItem("enableSound")),this.unsupportPop=window.Notification.permission==="denied",this.enableDark=this.$vuetify.theme.name==="dark"},mounted(){const l=()=>{this.swRegistration.pushManager.getSubscription().then(o=>{this.enablePop=o!==null,this.enablePop?console.log("User is subscribed."):console.log("User is NOT subscribed."),this.linesPop=this.enablePop?"three":"one"})};"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window?(console.log("Service Worker and Push is supported"),navigator.serviceWorker.register("assets/javascripts/sw.js").then(o=>{console.log("Service Worker is registered",o),this.swRegistration=o,l()}).catch(o=>{console.error("Service Worker Error",o)})):console.warn("Push/Notification messaging is not supported")},methods:{urlB64ToUint8Array(l){const o="=".repeat((4-l.length%4)%4),P=(l+o).replace(/\-/g,"+").replace(/_/g,"/"),m=window.atob(P),n=new Uint8Array(m.length);for(let r=0;r<m.length;++r)n[r]=m.charCodeAt(r);return n},togglePop(){if(this.enablePop=!this.enablePop,this.linesPop=this.enablePop?"three":"one",this.enablePop){const l=this.urlB64ToUint8Array(this.applicationServerPublicKey);this.swRegistration.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:l}).then(o=>{console.log("User is subscribed:",o)}).catch(o=>{console.log("Failed to subscribe the user: ",o)})}else this.swRegistration.pushManager.getSubscription().then(l=>{if(l)return l.unsubscribe()}).catch(l=>{console.log("Error unsubscribing",error)}).then(()=>{console.log("User is unsubscribed.")})},toggleSound(){this.enableSound=!this.enableSound,localStorage.setItem("enableSound",JSON.stringify(this.enableSound))},toggleWebhook(){this.enableWebhook=!this.enableWebhook},toggleEmail(){this.enableEmail=!this.enableEmail},setLang(){localStorage.setItem("locale",this.$i18n.locale)},logout(){localStorage.removeItem("metamask"),localStorage.removeItem("walletconnect"),this.$router.push({name:"index"})}}},z={key:0},G=i("Pop up requires your permission. "),K=y("br",null,null,-1),F=i(" Not available on Apple devices."),O=[G,K,F],R={key:1},q=i("Webhook"),J={class:"text-red"},H={class:"text-red"};function Q(l,o,P,m,n,r){const f=a("v-list-subheader"),_=a("v-checkbox"),c=a("v-list-item-avatar"),p=a("v-list-item-title"),W=a("v-list-item-subtitle"),g=a("v-list-item-header"),d=a("v-list-item"),b=a("v-list"),v=a("v-divider"),N=a("v-switch"),V=a("v-icon"),h=a("v-radio"),x=a("v-radio-group"),I=a("v-card-text"),C=a("v-btn"),L=a("v-card-actions"),U=a("v-card"),M=a("v-dialog"),A=T;return k(),S("div",null,[e(A,null,{default:t(()=>[e(U,{class:"mx-auto","max-width":"400"},{default:t(()=>[e(b,{"select-strategy":"multiple"},{default:t(()=>[e(f,null,{default:t(()=>[i(u(l.$t("setting.alertSetting")),1)]),_:1}),e(d,{onClick:r.togglePop,lines:n.linesPop,disabled:n.unsupportPop},{default:t(()=>[e(c,{start:""},{default:t(()=>[e(_,{modelValue:n.enablePop,"onUpdate:modelValue":o[0]||(o[0]=s=>n.enablePop=s),color:"primary","hide-details":"",disabled:n.unsupportPop},null,8,["modelValue","disabled"])]),_:1}),e(g,null,{default:t(()=>[e(p,null,{default:t(()=>[i(u(l.$t("setting.popup")),1)]),_:1}),e(W,null,{default:t(()=>[n.enablePop?(k(),S("span",z,O)):E("",!0),n.unsupportPop?(k(),S("span",R,"Please turn on the notification permission.")):E("",!0)]),_:1})]),_:1})]),_:1},8,["onClick","lines","disabled"]),e(d,{onClick:r.toggleSound},{default:t(()=>[e(c,{start:""},{default:t(()=>[e(_,{modelValue:n.enableSound,"onUpdate:modelValue":o[1]||(o[1]=s=>n.enableSound=s),color:"primary","hide-details":""},null,8,["modelValue"])]),_:1}),e(g,null,{default:t(()=>[e(p,null,{default:t(()=>[i(u(l.$t("setting.sound")),1)]),_:1})]),_:1})]),_:1},8,["onClick"]),e(d,{onClick:r.toggleEmail},{default:t(()=>[e(c,{start:""},{default:t(()=>[e(_,{modelValue:n.enableEmail,"onUpdate:modelValue":o[2]||(o[2]=s=>n.enableEmail=s),color:"primary","hide-details":""},null,8,["modelValue"])]),_:1}),e(g,null,{default:t(()=>[e(p,null,{default:t(()=>[i(u(l.$t("setting.email")),1)]),_:1})]),_:1})]),_:1},8,["onClick"]),e(d,{onClick:r.toggleWebhook},{default:t(()=>[e(c,{start:""},{default:t(()=>[e(_,{modelValue:n.enableWebhook,"onUpdate:modelValue":o[3]||(o[3]=s=>n.enableWebhook=s),color:"primary","hide-details":""},null,8,["modelValue"])]),_:1}),e(g,null,{default:t(()=>[e(p,null,{default:t(()=>[q]),_:1})]),_:1})]),_:1},8,["onClick"])]),_:1}),e(v),e(b,{"select-strategy":"multiple","active-color":"transparent"},{default:t(()=>[e(f,null,{default:t(()=>[i(u(l.$t("setting.uiSetting")),1)]),_:1}),e(d,null,{default:t(()=>[e(c,{start:""},{default:t(()=>[e(N,{modelValue:n.enableDark,"onUpdate:modelValue":o[4]||(o[4]=s=>n.enableDark=s),color:"primary","hide-details":"",onChange:m.toggleTheme},null,8,["modelValue","onChange"])]),_:1}),e(g,null,{default:t(()=>[e(p,null,{default:t(()=>[i(u(l.$t("setting.darkMode")),1)]),_:1})]),_:1})]),_:1})]),_:1}),e(v),e(b,null,{default:t(()=>[e(f,null,{default:t(()=>[e(V,{icon:"mdi-earth"}),i(" "+u(l.$t("setting.langSetting")),1)]),_:1}),e(d,null,{default:t(()=>[e(x,{column:"",mandatory:"","hide-details":"",modelValue:l.$i18n.locale,"onUpdate:modelValue":o[5]||(o[5]=s=>l.$i18n.locale=s),onChange:r.setLang},{default:t(()=>[e(h,{label:"English",value:"en",color:"primary"}),e(h,{label:"\u65E5\u672C\u8A9E",value:"ja",color:"primary"}),e(h,{label:"\u7E41\u9AD4\u4E2D\u6587",value:"zhHant",color:"primary"}),e(h,{label:"\u7B80\u4F53\u4E2D\u6587",value:"zhHans",color:"primary"})]),_:1},8,["modelValue","onChange"])]),_:1})]),_:1}),e(v),e(b,null,{default:t(()=>[e(d,{color:"red",onClick:o[6]||(o[6]=w(s=>n.dialogLogout=!0,["stop"]))},{default:t(()=>[e(c,{start:""},{default:t(()=>[e(V,{icon:"mdi-logout",color:"red"})]),_:1}),e(p,null,{default:t(()=>[y("span",J,u(l.$t("setting.logout")),1)]),_:1})]),_:1})]),_:1}),e(M,{modelValue:n.dialogLogout,"onUpdate:modelValue":o[9]||(o[9]=s=>n.dialogLogout=s),"max-width":"400","retain-focus":""},{default:t(()=>[e(U,{class:"mx-auto text-center","min-width":"350"},{default:t(()=>[e(I,null,{default:t(()=>[i(u(l.$t("setting.askLogout")),1)]),_:1}),e(L,null,{default:t(()=>[e(C,{class:"mx-auto text-center",onClick:o[7]||(o[7]=w(s=>(r.logout,n.dialogLogout=!1),["stop"]))},{default:t(()=>[y("span",H,u(l.$t("setting.yes")),1)]),_:1}),e(C,{class:"mx-auto text-center",onClick:o[8]||(o[8]=w(s=>n.dialogLogout=!1,["stop"]))},{default:t(()=>[i(u(l.$t("setting.no")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})])}var Y=B(j,[["render",Q]]);export{Y as default};
