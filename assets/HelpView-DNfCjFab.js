import{_ as h,c as o,d as t,F as w,r as d,o as a,t as r,n as p,g as l,h as f}from"./index-B9uqkNkh.js";const y={data(){return{faqs:[{question:"What is Cryptocurrency?",answer:"Cryptocurrency is a digital or virtual form of currency that uses cryptography for security. It is decentralized and operates on blockchain technology.",showAnswer:!1},{question:"How do I buy cryptocurrency?",answer:"To buy cryptocurrency, you can sign up on a cryptocurrency exchange, deposit money, and purchase the digital assets of your choice.",showAnswer:!1},{question:"What are fees and charges?",answer:"Crypto transactions usually have fees associated with them, including transaction fees, network fees, and fees charged by the exchange platform.",showAnswer:!1},{question:"How secure is CryptoX (wallet)?",answer:"CryptoX uses state-of-the-art encryption and security protocols to ensure your funds are safe. Always enable two-factor authentication for added security.",showAnswer:!1},{question:"Statistics Explained",answer:"CryptoX uses statistics to give some insigths about wallet state and calculate profis/lost in real time.",answer2:`
 
          Last minute Fiat Amount: Indicates the total fiat value of the cryptocurrency we hold, based on the price at the last minute.
          % Total Fiat Amount	: The percentage it represents of the Total Fiat Value (if sold).	 
           Profit/Loss per Crypto:  Shows the profit or loss you would get from selling this amount of crypto.`,showAnswer:!1},{question:"Transaction Explained",answer:`CryptoX uses transaction in real time, calculating the best price in market to maximize your profits. You can buy and sell knowing that you do it at it best price at that moment. 
`,answer2:`
 
                    Total Fiat Value (if sold) 

                    indicates the total fiat value if all cryptocurrencies were sold.
                    Current Fiat Balance 

                    Reflects the current fiat balance, showing what you have at this moment.
                    Profit/Loss from Selling 
 
                    Shows the profit or loss you would get from selling all cryptocurrencies, adding intuition in terms of the purpose of the calculation.`,showAnswer:!1}],viewName:"Help"}},methods:{toggleAnswer(n){this.faqs[n].showAnswer=!this.faqs[n].showAnswer}},mounted(){console.log(`The ${this.viewName} view  mounted.`)}},m={class:"help-container"},g=["onClick"],v={key:0,class:"faq-answer"};function A(n,e,C,b,c,u){return a(),o("div",m,[e[1]||(e[1]=t("h1",null,"Help Center",-1)),e[2]||(e[2]=t("p",null,"Find answers to some of the most common questions below.",-1)),(a(!0),o(w,null,d(c.faqs,(s,i)=>(a(),o("div",{key:i,class:"faq-item"},[t("div",{class:"faq-question",onClick:q=>u.toggleAnswer(i)},[t("span",null,r(s.question),1),t("span",{class:p(["arrow",{rotated:s.showAnswer}])}," ▼ ",2)],8,g),s.showAnswer?(a(),o("div",v,[l(r(s.answer)+" ",1),e[0]||(e[0]=t("br",null,null,-1)),l(" "+r(s.answer2??""),1)])):f("",!0)]))),128))])}const k=h(y,[["render",A],["__scopeId","data-v-a1d39912"]]);export{k as default};
