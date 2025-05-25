import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import Layout from "./components/Layout.vue";
import UserRegister from "./components/User/UserRegister.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Layout,
      children: [
        {
          path: "/register",
          component: UserRegister
        }
      ]
    },
    {
      path: "/dashboard",
    }
  ]
})

createApp(App).use(router).mount('#app')
