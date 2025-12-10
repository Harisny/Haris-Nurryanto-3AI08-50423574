<script setup>
import { useRoute, useRouter } from "vue-router";
import FormMember from "../../components/member/FormMember.vue";
import Swal from "sweetalert2";
import axios from "axios";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const memberId = route.params.id;
const memberData = ref(null);

const API = "http://localhost:8080/api";

const fetchMemberData = async () => {
  try {
    const response = await axios.get(`${API}/member/${memberId}`);
    if (response.data && response.data.success) {
      memberData.value = response.data.data;
    } else {
      console.error("Respons API tidak valid atau gagal:", response.data);
      memberData.value = null;
    }
  } catch (error) {
    console.error("Gagal Fetching Data");
    memberData.value = null;
  }
};

const handleUpdateMember = async (formData) => {
  try {
    const response = await axios.put(`${API}/member/${memberId}`, formData);
    if (response.data && response.data.success) {
      Swal.fire({
        title: "Berhasil!",
        text: `Member ID ${memberId} berhasil diperbarui!`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push({ name: "DaftarMember" });
      });
    } else {
      Swal.fire({
        title: "Gagal Memperbarui",
        text: response.data.message || "Kesalahan tak terdeteksi.",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Gagal fetching member");
  }
};

onMounted(() => {
  fetchMemberData();
});
</script>

<template>
  <div class="p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">
      Perbarui Member ID : {{ memberId }}
    </h2>

    <div v-if="memberData === null" class="text-center py-10 text-red-600">
      Member tidak ditemukan atau gagal memuat data.
    </div>

    <div v-else class="bg-white shadow-lg rounded-lg p-6">
      <FormMember
        :initialData="memberData"
        :isEditMode="true"
        @submit-form="handleUpdateMember"
      />
    </div>
  </div>
</template>
