<script setup>
import { useRouter } from "vue-router";
import FormPinjaman from "../../components/pinjaman/FormPinjaman.vue";
import axios from "axios";

const router = useRouter();
const API_BASE_URL = "http://localhost:8080/api";

const membuatPinjamn = async (formData) => {
  try {
    // formData sekarang berisi member dan book sebagai NUMBER
    const response = await axios.post(`${API_BASE_URL}/borrow`, formData);

    if (response.data && response.data.success) {
      alert("Pinjaman berhasil dibuat!");
      router.push({ name: "DaftarPinjaman" });
    } else {
      // Tangani respons sukses 200 yang isinya kegagalan logika
      alert(
        "Gagal membuat pinjaman: " +
          (response.data.message || "Kesalahan server yang tidak terdeteksi.")
      );
    }
  } catch (error) {
    // Penanganan Error (untuk 400 Bad Request atau lainnya)
    console.error("Gagal meminjam:", error);

    if (error.response) {
      const status = error.response.status;
      let message = "Terjadi kesalahan yang tidak terduga.";

      if (error.response.data && error.response.data.message) {
        message = error.response.data.message;
      } else if (status === 400) {
        message =
          "Data yang dikirim tidak valid. Pastikan ID Anggota dan ID Buku benar dan tersedia.";
      }

      alert(`Gagal membuat pinjaman (${status}): ${message}`);
    } else {
      alert("Gagal terhubung ke server. Periksa koneksi Anda.");
    }
  }
};
</script>

<template>
  <div class="p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Ajukan Pinjaman Baru</h2>
    <div class="bg-white shadow-lg rounded-lg p-6">
      <FormPinjaman @submit-form="membuatPinjamn" />
    </div>
  </div>
</template>
