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

const categories = [
  "Fiction",
  "Science",
  "Programming",
  "History",
  "Biography",
];

const formData = reactive({
  title: "",
  author: "",
  category: "",
  available: true,
});

watchEffect(() => {
  if (props.initialData) {
    formData.title = props.initialData.title || "";
    formData.author = props.initialData.author || "";
    formData.category = props.initialData.category || "";
    formData.available = props.initialData.available ?? true;
  }
});

const submitForm = () => {
  const dataToSend = {
    title: formData.title,
    author: formData.author,
    category: formData.category,
    available: formData.available,
  };

  emits("submitForm", dataToSend);
};
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700"
        >Title</label
      >
      <input
        type="text"
        id="title"
        v-model="formData.title"
        required
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div>
      <label for="author" class="block text-sm font-medium text-gray-700"
        >Author</label
      >
      <input
        type="text"
        id="author"
        v-model="formData.author"
        required
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div>
      <label for="category" class="block text-sm font-medium text-gray-700"
        >Category</label
      >
      <select
        id="category"
        v-model="formData.category"
        required
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="" disabled>Pilih Kategori</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <div class="flex items-center">
      <input
        id="available"
        type="checkbox"
        v-model="formData.available"
        class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      />
      <label for="available" class="ml-2 block text-sm text-gray-900">
        Available (Buku tersedia untuk dipinjam)
      </label>
    </div>

    <div class="pt-4">
      <button
        type="submit"
        class="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ isEditMode ? "Simpan Perubahan" : "Tambah Buku" }}
      </button>
    </div>
  </form>
</template>
