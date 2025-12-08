<script setup>
import Sidebar from "../components/ui/Sidebar.vue";
</script>

<template>
  <div class="min-h-screen flex">
    <Sidebar />

    <main class="flex-1 p-4">
      <router-view />
    </main>
  </div>
</template>
