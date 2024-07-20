<template>
  Loading...
  <router-view />
</template>

<script>
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "@/config/firebase";
import { useAuthStore } from "./stores/auth";

export default {
  setup(){
    const {initAuthSession} = useAuthStore()
    initAuthSession()
  }
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
</script>