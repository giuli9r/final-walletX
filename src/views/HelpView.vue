<script>
export default {
  data() {
    return {
      // Lista de preguntas frecuentes
      faqs: [
        {
          question: "What is Cryptocurrency?",
          answer: "Cryptocurrency is a digital or virtual form of currency that uses cryptography for security. It is decentralized and operates on blockchain technology.",
          showAnswer: false
        },
        {
          question: "How do I buy cryptocurrency?",
          answer: "To buy cryptocurrency, you can sign up on a cryptocurrency exchange, deposit money, and purchase the digital assets of your choice.",
          showAnswer: false
        },
        {
          question: "What are fees and charges?",
          answer: "Crypto transactions usually have fees associated with them, including transaction fees, network fees, and fees charged by the exchange platform.",
          showAnswer: false
        },
        {
          question: "How secure is CryptoX (wallet)?",
          answer: "CryptoX uses state-of-the-art encryption and security protocols to ensure your funds are safe. Always enable two-factor authentication for added security.",
          showAnswer: false
        },
        {
          question: "Statistics Explained",
          answer: "CryptoX uses statistics to give some insigths about wallet state and calculate profis/lost in real time.",
          answer2: `\n 
          Last minute Fiat Amount: Indicates the total fiat value of the cryptocurrency we hold, based on the price at the last minute.
          % Total Fiat Amount	: The percentage it represents of the Total Fiat Value (if sold).	 
           Profit/Loss per Crypto:  Shows the profit or loss you would get from selling this amount of crypto.`,
          
          showAnswer: false
        },
        {
          question: "Transaction Explained",
          answer: `CryptoX uses transaction in real time, calculating the best price in market to maximize your profits. You can buy and sell knowing that you do it at it best price at that moment. \n`,
          answer2: `\n 
                    Total Fiat Value (if sold) \n
                    indicates the total fiat value if all cryptocurrencies were sold.
                    Current Fiat Balance \n
                    Reflects the current fiat balance, showing what you have at this moment.
                    Profit/Loss from Selling \n 
                    Shows the profit or loss you would get from selling all cryptocurrencies, adding intuition in terms of the purpose of the calculation.`,
          showAnswer: false

        }
      ],
      viewName: "Help"
    };
  },
  methods: {
    toggleAnswer(index) {
      this.faqs[index].showAnswer = !this.faqs[index].showAnswer;
    }
  },
  mounted() {
    console.log(`The ${this.viewName} view  mounted.`)
  }
};
</script>

<template>
  
  <h2>{{ this.viewName }}</h2>
  <div class="help-container">
    <h1>Help Center</h1>
    <p>Find answers to some of the most common questions below.</p>

    <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
      <div class="faq-question" @click="toggleAnswer(index)">
        <span>{{ faq.question }}</span>
        <span class="arrow" :class="{ 'rotated': faq.showAnswer }">
          &#9660; <!-- Flecha hacia abajo -->
        </span>
      </div>
      <div v-if="faq.showAnswer" class="faq-answer">
        {{ faq.answer }} <br>
        {{ faq.answer2?? '' }}
      </div>
    </div>
  </div>
</template>


<style scoped>
.help-container {
  max-width: 800px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
}

p {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.faq-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #333;
  background-color: #f7f7f7;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #e9e9e9;
}

.arrow {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  padding-left: 15px;
}
</style>