<template>
  <div class="flex justify-center h-full">
    <div class="h-full flex flex-col justify-between items-center w-fit">
      <div class="max-sm:container sm:w-[424px] flex flex-col gap-[24px]">
        <el-breadcrumb
          :separator-icon="ArrowRight"
          class="mx-auto"
          v-if="phase > 3"
        >
          <el-breadcrumb-item>
            <span class="flex items-center gap-[4px] xs:gap-[8px]">
              <span
                class="inline-flex items-center justify-center shrink-0 border border-[#EBEBEB] rounded-full w-[20px] h-[20px] text-[12px]"
                :class="{
                  'bg-[#335CFF] text-[#fff]': phase === 4,
                  'bg-[#1FC16B]!': phase > 4,
                }"
              >
                <span v-if="phase <= 4">1</span>
                <el-icon v-else><Select color="white" /></el-icon>
              </span>
              <span class="text-[12px] xs:text-[14px]"
                >Personal information</span
              >
            </span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <span class="flex items-center gap-[4px] xs:gap-[8px]">
              <span
                class="inline-flex items-center justify-center shrink-0 border border-[#EBEBEB] rounded-full w-[20px] h-[20px] text-[12px]"
                :class="{
                  'bg-[#335CFF] text-[#fff]': phase === 5,
                  'bg-[#1FC16B]!': phase > 5,
                }"
              >
                <span v-if="phase <= 5">2</span>
                <el-icon v-else><Select color="white" /></el-icon>
              </span>
              <span class="text-[12px] xs:text-[14px]">Direction</span>
            </span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <span class="flex items-center gap-[4px] xs:gap-[8px]">
              <span
                class="inline-flex items-center justify-center shrink-0 border border-[#EBEBEB] rounded-full w-[20px] h-[20px] text-[12px]"
                :class="{
                  'bg-[#335CFF] text-[#fff]': phase === 6,
                  'bg-[#1FC16B]!': phase > 6,
                }"
              >
                <span v-if="phase <= 6">3</span>
                <el-icon v-else><Select color="white" /></el-icon>
              </span>
              <span class="text-[12px] xs:text-[14px]">Schools</span>
            </span>
          </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="flex flex-col gap-[14px] items-center">
          <img :src="authIcon" class="max-sm:hidden w-[88px]" />
          <header class="flex flex-col gap-[4px]">
            <h1
              class="sf-display font-[600] text-[24px] leading-[32px] text-[#303030] sm:text-center"
            >
              {{
                phase === 1
                  ? "Welcome to Central Asian University Admission Portal"
                  : phase === 2
                    ? "Create Your Account"
                    : phase === 3
                      ? "Verify"
                      : phase === 4 || phase === 5
                        ? "Select Your Study level"
                        : "Bachelor's Degree Programs"
              }}
            </h1>
            <p
              class="sf-display leading-[24px] text-[#757575] text-[16px] sm:text-center"
              v-html="
                phase === 1
                  ? 'Start your academic journey today. Apply online in just a few steps.'
                  : phase === 2
                    ? 'Create your secure admission account to access the application portal.'
                    : phase === 3 && typeForm.userType === 'local'
                      ? `We have sent the verification code to your phone number <br /><b>${form.phone}</b>`
                      : phase === 3
                        ? `We have sent the verification code to your email <br /><b>${form.email}</b>`
                        : phase === 4
                          ? 'Please provide accurate information as it will be used for official admission records.'
                          : phase === 5
                            ? 'Choose the academic path that matches your ambitions.'
                            : 'Choose the academic school and program you wish to apply for.'
              "
            />
          </header>
        </div>

        <el-form
          v-if="phase === 1"
          class="flex flex-col gap-[10px] max-sm:container sm:w-[424px]"
          label-position="top"
          ref="typeFormRef"
          :model="typeForm"
          :rules="typeRules"
          require-asterisk-position="right"
        >
          <div
            class="flex flex-col gap-[10px]"
            @click="typeForm.userType = 'local'"
          >
            <RadioCard
              v-model="typeForm.userType"
              value="local"
              label="Local user"
              description="Choose if you are local user"
            >
              <template #icon
                ><Location class="w-[20px]! h-[20px]!"
              /></template>
            </RadioCard>
            <el-form-item
              label="Region"
              v-if="typeForm.userType === 'local'"
              prop="location"
            >
              <el-select
                placeholder="Select Region"
                v-model="typeForm.location"
              >
                <el-option label="Tashkent City" value="tashkent_city" />
                <el-option label="Tashkent Region" value="tashkent_region" />
                <el-option label="Andijan" value="andijan" />
                <el-option label="Fergana" value="fergana" />
                <el-option label="Namangan" value="namangan" />
                <el-option label="Samarkand" value="samarkand" />
                <el-option label="Bukhara" value="bukhara" />
                <el-option label="Kashkadarya" value="kashkadarya" />
                <el-option label="Surkhandarya" value="surkhandarya" />
                <el-option label="Jizzakh" value="jizzakh" />
                <el-option label="Syrdarya" value="syrdarya" />
                <el-option label="Navoi" value="navoi" />
                <el-option label="Khorezm" value="khorezm" />
                <el-option label="Karakalpakstan" value="karakalpakstan" />
              </el-select>
            </el-form-item>
          </div>

          <div
            class="flex flex-col gap-[10px] mb-[10px]"
            @click="typeForm.userType = 'foreign'"
          >
            <RadioCard
              v-model="typeForm.userType"
              value="foreign"
              label="Foreign user"
              description="Choose if you are foreign user"
            >
              <template #icon
                ><MapLocation class="w-[20px]! h-[20px]!"
              /></template>
            </RadioCard>
            <el-form-item
              label="Country"
              v-if="typeForm.userType === 'foreign'"
              prop="location"
            >
              <el-select
                placeholder="Select Country"
                v-model="typeForm.location"
              >
                <el-option
                  v-for="country in countries"
                  :key="country.value"
                  :label="country.label"
                  :value="country.value"
                />
              </el-select>
            </el-form-item>
          </div>
        </el-form>

        <el-form
          v-else-if="phase === 2"
          :model="form"
          :rules="credRules"
          ref="credFormRef"
          label-position="top"
          require-asterisk-position="right"
        >
          <el-form-item
            label="Phone Number"
            v-if="typeForm.userType === 'local'"
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
          <el-form-item label="Confirm Password" prop="confirmPassword">
            <el-input
              placeholder="Confirm your password"
              type="password"
              v-model="form.confirmPassword"
              show-password
            />
          </el-form-item>
        </el-form>

        <Verification
          v-else-if="phase === 3"
          ref="verificationRef"
          :otp-fail-msg="
            'Your ' +
            (typeForm.userType === 'local' ? 'phone number' : 'email') +
            ' is temporarily blocked'
          "
        />

        <el-form
          v-else-if="phase === 4"
          :model="form"
          label-position="top"
          require-asterisk-position="right"
        >
          <el-form-item label="Name" required>
            <el-input placeholder="Your name" v-model="contactForm.name" />
          </el-form-item>
          <el-form-item label="Surname" required>
            <el-input
              placeholder="Your surname"
              v-model="contactForm.surname"
            />
          </el-form-item>
          <el-form-item label="Passport number" required>
            <el-input
              placeholder="Your passport number"
              v-model="contactForm.passport"
            />
          </el-form-item>
        </el-form>

        <div v-else-if="phase === 5" class="flex flex-col gap-[12px] mb-[12px]">
          <RadioCard
            v-model="directionType"
            value="Pre-foundation"
            label="Pre-foundation"
            description="Choose if you wish to pursue pre-foundation"
            ><template #icon
              ><Document
                class="w-[20px]! h-[20px]!"
                :color="
                  directionType === 'Pre-foundation' ? '#335CFF' : ''
                " /></template
          ></RadioCard>
          <RadioCard
            v-model="directionType"
            value="Bachelors"
            label="Bachelors"
            description="Choose if you wish to pursue bachelors"
            ><template #icon
              ><Reading
                class="w-[20px]! h-[20px]!"
                :color="
                  directionType === 'Bachelors' ? '#335CFF' : ''
                " /></template
          ></RadioCard>
          <RadioCard
            v-model="directionType"
            value="Masters"
            label="Masters"
            description="Choose if you wish to pursue masters"
            ><template #icon
              ><Suitcase
                class="w-[20px]! h-[20px]!"
                :color="
                  directionType === 'Masters' ? '#335CFF' : ''
                " /></template
          ></RadioCard>
          <RadioCard
            v-model="directionType"
            value="Transfer"
            label="Transfer"
            description="Choose if you wish to transfer"
            ><template #icon
              ><OfficeBuilding
                class="w-[20px]! h-[20px]!"
                :color="
                  directionType === 'Transfer' ? '#335CFF' : ''
                " /></template
          ></RadioCard>
        </div>

        <div
          v-else-if="phase === 6 && windowWidth > 768"
          class="flex flex-col gap-[16px] mb-[24px]"
        >
          <el-tabs v-model="activePane">
            <el-tab-pane label="All" name="all">
              <div class="flex flex-col gap-[12px] max-h-[240px] overflow-auto">
                <RadioCard
                  v-for="faculty in faculties"
                  v-model="chosenFaculty"
                  :value="faculty"
                  :label="faculty"
                >
                  <template #icon
                    ><Collection
                      class="w-[20px]! h-[20px]!"
                      :color="directionType === 'Transfer' ? '#335CFF' : ''"
                  /></template>
                </RadioCard>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Business school" name="business"></el-tab-pane>
            <el-tab-pane label="Engineer" name="engineer"></el-tab-pane>
          </el-tabs>
        </div>

        <el-form
          v-else
          class="flex flex-col max-sm:container sm:w-[424px]"
          label-position="top"
        >
          <el-form-item label="Academic School">
            <el-select
              placeholder="Select academic school"
              v-model="chosenSchool"
              @change="chosenProgram = ''"
            >
              <el-option
                v-for="school in schoolPrograms"
                :key="school.name"
                :label="school.name"
                :value="school.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Program">
            <el-select
              placeholder="Select program"
              v-model="chosenProgram"
              :disabled="!chosenSchool"
            >
              <el-option
                v-for="program in currentPrograms"
                :key="program"
                :label="program"
                :value="program"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div class="w-full" v-if="phase === 1">
        <el-button
          type="primary"
          class="w-full py-[12px] px-[10px] rounded-[10px] h-fit"
          @click="submitForm"
        >
          Sign Up
        </el-button>
        <p class="sf-display leading-[20px] py-[12px] px-[10px] text-center">
          Already have an account?
          <RouterLink to="/login" class="font-[500] text-[#335CFF]"
            >Sign in</RouterLink
          >
        </p>
      </div>
      <div class="w-full flex gap-[12px]" v-else>
        <el-button
          class="sf-display font-[700] py-[12px] flex-1 px-[10px] h-fit rounded-[10px] leading-[20px]"
          @click="phase === 4 ? router.push('/login') : prevStep()"
        >
          {{ phase == 4 ? "Cancel" : "Previous" }}
        </el-button>
        <el-button
          type="primary"
          class="sf-display font-[700] flex-1 py-[12px] px-[10px] h-fit rounded-[10px] leading-[20px]"
          @click="submitForm"
          :disabled="
            (phase === 4 &&
              (contactForm.name.length === 0 ||
                contactForm.surname.length === 0 ||
                contactForm.passport.length === 0)) ||
            (phase === 5 && directionType === '') ||
            (phase === 6 && chosenFaculty === '') ||
            (phase === 6 && windowWidth <= 768 && chosenProgram === '')
          "
        >
          {{
            phase === 2
              ? "Create Account"
              : phase === 3
                ? "Submit Code"
                : phase === 4
                  ? "Next"
                  : "Confirm"
          }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed } from "vue";
