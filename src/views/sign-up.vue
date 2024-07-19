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
            Create your account
          </h1>
          <form
            class="space-y-4 md:space-y-6"
            @submit.prevent="handleSubmit"
            novalidate
          >
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Name</label
              >
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john doe"
                required
                v-model="form.data.name"
              />
              <p class="mt-2 text-sm text-red-600 font-medium">
                {{ form.errors?.name }}
              </p>
            </div>
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

            <Button
              type="submit"
              className="w-full text-white bg-primary-600 disabled:!bg-gray-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              :loading="processing"
            >
              Create account
            </Button>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <router-link
                to="/sign-in"
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
import { Message } from "@/utils/flash";
import router from "@/router"
import Button from "@/components/button.vue";

const auth = useAuthStore();
const processing = ref(false);
const form = reactive({
  data: { name: "", email: "", password: "" },
  errors: {},
  isValid: false,
  submitted: false,
});

function handleSubmit() {
  
  form.submitted = true;

  if (!validateForm()) return;

  const {email, password} = form.data
  showLoader(
    auth.signup(email, password)
    .then(()=>{
      Message.flash('account-signup' , 'account created')
      router.push({name:'sign-in'})
    })
    .catch(()=>{})
  )
}

function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function validateForm() {
  form.errors = {};

  if (form.data.name == "") {
    form.errors.name = "name field is required";
  } else if (form.data.name.length < 3) {
    form.errors.name = "name must be 3 characters";
  }

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