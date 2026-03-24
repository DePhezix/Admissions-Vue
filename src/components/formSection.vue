<template>
  <div class="px-[20px] py-[6px] bg-[#F7F7F7]">
    <p class="sf-display text-[10px] sm:text-[12px] leading-[16px] text-[#A3A3A3]">
      {{ label }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>();
</script>
Then replace all three dividers with:
