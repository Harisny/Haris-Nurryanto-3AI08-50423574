<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-xl font-semibold mb-4 border-b pb-2">
      Formulir Peminjaman Baru
    </h2>

    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="book" class="block text-sm font-medium text-gray-700 mb-1"
          >Pilih Buku Tersedia</label
        >
        <select
          id="book"
          v-model="loanData.book"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>-- Pilih Buku --</option>
          <option
            v-for="book in availableBooks"
            :key="book.id"
            :value="book.title"
          >
            {{ book.title }} (Stok: {{ book.stock }})
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label for="user" class="block text-sm font-medium text-gray-700 mb-1"
          >ID/Nama Peminjam</label
        >
        <input
          type="text"
          id="user"
          v-model="loanData.user"
          placeholder="e.g., ID: 101 atau Nama User"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="mb-4">
        <label
          for="loanDate"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Tanggal Pinjam</label
        >
        <input
          type="date"
          id="loanDate"
          v-model="loanData.loanDate"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="mb-6">
        <label
          for="returnDate"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Tanggal Kembali (Target, Opsional)</label
        >
        <input
          type="date"
          id="returnDate"
          v-model="loanData.returnDate"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 font-semibold"
      >
        Pinjam Buku (POST /loans)
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

const emit = defineEmits(["submit-loan"]);

// Data form peminjaman
const loanData = reactive({
  book: "",
  user: "Admin (Simulasi Login)", // Default user (simulasi login)
  loanDate: new Date().toISOString().slice(0, 10), // Tanggal hari ini default
  returnDate: "",
});

// Data simulasi buku yang tersedia
const availableBooks = ref([
  { id: 1, title: "Filosofi Teras", stock: 5 },
  { id: 2, title: "Atomic Habits", stock: 8 },
  { id: 3, title: "Sapiens", stock: 2 },
]);

const submitForm = () => {
  // Logika validasi sederhana
  if (loanData.book && loanData.user && loanData.loanDate) {
    emit("submit-loan", { ...loanData });
    // Reset form setelah emit (opsional)
    loanData.book = "";
    loanData.returnDate = "";
  }
};
</script>
