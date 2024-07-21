<template>
  <img class="w-10 h-10 rounded-full" :src="source" alt="Jese image" />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  src: String,
});

const source = computed(() => props.src ?? "/assets/img/avatar.jpg");
</script>