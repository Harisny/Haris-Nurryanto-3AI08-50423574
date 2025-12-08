<template>
  <div class="p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Detail Buku</h2>
    <div v-if="loading" class="text-center py-10">Memuat detail buku...</div>
    <div v-else-if="!book" class="text-center py-10 text-red-600">
      Buku tidak ditemukan.
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
              class="px-3 inline-flex text-xs leading-5 font-semibold bg-green-100 text-green-800"
              v-if="book.available === true"
            >
              Tersedia
            </span>
            <span
              class="px-3 inline-flex text-xs leading-5 font-semibold bg-red-100 text-red-800"
              v-else="book.available === false"
            >
              Belum Tersedia
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

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const bookId = route.params.id;
const book = ref(null);
const loading = ref(true);

const API_BASE_URL = "http://localhost:8080/api";

const fetchBookDetail = async () => {
  loading.value = true;
  console.log(`Fetching detail for book ID: ${bookId}`);
  try {
    if (!bookId) {
      console.error(
        "Kesalahan: bookId tidak ditemukan di URL. Cek konfigurasi rute."
      );
      loading.value = false;
      // Pilihan: Redirect ke halaman daftar atau tampilkan pesan error
      // router.push({ name: 'BookList' });
      return;
    }
    const response = await axios.get(`${API_BASE_URL}/book/${bookId}`);
    console.log(`boook id ${bookId}`);

    if (response.data && response.data.success) {
      book.value = response.data.data;
    } else {
      console.error("Respons API tidak valid atau gagal:", response.value);
      book.value = null;
    }
  } catch (error) {
    console.error("Error fetching book detail:", error);
    book.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBookDetail();
});
</script>
