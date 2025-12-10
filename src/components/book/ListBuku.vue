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
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-3/12"
          >
            ID BUKU
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-3/12"
          >
            JUDUL
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-2/12"
          >
            PENULIS
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-2/12"
          >
            KATEGORI
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-2/12"
          >
            STATUS
          </th>
          <th
            class="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider w-2/12"
          >
            AKSI
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="book in props.books" :key="book.id">
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            {{ book.id }}
          </td>
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
              class="px-3 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="{
                'bg-green-100 text-green-800': book.available === true,
                'bg-red-100 text-red-800': book.available === false,
              }"
            >
              {{ book.available ? "Yes" : "No" }}
            </span>
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2"
          >
            <RouterLink
              :to="{ name: 'DetailBuku', params: { id: book.id } }"
              class="text-blue-600 hover:text-blue-900"
            >
              DETAIL
            </RouterLink>

            <RouterLink
              :to="{ name: 'EditBuku', params: { id: book.id } }"
              class="text-blue-600 hover:text-blue-900"
            >
              EDIT
            </RouterLink>

            <button
              @click="emits('hapusBuku', book.id)"
              class="text-red-600 hover:text-red-900"
            >
              HAPUS
            </button>
          </td>
        </tr>
        <tr v-if="props.books.length === 0">
          <td colspan="6" class="text-center py-8 text-gray-500">
            Tidak ada data buku yang tersedia.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
