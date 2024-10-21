import{_ as w,a as S,u as b,o as d,c as u,d as e,F as h,r as f,n as p,t as l,w as c,v as y,g as a,h as v,i as D,j as C,e as M,f as k}from"./index-BvV5gMzh.js";const H={name:"TransactionHistory",data(){return{transactionStore:S(),cryptoStore:b(),cryptos:["btc","eth","dai","sol","usdt"],transactions:[],loadingHistory:!1,showModal:!1,showModalEditar:!1,selectedTransaction:{}}},computed:{},methods:{getMoneyAmount(o){const t=this.cryptoPrices[o.crypto_code],r=o.crypto_amount*t;return o.action==="purchase"?-r:r},formatNumberFn(o){const r=o.toString().split(".");return r[0]=r[0].replace(/\B(?=(\d{3})+(?!\d))/g,"."),r.join(",")},formatDate(o){let t=new Date(o),r=t.getFullYear(),m=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0"),i=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}-${m}-${s} ${i}:${n}`},editTransaction(o){this.showModalEditar=!0,this.selectedTransaction._id=o._id,this.selectedTransaction.action=o.action,this.selectedTransaction.datetime=o.datetime},async deleteTransaction(o){let t=o._id;this.transactions=this.transactions.filter(m=>m.id!==t);let r=await this.transactionStore.deleteTransaction(o);if(this.selectedTransaction={},r)this.deleteFromComponent(t);else{alert("An error ocurred when trying to delete.");return}},deleteFromComponent(o){let t=JSON.parse(localStorage.getItem("transaction-key")).transactions;this.transactions=t.filter(r=>r._id!==o)},viewTransaction(o){this.selectedTransaction=o,this.showModal=!0},closeModal(o){this.showModal=!1,this.showModalEditar=!1,this.selectedTransaction={},o&&location.reload()},async saveEdit(o){this.showModalEditar=!1;let t=await this.transactionStore.editTransaction(o);if(this.getHistory(),this.selectedTransaction={},!t){alert("An error ocurred during edition."),this.selectedTransaction={};return}},selectCrypto(){},async getHistory(){this.loadingHistory=!0;let o=await this.transactionStore.getHistory(localStorage.getItem("username"));this.transactions=o||[],this.loadingHistory=!1}},mounted(){this.transactionStore.updateWalletFromServer(localStorage.getItem("username")),this.getHistory()}},A={class:"transaction-history"},F={style:{width:"100%"}},N=["onClick"],E=["onClick"],x=["onClick"],I={class:"info-data"},V={class:"loader"},U={key:0,class:"modal-overlay"},P={class:"modal"},_={key:1,class:"modal-overlay"},B={class:"modal"},L=["value"];function j(o,t,r,m,s,i){return d(),u("div",A,[e("table",F,[t[6]||(t[6]=e("thead",null,[e("tr",null,[e("th",null,"ID"),e("th",null,"Crypto Code"),e("th",null,"Crypto Amount"),e("th",null,"Date Time"),e("th",null,"Action"),e("th",null,"Fiat Amoun"),e("th")])],-1)),e("tbody",null,[(d(!0),u(h,null,f(s.transactions,(n,g)=>(d(),u("tr",{key:n._id,class:p({"purchase-row":n.action=="purchase","sale-row":n.action=="sale"})},[e("td",null,l(s.transactions.length-(s.transactions.length-(g+1))),1),e("td",null,l(n.crypto_code.toUpperCase()),1),e("td",null,l(n.crypto_amount),1),e("td",null,l(this.formatDate(n.datetime)),1),e("td",{class:p({"bold-tex":n.action==="sale"})},l(n.action==="purchase"?"Purchase":"Sale"),3),e("td",{class:p({"money-positive":n.action==="sale","money-negative":n.action==="purchase"})}," $ "+l(this.formatNumberFn(n.money)),3),e("td",null,[e("button",{class:"btn info",onClick:T=>i.viewTransaction(n)},"Details",8,N),e("button",{class:"btn warning",onClick:T=>i.editTransaction(n)},"Edit",8,E),e("button",{class:"btn danger",onClick:T=>i.deleteTransaction(n)},"Delete",8,x)])],2))),128))])]),c(e("span",I,"No transactions made yet.",512),[[y,!this.transactions.length&&!this.loadingHistory]]),c(e("span",{class:p(["info-data",{isLoading:this.isLoading}])}," Please wait. Loading data from server .... ",2),[[y,this.loadingHistory]]),c(e("span",V,null,512),[[y,this.loadingHistory]]),t[27]||(t[27]=e("br",null,null,-1)),c(e("span",{class:"info-data"}," Fiat Amount:$ "+l(i.formatNumberFn(this.transactionStore.wallet.fiatAmount.toFixed(2))),513),[[y,this.transactions.length]]),s.showModal?(d(),u("div",U,[e("div",P,[t[13]||(t[13]=e("h3",null,"Transaction Details ",-1)),e("p",null,[t[7]||(t[7]=e("strong",null,"ID:",-1)),a(" "+l(s.selectedTransaction._id),1)]),e("p",null,[t[8]||(t[8]=e("strong",null,"Crypto Code:",-1)),a(" "+l(s.selectedTransaction.crypto_code.toUpperCase()),1)]),e("p",null,[t[9]||(t[9]=e("strong",null,"Amount:",-1)),a(" "+l(s.selectedTransaction.crypto_amount),1)]),e("p",null,[t[10]||(t[10]=e("strong",null,"Date Time:",-1)),a(" "+l(this.formatDate(s.selectedTransaction.datetime)),1)]),e("p",null,[t[11]||(t[11]=e("strong",null,"Action:",-1)),a(" "+l(s.selectedTransaction.action==="purchase"?"Purchase":"Sale"),1)]),e("p",null,[t[12]||(t[12]=e("strong",null,"Fiat Amount:",-1)),a("$ "+l(this.formatNumberFn(s.selectedTransaction.money)),1)]),t[14]||(t[14]=e("hr",{class:"divider"},null,-1)),e("button",{onClick:t[0]||(t[0]=n=>i.closeModal(!1))},"Close")])])):v("",!0),s.showModalEditar?(d(),u("div",_,[e("div",B,[t[25]||(t[25]=e("h3",null,"Youy can correct your values here ",-1)),e("p",null,[t[15]||(t[15]=e("strong",null,"ID:",-1)),a(" "+l(s.selectedTransaction._id),1)]),e("p",null,[t[17]||(t[17]=e("strong",null,"Crypto Code:",-1)),c(e("select",{"onUpdate:modelValue":t[1]||(t[1]=n=>s.selectedTransaction.crypto_code=n)},[t[16]||(t[16]=e("option",{disabled:"",value:""},"Select Crypto",-1)),(d(!0),u(h,null,f(s.cryptos,(n,g)=>(d(),u("option",{key:g,value:n.toUpperCase()},l(n.toUpperCase()),9,L))),128))],512),[[D,s.selectedTransaction.crypto_code]]),t[18]||(t[18]=a()),t[19]||(t[19]=e("span",{style:{color:"red"}}," *",-1))]),e("p",null,[t[20]||(t[20]=e("strong",null,"Crypto Amount:",-1)),c(e("input",{"onUpdate:modelValue":t[2]||(t[2]=n=>s.selectedTransaction.crypto_amount=n),type:"number",min:"0",step:"any"},null,512),[[C,s.selectedTransaction.crypto_amount]])]),e("p",null,[t[21]||(t[21]=e("strong",null,"Date Time:",-1)),a(" "+l(this.formatDate(s.selectedTransaction.datetime)),1)]),e("p",null,[t[22]||(t[22]=e("strong",null,"Action:",-1)),a(" "+l(s.selectedTransaction.action==="purchase"?"Purchase":"Sale"),1)]),e("p",null,[t[23]||(t[23]=e("strong",null,"Fiat Amount:",-1)),c(e("input",{"onUpdate:modelValue":t[3]||(t[3]=n=>s.selectedTransaction.money=n),type:"number",min:"0",step:"any"},null,512),[[C,s.selectedTransaction.money]]),t[24]||(t[24]=e("span",{style:{color:"red"}}," *",-1))]),t[26]||(t[26]=e("hr",{class:"divider"},null,-1)),e("button",{onClick:t[4]||(t[4]=n=>i.closeModal(!1))},"Close"),e("button",{onClick:t[5]||(t[5]=n=>i.saveEdit(s.selectedTransaction))},"Confirm")])])):v("",!0)])}const Y=w(H,[["render",j],["__scopeId","data-v-76157b87"]]),z={components:{HistoryComponent:Y},data(){return{count:1,viewName:"History of transactions"}},methods:{increment(){this.count++},sayHi(){alert(this.viewName)}},mounted(){console.log(`The ${this.viewName} view  mounted.`)}};function J(o,t,r,m,s,i){const n=k("history-component");return d(),u(h,null,[t[0]||(t[0]=e("br",null,null,-1)),e("h2",null,l(this.viewName),1),M(n,{style:{width:"100%"}})],64)}const W=w(z,[["render",J],["__scopeId","data-v-aed29982"]]);export{W as default};
