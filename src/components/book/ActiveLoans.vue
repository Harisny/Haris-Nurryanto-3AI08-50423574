<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-xl font-semibold mb-4 border-b pb-2">
      Daftar Pinjaman Aktif (GET /loans)
    </h2>

    <div class="mb-4 flex justify-between items-center">
      <p class="text-sm text-gray-600">
        Total Pinjaman Aktif: {{ loans.length }}
      </p>
      <button
        @click="fetchLoans"
        class="bg-gray-200 text-gray-700 py-1 px-3 text-sm rounded-md hover:bg-gray-300 transition duration-150"
      >
        Refresh Daftar (GET /loans)
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Buku
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Peminjam
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tanggal Pinjam
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tgl Kembali Target
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="loan in loans" :key="loan.id">
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ loan.bookTitle }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ loan.user }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ loan.loanDate }}
            </td>
            <td
              :class="[
                'px-6 py-4 whitespace-nowrap text-sm',
                loan.dueDate === '-' ? 'text-gray-400' : 'text-gray-500',
              ]"
            >
              {{ loan.dueDate || "-" }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="markReturned(loan.id)"
                class="text-green-600 hover:text-green-900 transition duration-150"
              >
                Kembalikan (PATCH)
              </button>
            </td>
          </tr>
          <tr v-if="loans.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-gray-500">
              Tidak ada pinjaman aktif saat ini.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  loans: {
    type: Array,
    required: true,
  },
});

// Fungsi simulasi untuk tombol "Refresh"
const fetchLoans = () => {
  alert("Simulasi: Memanggil API GET /loans?userId=xxx");
  // Logika fetch data dari backend akan ditempatkan di sini
};

// Fungsi untuk tombol "Kembalikan"
const markReturned = (loanId) => {
  // --- Simulasi Interaksi Backend: PATCH /loans/:id ---
  alert(
    `Simulasi: Mengirim PATCH request untuk mengubah status pinjaman ID: ${loanId} menjadi 'Dikembalikan'.`
  );
  // Logika update status pengembalian buku di backend akan ditempatkan di sini
};
</script>
