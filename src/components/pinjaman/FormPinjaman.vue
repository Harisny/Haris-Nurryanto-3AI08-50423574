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

const loanStatuses = ["BORROWED", "RETURNED", "OVERDUE", "PENDING"];

const formData = reactive({
  member_id: "",
  book_id: "",
  returnDate: "",
  status: "BORROWED",
});

watchEffect(() => {
  if (props.initialData) {
    formData.member_id = props.initialData.member || "";
    formData.book_id = props.initialData.book || "";
    formData.returnDate = props.initialData.returnDate || "";
    formData.status = props.initialData.status || "BORROWED";
  }
});

const submitForm = () => {
  const dataToSend = {
    member: formData.member_id,
    book: formData.book_id,
    returnDate: formData.returnDate,
    status: formData.status,
  };

  emits("submitForm", dataToSend);
};
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <label for="member_id" class="block text-sm font-medium text-gray-700">
        ID Anggota
      </label>
      <input
        type="text"
        id="member_id"
        v-model="formData.member_id"
        required
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div>
      <label for="book_id" class="block text-sm font-medium text-gray-700">
        ID Buku
      </label>
      <input
        type="text"
        id="book_id"
        v-model="formData.book_id"
        required
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div>
      <label for="returnDate" class="block text-sm font-medium text-gray-700">
        Tanggal Pengembalian
      </label>
      <input
        type="date"
        id="returnDate"
        v-model="formData.returnDate"
        required
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <div>
      <label for="status" class="block text-sm font-medium text-gray-700">
        Status Pinjaman
      </label>
      <select
        id="status"
        v-model="formData.status"
        required
        :disabled="!props.isEditMode"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
      >
        <option value="" disabled>Pilih Status</option>
        <option v-for="status in loanStatuses" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </div>

    <div class="pt-4">
      <button
        type="submit"
        class="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ props.isEditMode ? "Simpan Pinjaman" : "Ajukan Pinjaman" }}
      </button>
    </div>
  </form>
</template>
