<template>
  <div
    class="rounded-[8px] p-[16px] flex justify-between items-center gap-[10px] max-sm:flex-col"
    :style="{ backgroundColor: color + '1A' }"
  >
    <div class="max-sm:w-full">
      <div class="flex gap-[8px] items-center">
        <el-icon :color="color" size="large"><slot name="icon" /></el-icon>
        <p
          class="font-[600] sf-display text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px]"
          :style="{ color }"
        >
          {{ title }}
        </p>
      </div>
      <p
        class="mt-[4px] sf-display text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-[#222529]"
        :class="{ 'sm:max-w-[768px]': slots.action || buttonText }"
      >
        {{ description }}
      </p>
    </div>
    <slot name="action">
      <button
        v-if="buttonText"
        @click="emit('click')"
        class="bg-[#fff] text-[12px] leading-[14px] sf-display font-[600] py-[8px] px-[12px] h-fit rounded-[6px] cursor-pointer max-sm:w-full"
        :style="{ color }"
      >
        {{ buttonText }}
      </button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue";

defineProps<{
  title: string;
  description: string;
  color?: string;
  buttonText?: string;
}>();

const slots = useSlots();
const emit = defineEmits<{ click: [] }>();
</script>
