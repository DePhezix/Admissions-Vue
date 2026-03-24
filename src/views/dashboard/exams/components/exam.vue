<template>
  <el-card body-class="p-[0]" shadow="never">
    <template #header>
      <div
        class="flex justify-between items-start max-sm:gap-[8px] flex-col sm:flex-row"
      >
        <div
          class="flex max-sm:w-full sm:flex-col gap-[4px] max-sm:justify-between"
        >
          <p class="text-[#5C5C5C] leading-[20px] tracking-[-0.6%] text-[14px]">
            Subject
          </p>
          <p
            class="text-[#171717] leading-[20px] tracking-[-0.6%] text-[15px] sm:leading-[24px] sm:tracking-[-1.5%] sm:text-[18px]"
          >
            {{ examFor }}
          </p>
        </div>
        <div class="flex gap-[12px] flex-wrap justify-end max-sm:w-full">
          <el-tag type="primary" v-if="certificatePasses === 'waiting'">
            <div class="flex gap-[4px] items-center">
              <el-icon color="#335CFF"><WarningFilled /></el-icon>
              Your certificate is under review
            </div>
          </el-tag>
          <el-tag type="danger" v-else-if="certificatePasses === false">
            <div class="flex gap-[4px] items-center">
              <el-icon color="#FB3748"><WarningFilled /></el-icon>
              Rejected
            </div>
          </el-tag>
          <el-tag type="success" v-else-if="certificatePasses">
            <div class="flex gap-[4px] items-center">
              <el-icon color="#1FC16B"><CircleCheckFilled /></el-icon>
              Approved
            </div>
          </el-tag>
          <el-tag type="info" v-else-if="!examResult">
            <div class="flex gap-[4px] items-center">
              <NotParticipate />
              Not participated yet
            </div>
          </el-tag>
          <el-tag type="warning" v-else-if="examResult === 'waiting'">
            <div class="flex gap-[4px] items-center">
              <el-icon color="#FA7319"><WarnTriangleFilled /></el-icon>
              Waiting for exam
            </div>
          </el-tag>
          <el-tag type="danger" v-else-if="examResult < 50">
            <div class="flex gap-[4px] items-center">
              <el-icon color="#FB3748"><WarningFilled /></el-icon> Failed
            </div>
          </el-tag>
          <el-tag type="success" v-else-if="examResult >= 50">
            <div class="flex gap-[4px] items-center">
              <el-icon color="#1FC16B"><CircleCheckFilled /></el-icon> Passed
            </div>
          </el-tag>
          <el-tag v-if="examPhase == 2 && !paid" type="warning">
            <div class="flex gap-[4px] items-center">
              <el-icon color="#FA7319"><WarnTriangleFilled /></el-icon>
              Payment is required
            </div>
          </el-tag>
          <el-tag v-else-if="examPhase == 2 && paid" type="success">
            <div class="flex gap-[4px] items-center">
              <el-icon color="#1FC16B"><CircleCheckFilled /></el-icon> Paid
            </div>
          </el-tag>
        </div>
      </div>
    </template>

    <div
      class="p-[20px] pt-[32px] flex flex-col gap-[16px]"
      v-if="submissionType === ''"
    >
      <h5
        class="sf-display font-[600] text-[16px] sm:text-[20px] text-[#171717]"
      >
        Do you want to register for an exam or upload a certificate?
      </h5>
      <div class="flex gap-[16px] flex-wrap">
        <div
          class="min-w-[300px] sm:min-w-[375px] cursor-pointer flex-1 relative bg-[#F7F7F7] rounded-[12px] flex flex-col gap-[20px] p-[16px] hover:bg-[#EBF1FF] transition-colors duration-300 group"
          @click="submissionType = 'certificate'"
        >
          <div
            class="rounded-[6px] p-[8px] bg-[#fff] w-[36px] h-[36px] transition-colors duration-300"
          >
            <Medal
              class="text-[#5C5C5C] group-hover:text-[#335CFF] transition-colors duration-300"
            />
          </div>
          <div class="flex flex-col gap-[4px] w-[288px]">
            <p
              class="sf-display font-[500] text-[14px] leading-[20px] tracking-[-0.6%] text-[#171717]"
            >
              Pass with certificate
            </p>
            <p class="sf-display text-[12px] leading-[16px] text-[#5C5C5C]">
              Payment: Free
            </p>
          </div>
          <img
            src="/src/assets/imgs/exam-certificate.avif"
            class="w-fit h-[100px] xs:h-[124px] absolute right-[5px] xs:right-[16px] bottom-[0]"
          />
        </div>
        <div
          class="min-w-[300px] sm:min-w-[375px] cursor-pointer flex-1 relative bg-[#F7F7F7] rounded-[12px] flex flex-col gap-[20px] p-[16px] hover:bg-[#FFF5E0] transition-colors duration-300 group"
          @click="submissionType = 'exam'"
        >
          <div
            class="rounded-[6px] p-[8px] bg-[#fff] w-[36px] h-[36px] transition-colors duration-300"
          >
            <Reading
              class="text-[#5C5C5C] group-hover:text-[#F4A808] transition-colors duration-300"
            />
          </div>
          <div class="flex flex-col gap-[4px] w-[288px]">
            <p
              class="sf-display font-[500] text-[14px] leading-[20px] tracking-[-0.6%] text-[#171717]"
            >
              Register to exam
            </p>
            <p class="sf-display text-[12px] leading-[16px] text-[#5C5C5C]">
              Payment: 100 000 UZS
            </p>
          </div>
          <img
            src="/src/assets/imgs/exam-exam.avif"
            class="w-fit h-[100px] xs:h-[124px] absolute right-[5px] xs:right-[16px] top-[0]"
          />
        </div>
      </div>
    </div>

    <div
      v-else-if="submissionType === 'certificate'"
      class="p-[20px] flex flex-col gap-[12px]"
    >
      <h5 class="sf-display font-[600] leading-[24px]">
        {{ successUpload ? "Certificate" : "Upload certificate" }}
      </h5>
      <FileUpload
        ref="uploadRef"
        :progress="progress"
        @change="onFileChange"
        @progress="onProgress"
        @success="onSuccess"
        @error="onError"
      />
      <div
        class="p-[16px] flex flex-col gap-[8px] border border-[#EBEBEB] rounded-[8px]"
        :class="{ hidden: progress === 0 || successUpload }"
      >
        <div class="flex justify-between">
          <div>
            <p
              class="sf-display font-[600] text-[12px] leading-[18px] text-[#171717]"
            >
              Uploading...
            </p>
            <p class="sf-display text-[12px] text-[#5C5C5C]">
              {{ progress }}% ·
              {{
                secondsLeft !== null
                  ? `${secondsLeft}s remaining`
                  : "calculating..."
              }}
            </p>
          </div>
          <el-button @click="submissionType = ''" class="max-w-[24px] h-[24px]">
            <el-icon><Close /></el-icon>
          </el-button>
        </div>
        <el-progress
          :percentage="progress"
          :status="progress === 100 && 'success'"
          :show-text="false"
        />
      </div>
      <div
        v-if="successUpload && certificatePasses === null"
        class="flex p-[16px] border border-[#EBEBEB] rounded-[8px] gap-[8px] items-center"
      >
        <div class="w-[32px] h-[32px] text-[#5C5C5C]"><Document /></div>
        <div>
          <p
            class="sf-display font-[600] text-[12px] leading-[18px] text-[#222529]"
          >
            {{ currentFile?.name }}
          </p>
          <p class="sf-display text-[12px] text-[#757586] leading-[16px]">
            {{ formatSize(currentFile?.size) }}
          </p>
        </div>
      </div>
      <div v-else-if="certificatePasses">
        <Banner
          title="Certificate is approved"
          color="#1FC16B"
          description="The certificate you provided has been successfully approved as an equivalent for fulfilling the admission requirements"
        >
          <template #icon><Medal /></template>
        </Banner>
      </div>
      <div v-else-if="certificatePasses === false">
        <Banner
          title="Your current application is rejected"
          color="#FF3B30"
          description="Rejection reason"
          button-text="Retake Exam"
          @click="resetExam"
        >
          <template #icon><Medal /></template>
        </Banner>
      </div>
    </div>

    <template v-if="submissionType == 'exam'">
      <FormSection label="EXAM DETAILS" v-if="examPhase === 2" />
      <div class="p-[20px] gap-[16px] flex flex-col">
        <el-form
          label-position="top"
          class="w-full flex justify-between gap-[16px] flex-col sm:flex-row"
          v-if="examPhase === 1"
        >
          <el-form-item label="Exam type" class="flex-1">
            <el-select v-model="examForm.examType">
              <el-option label="Online" value="online" />
              <el-option label="In-Person" value="in-person" />
            </el-select>
          </el-form-item>
          <el-form-item label="Choose date" class="flex-1">
            <el-date-picker
              v-model="examForm.examDate"
              type="date"
              class="w-full!"
              format="DD.MM.YYYY"
            />
          </el-form-item>
        </el-form>
        <template v-else>
          <el-descriptions :column="1">
            <el-descriptions-item
              label="Date"
              label-class-name="flex-1"
              class-name="text-right"
            >
              {{ formatDate(examForm.examDate) }}
            </el-descriptions-item>
            <el-descriptions-item
              label="Time"
              label-class-name="flex-1"
              class-name="text-right"
            >
              {{ formatTime(examForm.examDate) }}
            </el-descriptions-item>
            <el-descriptions-item
              label="Address"
              label-class-name="flex-1"
              class-name="text-right"
            >
              CAU
            </el-descriptions-item>
          </el-descriptions>
          <template v-if="!paid">
            <Banner
              color="#FA7319"
              title="Reset Exam"
              description='Before the exam fee is paid, the "Reset Exam" button enables you
                to reschedule your exam or upload the relevant certificate.'
            >
              <template #icon>
                <Document />
              </template>
              <template #action>
                <p
                  class="sf-display text-[14px] leading-[20px] tracking-[-0.6%] text-[#FA7319] underline cursor-pointer"
                  @click="resetExam"
                >
                  Reset Exam
                </p>
              </template>
            </Banner>
            <Banner
              title="Exam Payment Needed"
              color="#FF3B30"
              description="To participate in the exam, please complete the payment of 100 000 UZS."
              button-text="Pay Now"
            >
              <template #icon><Money /></template>
            </Banner>
          </template>
          <div v-if="examResult && examResult != 'waiting' && examResult >= 50">
            <Banner
              title="Congratulations"
              color="#1FC16B"
              description="You have successfully passed the exam."
            >
              <template #icon><Check /></template>
              <template #action>
                <p class="sf-display font-[600] text-[36px] text-[#1FC16B]">
                  {{ examResult }}
                </p>
              </template>
            </Banner>
          </div>
          <div v-if="examResult && examResult != 'waiting' && examResult < 50">
            <Banner
              title="Exam failed"
              color="#FF3B30"
              description="Unfortunately, you did not pass the exam. To proceed, you must either retake the exam or upload a relevant certificate."
            >
              <template #icon><Close /></template>
              <template #action>
                <div class="flex items-center gap-[24px]">
                  <p class="sf-display font-[600] text-[36px] text-[#FB3748]">
                    {{ examResult }}
                  </p>
                  <button
                    @click="resetExam"
                    class="bg-[#fff] text-[#FB3748] text-[12px] leading-[14px] sf-display font-[600] py-[8px] px-[12px] h-fit rounded-[6px] cursor-pointer"
                  >
                    Retake Exam
                  </button>
                </div>
              </template>
            </Banner>
          </div>
        </template>
      </div>
    </template>

    <template
      #footer
      v-if="submissionType != '' && progress === 0 && examPhase == 1"
    >
      <div class="flex gap-[8px] sm:gap-[12px]">
        <el-button
          @click="submissionType = ''"
          class="flex-1 sf-display text-[12px] sm:text-[14px] leading-[20px] tracking-[-0.6%] px-[8px] sm:px-[10px] py-[8px] sm:py-[10px] h-fit rounded-[10px]"
          >Cancel</el-button
        >
        <el-button
          type="primary"
          class="flex-1 sf-display text-[12px] sm:text-[14px] leading-[20px] tracking-[-0.6%] px-[8px] sm:px-[10px] py-[8px] sm:py-[10px] h-fit rounded-[10px]"
          :disabled="
            (submissionType === 'certificate' && !currentFile) ||
            (submissionType === 'exam' &&
              (!examForm.examDate || !examForm.examType))
          "
          @click="handleSave"
          >Save</el-button
        >
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import NotParticipate from "@/assets/svgs/exam-not-participate.svg";
import Banner from "@/components/banner.vue";
import { ref, watch, reactive } from "vue";
import FileUpload from "@/components/fileUpload.vue";
import FormSection from "@/components/formSection.vue";

