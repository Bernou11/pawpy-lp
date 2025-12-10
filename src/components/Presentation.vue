<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
import ellipse1 from '@/assets/ellipse1.svg';
import ellipse2 from '@/assets/ellipse2.svg';
import ellipse3 from '@/assets/ellipse3.svg';
import rframe from '@/assets/r_frame.svg';
</script>

<template>
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="flex items-center w-[1300px] h-[656px] max-w-[1400px]">
        <div class="flex-1 pr-12 align-center w-full">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex -space-x-2">
              <img :src="ellipse1" alt="pp1" class="w-8 h-8 rounded-full border-2 border-white">
              <img :src="ellipse2" alt="pp2" class="w-8 h-8 rounded-full border-2 border-white">
              <img :src="ellipse3" alt="pp3" class="w-8 h-8 rounded-full border-2 border-white">
            </div>
            <span class="text-sm text-monochrome-500">Communauté certifiée</span>
          </div>
          <h1 class="text-5xl font-bold text-monochrome-900 mb-6">
            La promenade de chien,<br>enfin fiable !
          </h1>
          <p class="text-monochrome-500 text-lg mb-8 max-w-xl">
            Anomi réunit promeneur certifiés et propriétaires de chiens en région parisienne.
            Confiance, transparence, sécurité, tout est pensé pour le bien être de votre chiens.
          </p>
          <div class="flex items-center gap-4">
            <button class="bg-monochrome-900 text-monochrome-100 px-8 py-3 rounded-full font-medium hover:text-monochrome-800 hover:bg-monochrome-400">
              Suivre le mouvement !
            </button>
            <a href="#" class="text-monochrome-900 font-medium hover:underline">
              Nous soutenir →
            </a>
          </div>
        </div>
      <div class="flex-1 relative">
        <img :src="rframe" alt="Right"></img>
      </div>
    </div>
  </div>
</template>