import { useIMask } from "vue-imask";
import Verification from "../../../components/verification.vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";
import { useAuthStore } from "@/stores";
import RadioCard from "@/components/radioCard.vue";
import authVerificationIcon from "@/assets/imgs/auth_verification_icon.avif";
import authUserIcon from "@/assets/imgs/auth_user_icon.avif";
import authDirectionIcon from "@/assets/imgs/auth_direction_icon.avif";
import authSchoolsIcon from "@/assets/imgs/auth_schools_icon.avif";

import type { FormInstance, FormRules } from "element-plus";
import type {
  TypeForm,
  CredForm,
  ContactForm,
  Direction,
  Faculty,
} from "@/types/frontend";
import { useWindowWidth } from "@/model/windowWidth";

const phase = ref<number>(1);
const { windowWidth } = useWindowWidth();

const typeFormRef = ref<FormInstance>();
const typeForm = reactive<TypeForm>({ userType: "local", location: "" });
const typeRules: FormRules<TypeForm> = {
  location: [
    { required: true, message: "Please select a location", trigger: "change" },
  ],
};

const countries = [
  { label: "Afghanistan", value: "afghanistan" },
  { label: "Albania", value: "albania" },
  { label: "Algeria", value: "algeria" },
  { label: "Andorra", value: "andorra" },
  { label: "Angola", value: "angola" },
  { label: "Antigua and Barbuda", value: "antigua_and_barbuda" },
  { label: "Argentina", value: "argentina" },
  { label: "Armenia", value: "armenia" },
  { label: "Australia", value: "australia" },
  { label: "Austria", value: "austria" },
  { label: "Azerbaijan", value: "azerbaijan" },
  { label: "Bahamas", value: "bahamas" },
  { label: "Bahrain", value: "bahrain" },
  { label: "Bangladesh", value: "bangladesh" },
  { label: "Belarus", value: "belarus" },
  { label: "Belgium", value: "belgium" },
  { label: "Belize", value: "belize" },
  { label: "Benin", value: "benin" },
  { label: "Bhutan", value: "bhutan" },
  { label: "Bolivia", value: "bolivia" },
  { label: "Bosnia and Herzegovina", value: "bosnia_and_herzegovina" },
  { label: "Botswana", value: "botswana" },
  { label: "Brazil", value: "brazil" },
  { label: "Brunei", value: "brunei" },
  { label: "Bulgaria", value: "bulgaria" },
  { label: "Burkina Faso", value: "burkina_faso" },
  { label: "Burundi", value: "burundi" },
  { label: "Cambodia", value: "cambodia" },
  { label: "Cameroon", value: "cameroon" },
  { label: "Canada", value: "canada" },
  { label: "Central African Republic", value: "central_african_republic" },
  { label: "Chad", value: "chad" },
  { label: "Chile", value: "chile" },
  { label: "China", value: "china" },
  { label: "Colombia", value: "colombia" },
  { label: "Comoros", value: "comoros" },
  { label: "Costa Rica", value: "costa_rica" },
  { label: "Croatia", value: "croatia" },
  { label: "Cuba", value: "cuba" },
  { label: "Cyprus", value: "cyprus" },
  { label: "Czech Republic", value: "czech_republic" },
  { label: "Denmark", value: "denmark" },
  { label: "Djibouti", value: "djibouti" },
  { label: "Dominican Republic", value: "dominican_republic" },
  { label: "Ecuador", value: "ecuador" },
  { label: "Egypt", value: "egypt" },
  { label: "El Salvador", value: "el_salvador" },
  { label: "Eritrea", value: "eritrea" },
  { label: "Estonia", value: "estonia" },
  { label: "Eswatini", value: "eswatini" },
  { label: "Ethiopia", value: "ethiopia" },
  { label: "Fiji", value: "fiji" },
  { label: "Finland", value: "finland" },
  { label: "France", value: "france" },
  { label: "Gabon", value: "gabon" },
  { label: "Gambia", value: "gambia" },
  { label: "Georgia", value: "georgia" },
  { label: "Germany", value: "germany" },
  { label: "Ghana", value: "ghana" },
  { label: "Greece", value: "greece" },
  { label: "Guatemala", value: "guatemala" },
  { label: "Guinea", value: "guinea" },
  { label: "Guyana", value: "guyana" },
  { label: "Haiti", value: "haiti" },
  { label: "Honduras", value: "honduras" },
  { label: "Hungary", value: "hungary" },
  { label: "Iceland", value: "iceland" },
  { label: "India", value: "india" },
  { label: "Indonesia", value: "indonesia" },
  { label: "Iran", value: "iran" },
  { label: "Iraq", value: "iraq" },
  { label: "Ireland", value: "ireland" },
  { label: "Israel", value: "israel" },
  { label: "Italy", value: "italy" },
  { label: "Jamaica", value: "jamaica" },
  { label: "Japan", value: "japan" },
  { label: "Jordan", value: "jordan" },
  { label: "Kazakhstan", value: "kazakhstan" },
  { label: "Kenya", value: "kenya" },
  { label: "Kuwait", value: "kuwait" },
  { label: "Kyrgyzstan", value: "kyrgyzstan" },
  { label: "Laos", value: "laos" },
  { label: "Latvia", value: "latvia" },
  { label: "Lebanon", value: "lebanon" },
  { label: "Libya", value: "libya" },
  { label: "Lithuania", value: "lithuania" },
  { label: "Luxembourg", value: "luxembourg" },
  { label: "Madagascar", value: "madagascar" },
  { label: "Malawi", value: "malawi" },
  { label: "Malaysia", value: "malaysia" },
  { label: "Maldives", value: "maldives" },
  { label: "Mali", value: "mali" },
  { label: "Malta", value: "malta" },
  { label: "Mauritania", value: "mauritania" },
  { label: "Mauritius", value: "mauritius" },
  { label: "Mexico", value: "mexico" },
  { label: "Moldova", value: "moldova" },
  { label: "Mongolia", value: "mongolia" },
  { label: "Montenegro", value: "montenegro" },
  { label: "Morocco", value: "morocco" },
  { label: "Mozambique", value: "mozambique" },
  { label: "Myanmar", value: "myanmar" },
  { label: "Namibia", value: "namibia" },
  { label: "Nepal", value: "nepal" },
  { label: "Netherlands", value: "netherlands" },
  { label: "New Zealand", value: "new_zealand" },
  { label: "Nicaragua", value: "nicaragua" },
  { label: "Niger", value: "niger" },
  { label: "Nigeria", value: "nigeria" },
  { label: "North Korea", value: "north_korea" },
  { label: "North Macedonia", value: "north_macedonia" },
  { label: "Norway", value: "norway" },
  { label: "Oman", value: "oman" },
  { label: "Pakistan", value: "pakistan" },
  { label: "Palestine", value: "palestine" },
  { label: "Panama", value: "panama" },
  { label: "Papua New Guinea", value: "papua_new_guinea" },
  { label: "Paraguay", value: "paraguay" },
  { label: "Peru", value: "peru" },
  { label: "Philippines", value: "philippines" },
  { label: "Poland", value: "poland" },
  { label: "Portugal", value: "portugal" },
  { label: "Qatar", value: "qatar" },
  { label: "Romania", value: "romania" },
  { label: "Russia", value: "russia" },
  { label: "Rwanda", value: "rwanda" },
  { label: "Saudi Arabia", value: "saudi_arabia" },
  { label: "Senegal", value: "senegal" },
  { label: "Serbia", value: "serbia" },
  { label: "Singapore", value: "singapore" },
  { label: "Slovakia", value: "slovakia" },
  { label: "Slovenia", value: "slovenia" },
  { label: "Somalia", value: "somalia" },
  { label: "South Africa", value: "south_africa" },
  { label: "South Korea", value: "south_korea" },
  { label: "South Sudan", value: "south_sudan" },
  { label: "Spain", value: "spain" },
  { label: "Sri Lanka", value: "sri_lanka" },
  { label: "Sudan", value: "sudan" },
  { label: "Sweden", value: "sweden" },
  { label: "Switzerland", value: "switzerland" },
  { label: "Syria", value: "syria" },
  { label: "Taiwan", value: "taiwan" },
  { label: "Tajikistan", value: "tajikistan" },
  { label: "Tanzania", value: "tanzania" },
  { label: "Thailand", value: "thailand" },
  { label: "Togo", value: "togo" },
  { label: "Trinidad and Tobago", value: "trinidad_and_tobago" },
  { label: "Tunisia", value: "tunisia" },
  { label: "Turkey", value: "turkey" },
  { label: "Turkmenistan", value: "turkmenistan" },
  { label: "Uganda", value: "uganda" },
  { label: "Ukraine", value: "ukraine" },
  { label: "United Arab Emirates", value: "united_arab_emirates" },
  { label: "United Kingdom", value: "united_kingdom" },
  { label: "United States", value: "united_states" },
  { label: "Uruguay", value: "uruguay" },
  { label: "Uzbekistan", value: "uzbekistan" },
  { label: "Venezuela", value: "venezuela" },
  { label: "Vietnam", value: "vietnam" },
  { label: "Yemen", value: "yemen" },
  { label: "Zambia", value: "zambia" },
  { label: "Zimbabwe", value: "zimbabwe" },
];

