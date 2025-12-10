<script setup>
import { ref, onMounted } from "vue";
import ListBuku from "../../components/book/ListBuku.vue";
import axios from "axios";
import Swal from "sweetalert2";

const books = ref([]);

const API = "http://localhost:8080/api";

const fetchBuku = async () => {
  try {
    const response = await axios.get(`${API}/books`);

    if (response.data && response.data.success) {
      books.value = response.data.data;
    } else {
      books.value = [];
    }
  } catch (error) {
    console.error("gabisa fetching semua buku: ", error);
  }
};

const KonfirmasiHapusBuku = (bookId) => {
  Swal.fire({
    title: "Konfirmasi Hapus Buku",
    text: "udah yakin menghapus buku ini?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "yes, sir!",
    cancelButtonText: "gajadi",
  }).then((result) => {
    if (result.isConfirmed) {
      hapusBuku(bookId);
    }
  });
};

const hapusBuku = async (id) => {
  try {
    await axios.delete(`${API}/book/${id}`);

    Swal.fire({
      title: "Berhasil!",
      text: `Buku ID ${id} berhasil dihapus.`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    await fetchBuku();
  } catch (error) {
    console.error("Error hapus buku:", error);

    Swal.fire({
      title: "Gagal cuy!",
      text: `error masseh gabisa hapus bukunya -> ${id}.`,
      icon: "error",
    });
  }
};

const Konfirmasi = (bookId) => {
  KonfirmasiHapusBuku(bookId);
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
  </div>
</template>
