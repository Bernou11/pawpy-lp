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
  <div class="flex items-center justify-center w-full space-between">
    <h1 class="text-[37px] font-bold text-monochrome-900">
      Votre vie avant / après Anomi :
    </h1>
  </div>
  <div class="flex items-center justify-center w-full">
    <ToggleSwitch></ToggleSwitch>
  </div>
</template>