"use strict";(self["webpackChunkrn_wealth"]=self["webpackChunkrn_wealth"]||[]).push([[958],{2734:function(a,e){const s={updateOrderFailed:"更新失敗,請稍後再試。",signupError:"請重新註冊，帳號已有人使用或密碼太短(需4位數以上)。",signInError:"請重新登入，帳號或密碼錯誤。"};e["Z"]=(a,e)=>{s[e]?a({icon:"error",title:"失敗",text:s[e]}):a({icon:"error",title:"失敗",text:"sorry，目前服務不可用，請稍後再試或聯絡管理員。"})}},5958:function(a,e,s){s.r(e),s.d(e,{default:function(){return V}});s(1703);var l=s(3396),i=s(7139),n=s(2734),o=s(4870);const r=a=>((0,l.dD)("data-v-23b13404"),a=a(),(0,l.Cn)(),a),t={class:"container-fluid"},m={class:"row mt-5 mt-md-0"},d=r((()=>(0,l._)("div",{class:"col d-none d-md-block"},[(0,l._)("img",{src:"https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",class:"signUpImg",alt:"money"})],-1))),c={class:"col"},u=r((()=>(0,l._)("h2",{class:"text-center my-5"},"RNWealth 會員註冊",-1))),f={class:"form-floating mb-3"},p=r((()=>(0,l._)("label",{for:"signUpAccount"},"EMail 帳號",-1))),v={class:"form-floating mb-4"},g=r((()=>(0,l._)("label",{for:"signUpPassword"},"密碼",-1))),b={class:"form-floating mb-4"},_=r((()=>(0,l._)("label",{for:"signUpConfirmPassword"},"確認密碼",-1))),w={class:"form-floating mb-4"},h=r((()=>(0,l._)("label",{for:"signUpName"},"名字",-1))),U=r((()=>(0,l._)("button",{type:"submit",class:"btn btn-primary mb-2 signUpBtn"},"註冊",-1))),k=(0,l.Uk)("登入");var y={__name:"SignUp",setup(a){const e=(0,l.f3)("axios"),s=(0,l.f3)("$swal"),r=(0,o.iH)(!1),y=(0,o.iH)({email:"",password:"",nickname:""}),x=async()=>{try{r.value=!0;const{data:a}=await e.post("signup",y.value);e.defaults.headers.common.Authorization=`Bearer ${a.accessToken}`;const l={userId:a.user.id,fixedIncome:0,date:"1",isEnable:0};await e.post("monthly-allocation",l),e.defaults.headers.common.Authorization="",s.fire({icon:"success",title:"成功",text:"恭喜註冊成功，請移至登入頁面重新登入。"})}catch(a){throw 400===a.response.status?(0,n.Z)(s.fire,"signupError"):(0,n.Z)(s.fire),new Error(`[signUp] error : ${a.message}`)}finally{r.value=!1}};return(a,e)=>{const s=(0,l.up)("VLoading"),n=(0,l.up)("v-field"),o=(0,l.up)("error-message"),W=(0,l.up)("router-link"),V=(0,l.up)("v-form");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(s,{active:r.value},null,8,["active"]),(0,l._)("div",t,[(0,l._)("div",m,[d,(0,l._)("div",c,[u,(0,l.Wm)(V,{class:"signUpForm mb-5",onSubmit:x},{default:(0,l.w5)((({errors:a})=>[(0,l._)("div",f,[(0,l.Wm)(n,{type:"email",class:(0,i.C_)(["form-control",{"is-invalid":a["Email"]}]),id:"signUpAccount",name:"Email",rules:"email|required",modelValue:y.value.email,"onUpdate:modelValue":e[0]||(e[0]=a=>y.value.email=a)},null,8,["class","modelValue"]),p,(0,l.Wm)(o,{class:"invalid-feedback",name:"Email"})]),(0,l._)("div",v,[(0,l.Wm)(n,{type:"password",class:(0,i.C_)(["form-control",{"is-invalid":a["密碼"]}]),id:"signUpPassword",name:"密碼",rules:"required"},null,8,["class"]),g,(0,l.Wm)(o,{class:"invalid-feedback",name:"密碼"})]),(0,l._)("div",b,[(0,l.Wm)(n,{type:"password",class:(0,i.C_)(["form-control",{"is-invalid":a["確認密碼"]}]),id:"signUpConfirmPassword",name:"確認密碼",rules:"confirmed:@密碼|required",modelValue:y.value.password,"onUpdate:modelValue":e[1]||(e[1]=a=>y.value.password=a)},null,8,["class","modelValue"]),_,(0,l.Wm)(o,{class:"invalid-feedback",name:"確認密碼"})]),(0,l._)("div",w,[(0,l.Wm)(n,{type:"text",class:(0,i.C_)(["form-control",{"is-invalid":a["名字"]}]),id:"signUpName",name:"名字",rules:"required",modelValue:y.value.nickname,"onUpdate:modelValue":e[2]||(e[2]=a=>y.value.nickname=a)},null,8,["class","modelValue"]),h,(0,l.Wm)(o,{class:"invalid-feedback",name:"名字"})]),U,(0,l.Wm)(W,{class:"btn btn-outline-light signUpBtn",to:"/login"},{default:(0,l.w5)((()=>[k])),_:1})])),_:1})])])])],64)}}},x=s(89);const W=(0,x.Z)(y,[["__scopeId","data-v-23b13404"]]);var V=W}}]);
//# sourceMappingURL=958.36de94db.js.map