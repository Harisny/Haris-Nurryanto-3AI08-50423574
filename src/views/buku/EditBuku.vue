<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import FormBuku from "../../components/book/FormBuku.vue";
import axios from "axios";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const bookId = route.params.id;
const bookData = ref(null);

const API = "http://localhost:8080/api";

const fetchBookData = async () => {
  try {
    const response = await axios.get(`${API}/book/${bookId}`);
    if (response.data && response.data.success) {
      bookData.value = response.data.data;
    } else {
      console.error("Respons API tidak valid atau gagal:", response.data);
      bookData.value = null;

      Swal.fire({
        title: "Gagal Memuat",
        text: "Detail buku tidak ditemukan.",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
    bookData.value = null;
  }
};

const handleUpdateBook = async (formData) => {
  try {
    const response = await axios.put(`${API}/book/${bookId}`, formData);

    if (response.data && response.data.success) {
      Swal.fire({
        title: "Berhasil!",
        text: `Buku lu ${bookId} berhasil diperbarui!`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push({ name: "DaftarBuku" });
      });
    } else {
      Swal.fire({
        title: "Gagal Memperbarui",
        text: response.data.message,
        icon: "error",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error Jaringan",
      text: "Terjadi kesalahan saat memperbarui data buku / emang internet lu yang empruy",
      icon: "error",
    });
  }
};

onMounted(() => {
  fetchBookData();
});
</script>
<template>
  <div class="p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">
      Perbarui Buku ID : {{ bookId }}
    </h2>

    <div v-if="bookData === null" class="text-center py-10 text-red-600">
      Buku tidak ditemukan atau gagal memuat data.
    </div>

    <div v-else class="bg-white shadow-lg rounded-lg p-6">
      <FormBuku
        :initialData="bookData"
        :isEditMode="true"
        @submit-form="handleUpdateBook"
      />
    </div>
  </div>
</template>
