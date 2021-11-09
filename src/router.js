import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Admin from './components/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/logIn',
    name: 'logIn',
    component: LogIn
  },
  {
    path: '/user/signUp',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/user/home',
    name: 'home',
    component: Home
  },
  {
    path: '/user/admin',
    name: 'admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
