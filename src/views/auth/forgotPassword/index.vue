<template>
  <div class="flex justify-center h-full">
    <div
      class="h-full flex flex-col justify-between items-center w-full sm:w-fit"
    >
      <div class="w-full sm:w-[424px] flex flex-col gap-[24px]">
        <div class="flex flex-col gap-[14px] items-center">
          <img
            :src="
              phase === 1
                ? '/src/assets/imgs/auth_lock_icon.avif'
                : '/src/assets/imgs/auth_verification_icon.avif'
            "
            class="w-[88px] max-sm:hidden"
          />
          <header class="flex flex-col gap-[4px]">
            <h1
              class="sf-display font-[600] text-[24px] leading-[32px] text-[#303030] text-center"
            >
              {{ phase === 1 ? "Forgot Password?" : "Verification Code" }}
            </h1>
            <p
              class="sf-display leading-[24px] text-[#757575] text-[16px] text-center"
              v-html="
                phase === 1
                  ? 'Update your password'
                  : currentType === 'local'
                    ? `We have sent the verification code to your phone number <br /><b>${form.phone}</b>`
                    : `We have sent the verification code to your email <br /><b>${form.email}</b>`
              "
            />
          </header>
        </div>

        <el-form
          v-if="phase === 1"
          :model="form"
          :rules="rules"
          ref="formRef"
          label-position="top"
          require-asterisk-position="right"
        >
          <div
            class="flex rounded-[12px] p-[4px] gap-[4px] bg-[#F7F7F7] mb-[24px]"
          >
            <div
              v-for="type in ['local', 'foreign']"
              :key="type"
              @click="router.push({ query: { type: type } })"
              class="py-[8px] px-[20px] flex-1 text-center rounded-[8px] cursor-pointer capitalize transition-all duration-200"
              :class="[
                currentType === type
                  ? 'bg-[#fff] shadow-[0px_1px_2px_0px_#1018280A] text-[#303030]'
                  : 'text-[#757586]',
              ]"
            >
              {{ type.charAt(0).toUpperCase() + type.slice(1) }}
            </div>
          </div>

          <el-form-item
            label="Phone Number"
            v-if="currentType === 'local'"
            prop="phone"
          >
            <div class="el-form-item__content">
              <div class="el-input">
                <div class="el-input__wrapper" tabindex="-1">
                  <input
                    class="el-input__inner"
                    type="tel"
                    autocomplete="off"
                    tabindex="0"
                    placeholder="Enter your phone number"
                    ref="phoneEl"
                    :value="form.phone"
                  />
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="Email" v-else prop="email">
            <el-input placeholder="Enter your email" v-model="form.email" />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              placeholder="Enter your new password"
              type="password"
              v-model="form.password"
              show-password
            />
          </el-form-item>
          <el-form-item label="Confirm Password" prop="confirmPassword">
            <el-input
              placeholder="Confirm your new password"
              type="password"
              v-model="form.confirmPassword"
              show-password
            />
          </el-form-item>
        </el-form>

        <Verification
          v-else
          ref="verificationRef"
          :otp-fail-msg="
            'Your ' +
            (currentType === 'local' ? 'phone number' : 'email') +
            ' is temporarily blocked'
          "
          otp-success-msg="Your password has been changed successfully. You can now log in with your new password"
        />
      </div>

      <div class="w-full flex gap-[12px]">
        <RouterLink to="/login" class="flex-1" v-if="phase === 1">
          <el-button
            class="sf-display font-[700] py-[12px] w-full px-[10px] h-fit rounded-[10px] leading-[20px]"
          >
            Cancel
          </el-button>
        </RouterLink>
        <el-button
          v-else
          class="sf-display font-[700] py-[12px] flex-1 px-[10px] h-fit rounded-[10px] leading-[20px]"
          @click="phase = 1"
        >
          Previous
        </el-button>
        <el-button
          type="primary"
          class="sf-display font-[700] flex-1 py-[12px] px-[10px] h-fit rounded-[10px] leading-[20px]"
          @click="submitForm"
        >
          {{ phase === 1 ? "Confirm" : "Submit Code" }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useIMask } from "vue-imask";
import type { FormInstance, FormRules } from "element-plus";
import Verification from "@/components/verification.vue";

interface ForgotForm {
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const route = useRoute();
const router = useRouter();

const phase = ref<number>(1);
const currentType = ref<"local" | "foreign">(
  (route.query.type as "local" | "foreign") || "local",
);
const formRef = ref<FormInstance>();

const form = reactive<ForgotForm>({
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
});

watch(
  () => route.query.type,
  () => {
    currentType.value = route.query.type as "local" | "foreign";
  },
);

const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (!value) callback(new Error("Please confirm your password"));
  else if (value !== form.password)
    callback(new Error("Passwords do not match"));
  else callback();
};

const rules = reactive<FormRules<ForgotForm>>({
  phone: [
    { required: true, message: "Phone number is required", trigger: "blur" },
    {
      min: 19,
      max: 19,
      message: "Enter a valid phone number",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "Email is required", trigger: "blur" },
    { type: "email", message: "Enter a valid email address", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Password is required", trigger: "blur" },
    {
      min: 8,
      message: "Password must be at least 8 characters",
      trigger: "blur",
    },
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: "blur" },
  ],
});

watch(
  () => currentType.value,
  () => formRef.value?.resetFields(),
);

const verificationRef = ref();

const submitForm = async () => {
  if (phase.value === 1) {
    if (!formRef.value) return;
    formRef.value
      .validate()
      .then(() => {
        phase.value = 2;
      })
      .catch(() => console.log("validation failed"));
  } else {
    verificationRef.value?.submit();
  }
};

const { el: phoneEl, masked } = useIMask(
  { mask: "+{998} (00) 000-00-00" },
  {
    onAccept: () => {
      form.phone = masked.value;
    },
  },
);
</script>