import type { examSubmissionType } from "@/types/frontend";
import type {
  UploadInstance,
  UploadProgressEvent,
  UploadFile,
} from "element-plus";

const submissionType = ref<examSubmissionType>("");

const currentFile = ref<UploadFile | null>(null);
const examPhase = ref<number>(1);

const examResult = ref<number | null | "waiting">(null);
const paid = ref<boolean>(false);
const certificatePasses = <boolean | null | "waiting">null;

const uploadRef = ref<UploadInstance>();
const progress = ref<number>(0);
const isUploading = ref<boolean>(false);
const successUpload = ref<boolean>(false);

const startTime = ref<number>(0);
const secondsLeft = ref<number | null>(null);

const onFileChange = (file: UploadFile) => {
  currentFile.value = file;
};

const onProgress = (event: UploadProgressEvent) => {
  progress.value = Math.round(event.percent);
  if (!startTime.value) startTime.value = Date.now();
  const elapsed = (Date.now() - startTime.value) / 1000;
  secondsLeft.value = Math.ceil(
    (event.total - event.loaded) / (event.loaded / elapsed),
  );
};

const onError = () => {
  isUploading.value = false;
};

const onSuccess = () => {
  progress.value = 100;
  isUploading.value = false;
  secondsLeft.value = 0;

  setTimeout(() => {
    successUpload.value = true;
  }, 10);
};

