<script setup lang="ts">
import Header from "./components/header/auth.vue";
import Footer from "./components/footer/index.vue";
import SideAuth from "./components/sideMenu/auth.vue";
</script>

<template>
  <div class="flex justify-center w-screen">
    <div class="min-h-screen flex container max-w-screen">
      <el-container class="flex-1 justify-between" direction="vertical">
        <Header />
        <el-main class="max-sm:p-[10px] py-[10px]">
          <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <component :is="Component" :key="$route.path" />
            </Transition> </RouterView
        ></el-main>
        <Footer />
      </el-container>
      <el-aside class="flex-[0.9672] p-[10px] lg:p-[20px] max-lg:hidden">
        <SideAuth />
      </el-aside>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
