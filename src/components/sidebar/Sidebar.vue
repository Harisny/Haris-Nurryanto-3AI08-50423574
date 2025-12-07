<template>
  <div class="w-64 bg-gray-100 h-screen flex flex-col justify-between p-6">
    <div>
      <!-- <img src="../../assets/book-icon.jpg"></img> -->
      <h2 class="text-xl font-semibold mb-10 ml-4">
        <router-link to="/">Halo</router-link>
      </h2>

      <nav>
        <router-link
          v-for="link in navLinks"
          :key="link.label"
          :to="link.route"
          class="flex items-center py-3 px-2 rounded-lg text-gray-700 hover:bg-gray-200 transition duration-150"
          :class="{ 'bg-gray-200 font-medium': $route.path === link.route }"
        >
          <component :is="link.icon" class="w-5 h-5 mr-3"></component>
          <span>{{ link.label }}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { reactive, markRaw } from "vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  PlusCircleIcon,
  UsersIcon,
} from "@heroicons/vue/24/solid";

const navLinks = reactive([
  {
    label: "Penerbitan Buku",
    route: "/terbit-buku",
    icon: markRaw(ChevronLeftIcon),
  },
  {
    label: "Pengembalian Buku",
    route: "/kembali-buku",
    icon: markRaw(ChevronRightIcon),
  },
  {
    label: "Daftar Semua Buku",
    route: "/daftar-buku",
    icon: markRaw(PlusIcon),
  },
  {
    label: "Edit/Hapus Buku",
    route: "/ubah-buku",
    icon: markRaw(PlusCircleIcon),
  },
  {
    label: "Pengguna",
    route: "/pengguna",
    icon: markRaw(UsersIcon),
  },
]);
</script>
