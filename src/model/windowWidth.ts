import { ref, onMounted, onUnmounted } from 'vue';

export function useWindowWidth() {
  const windowWidth = ref(window.innerWidth);

  function onResize() {
    windowWidth.value = window.innerWidth;
  }

  onMounted(() => window.addEventListener("resize", onResize));
  onUnmounted(() => window.removeEventListener("resize", onResize));

  return { windowWidth };
}