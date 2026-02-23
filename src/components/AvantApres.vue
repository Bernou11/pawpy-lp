<script setup>
import ToggleSwitch from "@/components/ToggleSwitch.vue";

defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div id="avant-apres" class="scroll-mt-24 flex items-center justify-center w-full space-between mt-[128px]">
    <h1 class="text-[37px] font-bold text-monochrome-900 mb-[32px]">
      Votre vie avant / après Pawpy :
    </h1>
  </div>
  <div class="flex items-center justify-center w-full">
    <ToggleSwitch></ToggleSwitch>
  </div>
</template>