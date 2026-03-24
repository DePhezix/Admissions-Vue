<template>
  <div class="flex flex-col gap-[30px]">
    <div class="flex justify-between items-center">
      <h1 class="sf-display font-[600] text-[20px] md:text-[32px] text-[#222529]">Contract</h1>
      <el-button
        v-if="signerConfirmed"
        class="py-[10px] sm:py-[12px] px-[10px] rounded-[10px] h-fit text-[12px] sm:text-[14px]"
      >
        <el-icon class="mr-[4px]"><Document /></el-icon>
        <span class="hidden sm:inline">Review the contract</span>
        <span class="sm:hidden">Review</span>
      </el-button>
    </div>

    <Banner
      v-if="!passedVerifyID"
      color="#335CFF"
      title="Congratulations! Your documents have been successfully accepted."
      description="As the applicant, you are now required to complete identity verification via MyID to proceed with the contract process! This verification is mandatory to confirm your personal identity and ensure the validity of your contract. Without completing this step, the contract cannot be issued."
    >
      <template #icon><Warning /></template>
      <template #action>
        <el-button
          type="primary"
          class="py-[8px] px-[12px] rounded-[8px] text-[13px] font-[700] sf-display max-sm:w-full"
          @click="passedVerifyID = true"
        >
          Start verification with MyID
        </el-button>
      </template>
    </Banner>

    <Banner
      color="#1FC16B"
      title="Congratulations on your successful admission process."
      description="We are pleased to inform you that you have progressed to the next stage of enrollment. Kindly proceed by selecting your preferred type of contract to finalize your student status."
      v-else-if="!signerConfirmed"
    >
      <template #icon><Medal /></template>
      <template #action>
        <el-button
          type="success"
          class="py-[8px] px-[12px] rounded-[8px] text-[13px] font-[700] sf-display max-sm:w-full"
          @click="dialogTableVisible = true"
        >
          Choose contract type
        </el-button>
      </template>
    </Banner>

    <el-card v-if="signerConfirmed && !verifySmsSuccess">
      <template #header>
        <div class="flex justify-between items-center">
          <h3>Sign your contract</h3>
          <el-tag type="success">Verified ID</el-tag>
        </div>
      </template>
      <Banner
        color="#335CFF"
        title="You are presented with a preliminary enrollment contract."
        description='Please carefully review its contents, including the terms of study, the rights and obligations of the parties, the payment procedure, and other important provisions.
