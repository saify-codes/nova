<template>
  <Vue3Lottie
    v-show="show"
    class="!bg-white fixed z-[999] inset-0 grid place-content-center"
    :animationData="CatAnimation"
  />
</template>
  
  <script setup>
import { ref, watch } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import { useAuthStore } from "@/stores/auth";
import CatAnimation from "@/lottie/loader-1.json";

const auth = useAuthStore();
const show = ref(false);

const timeoutId = setTimeout(() => {
  show.value = true
}, 500);

watch(auth.getSessionStatus, (status) => {

  if (status !== "loading") {
    clearTimeout(timeoutId)
    show.value = false
  }

});

</script>
  