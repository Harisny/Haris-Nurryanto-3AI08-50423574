<script setup>
import { ref, onMounted } from "vue";
import ListPinjaman from "../../components/pinjaman/ListPinjaman.vue";
import KonfirmasiAksi from "../../components/ui/KonfirmasiHapus.vue";
import axios from "axios";

const loans = ref([]);
const tampil = ref(false);
const loanToUpdate = ref(null);
const isLoading = ref(false);

const API_BASE_URL = "http://localhost:8080/api";

const fetchPinjaman = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`${API_BASE_URL}/history`);
    if (response.data && response.data.success) {
      loans.value = response.data.data;
    } else {
      loans.value = [];
    }
  } catch (error) {
    console.error("Gagal fetching semua pinjaman: ", error);
    alert("Terjadi kesalahan saat memuat data pinjaman.");
  } finally {
    isLoading.value = false;
  }
};

const konfirmasiPengembalian = (loanId) => {
  loanToUpdate.value = loanId;
  tampil.value = true;
};

const balikinBuku = async () => {
  if (!loanToUpdate.value) return;

  try {
    const id = loanToUpdate.value;

    await axios.put(`${API_BASE_URL}/return/${id}`, {
      status: "RETURNED",
    });

    alert(`Pinjaman ID ${id} berhasil dikembalikan.`);

    tampil.value = false;
    loanToUpdate.value = null;

    await fetchPinjaman();
  } catch (error) {
    console.error("Error pengembalian pinjaman: ", error);
    alert("Gagal memproses pengembalian buku.");
  }
};

const batalAksi = () => {
  tampil.value = false;
  loanToUpdate.value = null;
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

    <div v-if="isLoading" class="text-center py-10 text-gray-500">
      Memuat data pinjaman...
    </div>

    <ListPinjaman
      v-else
      :loans="loans"
      @kembali-pinjaman="konfirmasiPengembalian"
    />

    <KonfirmasiAksi
      :isVisible="tampil"
      title="Konfirmasi Pengembalian Buku"
      message="Apakah Anda yakin ingin menandai pinjaman ini sebagai 'DIKEMBALIKAN'? Status buku akan diperbarui."
      confirmButtonText="Ya, Kembalikan"
      cancelButtonText="Batal"
      @confirm="balikinBuku"
      @cancel="batalAksi"
    />
  </div>
</template>
