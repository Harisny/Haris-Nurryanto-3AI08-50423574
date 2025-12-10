<script setup>
import { defineProps } from "vue";

const props = defineProps({
  members: {
    type: Array,
    required: true,
    default: () => [],
  },
});
const emits = defineEmits(["HapusMember"]);
</script>

<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12"
          >
            Member ID
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12"
          >
            Nama
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
          >
            Email
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
          >
            Aksi
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="member in members" :key="member.id">
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            {{ member.id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ member.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ member.email }}
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2"
          >
            <!-- <RouterLink
              :to="{ name: 'DetailMember', params: { id: member.id } }"
              class="text-blue-600 hover:text-blue-900"
            >
              Detail
            </RouterLink> -->

            <RouterLink
              :to="{ name: 'EditMember', params: { id: member.id } }"
              class="text-blue-600 hover:text-blue-900"
            >
              Edit
            </RouterLink>

            <button
              @click="$emit('hapus-member', member.id)"
              class="text-red-600 hover:text-red-900"
            >
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
