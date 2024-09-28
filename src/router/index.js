import { createRouter, createWebHistory } from 'vue-router';
import { useLoginStore } from '@/stores/loginStore.js'

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import TransactionView from '@/views/TransactionView.vue';
// import StatisticsView from '@/views/StatisticsView.vue';
// import HistoryView from '@/views/HistoryView.vue';
// import HelpView from '@/views/HelpView.vue';
// import TransactionComponent from '@/components/TransactionComponent.vue'
// import HomeComponent from '@/components/HomeComponent.vue'
// import PurchaseComponent from '@/components/transactions/PurchaseComponent.vue'
// import SaleComponent from '@/components/transactions/SaleComponent.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionView, // O algún otro componente para manejar las tabs
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('@/views/StatisticsView.vue'), // Lazy loading
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/HistoryView.vue'),
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@/views/HelpView.vue'),
  },
];

const router = createRouter({
    history: createWebHistory(), 
    // history: createWebHistory(process.env.BASE_URL),
    routes,
  });
  
router.beforeEach((to, from, next) => {
    // const loginStore = useLoginStore(); 
    let isLoggedIn = localStorage.getItem('isLoggedIn') === "true"?? 0;

    if (to.name !== 'Login' && !isLoggedIn) {
      // Si no está logueado y trata de acceder a una ruta protegida
      next({ name: 'Login' });
    } else {
      next(); // Si está autenticado o la ruta no necesita protección
    }
  });


export default router;
