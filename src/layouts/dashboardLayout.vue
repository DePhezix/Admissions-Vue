<template>
  <Loading />
  <el-container class="min-h-screen">
    <SideDash class="shrink-0 max-lg:hidden" />
    <el-drawer
      v-model="openedDrawer"
      direction="ltr"
      :with-header="false"
      size="272px"
      class="lg:hidden p-[0]"
    >
      <SideDash in-drawer @close="openedDrawer = false" />
    </el-drawer>
    <el-container direction="vertical">
      <Header @toggle-sidebar="openedDrawer = true" />
      <main class="px-[10px] lg:px-[32px] pt-[10px] pb-[50px]">
        <RouterView />
      </main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "./components/header/dashboard.vue";
import SideDash from "./components/sideMenu/dashboard.vue";
import Loading from "./components/loading/index.vue";

const openedDrawer = ref<boolean>(false);
</script>

<style scoped>
:deep(.el-drawer__body) {
  padding: 0;
}
</style>
