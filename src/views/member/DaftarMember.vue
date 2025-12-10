<script setup>
import { ref, onMounted } from "vue";
import ListMember from "../../components/member/ListMember.vue";

import axios from "axios";
import Swal from "sweetalert2";

const members = ref([]);
const API = "http://localhost:8080/api";

const fetchMember = async () => {
  try {
    const response = await axios.get(`${API}/members`);
    if (response.data && response.data.success) {
      members.value = response.data.data;
    } else {
      members.value = [];
    }
  } catch (error) {
    console.error("Gagal fetching semua member: ", error);

    Swal.fire({
      title: "Error",
      text: "Terjadi kesalahan saat memuat data member.",
      icon: "error",
    });
  }
};

const KonfirmasiHapusMember = (memberId) => {
  Swal.fire({
    title: "Konfirmasi Hapus Member",
    text: "Apakah Anda yakin ingin menghapus member ini? Tindakan ini tidak dapat dibatalkan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      hapusMember(memberId);
    }
  });
};

const hapusMember = async (id) => {
  try {
    await axios.delete(`${API}/member/${id}`);

    Swal.fire({
      title: "Berhasil!",
      text: `Member ID ${id} berhasil dihapus.`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    await fetchMember();
  } catch (error) {
    console.error("Error deleting member:", error);
    Swal.fire({
      title: "Gagal!",
      text: `Gagal menghapus Member ID ${id}.`,
      icon: "error",
    });
  }
};

const Konfirmasi = (memberId) => {
  KonfirmasiHapusMember(memberId);
};

onMounted(() => {
  fetchMember();
});
</script>

<template>
  <div class="p-6 bg-white shadow-lg rounded-lg">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Daftar Member</h2>

      <RouterLink
        :to="{ name: 'TambahMember' }"
        class="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150"
      >
        Member baru
      </RouterLink>
    </div>

    <ListMember :members="members" @hapus-member="Konfirmasi"></ListMember>
  </div>
</template>
