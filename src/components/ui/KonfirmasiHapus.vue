<template>
  <Transition name="modal">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-center justify-center min-h-screen p-4">
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75"
          @click="$emit('cancel')"
        ></div>

        <div class="bg-white rounded-lg shadow-xl max-w-lg w-full z-50">
          <div class="p-6">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-red-100 sm:mx-0"
              >
                <svg
                  class="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg font-bold text-gray-900">{{ title }}</h3>
                <p class="mt-2 text-sm text-gray-500">{{ message }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-6 py-4 flex justify-end">
            <button
              type="button"
              class="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 mr-3"
              @click="$emit('cancel')"
            >
              {{ cancelButtonText }}
            </button>

            <button
              type="button"
              class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              @click="$emit('confirm')"
            >
              {{ confirmButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  isVisible: { type: Boolean, required: true },
  title: { type: String, default: "Konfirmasi Aksi" },
  message: {
    type: String,
    default: "Apakah Anda yakin ingin melanjutkan tindakan ini?",
  },
  confirmButtonText: { type: String, default: "Konfirmasi" },
  cancelButtonText: { type: String, default: "Batal" },
});

const emits = defineEmits(["confirm", "cancel"]);
</script>

<style scoped>
/* Transisi sederhana */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
