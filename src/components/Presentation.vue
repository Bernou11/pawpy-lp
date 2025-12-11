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
  <div id="presentation" class="scroll-mt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-0">
    <div class="flex flex-col md:flex-row items-center w-full max-w-[1400px]">
        <div class="flex-1 w-full md:pr-12 text-center md:text-left">
          <div class="flex flex-col md:flex-row items-center gap-2 mb-4 justify-center md:justify-start">
            <div class="flex -space-x-2">
              <img :src="ellipse1" alt="pp1" class="w-8 h-8 rounded-full border-2 border-white">
              <img :src="ellipse2" alt="pp2" class="w-8 h-8 rounded-full border-2 border-white">
              <img :src="ellipse3" alt="pp3" class="w-8 h-8 rounded-full border-2 border-white">
            </div>
            <span class="text-sm text-monochrome-500">Communauté certifiée</span>
          </div>
          <h1 class="text-3xl md:text-5xl font-bold text-monochrome-900 mb-6">
            La promenade de chien,<br>enfin fiable !
          </h1>
          <p class="text-monochrome-500 text-base md:text-lg mb-8 max-w-xl mx-auto md:mx-0">
            Pawpy réunit promeneurs certifiés et propriétaires de chiens en région parisienne.
            Confiance, transparence, sécurité, tout est pensé pour le bien être de votre chiens.
          </p>
          <div class="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <button class="bg-monochrome-900 text-monochrome-100 px-8 py-3 rounded-full font-medium hover:text-monochrome-800 hover:bg-monochrome-400 w-full md:w-auto">
              Suivez le mouvement !
            </button>
            <a href="#" class="text-monochrome-900 font-medium hover:underline mt-2 md:mt-0">
              Nous soutenir →
            </a>
          </div>
        </div>
      <div class="flex-1 relative hidden md:block">
        <img :src="rframe" alt="Right" class="max-w-full h-auto" />
      </div>
    </div>
  </div>
</template>