<script setup>
import { useRouter } from "vue-router";
import FormBuku from "../../components/book/FormBuku.vue";
import axios from "axios";
import { ref } from "vue";

const router = useRouter();
const API_BASE_URL = "http://localhost:8080/api";

const isSubmitting = ref(false);

const handleCreateBook = async (formData) => {
  isSubmitting.value = true;
  console.log("Menyiapkan data untuk POST /api/book...");

  try {
    const response = await axios.post(`${API_BASE_URL}/book`, formData);

    if (response.data && response.data.success) {
      alert("Buku berhasil ditambahkan!");
      router.push({ name: "DaftarBuku" });
    } else {
      alert(
        "Gagal menambahkan buku: " +
          (response.data.message || "Kesalahan tak dikenal.")
      );
    }
  } catch (error) {
    console.error("Gagal menambahkan buku:", error.response || error);
    const errorMessage = error.response
      ? error.response.data.message || `Status Error: ${error.response.status}`
      : "Gagal terhubung ke server.";

    alert(`Terjadi kesalahan saat menyimpan data buku: ${errorMessage}`);
  } finally {
    isSubmitting.value = false;
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
