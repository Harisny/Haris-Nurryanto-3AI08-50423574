import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../Layouts/MainLayout.vue";
import Beranda from "../views/Beranda.vue";
import DaftarBuku from "../views/buku/DaftarBuku.vue";
import TambahBuku from "../views/buku/TambahBuku.vue";
import EditBuku from "../views/buku/EditBuku.vue";
import DetailBuku from "../views/buku/DetailBuku.vue";
import PinjamBuku from "../views/pinjaman/PinjamBuku.vue";
import DaftarPinjaman from "../views/pinjaman/DaftarPinjaman.vue";
import DaftarMember from "../views/member/DaftarMember.vue";
import TambahMember from "../views/member/TambahMember.vue";
import EditMember from "../views/member/EditMember.vue";

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
      {
        path: "daftar-member",
        name: "DaftarMember",
        component: DaftarMember,
      },
      {
        path: "tambah-member",
        name: "TambahMember",
        component: TambahMember,
      },
      {
        path: "edit-member/:id",
        name: "EditMember",
        component: EditMember,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