If you agree with the terms of the contract, you may sign it using a one-time SMS code, which will be sent to your registered phone number.
By clicking the button "Sign the contract using SMS code": you confirm that you have read and understood the contents of the contract, you agree to the terms and conditions stated therein, you acknowledge the legal validity of your electronic signature.'
      >
        <template #icon><Document /></template>
      </Banner>
      <template #footer>
        <div class="flex gap-[8px] sm:gap-[12px]">
          <el-button
            class="py-[10px] sm:py-[12px] px-[10px] rounded-[10px] font-[700] leading-[20px] h-fit flex-1 text-[12px] sm:text-[14px]"
            @click="dialogTableVisible = true"
          >
            Online Signing
          </el-button>
          <el-button
            class="py-[10px] sm:py-[12px] px-[10px] rounded-[10px] font-[700] leading-[20px] h-fit flex-1 text-[12px] sm:text-[14px]"
            @click="dialogTableVisible = true"
          >
            Offline Signing
          </el-button>
        </div>
      </template>
    </el-card>

    <div
      v-else-if="verifySmsSuccess"
      class="flex flex-col rounded-[20px] border border-[#E5E5E5] p-[16px] sm:p-[24px] gap-[24px]"
    >
      <header class="flex flex-col gap-[16px]">
        <h2 class="sf-display text-[24px] sm:text-[32px] text-[#171717] font-[700]">
          {{ formatNumber(paidContract) }} UZS
        </h2>
        <div class="flex gap-[12px]">
          <div class="flex-237">
            <el-progress
              :percentage="Math.min(100, (paidContract / (contractFee * 0.1)) * 100)"
              :show-text="false"
              status="success"
            />
            <p class="mt-[8px] text-[13px] sm:text-[16px] text-[#1FC16B] font-[600] sf-display">
              10% {{ formatNumber(contractFee * 0.1) }} UZS
            </p>
          </div>
          <div class="flex-807">
            <el-progress
              :percentage="Math.max(0, ((paidContract - contractFee * 0.1) / (contractFee * 0.9)) * 100)"
              :show-text="false"
              status="success"
            />
            <p class="mt-[8px] text-[13px] sm:text-[16px] font-[600] text-right sf-display">
              {{ formatNumber(contractFee) }} UZS
            </p>
          </div>
        </div>
      </header>

      <div class="flex flex-col gap-[16px]">
        <div
          v-for="invoice in invoices"
          class="flex justify-between items-center gap-[12px]"
        >
          <div class="flex flex-col sm:gap-[6px] min-w-0">
            <p class="sf-display text-[14px] sm:text-[16px] leading-[24px] text-[#171717] font-[600] truncate">
              {{ invoice.name }}
            </p>
            <p class="sf-display font-[500] text-[12px] sm:text-[14px] leading-[20px] text-[#5C5C5C]">
              {{ invoice.date }}
            </p>
          </div>
          <p class="sf-display font-[600] text-[14px] sm:text-[16px] text-[#171717] shrink-0">
            + {{ formatNumber(invoice.amount) }} UZS
          </p>
        </div>
      </div>

      <Banner
        color="#1FC16B"
        title="Congratulations! Your contract has been signed."
        description="To proceed with enrollment, please make a payment of at least 25% of tuition fee."
      >
        <template #icon><Medal /></template>
      </Banner>
    </div>

    <el-dialog
      v-model="dialogTableVisible"
      :width="dialogWidth"
      destroy-on-close
    >
      <div class="flex flex-col gap-[24px]">
        <div class="flex flex-col gap-[16px] items-center">
          <img
            :src="
              verifySmsSuccess
                ? '/src/assets/imgs/auth_otp_success_icon.avif'
                : signerConfirmed
                  ? '/src/assets/imgs/auth_verification_icon.avif'
                  : '/src/assets/imgs/contract_write_icon.avif'
            "
            class="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px]"
          />
          <header class="text-center">
            <h3 class="sf-display font-[600] text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] text-[#303030]">
              {{
                verifySmsSuccess
                  ? "Congratulations on successfully signing the enrollment contract!"
                  : signerConfirmed
                    ? "Verification Code"
                    : "Select who will sign the contract"
              }}
            </h3>
            <p
              v-if="!verifySmsSuccess"
              class="sf-display text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#757575]"
              v-html="
                signerConfirmed
                  ? 'We have sent the verification code to your phone number <br /> <b>+998 99 888 88 88</b>'
                  : 'Before proceeding with contract details, please specify who the contract will be signed by. This will help us generate the correct contract format.'
              "
            />
          </header>
        </div>

        <div class="flex flex-col gap-[12px] mt-[24px]" v-if="!signerConfirmed">
          <RadioCard
            v-model="selectedContractor"
            value="applicant"
            label="I (the applicant) will sign the contract"
          >
            <template #icon><User /></template>
          </RadioCard>
          <RadioCard
            v-model="selectedContractor"
            value="entity"
            label="A legal entity (organization/company) will sign"
          >
            <template #icon><OfficeBuilding /></template>
          </RadioCard>
        </div>

        <Verification
          ref="verificationRef"
          v-else-if="signerConfirmed && !verifySmsSuccess"
        />

        <div class="flex flex-col gap-[12px]" v-else>
          <p class="sf-display leading-[24px] text-[#757575] text-[14px] sm:text-[16px] text-center">
            To complete the enrollment process, please make the prepayment for
            tuition in the required amount.
          </p>
          <p class="sf-display leading-[24px] text-[#757575] text-[14px] sm:text-[16px] text-center">
            The prepayment secures your place and guarantees access to
            educational services.
          </p>
          <p class="sf-display leading-[24px] text-[#757575] text-[14px] sm:text-[16px] text-center">
            Once the payment has been received, a confirmation will appear in
            the system, and your status will be updated.
          </p>
          <p class="sf-display leading-[24px] text-[#757575] text-[14px] sm:text-[16px] text-center">
            Thank you for your trust, and we wish you successful and fruitful
            studies!
          </p>
        </div>

        <div class="flex gap-[8px]">
          <el-button
            v-if="!verifySmsSuccess"
            class="flex-1 py-[10px] sm:py-[12px] px-[10px] rounded-[10px] h-fit sf-display text-[#5C5C5C] font-[700] text-[14px] leading-[20px]"
            @click="dialogTableVisible = false"
          >Cancel</el-button>
          <el-button
            type="primary"
            class="flex-1 py-[10px] sm:py-[12px] px-[10px] rounded-[10px] h-fit sf-display font-[700] text-[14px] leading-[20px]"
            @click="confirmContractSigner"
            :disabled="selectedContractor === ''"
          >{{ verifySmsSuccess ? "Great!" : "Confirm" }}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, onUnmounted } from "vue";

import Verification from "@/components/verification.vue";
import Banner from "@/components/banner.vue";
import RadioCard from "@/components/radioCard.vue";

import type { Invoice } from "@/types/frontend";
import { useWindowWidth } from "@/model/windowWidth";

const passedVerifyID = ref<boolean>(false);
const dialogTableVisible = ref<boolean>(false);
const selectedContractor = ref<string>("");
const signerConfirmed = ref<boolean>(false);
const verificationRef = ref();
const verifySmsSuccess = ref<boolean>(false);
const contractFee = ref<number>(100000);
const paidContract = ref<number>(8000);


const { windowWidth } = useWindowWidth()

const dialogWidth = computed(() =>
  windowWidth.value < 640 ? "92%" : windowWidth.value < 768 ? "80%" : "572px"
);

const confirmContractSigner = () => {
  if (!signerConfirmed.value || verifySmsSuccess.value) {
    signerConfirmed.value = true;
    dialogTableVisible.value = false;
  } else {
    if (verificationRef.value?.submit()) {
      verifySmsSuccess.value = true;
    }
  }
};

const formatNumber = (n: number) => n.toLocaleString("fr-FR");

const invoices = reactive<Invoice[]>([
  { name: "312-165582/23-24", date: "24/07/2024", amount: 4000 },
  { name: "312-165582/23-24", date: "24/07/2024", amount: 4000 },
]);
</script>