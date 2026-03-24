<template>
  <div class="h-full">
    <div
      class="w-full h-full flex items-center justify-center bg-no-repeat bg-cover bg-right rounded-[24px]"
      :style="{ backgroundImage: `url(${image})` }"
      :class="{ 'items-end p-[10px] xl:p-[16px]': authStore.selectedFaculty != '' }"
    >
      <el-carousel
        arrow="never"
        :height="carouselHeight"
        indicator-position="outside"
        trigger="click"
        class="w-full max-w-[405.5px] px-[16px] xl:px-[0]"
        v-if="authStore.selectedFaculty === ''"
      >
        <el-carousel-item
          v-for="item in data"
          class="flex flex-col justify-between"
        >
          <div class="flex flex-col gap-[24px] xl:gap-[40px]">
            <img :src="item.img" class="w-[40px] h-[40px] xl:w-[48px] xl:h-[48px] rounded-full" />
            <p class="text-[18px] xl:text-[24px] leading-[26px] xl:leading-[31px]">
              <span class="sf-display text-[#fff]">{{ item.text1 }}</span>
              <span class="sf-display text-[#fff]/60">{{ item.text2 }}</span>
            </p>
          </div>
          <header class="mb-[24px] xl:mb-[40px] flex flex-col gap-[2px] text-[#fff]">
            <h4
              class="sf-display font-[600] text-[14px] xl:text-[16px] leading-[24px] tracking-[-1.1%]"
            >
              {{ item.speaker }}
            </h4>
            <p
              class="sf-display text-[13px] xl:text-[14px] leading-[20px] tracking-[-0.6%] text-[#fff]/72"
            >
              {{ item.speakerPosition }}
            </p>
          </header>
        </el-carousel-item>
      </el-carousel>

      <div
        class="bg-[#fff] w-full p-[16px] xl:p-[24px] rounded-[20px] gap-[16px] xl:gap-[24px] flex flex-col"
        v-else
      >
        <h3 class="sf-display font-[500] text-[22px] xl:text-[32px] leading-[30px] xl:leading-[40px]">
          {{ authStore.selectedFaculty }}
        </h3>
        <div class="flex flex-col gap-[11px]">
          <p class="sf-display font-[600] text-[14px] xl:text-[16px] leading-[20px]">Exams</p>
          <div class="flex gap-[10px] xl:gap-[14px]">
            <p
              class="sf-display flex-1 rounded-[12px] p-[12px] xl:p-[16px] bg-[#f7f7f7] text-center font-[600] text-[13px] xl:text-[14px] text-[#222529] leading-[20px]"
            >
              English
            </p>
            <p
              class="sf-display flex-1 rounded-[12px] p-[12px] xl:p-[16px] bg-[#f7f7f7] text-center font-[600] text-[13px] xl:text-[14px] text-[#222529] leading-[20px]"
            >
              Chemistry & Biology
            </p>
          </div>
        </div>

        <div class="flex gap-[12px] xl:gap-[16px]">
          <div
            class="shrink-0 w-[36px] h-[36px] xl:w-[40px] xl:h-[40px] rounded-[10px] p-[8px] bg-[#EBF8FF] flex items-center justify-center"
          >
            <Money class="w-[18px] h-[18px] xl:w-[20px] xl:h-[20px]" color="#47C2FF" />
          </div>
          <div class="flex flex-col gap-[4px]">
            <p
              class="sf-display font-[500] text-[14px] xl:text-[16px] leading-[22px] xl:leading-[24px] tracking-[-1.1%] text-[#171717]"
            >
              One time payment of 130 000 UZS
            </p>
            <p
              class="sf-display text-[12px] xl:text-[14px] leading-[18px] xl:leading-[20px] tracking-[-0.6%] text-[#5C5C5C]"
            >
              To participate in the exams, a one-time payment of 130 000 UZS is
              required for each exam.
            </p>
          </div>
        </div>

        <div class="flex gap-[12px] xl:gap-[16px]">
          <div
            class="shrink-0 w-[36px] h-[36px] xl:w-[40px] xl:h-[40px] rounded-[10px] p-[8px] gap-[8px] bg-[#E0FAEC] flex items-center justify-center"
          >
            <Document class="w-[18px] h-[18px] xl:w-[20px] xl:h-[20px]" color="#1FC16B" />
          </div>
          <div class="flex flex-col gap-[4px]">
            <p
              class="sf-display font-[500] text-[14px] xl:text-[16px] leading-[22px] xl:leading-[24px] tracking-[-1.1%] text-[#171717]"
            >
              A relevant certificate option
            </p>
            <p
              class="sf-display text-[12px] xl:text-[14px] leading-[18px] xl:leading-[20px] tracking-[-0.6%] text-[#5C5C5C]"
            >
              If you have a relevant certificate for the corresponding subject,
              you may take the exam without making a payment, provided that the
              certificate is successfully verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { carouselItem } from "@/types/frontend/index";
import type { Faculty } from "@/types/frontend";
import { useAuthStore } from "@/stores";
import { useWindowWidth } from "@/model/windowWidth";

const authStore = useAuthStore();
const { windowWidth } = useWindowWidth()

const carouselHeight = computed(() => windowWidth.value < 1090 ? "360px" : "442px");

const facultyImages: Record<Faculty, string> = {
  "": "/src/assets/imgs/auth-carousel-bg.webp",
  "Medicine school": "/src/assets/imgs/signup_medicine.avif",
  "Dental school": "/src/assets/imgs/signup_dentistry.avif",
  "Hospitality & Tourism school": "/src/assets/imgs/signup_hotel.avif",
  "Engineering School": "/src/assets/imgs/signup_engineering.avif",
  "Applied Intelligence School": "/src/assets/imgs/signup_science.avif",
};

const image = computed(() =>
  authStore.selectedFaculty
    ? facultyImages[authStore.selectedFaculty as Faculty]
    : "/src/assets/imgs/auth-carousel-bg.webp",
);

const data: carouselItem[] = [
  {
    img: "/src/assets/imgs/auth-carousel-1.avif",
    text1: "Central Asian University is committed to being a student-centered University. ",
    text2: "Our educational philosophy is to fully train our students with the qualifications and the ability to develop themselves.",
    speaker: "Kamran Gulamov",
    speakerPosition: "President of Central Asian University",
  },
  {
    img: "/src/assets/imgs/auth-carousel-2.avif",
    text1: "I am impressed by the scale of Central Asian University and the way it combines technology, modern infrastructure, and students' genuine passion for science.",
    text2: "This is a place where a new generation of doctors and researchers is being shaped — ready to transform the medicine of the future",
    speaker: "Edvard Mose",
    speakerPosition: "Nobel Laureate Professor",
  },
  {
    img: "/src/assets/imgs/auth-carousel-3.avif",
    text1: "At this Central Asian University, I felt real potential.",
    text2: "If students here learn financial intelligence, they can transform the entire region.",
    speaker: "Robert Kiosaki",
    speakerPosition: "Entrepreneur and investor",
  },
];
</script>

<style scoped>
:deep(.el-carousel__indicators) {
  display: flex;
  gap: 6px;
  line-height: 4px;
}
:deep(.el-carousel__indicator) {
  padding: 0;
}
:deep(.el-carousel__indicator button) {
  width: 4px;
  height: 4px;
  border-radius: 96px;
  background: #ffffff;
  opacity: 0.3;
  transition: width 0.3s;
}
:deep(.el-carousel__indicator.is-active button) {
  width: 16px;
  opacity: 1;
}
</style>