<template>
  <el-menu
    @select="handeSelect"
    class="flex flex-col min-h-screen max-h-screen"
    :default-active="currentIdx"
    :collapse="isCollapse"
  >
    <div class="p-[12px] pb-[0] h-[72px]">
      <div class="p-[12px] pb-[24px] border-b border-[#EBEBEB]">
        <div class="flex justify-between">
          <div :class="{ 'h-[0] w-[0]': isCollapse }">
            <img src="/src/assets/imgs/logo.avif" class="w-[141px] h-full" />
          </div>
          <el-icon
            class="cursor-pointer"
            :class="{ 'mx-auto': isCollapse }"
            @click="handleClose"
          >
            <Close v-if="inDrawer" />
            <ArrowLeft v-else-if="!isCollapse" />
            <ArrowRight v-else />
          </el-icon>
        </div>
      </div>
    </div>
    <div class="pt-[20px] pb-[16px] mx-[12px] relative flex-1">
      <el-menu-item-group title="MAIN" class="h-full">
        <el-menu-item
          v-for="(item, idx) in menuItems"
          :index="String(idx + 1)"
          class="mb-[8px]"
        >
          <div
            class="absolute rounded-tr-[4px] rounded-br-[4px] bg-[#335CFF] w-[4px] h-[20px] left-[-12px]"
            v-if="currentIdx === String(idx + 1)"
          />
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>
            <p
              class="text-[#171717]! w-full"
              :class="{ 'text-[#fff]!': isCollapse }"
            >
              {{ item.name }}
            </p>
            <el-icon size="15px" v-if="!isCollapse"
              ><ArrowRight class="text-[#171717]!"
            /></el-icon>
          </template>
        </el-menu-item>
        <el-menu-item class="absolute bottom-[0] w-full">
          <el-icon><Delete color="#FB3748" /></el-icon>
          <template #title>
            <p class="text-[#171717]!" :class="{ 'text-[#fff]!': isCollapse }">
              Cancel the application
            </p>
          </template>
        </el-menu-item>
      </el-menu-item-group>
    </div>
    <div class="p-[12px] pt-[0]">
      <div
        class="p-[8px] pt-[24px] flex items-center gap-[12px] border-t border-[#EBEBEB] min-h-[81px]"
      >
        <Transition name="sidebar-fade">
          <div
            v-if="!isCollapse"
            class="flex items-center gap-[12px] flex-1 min-w-0"
          >
            <div class="rounded-full bg-[#C0D5FF] shrink-0">
              <img
                src="/src/assets/imgs/male_profile.avif"
                class="w-[48px] h-[48px] rounded-full"
              />
            </div>
            <div class="flex flex-col gap-[2px] flex-1 min-w-0">
              <p
                class="flex gap-[2px] items-center text-[#171717] sf-display leading-[20px] tracking-[-0.6%] text-nowrap"
              >
                {{ authStore.userData.name }}
                <img
                  src="/src/assets/imgs/user-verified.png"
                  class="w-[20px] h-[20px]"
                />
              </p>
              <p class="text-[12px] leading-[16px] text-[#5C5C5C] truncate">
                {{ authStore.userData.email }}
              </p>
            </div>
          </div>
        </Transition>
        <SignOutIcon
          class="cursor-pointer text-[#5C5C5C] shrink-0"
          :class="{ 'mx-auto': isCollapse }"
          @click="signOut"
        />
      </div>
    </div>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores";
import SignOutIcon from "@/assets/svgs/signOut.svg";
import { Document, Reading, User } from "@element-plus/icons-vue";
import type { NavMenuItem } from "@/types/frontend";

const navs: Record<string, string> = {
  "/dashboard": "1",
  "/info": "2",
  "/contract": "3",
};

const routes: Record<string, string> = {
  "1": "/dashboard",
  "2": "/info",
  "3": "/contract",
};

const menuItems: NavMenuItem[] = [
  {
    name: "Exams",
    icon: Reading,
  },
  {
    name: "Personal information",
    icon: User,
  },
  {
    name: "Contract",
    icon: Document,
  },
];

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const currentIdx = ref<string>(navs[route.path] || "0");
const isCollapse = ref<boolean>(false);

function handeSelect(index: string) {
  currentIdx.value = index;
  if (routes[index]) {
    router.push(routes[index]);
    emit("close");
  }
}

function handleClose() {
  if (!props.inDrawer) {
    isCollapse.value = !isCollapse.value;
  } else {
    emit("close");
  }
}

watch(
  () => route.path,
  () => (currentIdx.value = navs[route.path] || "0"),
);

function signOut() {
  authStore.signOutUser();
  setTimeout(() => (window.location.href = "/login"), 150);
}

const props = defineProps<{ inDrawer?: boolean }>();
const emit = defineEmits<{ (e: "close"): void }>();
</script>

<style scoped>
:deep(.el-menu-item:hover),
:deep(.is-active) {
  background: #f7f7f7;
}

:deep(.el-menu-item) {
  border-radius: 8px;
}

.el-menu--vertical {
  width: 272px;
}

.el-menu--collapse {
  width: 90px;
}

.sidebar-fade-enter-active {
  transition: opacity 0.2s ease 0.15s;
}
.sidebar-fade-leave-active {
  transition: opacity 0.1s ease;
}
.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}

:deep(.el-menu-item-group__title) {
  padding-left: 15px
}
</style>
