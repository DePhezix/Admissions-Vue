<template>
  <div class="flex h-[calc(100vh-100px)] gap-[20px] pb-[20px]">
    <SideAuth class="max-sm:hidden flex-1" />
    <div class="flex-1 sm:flex-[0.7] md:flex-[0.5] flex flex-col">
      <div class="flex-1 flex flex-col gap-[24px]">
        <div class="flex flex-col gap-[14px] items-center">
          <img src="/src/assets/imgs/auth_schools_icon.avif" class="w-[88px]" />
          <header class="flex flex-col gap-[4px]">
            <h1
              class="sf-display font-[600] text-[24px] leading-[32px] text-[#303030] text-center"
            >
              Bachelor Faculties
            </h1>
          </header>
        </div>

        <div class="flex flex-col gap-[16px] mb-[24px]">
          <el-tabs v-model="activePane">
            <el-tab-pane label="All" name="all">
              <div class="flex flex-col gap-[12px] overflow-auto">
                <RadioCard
                  v-for="faculty in faculties"
                  :key="faculty"
                  v-model="chosenFaculty"
                  :value="faculty"
                  :label="faculty"
                >
                  <template #icon>
                    <Collection
                      class="w-[20px]! h-[20px]!"
                      :color="chosenFaculty === faculty ? '#335CFF' : ''"
                    />
                  </template>
                </RadioCard>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Business school" name="business" />
            <el-tab-pane label="Engineer" name="engineer" />
          </el-tabs>
        </div>
      </div>
      <div class="w-full flex gap-[12px]">
        <el-button
          class="sf-display font-[700] py-[12px] flex-1 px-[10px] h-fit rounded-[10px] leading-[20px]"
          @click="router.push('/dashboard')"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          class="sf-display font-[700] flex-1 py-[12px] px-[10px] h-fit rounded-[10px] leading-[20px]"
          @click="confirmChange"
        >
          Confirm
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import RadioCard from "@/components/radioCard.vue";
import SideAuth from "@/layouts/components/sideMenu/auth.vue";
import { useAuthStore } from "@/stores";
import { useRouter } from "vue-router";

import type { Faculty } from "@/types/frontend";

const chosenFaculty = ref<Faculty>("Medicine school");
const router = useRouter();

const activePane = ref("all");
const authStore = useAuthStore();

const faculties = ref<string[]>([
  "Medicine school",
  "Dental school",
  "Hospitality & Tourism school",
]);

const confirmChange = () => {
  router.push("/dashboard");
};

watch(
  () => chosenFaculty.value,
  () => {
    authStore.setSelectedFaculty(chosenFaculty.value as Faculty);
  },
);

onMounted(() => {
  authStore.setSelectedFaculty(chosenFaculty.value as Faculty);
});
</script>