const authIcon = computed(() => {
  if (phase.value === 3) return authVerificationIcon;
  if ([1, 2, 4].includes(phase.value)) return authUserIcon;
  if (phase.value === 5) return authDirectionIcon;
  return authSchoolsIcon;
});

const router = useRouter();
const route = useRoute();

watch(
  () => typeForm.userType,
  () => {
    typeForm.location = "";
    typeFormRef.value?.clearValidate(["location"]);
  },
);

const credFormRef = ref<FormInstance>();
const form = reactive<CredForm>({
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (!value) callback(new Error("Please confirm your password"));
  else if (value !== form.password)
    callback(new Error("Passwords do not match"));
  else callback();
};

const credRules = reactive<FormRules<CredForm>>({
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

const { el: phoneEl, masked } = useIMask(
  { mask: "+{998} (00) 000-00-00" },
  {
    onAccept: () => {
      form.phone = masked.value;
    },
  },
);

const verificationRef = ref();

const prevStep = () => {
  if (phase.value > 1) {
    phase.value--;
  }
};

const submitForm = async () => {
  if (phase.value === 1) {
    if (!typeFormRef.value) return;
    typeFormRef.value
      .validate()
      .then(() => {
        phase.value = 2;
      })
      .catch(() => false);
  } else if (phase.value === 2) {
    if (!credFormRef.value) return;
    credFormRef.value
      .validate()
      .then(() => {
        phase.value = 3;
      })
      .catch(() => console.log("validation failed"));
  } else if (phase.value === 3) {
    verificationRef.value?.submit();
    if (verificationRef.value?.otpSuccess) {
      phase.value = 4;
    }
  } else if (phase.value === 6) {
    authStore.signUpUser();
    router.replace("/dashboard");
  } else {
    phase.value += 1;
  }
};

const contactForm = reactive<ContactForm>({
  name: "",
  surname: "",
  passport: "",
});

const directionType = ref<Direction>("");

const activePane = ref<string>("all");

const faculties = ref<string[]>([
  "Medicine school",
  "Dental school",
  "Hospitality & Tourism school",
  "Another School",
]);
const chosenFaculty = ref<string>("");
const authStore = useAuthStore();

watch(
  () => [route.path, phase.value],
  () => {
    authStore.setSelectedFaculty("");
  },
);

const schoolPrograms = [
  {
    name: "Medicine school",
    programs: ["General Medicine", "Pediatrics", "Nursing", "Pharmacy"],
  },
  {
    name: "Dental school",
    programs: ["Dentistry", "Dental Surgery", "Orthodontics"],
  },
  {
    name: "Hospitality & Tourism school",
    programs: ["Hotel Management", "Tourism Management", "Event Management"],
  },
  {
    name: "Engineering School",
    programs: [
      "Software Engineering",
      "Civil Engineering",
      "Mechanical Engineering",
      "Electrical Engineering",
    ],
  },
  {
    name: "Applied Intelligence School",
    programs: [
      "Artificial Intelligence",
      "Data Science",
      "Cybersecurity",
      "Computer Science",
    ],
  },
];

const chosenSchool = ref<string>("");
const chosenProgram = ref<string>("");

const currentPrograms = computed(
  () =>
    schoolPrograms.find((s) => s.name === chosenSchool.value)?.programs ?? [],
);

watch(
  () => chosenSchool.value,
  (val) => {
    authStore.setSelectedFaculty(val as Faculty);
    chosenFaculty.value = val;
  },
);
</script>

<style scoped>
:deep(.el-select__wrapper) {
  padding: 12px 10px;
  border-radius: 10px;
  line-height: 20px;
  height: 44px;
}
:deep(.el-radio) {
  display: flex;
  align-items: start;
}
:deep(.el-radio__label) {
  display: none;
}
</style>
