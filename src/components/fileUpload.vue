<template>
  <el-upload
    ref="uploadRef"
    drag
    accept=".jpg, .png, .doc, .pdf, .svg, .zip"
    :auto-upload="false"
    :action="action"
    :limit="1"
    :on-change="onFileChange"
    :on-progress="onProgress"
    :on-success="onSuccess"
    :on-error="onError"
    :class="{ hidden: progress > 0, 'w-full!': true }"
  >
    <div class="el-icon--upload w-min mx-auto"><Upload /></div>
    <div class="el-upload__text sf-display text-[12px] sm:text-[14px] px-[8px]">
      Choose or drag & drop file to upload
    </div>
    <div
      class="text-[#335CFF] border border-[#335CFF] rounded-[6px] w-fit sf-display font-[600] text-[12px] sm:text-[14px] px-[8px] sm:px-[12px] py-[4px] sm:py-[6px] mx-auto my-[12px] sm:my-[20px]"
    >
      Browse files
    </div>
    <template #tip>
      <div class="el-upload__tip sf-display text-[11px] sm:text-[12px] text-center px-[8px]">
        Only support .jpg, .png, .doc, .pdf, .svg and .zip files
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Upload from "@/assets/svgs/upload.svg";
import type { UploadInstance, UploadFile, UploadProgressEvent } from "element-plus";

const props = withDefaults(defineProps<{
  action?: string;
  progress?: number;
}>(), {
  action: "https://httpbin.org/post",
  progress: 0,
});

const emit = defineEmits<{
  change: [file: UploadFile];
  progress: [event: UploadProgressEvent];
  success: [];
  error: [];
}>();

const uploadRef = ref<UploadInstance>();

const onFileChange = (uploadFile: UploadFile) => {
  if (uploadFile.raw) emit("change", uploadFile);
};
const onProgress = (event: UploadProgressEvent) => emit("progress", event);
const onSuccess = () => emit("success");
const onError = () => emit("error");
const submit = () => uploadRef.value?.submit();

defineExpose({ submit });
</script>