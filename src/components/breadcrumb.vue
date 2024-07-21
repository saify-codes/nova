<template>
  <nav class="flex mb-5" aria-label="Breadcrumb">
    <ol
      class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
    >
      <li aria-current="page" v-for="(segment, index) in segments" :key="index">
        <div class="flex items-center">
          
          <span
            class="me-1 text-sm font-medium text-gray-500 md:me-2 dark:text-gray-400"
            >{{ segment }}</span
          >
          <svg
          class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
          v-if="index < segments.length - 1"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </div>
        <!-- <span v-if="index < segments.length - 1"> > </span> -->
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  path: String,
});

const segments = computed(() => props.path.split("/"));
</script>