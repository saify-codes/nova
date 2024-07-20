<template>
  <Navbar />
  <Sidebar />
  <div class="p-4 sm:ml-64">
    <div class="p-4 mt-14">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";
import Sidebar from "./partials/sidebar.vue";
import Navbar from "./partials/navbar.vue";

onMounted(() => {
  initFlowbite();
});
</script>