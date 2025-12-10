<script setup>
import { useRouter } from "vue-router";
import FormPinjaman from "../../components/pinjaman/FormPinjaman.vue";
import axios from "axios";
import Swal from "sweetalert2"; // Impor SweetAlert2

const router = useRouter();
const API = "http://localhost:8080/api";

const membuatPinjaman = async (formData) => {
  try {
    const response = await axios.post(`${API}/borrow`, formData);

    if (response.data && response.data.success) {
      Swal.fire({
        title: "Berhasil!",
        text: "Pinjaman buku berhasil diajukan.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push({ name: "DaftarPinjaman" });
      });
    } else {
      const errorMessage =
        response.data.message || "Kesalahan server yang tidak terdeteksi.";
      Swal.fire({
        title: "Gagal Membuat Pinjaman",
        text: errorMessage,
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Gagal meminjam:", error.response || error);

    const errorMessage = error.response
      ? error.response.data.message ||
        `Status Error: ${error.response.status}. Gagal memproses permintaan.`
      : "Gagal terhubung ke server.";

    Swal.fire({
      title: "Error Jaringan/Server",
      text: errorMessage,
      icon: "error",
    });
  }
};
</script>

<template>
  <div class="p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Ajukan Pinjaman Baru</h2>
    <div class="bg-white shadow-lg rounded-lg p-6">
      <FormPinjaman @submit-form="membuatPinjaman" />
    </div>
  </div>
</template>
