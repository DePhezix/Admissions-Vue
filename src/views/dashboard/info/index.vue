<template>
  <h1
    class="sf-display font-[600] text-[20px] md:text-[32px] text-[#222529] mb-[30px]"
  >
    Personal Information
  </h1>
  <el-form
    class="border border-[#EBEBEB] rounded-[20px]"
    :model="form"
    :rules="rules"
    ref="formRef"
    label-position="top"
    require-asterisk-position="right"
  >
    <header class="p-[20px]">
      <p class="mb-[4px] sf-display text-[14px] leading-[20px] text-[#5C5C5C]">
        Personal Information
      </p>
      <h3 class="sf-display text-[18px] leading-[24px] text-[#171717]">
        Fill the needed fields
      </h3>
    </header>

    <FormSection label="PERSONAL DETAILS" />
    <div class="flex flex-col p-[20px] gap-[4px] sm:gap-[24px]">
      <div class="flex flex-col sm:flex-row gap-[4px]">
        <el-form-item label="First name" prop="name" class="flex-1">
          <el-input v-model="form.name" placeholder="Enter your first name" />
        </el-form-item>
        <el-form-item label="Last name" prop="surname" class="flex-1">
          <el-input v-model="form.surname" placeholder="Enter your last name" />
        </el-form-item>
      </div>
      <div class="flex flex-col sm:flex-row gap-[4px]">
        <el-form-item label="Date of birth" prop="dob" class="flex-1">
          <el-date-picker
            v-model="form.dob"
            type="date"
            class="w-full!"
            format="DD.MM.YYYY"
            placeholder="Enter your date of birth"
          />
        </el-form-item>
        <el-form-item label="Email" prop="email" class="flex-1">
          <el-input v-model="form.email" placeholder="Enter your email" />
        </el-form-item>
      </div>
      <div class="flex flex-col sm:flex-row gap-[4px]">
        <el-form-item label="Gender" prop="gender" class="flex-1">
          <el-select v-model="form.gender" placeholder="Select your gender">
            <el-option value="male" label="Male" />
            <el-option value="female" label="Female" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Passport/National ID series and number"
          prop="passport"
          class="flex-1"
        >
          <el-input
            v-model="form.passport"
            placeholder="Enter your passport details"
          />
        </el-form-item>
      </div>
    </div>

    <FormSection label="CONTACT INFORMATION" />
    <div class="flex flex-col p-[20px] gap-[24px]">
      <div class="flex flex-col sm:flex-row gap-[4px]">
        <el-form-item label="Primary phone number" prop="phone" class="flex-1">
          <el-input
            v-model="form.phone"
            placeholder="Enter primary phone number"
          />
        </el-form-item>
        <el-form-item label="Country" prop="country" class="flex-1">
          <el-input v-model="form.country" placeholder="Enter your country" />
        </el-form-item>
      </div>
      <div class="flex flex-col sm:flex-row gap-[4px]">
        <el-form-item label="City/Town" prop="city" class="flex-1">
          <el-input v-model="form.city" placeholder="Enter city or town" />
        </el-form-item>
        <el-form-item label="Street" prop="street" class="flex-1">
          <el-input v-model="form.street" placeholder="Enter your street" />
        </el-form-item>
      </div>
      <div class="flex flex-col sm:flex-row gap-[4px]">
        <el-form-item label="House" prop="house" class="flex-1">
          <el-input
            v-model="form.house"
            placeholder="Enter your house number"
          />
        </el-form-item>
        <el-form-item
          label="Mother's phone number"
          prop="motherPhone"
          class="flex-1"
        >
          <el-input
            v-model="form.motherPhone"
            placeholder="Enter your mother's phone number"
          />
        </el-form-item>
      </div>
      <div class="flex flex-col sm:flex-row gap-[4px]">
        <el-form-item
          label="Father's phone number"
          prop="fatherPhone"
          class="flex-1"
        >
          <el-input
            v-model="form.fatherPhone"
            placeholder="Enter your father's phone number"
          />
        </el-form-item>
        <div class="flex-1 max-sm:hidden" />
      </div>
    </div>

    <FormSection label="ESSENTIAL FILES" />
    <div class="flex flex-col p-[20px] gap-[24px]">
      <div class="flex flex-col sm:flex-row gap-[4px]">
        <el-form-item
          label="Upload Passport/ID (Front)"
          prop="passportFront"
          class="flex-1"
        >
          <FileUpload @change="(f) => (form.passportFront = f)" />
        </el-form-item>
        <el-form-item
          label="Upload Passport/ID (Back)"
          prop="passportBack"
          class="flex-1"
        >
          <FileUpload @change="(f) => (form.passportBack = f)" />
        </el-form-item>
      </div>
      <div class="flex flex-col sm:flex-row gap-[4px]">
        <el-form-item
          label="Upload Attestate/Diploma"
          prop="diploma"
          class="flex-1"
        >
          <FileUpload @change="(f) => (form.diploma = f)" />
        </el-form-item>
        <el-form-item
          label="Upload Other Documents"
          prop="otherDocs"
          class="flex-1"
        >
          <FileUpload @change="(f) => (form.otherDocs = f)" />
        </el-form-item>
      </div>
    </div>

    <div class="flex p-[20px] gap-[12px]">
      <el-button
        class="flex-1 py-[12px] px-[10px] h-fit rounded-[10px]"
        :disabled="!isPartialFilled"
        @click="handleReset"
      >
        Reset
      </el-button>
      <el-button
        type="primary"
        class="flex-1 py-[12px] px-[10px] h-fit rounded-[10px]"
        :disabled="!isFilled"
        @click="handleSubmit"
      >
        Submit
      </el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { PersonalInfoForm } from "@/types/frontend";
import FormSection from "@/components/formSection.vue";
import FileUpload from "@/components/fileUpload.vue";

const formRef = ref<FormInstance>();

const emptyForm: PersonalInfoForm = {
  name: "",
  surname: "",
  dob: null,
  email: "",
  gender: "",
  passport: "",
  phone: "",
  country: "",
  city: "",
  street: "",
  house: "",
  motherPhone: "",
  fatherPhone: "",
  passportFront: null,
  passportBack: null,
  diploma: null,
  otherDocs: null,
};

const form = reactive<PersonalInfoForm>({ ...emptyForm });

const rules: FormRules<PersonalInfoForm> = {
  name: [
    { required: true, message: "First name is required", trigger: "blur" },
  ],
  surname: [
    { required: true, message: "Last name is required", trigger: "blur" },
  ],
  dob: [
    { required: true, message: "Date of birth is required", trigger: "change" },
  ],
  email: [
    { required: true, message: "Email is required", trigger: "blur" },
    { type: "email", message: "Enter a valid email", trigger: "blur" },
  ],
  gender: [
    { required: true, message: "Gender is required", trigger: "change" },
  ],
  passport: [
    { required: true, message: "Passport number is required", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "Phone number is required", trigger: "blur" },
  ],
  country: [
    { required: true, message: "Country is required", trigger: "blur" },
  ],
  city: [{ required: true, message: "City is required", trigger: "blur" }],
  street: [{ required: true, message: "Street is required", trigger: "blur" }],
  house: [
    { required: true, message: "House number is required", trigger: "blur" },
  ],
  motherPhone: [
    { required: true, message: "Mother's phone is required", trigger: "blur" },
  ],
  fatherPhone: [
    { required: true, message: "Father's phone is required", trigger: "blur" },
  ],
  passportFront: [
    {
      required: true,
      message: "Passport front is required",
      trigger: "change",
    },
  ],
  passportBack: [
    { required: true, message: "Passport back is required", trigger: "change" },
  ],
  diploma: [
    { required: true, message: "Diploma is required", trigger: "change" },
  ],
  otherDocs: [
    {
      required: true,
      message: "Other documents are required",
      trigger: "change",
    },
  ],
};

const isPartialFilled = computed(() =>
  Object.values(form).some((v) => v !== null && v !== ""),
);

const isFilled = computed(() =>
  Object.values(form).every((v) => v !== null && v !== ""),
);

const handleReset = () => {
  Object.assign(form, emptyForm);
  formRef.value?.resetFields();
};

const handleSubmit = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
    }
  });
};
</script>

<style scoped>
:deep(.el-input__prefix-inner) {
  padding-left: 12px;
}
:deep(.el-icon) {
  margin: 0;
}
</style>