const handleSave = () => {
  if (submissionType.value === "certificate") {
    if (!uploadRef.value) return;
    isUploading.value = true;
    uploadRef.value.submit();
  } else if (submissionType.value === "exam") {
    examPhase.value++;
  }
};

const resetCertificate = () => {
  progress.value = 0;
  startTime.value = 0;
  secondsLeft.value = null;
  currentFile.value = null;
};

const resetExam = () => {
  examForm.examDate = null;
  examForm.examType = "";
  examPhase.value = 1;
  /*   examResult.value = null;
   */
};

watch(
  () => submissionType.value,
  () => {
    resetCertificate();
    resetExam();
  },
);

const formatSize = (bytes: number | undefined) => {
  if (!bytes) return;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const examForm = reactive<{ examType: string; examDate: Date | null }>({
  examType: "",
  examDate: null,
});

const formatDate = (date: Date | null): string => {
  if (!date) return "";
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
};

const formatTime = (date: Date | null): string => {
  if (!date) return "";
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
};

defineProps<{
  examFor: String;
}>();
</script>

<style lang="css" scoped>
:deep(.el-descriptions__body .el-descriptions__row) {
  display: flex;
}
:deep(.el-descriptions__body .el-descriptions__cell) {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

:deep(.el-input__prefix-inner) {
  padding-left: 12px;
}
:deep(.el-icon) {
  margin: 0;
}
</style>
