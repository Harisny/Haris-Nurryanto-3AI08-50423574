<script setup>
import { useRouter } from "vue-router";
import FormBuku from "../../components/book/FormBuku.vue";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();
const API = "http://localhost:8080/api";

const handleCreateBook = async (formData) => {
  console.log("Menyiapkan data untuk POST /api/book...");

  try {
    const response = await axios.post(`${API}/book`, formData);

    if (response.data && response.data.success) {
      Swal.fire({
        title: "Berhasil!",
        text: "Buku berhasil ditambahkan!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push({ name: "DaftarBuku" });
      });
    } else {
      Swal.fire({
        title: "Gagal Menambahkan Buku",
        text: response.data.message || "Kesalahan tak dikenal.",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Gagal menambahkan buku:", error.response || error);
    const errorMessage = error.response
      ? error.response.data.message || `Status Error: ${error.response.status}`
      : "Gagal terhubung ke server.";

    Swal.fire({
      title: "Error Server",
      text: `Terjadi kesalahan saat menyimpan data buku: ${errorMessage}`,
      icon: "error",
    });
  }
};
</script>

<template>
  <div class="p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Buku Baru</h2>
    <div class="bg-white shadow-lg rounded-lg p-6">
      <FormBuku @submit-form="handleCreateBook" />
    </div>
  </div>
</template>
