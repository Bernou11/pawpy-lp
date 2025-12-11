<script setup>
  import dogWithHat from '@/assets/dog_hat.svg';
</script>

<template>
  <!-- Newsletter section with overlapping dog -->
  <div class="relative -top-8 z-20">
    <div class="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <div class="bg-monochrome-400 rounded-lg p-6 md:p-12 flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12 relative overflow-hidden md:overflow-visible">
        <!-- Left: Newsletter content -->
        <div class="flex-1 w-full md:ml-5 text-center md:text-left z-10">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">Soutenez-nous !</h2>

          <p class="mb-6">
            En vous abonnant à notre newsletter,<br class="hidden md:block">
            vous serez <strong>tenu au courant des avancées</strong>.
          </p>

          <p class="text-sm text-gray-600 mb-6 md:mb-0">
            Il vous sera même proposz de <strong>faire partie de la version béta</strong>
            en cours de développement
          </p>
        </div>

        <!-- Right: Input + Button + Dog -->
        <div class="flex flex-col items-center md:items-end gap-4 relative w-full md:w-auto z-20">

          <!-- Email input group -->
          <div class="relative w-full md:w-80 md:mr-52 mt-0 md:mt-5">
            <p class="text-sm font-medium text-monochrome-900 mb-2 text-center">
              Inscrivez-vous à notre newsletter
            </p>
            <div class="relative w-full">
              <input
                  type="email"
                  placeholder="exemple@gmail.com"
                  class="px-6 py-3 rounded-full bg-monochrome-200 w-full text-center border border-monochrome-500 pr-12 focus:outline-none focus:ring-2 focus:ring-monochrome-500 placeholder-gray-500"
              />
              <!-- Submit Button (Inside Input) -->
              <button class="absolute top-1/2 -translate-y-1/2 right-2 p-2 bg-monochrome-900 text-monochrome-100 rounded-full hover:bg-monochrome-400 hover:text-monochrome-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Questionnaire Button -->
          <button class="px-6 py-2 border-2 border-monochrome-800 text-monochrome-100 bg-monochrome-900 rounded-full text-sm font-medium whitespace-nowrap w-full md:w-80 md:mr-52 hover:bg-monochrome-400 hover:text-monochrome-800 transition-colors">
            <a href="https://clementsainthilaire.notion.site/2c3299f1bb4d804db2acdeaaddd997c1?pvs=105"
               target="_blank"
               rel="noopener noreferrer">
              Répondre au questionnaire
            </a>
          </button>

          <!-- Dog image overlapping from top -->
          <img :src="dogWithHat"
               alt="Dog with yellow hat"
               class="hidden md:block absolute -top-[165px] -right-8 w-60 h-96 z-[-1]" />
          
          <!-- Mobile Dog Image (positioned differently) -->
           <img :src="dogWithHat"
               alt="Dog with yellow hat"
               class="md:hidden w-40 h-auto mt-4 mx-auto" />
        </div>
      </div>
    </div>
  </div>
</template>