<template>
  <el-header class="w-full flex py-[15px] md:py-[20px] px-[10px] md:px-[32px] gap-[12px] items-center h-fit">
    <el-icon
      class="cursor-pointer text-[#171717] text-[22px] lg:hidden mr-[4px]"
      @click="emit('toggle-sidebar')"
    >
      <Expand />
    </el-icon>

    <div class="flex flex-1 gap-[14px]">
      <div class="rounded-full bg-[#C0D5FF]">
        <img
          src="/src/assets/imgs/male_profile.avif"
          class="w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full"
        />
      </div>
      <div class="flex flex-col md:gap-[2px]">
        <p class="sf-display font-[500] text-[16px] md:text-[18px] leading-[22px] md:leading-[24px] tracking-[-1.5%] text-[#171717]">
          {{ authStore.userData.name }}
        </p>
        <p class="sf-display text-[12px] md:text-[14px] leading-[18px] md:leading-[20px] tracking-[-0.6%] text-[#5C5C5C]">
          Welcome to CAU Admission 👋🏻
        </p>
      </div>
    </div>

    <el-tooltip content="Get Help" placement="bottom" class="cursor-pointer">
      <el-dropdown trigger="click" :hide-on-click="false">
        <FAQsvg />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-popover title="Phone" content="+99871-200-05-22" placement="left" trigger="click">
                <template #reference>
                  <span><el-icon><Phone /></el-icon> Call</span>
                </template>
              </el-popover>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="https://t.me/cauadmission_bot" target="_blank">
                <el-icon><Position /></el-icon> Telegram
              </a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>

    <el-icon class="cursor-pointer"><Bell /></el-icon>
  </el-header>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores";
import FAQsvg from "@/assets/svgs/faq.svg";
import { Expand } from "@element-plus/icons-vue";

const emit = defineEmits<{ (e: "toggle-sidebar"): void }>();
const authStore = useAuthStore();
</script>