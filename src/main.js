import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import Layout from "./components/Layout.vue";
import UserRegister from "./components/User/UserRegister.vue";
import UserLogin from "./components/User/UserLogin.vue";
import DashboardLayout from "./components/DashboardLayout.vue";
import ContactList from "./components/Contact/ContactList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Layout,
      children: [
        {
          path: "/register",
          component: UserRegister
        },
        {
          path: "/login",
          component: UserLogin
        }
      ]
    },
    {
      component: DashboardLayout,
      path: "/dashboard",
      children: [
        {
          path: "contacts",
          component: ContactList
        }
      ]
    }
  ]
})

createApp(App).use(router).mount('#app')
