<script setup>
import { ref, onMounted } from "vue";
import ListBuku from "../../components/book/ListBuku.vue";
import KonfirmasiHapus from "../../components/ui/KonfirmasiHapus.vue";

import axios from "axios";

const books = ref([]);
const tampil = ref(false);
const bookToDelete = ref(null);

const API_BASE_URL = "http://localhost:8080/api";

const fetchBuku = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);

    if (response.data && response.data.success) {
      books.value = response.data.data;
    } else {
      books.value = [];
    }
  } catch (error) {
    console.error("Gagal fetching semua buku: ", error);
    alert("Error nih buku lu");
  }
};

const Konfirmasi = (bookId) => {
  bookToDelete.value = bookId;
  tampil.value = true;
};

const hapusBuku = async () => {
  if (!bookToDelete.value) return;

  try {
    const id = bookToDelete.value;
    await axios.delete(`${API_BASE_URL}/book/${id}`);
    alert(`Buku ID ${id} berhasil dihapus.`);

    tampil.value = false;
    bookToDelete.value = null;
    await fetchBuku();
  } catch (error) {
    console.error("Error deleting book:", error);
    alert(`Gagal menghapus buku ID ${bookToDelete.value}.`);
  }
};

const batalHapus = () => {
  tampil.value = false;
  bookToDelete.value = null;
};

onMounted(() => {
  fetchBuku();
});
</script>

<template>
  <div class="p-6 bg-white shadow-lg rounded-lg">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Daftar Buku</h2>

      <RouterLink
        :to="{ name: 'TambahBuku' }"
        class="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150"
      >
        Buku Baru
      </RouterLink>
    </div>

    <ListBuku :books="books" @hapus-buku="Konfirmasi" />

    <KonfirmasiHapus
      :isVisible="tampil"
      title="Konfirmasi Hapus Buku"
      message="Apakah Anda yakin ingin menghapus buku ini? Tindakan ini tidak dapat dibatalkan."
      confirmButtonText="Ya, Hapus"
      cancelButtonText="Batal"
      @confirm="hapusBuku"
      @cancel="batalHapus"
    />
  </div>
</template>
