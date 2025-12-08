<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  books: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits(["hapusBuku"]);
</script>

<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12"
          >
            Title
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
          >
            Author
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
          >
            Category
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
          >
            Status
          </th>
          <th
            class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="book in books" :key="book.id">
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            {{ book.title }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ book.author }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ book.category }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              class="px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
              v-if="book.available === true"
            >
              Yes
            </span>
            <span
              class="px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
              v-else="book.available === false"
            >
              No
            </span>
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2"
          >
            <RouterLink
              :to="{ name: 'DetailBuku', params: { id: book.id } }"
              class="text-blue-600 hover:text-blue-900"
            >
              Detail
            </RouterLink>

            <RouterLink
              :to="{ name: 'EditBuku', params: { id: book.id } }"
              class="text-blue-600 hover:text-blue-900"
            >
              Edit
            </RouterLink>

            <button
              @click="$emit('hapus-buku', book.id)"
              class="text-red-600 hover:text-red-900"
            >
              Hapus
            </button>
          </td>
        </tr>
        <tr v-if="books.length === 0">
          <td colspan="6" class="text-center py-8 text-gray-500">
            Tidak ada data buku yang tersedia.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
