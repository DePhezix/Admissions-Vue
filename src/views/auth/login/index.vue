<template>
  <div class="flex justify-center h-full">
    <div
      class="h-full flex flex-col justify-between items-center w-full sm:w-fit"
    >
      <div class="w-full sm:w-[424px] flex flex-col gap-[24px]">
        <div class="flex flex-col gap-[14px] items-center">
          <img
            src="/src/assets/imgs/auth_user_icon.avif"
            class="w-[88px] max-sm:hidden"
          />
          <header class="flex flex-col gap-[4px]">
            <h1
              class="sf-display font-[600] text-[24px] leading-[32px] text-[#303030] text-center"
            >
              Get Started
            </h1>
            <p
              class="sf-display leading-[24px] text-[#757575] text-[16px] text-center"
            >
              Welcome to CAU Admission
            </p>
          </header>
        </div>

        <div class="flex rounded-[12px] p-[4px] gap-[4px] bg-[#F7F7F7]">
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

        <el-form
          :model="form"
          :rules="rules"
          ref="formRef"
          label-position="top"
          require-asterisk-position="right"
        >
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
              placeholder="Enter your password"
              type="password"
              v-model="form.password"
              show-password
            />
          </el-form-item>
          <RouterLink
            :to="{ path: '/forgot-password', query: route.query }"
            class="sf-display font-[500] text-[14px] leading-[24px] text-[#335CFF] inline-block -translate-y-[10px]"
          >
            Forgot your password?
          </RouterLink>
        </el-form>
      </div>

      <div class="w-full">
        <el-button
          type="primary"
          class="w-full py-[12px] px-[10px] rounded-[10px] h-fit"
          @click="submitForm"
        >
          Sign In
        </el-button>
        <p class="sf-display leading-[20px] py-[12px] px-[10px] text-center">
          Don't have an account?
          <RouterLink to="/sign-up" class="font-[500] text-[#335CFF]"
            >Sign up</RouterLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useIMask } from "vue-imask";
import type { FormInstance, FormRules } from "element-plus";

interface LoginForm {
  phone: string;
  email: string;
  password: string;
}

const route = useRoute();
const router = useRouter();

const currentType = ref<"local" | "foreign">(
  (route.query.type as "local" | "foreign") || "local",
);
const formRef = ref<FormInstance>();

const form = reactive<LoginForm>({
  phone: "",
  email: "",
  password: "",
});

const rules = reactive<FormRules<LoginForm>>({
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
});

watch(
  () => currentType.value,
  () => {
    masked.value = "";
    formRef.value?.resetFields();
  },
);

watch(
  () => route.query.type,
  () => {
    currentType.value = route.query.type as "local" | "foreign";
  },
);

const submitForm = async () => {
  if (!formRef.value) return;
  formRef.value
    .validate()
    .then(() => {
      // handle login
    })
    .catch(() => console.log("validation failed"));
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
