<script setup>
  import avis from '@/assets/avis.svg';
</script>

<template>
  <div id="avis" class="scroll-mt-24 hidden md:block w-full bg-gray-50">
    <div class="hidden md:block w-full bg-gray-50">
      <img :src="avis"
           alt="Témoignages clients"
           class="w-full h-auto max-h-[500px] object-contain" />
    </div>
  </div>
</template>