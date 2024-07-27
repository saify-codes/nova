import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { Message } from "@/utils";
import Dashboard from "@/views/dashboard.vue";
import Tools from "@/views/tools.vue";
import SignIn from "@/views/sign-in.vue";
import SignUp from "@/views/sign-up.vue";
import ForgotPassword from "@/views/forgot-password.vue";
import Setting from "@/views/setting.vue";
import Users from "@/views/users.vue";
import NotFound from "@/views/404.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        protected: true,
      },
    },
    {
      path: "/users",
      name: "users",
      component: Users,
      meta: {
        protected: true,
      },
    },
    {
      path: "/community",
      name: "community",
      component: Users,
      meta: {
        protected: true,
      },
    },
    {
      path: "/tools",
      name: "tools",
      component: Tools,
      meta: {
        protected: true,
      },
    },
    {
      path: "/setting",
      name: "setting",
      component: Setting,
      meta: {
        protected: true,
      },
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignIn,
      meta: {
        redirectIfAuth: true,
      },
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
      meta: {
        redirectIfAuth: true,
      },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
      meta: {
        redirectIfAuth: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.protected && !(await auth.authenticated())) {
    Message.flash("auth", "Login to continue");
    return next({ name: "sign-in" });
  }

  if (to.meta.redirectIfAuth && (await auth.authenticated())) {
    return next({ name: "dashboard" });
  }

  next();
});

export default router;
