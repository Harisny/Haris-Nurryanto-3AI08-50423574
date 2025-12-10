<script setup>
import { useRouter } from "vue-router";
import FormMember from "../../components/member/FormMember.vue";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();
const API_BASE_URL = "http://localhost:8080/api";

const handleCreateMember = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/member`, formData);

    if (response.data && response.data.success) {
      Swal.fire({
        title: "Berhasil!",
        text: "Member baru berhasil ditambahkan.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push({ name: "DaftarMember" });
      });
    }
  } catch (error) {
    console.error("Gagal menambahkan member:", error.response || error);

    const errorMessage = error.response.data.message;

    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
    });
  }
};
</script>

<template>
  <div class="p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Tambah Member Baru</h2>
    <div class="bg-white shadow-lg rounded-lg p-6">
      <FormMember @submit-form="handleCreateMember"></FormMember>
    </div>
  </div>
</template>
