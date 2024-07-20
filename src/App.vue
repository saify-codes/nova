<template>
  <FullPageLoader/>
  <router-view />
</template>

<script setup>
import { useAuthStore } from "./stores/auth";
import FullPageLoader from "@/components/full-page-loaders/loader-1.vue";

// Initialize auth session
useAuthStore().initAuthSession();
</script>

<script>
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config/firebase";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
</script>

