<script setup>
import { ref, onMounted } from 'vue';

const testimonials = ref([]);

const testimonialTexts = [
  "Tendances actuelles en design. Je suis particulièrement intéressé par les questions éthiques en matière de durabilité dans le design de produits.",
  "Un excellent aperçu des tendances actuelles en design. Je suis particulièrement intéressé par les questions éthiques en matière de durabilité dans le design de produits.",
  "Une analyse approfondie qui a considérablement élargi ma compréhension du sujet. J'aurai aimé plus de graphiques pour illustrer les points clés.",
  "Article intéressant, mais j'aurais aimé voir plus d'exemples concrets. Cependant, c'était bien écrit et très informatif dans l'ensemble.",
  "J'ai apprécié les perspectives variées offertes dans cet article. Les études de cas étaient particulièrement convaincantes et bien choisies.",
  "J'ai trouvé cet article très enrichissant, surtout la partie sur l'impact du design sur l'expérience utilisateur. Cela m'a donné des idées pour mes projets."
];

async function fetchRandomDogImages() {
  try {
    // Fetch 12 random dog images (2 rows of 6)
    const response = await fetch('https://dog.ceo/api/breeds/image/random/20');
    const data = await response.json();

    if (data.status === 'success') {
      testimonials.value = data.message.map((imageUrl, index) => ({
        id: index,
        image: imageUrl,
        text: testimonialTexts[index % testimonialTexts.length]
      }));
    }
  } catch (error) {
    console.error('Error fetching dog images:', error);
  }
}

onMounted(() => {
  fetchRandomDogImages();
});
</script>

<template>
  <div id="avis" class="scroll-mt-24 hidden md:block w-full bg-gray-50 mt-[128px] py-16 overflow-hidden">
    <div class="carousel-container">
      <!-- First row - scrolling left -->
      <div class="carousel-track carousel-track-left">
        <div v-for="testimonial in testimonials.slice(0, 6)"
             :key="`row1-${testimonial.id}`"
             class="testimonial-card">
          <img :src="testimonial.image"
               :alt="`Dog ${testimonial.id}`"
               class="testimonial-image" />
          <p class="testimonial-text">{{ testimonial.text }}</p>
        </div>
        <!-- Duplicate for infinite scroll -->
        <div v-for="testimonial in testimonials.slice(0, 6)"
             :key="`row1-dup-${testimonial.id}`"
             class="testimonial-card">
          <img :src="testimonial.image"
               :alt="`Dog ${testimonial.id}`"
               class="testimonial-image" />
          <p class="testimonial-text">{{ testimonial.text }}</p>
        </div>
      </div>

      <!-- Second row - scrolling right -->
      <div class="carousel-track carousel-track-right mt-6">
        <div v-for="testimonial in testimonials.slice(6, 12)"
             :key="`row2-${testimonial.id}`"
             class="testimonial-card">
          <img :src="testimonial.image"
               :alt="`Dog ${testimonial.id}`"
               class="testimonial-image" />
          <p class="testimonial-text">{{ testimonial.text }}</p>
        </div>
        <!-- Duplicate for infinite scroll -->
        <div v-for="testimonial in testimonials.slice(6, 12)"
             :key="`row2-dup-${testimonial.id}`"
             class="testimonial-card">
          <img :src="testimonial.image"
               :alt="`Dog ${testimonial.id}`"
               class="testimonial-image" />
          <p class="testimonial-text">{{ testimonial.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  width: 100%;
}

.carousel-track {
  display: flex;
  gap: 24px;
  width: fit-content;
}

.carousel-track-left {
  animation: scrollLeft 40s linear infinite;
}

.carousel-track-right {
  animation: scrollRight 40s linear infinite;
}

.carousel-track:hover {
  animation-play-state: paused;
}

.testimonial-card {
  flex-shrink: 0;
  width: 300px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.testimonial-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.testimonial-text {
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
  flex: 1;
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scrollRight {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>