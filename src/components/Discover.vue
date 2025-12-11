<template>
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-white py-12">
    <div class="max-w-7xl mx-auto">
      <!-- Header - Centered -->
      <div class="flex justify-center items-center mb-8 relative">
        <h2 class="text-2xl font-bold text-monochrome-800 text-center">Découvrez notre app</h2>
        <button class="hidden md:block text-sm text-gray-600 hover:text-gray-900 absolute right-0">
          Passer ces guides
        </button>
      </div>

      <!-- Cards Container -->
      <div class="relative">
        <div class="overflow-hidden">
          <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
                v-for="(card, index) in cards"
                :key="index"
                class="w-full flex-shrink-0 px-4"
            >
              <div class="flex flex-col md:flex-row items-center justify-center gap-8">
                <!-- Phone Mockup -->
                <div class="relative transform scale-90 md:scale-100">
                  <div class="w-[280px] h-[560px] bg-black rounded-[40px] p-3 shadow-2xl mx-auto">
                    <div class="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
                      <!-- Phone Notch -->
                      <div class="flex justify-center pt-2">
                        <div class="w-32 h-6 bg-black rounded-full"></div>
                      </div>

                      <!-- Phone Content -->
                      <div class="p-4 pt-8 h-full flex flex-col text-left">
                        <div class="text-xs text-gray-500 mb-2">{{ card.time }}</div>
                        <div class="text-sm font-bold mb-2">{{ card.appName }}</div>
                        <h3 class="text-lg font-bold mb-3 leading-tight">
                          {{ card.title }}
                        </h3>
                        <p class="text-xs text-gray-600 mb-6">
                          {{ card.description }}
                        </p>

                        <!-- CTA Button -->
                        <button class="w-full bg-black text-white py-3 px-4 rounded-full text-sm font-medium mb-8 cursor-default font-sora">
                          {{ card.buttonText }}
                        </button>

                        <!-- Spacer to push content to bottom -->
                        <div class="flex-grow"></div>

                        <!-- Bottom Section -->
                        <div class="pb-6">
                          <!-- Search Bar Look -->
                          <div class="rounded-full px-4 py-2 mb-4 flex items-center justify-center gap-2">
                            <span class="text-xs text-gray-600">{{ card.footer }}</span>
                          </div>

                          <!-- Bottom Action Button - Single Line Text -->
                          <button class="w-full bg-green-600 text-white py-3 px-2 rounded-full text-xs font-medium flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden cursor-default font-sora">
                            <span class="truncate">{{ card.actionText }}</span>
                            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Text Content -->
                <div class="max-w-md text-center md:text-left mt-8 md:mt-0">
                  <h3 class="text-xl font-bold mb-4">{{ card.sideTitle }}</h3>
                  <p class="text-gray-600 leading-relaxed">{{ card.sideDescription }}</p>
                  <button class="w-50 bg-black text-white py-3 px-4 rounded-full text-sm font-medium mb-8 mt-3 font-sora hover:text-monochrome-800 hover:bg-monochrome-400">
                    Je m'inscris
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Dots -->
        <div class="flex justify-center gap-2 mt-8">
          <button
              v-for="(card, index) in cards"
              :key="`dot-${index}`"
              @click="goToSlide(index)"
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="currentIndex === index ? 'bg-gray-800 w-6' : 'bg-gray-300'"
          ></button>
        </div>

        <!-- Arrow Navigation -->
        <div class="flex justify-end gap-2 mt-6">
          <button
              @click="prevSlide"
              :disabled="currentIndex === 0"
              class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200"
              :class="currentIndex === 0
              ? 'bg-gray-100 text-gray-300 cursor-default'
              : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <button
              @click="nextSlide"
              :disabled="currentIndex === cards.length - 1"
              class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200"
              :class="currentIndex === cards.length - 1
              ? 'bg-gray-100 text-gray-300 cursor-default'
              : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)

const cards = ref([
  {
    time: '11h09',
    appName: 'Anomi',
    title: 'Anomi repose sur le principe de parrainage',
    description: 'Consectetur adipiscing elit duis tristique sollicitudin nibh. Augue mauris augue neque gravida.',
    buttonText: 'Je m\'inscris',
    footer: 'Recherche dans l\'espace 🔍',
    actionText: "Autoriser l'accès aux contacts",
    sideTitle: 'Une entrée filtrée avec parraineurs certifiés.',
    sideDescription: 'Tous les parraineurs sont préalablement vérifiés, certifiés. Nous pouvons valideraient à des critères précis, avec transparence et dans des délais réalistes. Vous serez parrainé à coup sûr.'
  },
  {
    time: '11h09',
    appName: 'Anomi',
    title: 'Connectez-vous avec des personnes vérifiées',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
    buttonText: 'Découvrir',
    footer: 'Parcourez les profils 👤',
    actionText: 'Explorez la communauté',
    sideTitle: 'Sécurité et confidentialité.',
    sideDescription: 'Votre vie privée est notre priorité. Toutes les données sont cryptées et protégées selon les normes les plus strictes.'
  },
  {
    time: '11h09',
    appName: 'Anomi',
    title: 'Partagez vos moments en toute confiance',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    buttonText: 'Commencer',
    footer: 'Créez du contenu 📸',
    actionText: 'Publiez maintenant',
    sideTitle: 'Une communauté engagée.',
    sideDescription: 'Rejoignez des milliers d\'utilisateurs qui partagent leurs passions et créent des connexions authentiques chaque jour.'
  }
])

const nextSlide = () => {
  if (currentIndex.value < cards.value.length - 1) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const goToSlide = (index) => {
  currentIndex.value = index
}
</script>