import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home/index.vue"),
    meta: {
      title: "首页",
      login: true
    }
  },
  {
    path: "/home/login",
    name: "login",
    component: () => import("../views/Login/index.vue"),
    meta: {
      title: "登录",
      login: true
    }
  },
  {
    path: "/home/register",
    name: "register",
    component: () => import("../views/Register/index.vue"),
    meta: {
      title: "注册",
      login: true
    }
  },
  {
    path: "/home/editPage",
    name: "editPage",
    component: () => import("../views/EditPage/index.vue"),
    meta: {
      title: "编辑幻灯片",
      login: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
