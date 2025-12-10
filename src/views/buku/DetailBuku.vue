<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const bookId = route.params.id;
const book = ref(null);

const API_BASE_URL = "http://localhost:8080/api";

const fetchBukuDetail = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/book/${bookId}`);

    if (response.data && response.data.success) {
      book.value = response.data.data;
    } else {
      book.value = null;
      Swal.fire({
        title: "Gagal Memuat",
        text: "buku gabisa di panggil",
        icon: "error",
      });
    }
  } catch (error) {
    book.value = null;

    Swal.fire({
      title: "Error jaringan, Internet kau empruy",
      text: "jaringan lu empruyy",
      icon: "error",
    });
  }
};

onMounted(() => {
  fetchBukuDetail();
});
</script>

<template>
  <div class="p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Detail Buku</h2>

    <div v-if="book === null" class="text-center py-10 text-red-600">
      Buku tidak ditemukan atau gagal dimuat.
    </div>

    <div
      v-else
      class="bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      <div class="md:col-span-1">
        <img
          :src="book.image"
          alt="Cover Buku"
          class="w-full h-auto object-cover rounded-md shadow-md"
        />
      </div>

      <div class="md:col-span-2 space-y-4">
        <p class="text-sm font-semibold text-gray-500">Judul Buku</p>
        <h1 class="text-4xl font-extrabold text-indigo-700">
          {{ book.title }}
        </h1>

        <hr class="my-4" />

        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-semibold text-gray-500">Penulis</p>
            <p class="text-lg font-medium text-gray-900">{{ book.author }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-500">Kategori</p>
            <p class="text-lg font-medium text-gray-900">{{ book.category }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-500">Status</p>
            <span
              class="px-3 inline-flex text-xs leading-5 font-semibold"
              :class="{
                'bg-green-100 text-green-800': book.available === true,
                'bg-red-100 text-red-800': book.available === false,
              }"
            >
              {{ book.available ? "Tersedia" : "Belum Tersedia" }}
            </span>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-500">ID Buku</p>
            <p class="text-lg font-medium text-gray-900">{{ book.id }}</p>
          </div>
        </div>

        <div class="mt-6 flex space-x-3">
          <RouterLink
            :to="{ name: 'EditBuku', params: { id: book.id } }"
            class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
          >
            Edit Buku
          </RouterLink>
          <button
            @click="router.push({ name: 'DaftarBuku' })"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            Kembali ke Daftar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
