<script setup>
// import { defineProps } from "vue"; // Tidak diperlukan jika menggunakan sintaks langsung

const props = defineProps({
  loans: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits(["kembaliPinjaman"]);

const getStatusClass = (status) => {
  switch (status) {
    case "RETURNED":
      return "bg-green-100 text-green-800";
    case "OVERDUE":
      return "bg-red-100 text-red-800";
    case "BORROWED":
      return "bg-yellow-100 text-yellow-800";
    case "PENDING":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>

<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-1/12"
          >
            ID
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-1/12"
          >
            PINJAM
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-3/12"
          >
            JATUH TEMPO
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-2/12"
          >
            STATUS
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-2/12"
          >
            MEMBER ID
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-2/12"
          >
            BUKU ID
          </th>
          <th
            class="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider w-2/12"
          >
            AKSI
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="loan in props.loans" :key="loan.id">
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            {{ loan.id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ loan.loanDate }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ loan.returnDate }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              class="px-3 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="getStatusClass(loan.status)"
            >
              {{ loan.status }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ loan.member }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ loan.book }}
          </td>

          <td
            class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2"
          >
            <button
              v-if="loan.status !== 'RETURNED'"
              @click="emits('kembaliPinjaman', loan.id)"
              class="text-indigo-600 hover:text-indigo-900 font-semibold"
            >
              Kembalikan
            </button>
            <span v-else class="text-gray-400">Selesai</span>
          </td>
        </tr>
        <tr v-if="props.loans.length === 0">
          <td colspan="7" class="text-center py-8 text-gray-500">
            Tidak ada data Pinjaman yang tersedia.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
