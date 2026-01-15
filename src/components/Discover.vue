<template>
  <div id="application" class="scroll-mt-24 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-white py-12">
    <div class="max-w-7xl mx-auto">
      <!-- Header - Centered -->
      <div class="flex items-center mb-8 relative">
        <h2 class="text-2xl font-bold text-monochrome-800">Découvrez notre app</h2>
        <button class="hidden md:block text-sm text-gray-600 hover:text-gray-900 absolute right-0">
          Poser une question
        </button>
      </div>

      <!-- Cards Container -->
      <div class="relative" ref="carouselRef">
        <div 
          class="overflow-hidden"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(calc(-${currentIndex * 100}% - ${bounceOffset}%))` }"
          >
            <div
                v-for="(card, index) in cards"
                :key="index"
                class="w-full flex-shrink-0 px-4 bg-monochrome-200"
            >
              <div class="flex flex-col md:flex-row items-center justify-center gap-8">
                <!-- Phone Mockup Image -->
                <div class="relative transform scale-90 md:scale-100">
                  <img :src="card.image" :alt="card.appName" class="w-[280px] h-auto mx-auto drop-shadow-2xl" />
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
        <div class="hidden md:flex justify-end gap-2 mt-6">
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
import { ref, onMounted } from 'vue'

import discover1 from '@/assets/discover1.svg'
import discover2 from '@/assets/discover2.svg'
import discover3 from '@/assets/discover3.svg'

const currentIndex = ref(0)
const touchStartX = ref(0)
const touchEndX = ref(0)
const carouselRef = ref(null)
const bounceOffset = ref(0)
const hasBounced = ref(false)

const cards = ref([
  {
    image: discover1,
    time: '11h09',
    appName: 'Pawpy',
    title: 'Pawpy repose sur le principe de parrainage',
    description: 'Consectetur adipiscing elit duis tristique sollicitudin nibh. Augue mauris augue neque gravida.',
    buttonText: 'Je m\'inscris',
    footer: 'Recherche dans l\'espace 🔍',
    actionText: "Autoriser l'accès aux contacts",
    sideTitle: 'Une entrée filtrée avec parraineurs certifiés.',
    sideDescription: 'Tous les parraineurs sont préalablement vérifiés, certifiés. Nous pouvons valideraient à des critères précis, avec transparence et dans des délais réalistes. Vous serez parrainé à coup sûr.'
  },
  {
    image: discover2,
    time: '11h09',
    appName: 'Pawpy',
    title: 'Connectez-vous avec des personnes vérifiées',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
    buttonText: 'Découvrir',
    footer: 'Parcourez les profils 👤',
    actionText: 'Explorez la communauté',
    sideTitle: 'Sécurité et confidentialité.',
    sideDescription: 'Votre vie privée est notre priorité. Toutes les données sont cryptées et protégées selon les normes les plus strictes.'
  },
  {
    image: discover3,
    time: '11h09',
    appName: 'Pawpy',
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

const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].clientX
  touchEndX.value = e.changedTouches[0].clientX
}

const handleTouchMove = (e) => {
  touchEndX.value = e.changedTouches[0].clientX
}

const handleTouchEnd = () => {
  if (touchStartX.value - touchEndX.value > 50) {
    nextSlide()
  }

  if (touchStartX.value - touchEndX.value < -50) {
    prevSlide()
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasBounced.value) {
        hasBounced.value = true
        setTimeout(() => {
          bounceOffset.value = 10
          setTimeout(() => {
            bounceOffset.value = 0
          }, 500)
        }, 500)
      }
    })
  }, { threshold: 0.5 })

  if (carouselRef.value) {
    observer.observe(carouselRef.value)
  }
})

</script>