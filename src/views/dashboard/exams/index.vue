<template>
  <div>
    <header class="flex justify-between items-center gap-[10px]">
      <h1
        class="sf-display font-[600] text-[20px] md:text-[32px] text-[#222529]"
      >
        Accounting and Finance
      </h1>
      <RouterLink to="/direction">
        <el-button type="warning" class="rounded-[8px] max-md:text-[12px]">
          <div class="flex md:gap-[8px] items-center">
            <el-icon><WarningFilled /></el-icon>
            <span class="md:hidden">Change school</span>
            <span class="hidden md:inline">Click to change your school</span>
          </div>
        </el-button>
      </RouterLink>
    </header>
    <div class="flex flex-col gap-[20px] my-[25px]">
      <Banner
        title="Confirm Your Personal Information"
        color="#335CFF"
        description="To proceed to the next stage and continue with contract processing, please verify and confirm your personal details."
      >
        <template #icon><Warning /></template>
        <template #action>
          <RouterLink to="/info" class="max-sm:w-full">
            <el-button type="primary" class="max-sm:w-full max-sm:text-[12px]"> Submit </el-button>
          </RouterLink>
        </template>
      </Banner>
      <Exam exam-for="English" />
      <Exam exam-for="Math" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from "@/components/banner.vue";
import Exam from "./components/exam.vue";
</script>
