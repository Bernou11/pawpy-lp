<script setup>
import { ref } from 'vue';
import dogWithHat from '@/assets/dog_hat.svg';

// Form state
const email = ref('');
const isSubmitting = ref(false);
const showSuccess = ref(false);
const showError = ref(false);
const showConfirmed = ref(false);

// Handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();

  isSubmitting.value = true;
  showSuccess.value = false;
  showError.value = false;

  try {
    const response = await fetch('http://localhost:3000/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value }),
    });

    if (response.ok) {
      showSuccess.value = true;
      email.value = '';

      setTimeout(() => {
        showSuccess.value = false;
      }, 5000);
    } else {
      throw new Error('Subscription failed');
    }
  } catch (error) {
    console.error('Subscription error:', error);
    showError.value = true;

    setTimeout(() => {
      showError.value = false;
    }, 5000);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <!-- Newsletter section with overlapping dog -->
  <div id="soutien" class="scroll-mt-24 relative -top-8 z-20">
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
            Il vous sera même proposé de <strong>faire partie de la version béta</strong>
            en cours de développement
          </p>
        </div>

        <!-- Right: Input + Button + Dog -->
        <div class="flex flex-col items-center md:items-end gap-4 relative w-full md:w-auto z-20">

          <!-- Newsletter Form -->
          <form
              @submit="handleSubmit"
              class="w-full md:w-80 md:mr-52"
          >
            <div class="relative w-full">
              <input
                  v-model="email"
                  type="email"
                  name="email"
                  placeholder="exemple@gmail.com"
                  required
                  :disabled="isSubmitting"
                  class="px-6 py-3 rounded-full bg-monochrome-200 w-full text-center border border-monochrome-500 pr-12 focus:outline-none focus:ring-2 focus:ring-monochrome-500 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="absolute top-1/2 -translate-y-1/2 right-2 p-2 bg-monochrome-900 text-monochrome-100 rounded-full hover:bg-monochrome-400 hover:text-monochrome-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <!-- Loading spinner -->
                <svg v-if="isSubmitting" class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <!-- Arrow icon -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </button>
            </div>

            <!-- Success Message -->
            <transition name="fade">
              <div v-if="showSuccess" class="mt-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm text-center">
                ✓ Votre demande a bien été prise en compte ! Vérifiez votre boîte mail pour valider votre inscription.
              </div>
            </transition>

            <!-- Error Message -->
            <transition name="fade">
              <div v-if="showError" class="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
                ✗ Un problème est survenu, veuillez réessayer.
              </div>
            </transition>
          </form>

          <!-- Questionnaire Button -->
          <a href="https://clementsainthilaire.notion.site/2c3299f1bb4d804db2acdeaaddd997c1?pvs=105"
             target="_blank"
             rel="noopener noreferrer"
             class="px-6 py-2 border-2 border-monochrome-800 text-monochrome-100 bg-monochrome-900 rounded-full text-sm font-medium whitespace-nowrap w-full md:w-80 md:mr-52 hover:bg-monochrome-400 hover:text-monochrome-800 transition-colors text-center block">
            Répondre au questionnaire
          </a>

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

<style scoped>
/* Fade transition for messages */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>