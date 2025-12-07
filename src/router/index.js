import { createRouter, createWebHistory } from "vue-router";
import Beranda from "../views/Beranda.vue";
import MainLayout from "../Layouts/MainLayout.vue";
import BookPublish from "../views/BookPublish.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Beranda",
        component: Beranda,
      },
      {
        path: "terbit-buku",
        name: "Penerbitan Buku",
        component: BookPublish,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
