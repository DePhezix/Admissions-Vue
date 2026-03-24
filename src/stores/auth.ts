import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { sha256 } from "js-sha256";
import Cookies from "js-cookie";
import axios from "axios";

import type { userData, loginResponse } from "@/types/backend";
import type { Faculty } from "@/types/frontend";

export const useAuthStore = defineStore("auth", () => {
  const hash = sha256.create();

  const token = ref<string | null>(null);
  const loading = ref<boolean>(true);

  const selectedFaculty = ref<Faculty>("");

  const noUser = {
    id: null,
    role: null, //default null
    name: "Akram Karimov",
    email: "akram@cau.com",
  };

  const userData = reactive<userData>(noUser);

  const isAuthenticated = computed<boolean>(() => !!userData.role);

  async function initAuth() {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      loading.value = true;
      token.value = savedToken;
      try {
        const userDataResponse = await axios.get<userData>("", {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });

        Object.assign(userData, userDataResponse.data);
      } catch (error) {
        console.error("Failed to fetch user data during initAuth:", error);
        token.value = null;
        Object.assign(userData, noUser);
        Cookies.remove("token");
      } finally {
        loading.value = false;
      }
    }
  }

  async function signUpUser() {
    userData.role = " ";
  }

  async function loginUser(email: string, password: string) {
    try {
      loading.value = true;
      hash.update(password);

      const response = await axios.post<loginResponse>("", {
        email,
        password: hash.hex(),
      });

      token.value = response.data.access_token;
      const userResponseData = await axios.get<userData>("", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      Object.assign(userData, userResponseData.data);
      Cookies.set("token", token.value);

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Failed to login");
    } finally {
      loading.value = false;
    }
  }

  function signOutUser() {
    Object.assign(userData, noUser);
    Cookies.remove("token");
  }

  function setSelectedFaculty(newVal: Faculty) {
    selectedFaculty.value = newVal;
  }

  return {
    isAuthenticated,
    userData,
    token,
    loading,
    selectedFaculty,
    signOutUser,
    signUpUser,
    loginUser,
    initAuth,
    setSelectedFaculty,
  };
});
