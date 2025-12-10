<script setup>
import { ref, onMounted } from "vue";
import ListPinjaman from "../../components/pinjaman/ListPinjaman.vue";
import axios from "axios";
import Swal from "sweetalert2";

const loans = ref([]);

const API = "http://localhost:8080/api";

const fetchPinjaman = async () => {
  try {
    const response = await axios.get(`${API}/history`);
    if (response.data && response.data.success) {
      loans.value = response.data.data;
    } else {
      loans.value = [];
    }
  } catch (error) {
    console.error("Gagal fetching semua pinjaman: ", error);
    Swal.fire({
      title: "Error",
      text: "Terjadi kesalahan saat memuat data pinjaman.",
      icon: "error",
    });
  }
};

const konfirmasiPengembalian = (loanId) => {
  Swal.fire({
    title: "Konfirmasi Pengembalian Buku",
    text: "pastikan buku sudah'DIKEMBALIKAN'? Status buku akan diperbarui.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#38a169",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, balikin",
    cancelButtonText: "gajadi",
  }).then((result) => {
    if (result.isConfirmed) {
      balikinBuku(loanId);
    }
  });
};

const balikinBuku = async (id) => {
  try {
    const response = await axios.put(`${API}/return/${id}`, {
      status: "RETURNED",
    });
    if (response.data && response.data.success) {
      Swal.fire({
        title: "Berhasil!",
        text: `Pinjaman ID ${id} udah di balikin`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "Gagal Menambahkan Buku",
        text: response.data.message,
        icon: "error",
      });
    }

    await fetchPinjaman();
  } catch (error) {
    Swal.fire({
      title: "Gagal!",
      text: `error dari server atau emang internet lu jelek ID ${id}.`,
      icon: "error",
    });
  }
};

onMounted(() => {
  fetchPinjaman();
});
</script>

<template>
  <div class="p-6 bg-white shadow-lg rounded-lg">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Daftar Pinjaman Buku</h2>

      <RouterLink
        :to="{ name: 'PinjamBuku' }"
        class="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150"
      >
        Pinjam Buku Baru
      </RouterLink>
    </div>

    <ListPinjaman :loans="loans" @kembali-pinjaman="konfirmasiPengembalian" />
  </div>
</template>
