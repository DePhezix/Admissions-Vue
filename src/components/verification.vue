<template>
  <div class="flex flex-col gap-[24px]">
    <div class="flex flex-col gap-[12px]">
      <div class="w-full h-full relative flex gap-[8px] justify-center">
        <input
          v-model="otpCode"
          maxlength="4"
          class="absolute inset-0 opacity-0 cursor-default"
          ref="otpRef"
          @input="otpCode = otpCode.replace(/\D/g, '')"
        />
        <div
          v-for="i in 4"
          :key="i"
          @click="otpRef?.focus()"
          class="sf-display w-full h-[64px] border rounded-[10px] flex items-center justify-center text-[24px] leading-[32px] text-[#171717] cursor-text"
          :class="
            otpError
              ? 'border-[#FB3748]'
              : otpCode.length === i - 1
                ? 'border-[#335CFF]'
                : 'border-[#E0E0E0]'
          "
        >
          {{ otpCode[i - 1] ?? "" }}
        </div>
      </div>
      <p
        v-if="otpError"
        class="text-[#FB3748] sf-display text-[12px] leading-[16px] flex gap-[4px] items-center"
      >
        <img
          src="/src/assets/imgs/auth_warning_icon.avif"
          class="w-[12px] h-[12px]"
        />
        Incorrect Code
      </p>
    </div>

    <p
      class="sf-display text-[16px] leading-[24px] text-[#757575] w-full text-center"
      :class="{ 'text-[#335CFF]! font-[500]': otpTime === 0 }"
    >
      <span v-if="otpTime > 0">00:{{ String(otpTime).padStart(2, "0") }}</span>
      <span v-else class="cursor-pointer" @click="resend">Resend code</span>
    </p>
  </div>

  <el-dialog
    v-model="dialogVisible"
    :width="windowWidth < 401 ? '95%' : '401'"
    class="rounded-[24px]"
    @close="handleDialogConfirm"
  >
    <div class="flex flex-col px-[24px] py-[32px] gap-[32px] items-center">
      <img
        :src="
          dialogErr
            ? '/src/assets/imgs/auth_otp_block_icon.avif'
            : '/src/assets/imgs/auth_otp_success_icon.avif'
        "
        class="w-[88px] h-[88px]"
      />
      <div class="flex flex-col gap-[24px]">
        <header class="flex flex-col gap-[8px]">
          <h5
            class="sf-display font-[600] text-[20px] text-[#171717] text-center"
          >
            {{ dialogErr ? "Temporarly blocked" : "Success!" }}
          </h5>
          <p class="sf-display leading-[150%] text-[#5C5C5C] text-center">
            {{ dialogErr ? otpFailMsg : otpSuccessMsg }}
          </p>
        </header>
        <p
          v-if="dialogErr"
          class="text-center font-[600] leading-[150%] text-[#171717] sf-display"
        >
          Unlock time: 12:30 20-02-2025
        </p>
      </div>
      <el-button
        @click="handleDialogConfirm"
        type="primary"
        class="w-full py-[12px] px-[10px] rounded-[10px] font-[700] leading-[20px] h-fit"
      >
        {{ dialogErr ? "Okay!" : "Great!" }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useWindowWidth } from "@/model/windowWidth";

const otpCode = ref<string>("");
const otpRef = ref<HTMLInputElement>();
const otpTime = ref<number>(45);
const otpError = ref<boolean>(false);
const dialogVisible = ref<boolean>(false);
const dialogErr = ref<boolean>(false);
const otpSuccess = ref<boolean>(false);

const { windowWidth } = useWindowWidth();

let timer: ReturnType<typeof setInterval>;

const startTimer = () => {
  clearInterval(timer);
  otpTime.value = 45;
  timer = setInterval(() => {
    if (otpTime.value > 0) otpTime.value--;
    else clearInterval(timer);
  }, 1000);
};

const resend = () => {
  otpCode.value = "";
  otpError.value = false;
  startTimer();
};

const submit = (): boolean => {
  if (otpCode.value.length < 4) {
    otpSuccess.value = false;
    otpError.value = true;
    return false;
  }

  otpError.value = false;
  dialogErr.value = false;
  otpSuccess.value = true;
  if (props.otpSuccessMsg) {
    dialogVisible.value = true;
  }
  return true;
};

const handleDialogConfirm = () => {
  dialogVisible.value = false;
  setTimeout(() => (window.location.href = "/login"), 150);
};

onMounted(() => startTimer());
onUnmounted(() => clearInterval(timer));

const props = defineProps({
  otpSuccessMsg: String,
  otpFailMsg: String,
});
defineExpose({ submit, startTimer, otpSuccess });
</script>
