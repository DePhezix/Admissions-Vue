import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/index";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/authLayout.vue"),
    children: [
      { path: "", redirect: "/dashboard" },
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/auth/login/index.vue"),
        meta: { authType: true },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("@/views/auth/signUp/index.vue"),
        meta: { authType: true },
      },
      {
        path: "/forgot-password",
        name: "forgot-password",
        component: () => import("@/views/auth/forgotPassword/index.vue"),
        meta: { authType: true },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/dashboardLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/exams/index.vue"),
      },
      {
        path: "direction",
        name: "direction",
        component: () => import("@/views/dashboard/direction/index.vue"),
      },
      {
        path: "info",
        name: "info",
        component: () => import("@/views/dashboard/info/index.vue"),
      },
      {
        path: "contract",
        name: "contract",
        component: () => import("@/views/dashboard/contract/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.userData.role && Cookies.get("token")) {
    await authStore.initAuth();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/sign-up");
  } else if (to.meta.authType && authStore.isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
