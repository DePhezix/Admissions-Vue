<template>
  <div
    class="absolute top-[0] left-[0] right-[0] bottom-[0] bg-[#fff]/70 backdrop-blur-[5px] z-1000 flex flex-col items-center justify-center gap-[24px] hidden"
  >
    <img src="/src/assets/imgs/loading-icon.avif" class="w-[64px] h-[64px] spin" />
    <p class="sf-display text-[18px] leading-[22px] text-[#171717]">
      Processing, please wait...
    </p>
  </div>
</template>

<style scoped>
.spin {
  animation: spin 5s linear infinite;
}

@keyframes spin {
  from { transform: rotate(360deg); }
  to   { transform: rotate(0deg); }
}
</style>