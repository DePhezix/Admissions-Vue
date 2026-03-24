<template>
  <el-header
    class="flex items-center justify-between px-[10px] lg:px-[24px] py-[15px] lg:py-[20px] w-full h-fit"
  >
    <img src="/src/assets/imgs/logo.avif" class="w-[188.4px] h-[24px]" />
    <el-tooltip content="Get Help" placement="bottom">
      <el-dropdown trigger="click" :hide-on-click="false">
        <div
          class="rounded-[10px] flex gap-[4px] p-[10px] h-fit border-[#EBEBEB] border cursor-pointer shadow-[0px_1px_2px_0px_#0A0D1408]"
        >
          <FAQsvg />
          <p
            class="px-[4px] leading-[20px] tracking-[-0.6%] flex items-center text-medium max-sm:hidden"
          >
            Help center
          </p>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-popover
                title="Phone"
                content="+998 71-200-05-22"
                placement="left"
                trigger="click"
              >
                <template #reference>
                  <span
                    ><el-icon><Phone /></el-icon> Call</span
                  >
                </template>
              </el-popover>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="https://t.me/cauadmission_bot" target="_blank">
                <el-icon><Position /></el-icon> Telegram
              </a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
  </el-header>
</template>

<script setup lang="ts">
import FAQsvg from "@/assets/svgs/faq.svg";
</script>
