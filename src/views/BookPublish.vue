<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      Penerbitan Buku (Peminjaman)
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1">
        <LoanForm @submit-loan="handleLoanSubmit" />
      </div>

      <div class="lg:col-span-2">
        <ActiveLoans :loans="activeLoans" />
      </div>
    </div>

    <div
      v-if="notification.show"
      :class="[
        'fixed bottom-5 right-5 p-4 rounded-lg text-white',
        notification.type === 'success' ? 'bg-green-500' : 'bg-red-500',
      ]"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import LoanForm from "../components/book/LoanForm.vue";
import ActiveLoans from "../components/book/ActiveLoans.vue";

// Data Mock untuk menampilkan daftar pinjaman aktif
const activeLoans = ref([
  {
    id: 1,
    bookTitle: "Filosofi Teras",
    user: "Admin",
    loanDate: "2025-12-07",
    dueDate: "2025-12-14",
    status: "Pinjam",
  },
  {
    id: 2,
    bookTitle: "Atomic Habits",
    user: "Budi",
    loanDate: "2025-12-06",
    dueDate: "2025-12-13",
    status: "Pinjam",
  },
]);

const notification = reactive({
  show: false,
  message: "",
  type: "success", // 'success' atau 'error'
});

// Fungsi untuk menangani submit dari form
const handleLoanSubmit = (formData) => {
  // --- Simulasi Interaksi Backend: POST /loans ---
  console.log("Mengirim data pinjaman:", formData);

  // Simulasi berhasil
  setTimeout(() => {
    notification.message = `Buku "${formData.book}" berhasil dipinjamkan.`;
    notification.type = "success";
    notification.show = true;

    // Tambahkan ke daftar pinjaman aktif (hanya di frontend untuk demo)
    activeLoans.value.unshift({
      id: Date.now(),
      bookTitle: formData.book,
      user: formData.user,
      loanDate: formData.loanDate,
      dueDate: formData.returnDate || "-",
      status: "Pinjam",
    });

    // Hilangkan notifikasi setelah 3 detik
    setTimeout(() => {
      notification.show = false;
    }, 3000);
  }, 500);
};

// --- Fungsi lainnya (seperti fetchLoans) dihiraukan sesuai instruksi ---
</script>
