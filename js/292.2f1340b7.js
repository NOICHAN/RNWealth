"use strict";(self["webpackChunkrn_wealth"]=self["webpackChunkrn_wealth"]||[]).push([[292],{2734:function(e,a){const s={updateOrderFailed:"更新失敗,請稍後再試。",signupError:"請重新註冊，帳號已有人使用或密碼太短(需4位數以上)。",signInError:"請重新登入，帳號或密碼錯誤。"};a["Z"]=(e,a)=>{s[a]?e({icon:"error",title:"失敗",text:s[a]}):e({icon:"error",title:"失敗",text:"sorry，目前服務不可用，請稍後再試或聯絡管理員。"})}},9292:function(e,a,s){s.r(a),s.d(a,{default:function(){return x}});s(1703);var n=s(3396),o=s(7139),l=s(2734),t=s(4870),i=s(2483);const r=e=>((0,n.dD)("data-v-685b695c"),e=e(),(0,n.Cn)(),e),c={class:"container-fluid"},u={class:"row mt-5 mt-md-0"},m=r((()=>(0,n._)("div",{class:"col d-none d-md-block"},[(0,n._)("img",{src:"https://images.unsplash.com/photo-1579621970343-21c491b3f363?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",class:"signInImg",alt:"moneyBox"})],-1))),d={class:"col"},f=r((()=>(0,n._)("h2",{class:"text-center my-5"},"RNWealth 會員登入",-1))),p={class:"form-floating mb-3"},g=r((()=>(0,n._)("label",{for:"signInAccount"},"EMail 帳號",-1))),v={class:"form-floating mb-4"},b=r((()=>(0,n._)("label",{for:"signInPassword"},"密碼",-1))),w=r((()=>(0,n._)("button",{type:"submit",class:"btn btn-primary mb-2 signInBtn"},"登入",-1))),h=(0,n.Uk)("註冊");var _={__name:"LogIn",setup(e){const a=(0,n.f3)("axios"),s=(0,n.f3)("$swal"),r=(0,i.tv)(),_=(0,t.iH)(!1),k=(0,t.iH)({email:"",password:""}),I=async()=>{try{_.value=!0;const{data:e}=await a.post("signin",k.value);document.cookie=`RNWealthToken=${e.accessToken}; max-age=86400;`,document.cookie=`RNWealthNickname=${e.user.nickname}; max-age=86400;`,document.cookie=`RNWealthId=${e.user.id}; max-age=86400;`,a.defaults.headers.common.Authorization=`Bearer ${e.accessToken}`,s.fire({icon:"success",title:"成功",text:"登入成功。"}),setTimeout((()=>{r.go(0)}),1500)}catch(e){throw 400===e.response.status?(0,l.Z)(s.fire,"signInError"):(0,l.Z)(s.fire),new Error(`[signIn] error : ${e.message}`)}finally{_.value=!1}};return(0,n.bv)((()=>{const e=document.cookie.replace(/(?:(?:^|.*;\s*)RNWealthId\s*=\s*([^;]*).*$)|^.*$/,"$1");e&&r.push("/dashboard/book")})),(e,a)=>{const s=(0,n.up)("VLoading"),l=(0,n.up)("v-field"),t=(0,n.up)("error-message"),i=(0,n.up)("router-link"),r=(0,n.up)("v-form");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(s,{active:_.value},null,8,["active"]),(0,n._)("div",c,[(0,n._)("div",u,[m,(0,n._)("div",d,[f,(0,n.Wm)(r,{class:"signInForm mb-5",onSubmit:I},{default:(0,n.w5)((({errors:e})=>[(0,n._)("div",p,[(0,n.Wm)(l,{type:"email",class:(0,o.C_)(["form-control",{"is-invalid":e["Email"]}]),id:"signInAccount",name:"Email",rules:"email|required",modelValue:k.value.email,"onUpdate:modelValue":a[0]||(a[0]=e=>k.value.email=e)},null,8,["class","modelValue"]),g,(0,n.Wm)(t,{class:"invalid-feedback",name:"Email"})]),(0,n._)("div",v,[(0,n.Wm)(l,{type:"password",class:(0,o.C_)(["form-control",{"is-invalid":e["密碼"]}]),id:"signInPassword",name:"密碼",rules:"required",modelValue:k.value.password,"onUpdate:modelValue":a[1]||(a[1]=e=>k.value.password=e)},null,8,["class","modelValue"]),b,(0,n.Wm)(t,{class:"invalid-feedback",name:"密碼"})]),w,(0,n.Wm)(i,{class:"btn btn-outline-light signInBtn",to:"/signup"},{default:(0,n.w5)((()=>[h])),_:1})])),_:1})])])])],64)}}},k=s(89);const I=(0,k.Z)(_,[["__scopeId","data-v-685b695c"]]);var x=I}}]);
//# sourceMappingURL=292.2f1340b7.js.map