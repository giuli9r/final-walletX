import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import { useLoginStore } from '@/stores/loginStore.js'


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
  }
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
