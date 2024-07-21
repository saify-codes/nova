<template>
  <Layout>
    <Breadcrumb path="setting/profile" />
    <form>
      <div class="mb-5">
        <label
          for="avatar"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Avatar</label
        >
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        />
      </div>
      <div class="mb-5">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Name</label
        >
        <input
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="name@flowbite.com"
          required
          v-model="form.data.name"
        />
      </div>
      <button
        type="submit"
        class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Save
      </button>
    </form>
  </Layout>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";

import Layout from "@/layout/admin.vue";
import Breadcrumb from "@/components/breadcrumb.vue";
import { onMounted, reactive, watch } from "vue";

const auth = useAuthStore();

const form = reactive({
  data: { name: "" },
  erros: {},
  isValid: false,
  submitted: false,
});

watch(auth.getUser, (obj) => {
  form.data.name = obj?.name;
});
</script>

