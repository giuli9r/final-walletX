import { createRouter, createWebHistory } from 'vue-router';
import { useLoginStore } from '@/stores/loginStore.js'

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import TransactionComponent from '@/components/TransactionComponent.vue'
import PurchaseComponent from '@/components/actions/PurchaseComponent.vue'
import SaleComponent from '@/components/actions/SaleComponent.vue'



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
    component: TransactionComponent, // O algún otro componente para manejar las tabs
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('@/components/StatisticsComponent.vue'), // Lazy loading
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/components/HistoryComponent.vue'),
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@/components/HelpComponent.vue'),
  },
];

const router = createRouter({
    history: createWebHistory(), 
    // history: createWebHistory(process.env.BASE_URL),
    routes,
  });
  
router.beforeEach((to, from, next) => {
    const loginStore = useLoginStore(); // Verificar el estado de autenticación
  
    if (to.name !== 'Login' && !loginStore.isLogged) {
      // Si no está logueado y trata de acceder a una ruta protegida
      next({ name: 'Login' });
    } else {
      next(); // Si está autenticado o la ruta no necesita protección
    }
  });


export default router;
