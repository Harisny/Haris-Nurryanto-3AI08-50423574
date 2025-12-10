<script setup>
import { reactive, watchEffect } from "vue";

const props = defineProps({
  initialData: {
    type: Object,
    default: null,
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["submitForm"]);

const formData = reactive({
  name: "",
  email: "",
});

watchEffect(() => {
  if (props.initialData) {
    formData.name = props.initialData.name || "";
  }
});

const submitForm = () => {
  const dataToSend = {
    name: formData.name,
    email: formData.email,
  };
  emits("submitForm", dataToSend);
};
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Nama
      </label>
      <input
        type="text"
        id="name"
        v-model="formData.name"
        required
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div v-if="isEditMode">
      <label for="email" class="block text-sm font-medium text-gray-700">
        Email : {{ initialData.email }}</label
      >
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email Baru
      </label>
      <input
        type="email"
        id="email"
        v-model="formData.email"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div class="pt-4">
      <button
        type="submit"
        class="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ props.isEditMode ? "Simpan Perubahan" : "Tambah Member Baru" }}
      </button>
    </div>
  </form>
</template>
