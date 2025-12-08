<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  loans: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits(["kembaliPinjaman"]);
</script>

<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12"
          >
            ID
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12"
          >
            PINJAM
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12"
          >
            JATUH TEMPO
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
          >
            STATUS
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
          >
            Member ID
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
          >
            BUKU ID
          </th>
          <th
            class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
          >
            AKSI
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="loan in loans" :key="loan.id">
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
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ loan.status }}
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
              @click="$emit('kembaliPinjaman', loan.id)"
              class="text-blue-600 hover:text-red-blue"
            >
              Kembalikan
            </button>
          </td>
        </tr>
        <tr v-if="loans.length === 0">
          <td colspan="6" class="text-center py-8 text-gray-500">
            Tidak ada data Pinjaman.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
