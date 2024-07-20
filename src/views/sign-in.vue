<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Flowbite
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>

          <!-- Account created alert -->
          <div
            class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
            v-show="Message.get('account-signup')"
          >
            <svg
              class="flex-shrink-0 inline w-4 h-4 me-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
              />
            </svg>

            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">Your account was created</span>
            </div>
          </div>
          <!-- Account created alert -->

          <!-- Auth required alert -->
          <div
            class="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800"
            role="alert"
            v-show="Message.get('auth')"
          >
            <svg
              class="flex-shrink-0 inline w-4 h-4 me-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
              />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">Sign in required</span>
            </div>
          </div>
          <!-- Auth required alert -->

          <form
            class="space-y-4 md:space-y-6"
            @submit.prevent="handleSubmit"
            novalidate
          >
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
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                v-model.trim="form.data.password"
              />
              <p class="mt-2 text-sm text-red-600 font-medium">
                {{ form.errors?.password }}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    v-model="form.data.remember"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300"
                    >Remember me</label
                  >
                </div>
              </div>
              <router-link
                :to="{ name: 'forgot-password' }"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Forgot password?</router-link
              >
            </div>
            <Button
              type="submit"
              className="w-full text-white bg-primary-600 disabled:!bg-gray-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              :loading="processing"
            >
              Sign in
            </Button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <router-link
                :to="{ name: 'sign-up' }"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Sign up</router-link
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
import { toast, Message } from "@/utils";
import router from "@/router";
import Button from "@/components/button.vue";

const auth = useAuthStore();
const processing = ref(false);
const form = reactive({
  data: { email: "", password: "", remember: false },
  errors: {},
  isValid: false,
  submitted: false,
});

function handleSubmit() {
  form.submitted = true;

  if (!validateForm()) return;

  const { email, password, remember } = form.data;
  showLoader(
    auth
      .signin(email, password, remember)
      .then(() => {
        toast("Sign in successful", "success");
        router.push({ name: "dashboard" });
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

  if (form.data.password == "") {
    form.errors.password = "password field is required";
  } else if (form.data.password.length < 8) {
    form.errors.password = "password must be 8 characters";
  }

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