<template>
  <el-footer class="flex justify-between px-[24px] pt-[10px] pb-[20px] h-fit">
    <p class="text-center max-sm:text-[12px] text-[#5C5C5C] leading-[20px] tracking-[-0.6%]">
      © 2026 CAU. All rights reserved.
    </p>
    <p
      class="text-center text-[#5C5C5C] max-sm:text-[12px] leading-[20px] tracking-[-0.6%] underline cursor-pointer"
      @click="privacyPolicyVisible = true"
    >
      Privacy Policy
    </p>
  </el-footer>
  <el-dialog v-model="privacyPolicyVisible" :width="windowWidth > 920 ? '860' : '95%'">
    <div class="overflow-y-auto max-h-[362px]">
      <canvas
        style="display: block; width: 860px; height: 1216px"
        width="1719"
        height="2432"
      ></canvas>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useWindowWidth } from "@/model/windowWidth";

const privacyPolicyVisible = ref<boolean>(false);
const { windowWidth } = useWindowWidth();
</script>
