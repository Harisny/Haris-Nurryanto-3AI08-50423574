import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../Layouts/MainLayout.vue";
import Beranda from "../views/Beranda.vue";
import DaftarBuku from "../views/buku/DaftarBuku.vue";
import TambahBuku from "../views/buku/TambahBuku.vue";
import EditBuku from "../views/buku/EditBuku.vue";
import DetailBuku from "../views/buku/DetailBuku.vue";
import PinjamBuku from "../views/pinjaman/PinjamBuku.vue";
import DaftarPinjaman from "../views/pinjaman/DaftarPinjaman.vue";

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
        path: "daftar-buku",
        name: "DaftarBuku",
        component: DaftarBuku,
      },
      {
        path: "tambah-buku",
        name: "TambahBuku",
        component: TambahBuku,
      },
      {
        path: "edit-buku/:id",
        name: "EditBuku",
        component: EditBuku,
      },
      {
        path: "detail-buku/:id",
        name: "DetailBuku",
        component: DetailBuku,
      },
      {
        path: "daftar-pinjaman",
        name: "DaftarPinjaman",
        component: DaftarPinjaman,
      },
      {
        path: "pinjaman-buku",
        name: "PinjamBuku",
        component: PinjamBuku,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
