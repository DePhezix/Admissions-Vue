<template>
  <div
    class="flex items-center gap-[14px] p-[16px] rounded-[12px] border border-[#EBEBEB] cursor-pointer"
    :class="{ 'border-[#335CFF]!': modelValue === value }"
    @click="$emit('update:modelValue', value)"
  >
    <el-icon
      class="w-[40px] h-[40px] rounded-full border border-[#EBEBEB]"
      size="large"
      :color="modelValue === value ? '#335CFF' : ''"
    >
      <slot name="icon" />
    </el-icon>
    <div class="flex flex-col gap-[4px] flex-1">
      <h5
        class="sf-display leading-[20px] text-[#171717] text-[14px] font-[500]"
      >
        {{ label }}
      </h5>
      <p class="sf-display text-[12px] leading-[16px] text-[#5C5C5C]">
        {{ description }}
      </p>
    </div>
    <el-radio-group
      :modelValue="modelValue"
      class="flex justify-center items-start"
    >
      <el-radio :value="value" size="large" />
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  value: string;
  label: string;
  description?: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<style scoped>
:deep(.el-radio__label) {
  display: none;
}
</style>
