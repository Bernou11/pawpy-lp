<template>
  <div id="application" class="scroll-mt-24 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-white py-12 mt-[128px]">
    <div class="max-w-7xl mx-auto">
      <!-- Header - Centered -->
      <div class="flex items-center mb-8 relative px-2 md:px-8">
        <h2 class="text-[37px] font-bold text-monochrome-800">Découvrez notre app</h2>
        <button class="hidden md:block text-sm text-gray-600 hover:text-gray-900 absolute right-8">
          Poser une question
        </button>
      </div>

      <!-- Cards Container -->
      <div class="relative py-8 md:py-16" ref="carouselRef">
        <div
            class="overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide md:overflow-hidden"
            ref="scrollContainer"
            @scroll="handleScroll"
        >
          <div
              class="flex md:transition-transform md:duration-500 md:ease-in-out"
              :style="{ transform: isMobile ? 'none' : `translateX(-${currentIndex * 100}%)` }"
          >
            <div
                v-for="(card, index) in cards"
                :key="index"
                class="w-full flex-shrink-0 px-2 md:px-8 snap-center"
            >
              <div class="bg-monochrome-200 rounded-3xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 overflow-visible md:min-h-[400px] md:max-h-[600px]">
                <!-- Phone Mockup Image -->
                <div class="relative transform scale-90 md:scale-100 flex-shrink-0">
                  <img :src="card.image" :alt="card.appName" class="w-[240px] md:w-[280px] h-auto mx-auto drop-shadow-2xl" />
                </div>

                <!-- Text Content -->
                <div class="max-w-md md:text-left flex-1">
                  <h3 class="text-[24px] md:text-[28px] font-bold mb-4 md:mb-6">{{ card.sideTitle }}</h3>
                  <p class="text-gray-600 leading-relaxed text-[15px] md:text-[16px] mb-6 md:mb-8">{{ card.sideDescription }}</p>
                  <div class="flex justify-center md:justify-start">
                    <a href="#soutien">
                      <button class="bg-black text-white py-3 px-8 rounded-full text-sm font-medium font-sora hover:bg-gray-800 transition-colors">
                        Je m'inscris
                      </button>
                    </a>
                  </div>
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
              :class="currentIndex === index ? 'bg-gray-800 w-8' : 'bg-gray-300'"
          ></button>
        </div>

        <!-- Arrow Navigation -->
        <div class="hidden md:flex justify-end gap-2 mt-6 px-8">
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
import { ref, onMounted, onUnmounted } from 'vue'

import discover1 from '@/assets/discover1.svg'
import discover2 from '@/assets/discover2.svg'
import discover3 from '@/assets/discover3.svg'

const currentIndex = ref(0)
const carouselRef = ref(null)
const scrollContainer = ref(null)
const bounceOffset = ref(0)
const hasBounced = ref(false)
const isMobile = ref(false)

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

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const nextSlide = () => {
  if (currentIndex.value < cards.value.length - 1) {
    currentIndex.value++
    if (isMobile.value && scrollContainer.value) {
      const cardWidth = scrollContainer.value.offsetWidth
      scrollContainer.value.scrollTo({
        left: cardWidth * currentIndex.value,
        behavior: 'smooth'
      })
    }
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    if (isMobile.value && scrollContainer.value) {
      const cardWidth = scrollContainer.value.offsetWidth
      scrollContainer.value.scrollTo({
        left: cardWidth * currentIndex.value,
        behavior: 'smooth'
      })
    }
  }
}

const goToSlide = (index) => {
  currentIndex.value = index
  if (isMobile.value && scrollContainer.value) {
    const cardWidth = scrollContainer.value.offsetWidth
    scrollContainer.value.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  if (isMobile.value && scrollContainer.value) {
    const scrollLeft = scrollContainer.value.scrollLeft
    const cardWidth = scrollContainer.value.offsetWidth
    const newIndex = Math.round(scrollLeft / cardWidth)
    if (newIndex !== currentIndex.value) {
      currentIndex.value = newIndex
    }
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

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

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>