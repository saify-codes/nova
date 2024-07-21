<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <img class="h-8 mb-6" src="/assets/img/logo.png" alt="logo" />
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Forgot Password
          </h1>

          <form
            class="space-y-4 md:space-y-6"
            @submit.prevent="handleSubmit"
            novalidate
          >
            <!-- Reset link alert -->
            <div
              class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
              role="alert"
              v-show="showAlert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Password reset link sent</span>
              </div>
            </div>
            <!-- Reset link alert -->

            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
                v-model="form.data.email"
              />
              <p class="mt-2 text-sm text-red-600 font-medium">
                {{ form.errors?.email }}
              </p>
            </div>
            <Button
              type="submit"
              className="w-full text-white bg-primary-600 disabled:!bg-gray-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              :loading="processing"
            >
              Send password reset link
            </Button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              back to
              <router-link
                :to="{ name: 'sign-in' }"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Sign in</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { toast } from "@/utils";
import Button from "@/components/button.vue";

const auth = useAuthStore();
const processing = ref(false);
const showAlert = ref(false);
const form = reactive({
  data: { email: "" },
  errors: {},
  isValid: false,
  submitted: false,
});

function handleSubmit() {
  form.submitted = true;

  if (!validateForm()) return;

  const { email } = form.data;
  showLoader(
    auth
      .resetPassword(email)
      .then(() => {
        toast("Email send successful", "success");
        showAlert.value = true;
      })
      .catch((error) => {
        toast(error, "danger");
      })
  );
}

function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function validateForm() {
  form.errors = {};

  if (form.data.email == "") {
    form.errors.email = "email field is required";
  } else if (!validateEmail(form.data.email)) {
    form.errors.email = "invalid email";
  }

  return (form.isValid = Object.keys(form.errors).length === 0);
}

function showLoader(promise) {
  processing.value = true;
  promise.finally(() => {
    processing.value = false;
  });
}

watch(form.data, () => {
  if (form.submitted) validateForm();
});
</script>