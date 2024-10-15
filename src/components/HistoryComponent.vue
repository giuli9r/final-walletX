<script>
import { useTransactionStore } from '@/stores/transactionStore';
import { useCryptoStore } from '@/stores/cryptos';


  export default {
    name: "TransactionHistory",
    data() {
      return {
        transactionStore: useTransactionStore(),
        cryptoStore: useCryptoStore(),
        cryptos: [ 'btc', 'eth', 'dai', 'sol', 'usdt'],
        transactions: [],

        // Control de modal
        showModal: false,
        showModalEditar: false,
        selectedTransaction: {},
      };
    },
    computed: {
      // filteredTransactions() {
      //   // return this.transactions.filter(
      //   //   (transaction) => transaction.user_id === "USER1"
      //   // );
      //   return this.transactions
      // },
      formatNumber(number) {
        const numStr = number.toString();
        const parts = numStr.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return parts.join(',');
      },
    },
    methods: {
      getMoneyAmount(transaction) {
        const pricePerCrypto = this.cryptoPrices[transaction.crypto_code];
        const totalAmount = transaction.crypto_amount * pricePerCrypto;
  
        return transaction.action === "purchase" ? -totalAmount : totalAmount;
      },
      formatNumberFn(number) {
        const numStr = number.toString();
        const parts = numStr.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return parts.join(',');
      },
      formatDate(isoDate){
        // const isoDate = "2024-11-10T19:40:00.000Z";
        let dateObj = new Date(isoDate);

        // Obtener las partes de la fecha y la hora
        let year = dateObj.getFullYear();
        let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
        let day = String(dateObj.getDate()).padStart(2, '0');
        let hours = String(dateObj.getHours()).padStart(2, '0');
        let minutes = String(dateObj.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
      },
      editTransaction(transaction) {
        this.showModalEditar = true;
        this.selectedTransaction._id = transaction._id;
        this.selectedTransaction.action = transaction.action;
        this.selectedTransaction.datetime = transaction.datetime;
      },
      async deleteTransaction(transactionObj) {
        let id = transactionObj._id;
        this.transactions = this.transactions.filter(
          (transaction) => transaction.id !== id
        );
        let response = await this.transactionStore.deleteTransaction(transactionObj)
        this.selectedTransaction = {};
        if(!response) {
          alert("An error ocurred when trying to delete.")
          return;
        }
      },
      viewTransaction(transaction) {
        this.selectedTransaction = transaction;
        this.showModal = true;
      },
      // Cierra la modal
      closeModal(reaload) {
        this.showModal = false;
        this.showModalEditar = false;
        this.selectedTransaction = {};
        if (reaload)  location.reload()
      },
      async saveEdit(selectedTransaction) {
        this.showModalEditar = false;
        let response = await this.transactionStore.editTransaction(selectedTransaction)
        this.getHistory()
        this.selectedTransaction = {};
        if(!response) {
          alert("An error ocurred during edition.")
          this.selectedTransaction = {};
          return;
        }
      },
      selectCrypto(){
        // this.selectedTransaction.crypto_code = crypto
      },
      async getHistory(){
        let data = await this.transactionStore.getHistory(localStorage.getItem('username'))
        this.transactions = data ? data : [];
      }
    },
    mounted() {
      this.getHistory()
    }
  };
</script>
  
<template>
  <div class="transaction-history">
    <!-- <h2>Historial de Movimientos</h2> -->
    <table style="width: 100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Crypto Code</th>
          <th>Crypto Amount</th>
          <th>Date Time</th>
          <th>Action</th>
          <th>Fiat Amoun</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(transaction, index) in transactions"
          :key="transaction._id"
          :class="{'purchase-row': transaction.action == 'purchase',
                       'sale-row': transaction.action == 'sale'}"
        >
          <td>{{ transactions.length - (transactions.length - (index+1)) }}</td>
          <td>{{ transaction.crypto_code.toUpperCase() }}</td>
          <td>{{ transaction.crypto_amount }}</td>
          <td>{{ this.formatDate(transaction.datetime) }}</td>
          <td :class="{ 'bold-tex': transaction.action === 'sale'}">
                      {{ transaction.action === 'purchase' ? 'Purchase' : 'Sale' }}</td>
          <td :class="{'money-positive': transaction.action === 'sale', 
                       'money-negative': transaction.action === 'purchase'}">
              $ {{ this.formatNumberFn(transaction.money) }}
          </td>
          <td>
            <button class="btn info" @click="viewTransaction(transaction)">Details</button>
            <button class="btn warning" @click="editTransaction(transaction)">Edit</button>
            <button class="btn danger" @click="deleteTransaction(transaction)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <span class="info-data" v-show="!this.transactions.length"> No transactions made yet.</span>

    <!-- Modal para ver los detalles de la transacción -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Transaction Details </h3>
        <p><strong>ID:</strong> {{ selectedTransaction._id }}</p>
        <p><strong>Crypto Code:</strong> {{ selectedTransaction.crypto_code.toUpperCase() }}</p>
        <p><strong>Amount:</strong> {{ selectedTransaction.crypto_amount }}</p>
        <p><strong>Date Time:</strong> {{ this.formatDate(selectedTransaction.datetime) }}</p>
        <p><strong>Action:</strong> {{ selectedTransaction.action === 'purchase' ? 'Purchase' : 'Sale' }}</p>
        <p><strong>Fiat Amount:</strong>$ {{ this.formatNumberFn(selectedTransaction.money) }}</p>
        <hr class="divider" />
        <button @click="closeModal(false)">Close</button>
      </div>
    </div>

    <!-- Modal para editar la transacción -->
    <div v-if="showModalEditar" class="modal-overlay">
      <div class="modal">
        <h3>Youy can correct your values here </h3>
         <!-- ID (No editable) -->
        <p><strong>ID:</strong> {{ selectedTransaction._id }}</p>
        <!-- Crypto Code (Editable) -->
        <p><strong>Crypto Code:</strong>
          <select v-model="selectedTransaction.crypto_code" >
            <option disabled value="">Select Crypto</option>
            <option v-for="(crypto, i) in cryptos" :key="i" :value="crypto.toUpperCase()" >{{ crypto.toUpperCase() }}</option>
          </select> <span style="color: red" > *</span>
        </p>
        <!-- Amount (Editable) -->
        <p><strong>Amount:</strong>
          <input v-model="selectedTransaction.crypto_amount" type="number" min="0" step="any" />
        </p>
        <!-- Date Time (No editable) -->
        <p><strong>Date Time:</strong> {{ this.formatDate(selectedTransaction.datetime) }}</p>
        <!-- Action (No editable) -->
        <p><strong>Action:</strong> {{ selectedTransaction.action === 'purchase' ? 'Purchase' : 'Sale' }}</p>
        <!-- Fiat Amount (Editable) -->
        <p><strong>Fiat Amount:</strong>
          <input v-model="selectedTransaction.money" type="number" min="0" step="any" /><span style="color: red" > *</span>
        </p>
        <hr class="divider" />

        <button @click="closeModal(false)">Close</button>
        <button @click="saveEdit(selectedTransaction)">Confirm</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .transaction-history {
    /* max-width: 900px; */
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h2 {
    text-align: center;
    color: #333;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  thead {
    background-color: #f4f4f4;
  }
  
  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background-color: #f0f0f0;
    color: #333;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .info-data{
    font-size: 16px;
    color: #555; /* Color gris suave */
    font-style: italic; /* Texto en cursiva para dar un tono informativo */
    /* text-align: center; */
    justify-content: center;
  }
  
  /* Estilo de las filas por tipo de transacción */
  .purchase-row {
    background-color: #e6f4e6 !important;
  }
  
  .sale-row {
    background-color: #f9e6e6 !important;
  }
  
  .bold-text {
    font-weight: bold;
  }
  /* Estilo para el campo "Money" */
  .money-positive {
    color: green;
    font-weight: bold;
  }
  
  .money-negative {
    color: red;
    font-weight: bold;
  }
  
  /* Botones */

.btn {
  border: 2px solid black;
  background-color: white;
  color: black;
  /* padding: 14px 28px; */
  padding: 6px 12px;
  margin-right: 8px;
  border-radius: 5px;

  font-size: 16px;
  cursor: pointer;
}

.success {
  border-color: #04AA6D;
  color: green;
}

.success:hover {
  background-color: #04AA6D;
  color: white;
}

.info {
  border-color: #2196F3;
  color: dodgerblue
}

.info:hover {
  background: #2196F3;
  color: white;
}

.danger {
  border-color: #f44336;
  color: red
}

.danger:hover {
  background: #f44336;
  color: white;
}

  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .modal h3 {
    margin-top: 0;
  }
  
  .modal p {
    margin: 10px 0;
  }
  
  .modal button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .modal button:hover {
    background-color: #0056b3;
  }

  .divider {
    border: none;
    border-top: 1px solid #cecdcd;
    margin: 18px 0;
  }

</style>
  