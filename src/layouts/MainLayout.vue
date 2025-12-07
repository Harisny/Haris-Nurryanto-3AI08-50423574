<script setup>
import Sidebar from "../components/sidebar/sidebar.vue";
</script>

<template>
  <div class="min-h-screen flex">
    <Sidebar />

    <main class="flex-1 p-4">
      <router-view />
    </main>
  </div>
</template>
