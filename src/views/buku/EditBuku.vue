<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import FormBuku from "../../components/book/FormBuku.vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const bookId = route.params.id;
const bookData = ref(null);
const loading = ref(true);

const API_BASE_URL = "http://localhost:8080/api";

const fetchBookData = async () => {
  loading.value = true;
  console.log(`Fetching data for book ID: ${bookId}`);

  try {
    const response = await axios.get(`${API_BASE_URL}/book/${bookId}`);
    if (response.data && response.data.success) {
      bookData.value = response.data.data;
    } else {
      console.error("Respons API tidak valid atau gagal:", response.data);
      books.value = null;
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
    bookData.value = null;
  } finally {
    loading.value = false;
  }
};

const handleUpdateBook = async (formData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/book/${bookId}`,
      formData
    );
    if (response.data && response.data.succes) {
      router.push({ name: "DaftarBuku" });
    } else {
      alert(
        "Gagal memperbarui buku: " +
          (response.data.message || "Kesalahan tak dikenal.")
      );
    }
    alert(`Buku ID ${bookId} berhasil diperbarui!`);
    router.push({ name: "DaftarBuku" });
  } catch (error) {
    console.error("Gagal memperbarui buku:", error);
    alert("Terjadi kesalahan saat memperbarui data buku.");
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
    <div v-if="loading" class="text-center py-10">Memuat data buku...</div>
    <div v-else-if="!bookData" class="text-center py-10 text-red-600">
      Buku tidak ditemukan.
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
