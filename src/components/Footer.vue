<script setup>
import lechieng from '@/assets/lechiengnumero1.svg';
import lechieng2 from '@/assets/lechiengnumero2.svg';
import lechieng3 from '@/assets/lechiengnumero3.svg';
import lechieng4 from '@/assets/lechiengnumero4.svg';
import lechieng5 from '@/assets/lechiengnumero5.svg';
import lechieng6 from '@/assets/lechiengnumero6.svg';
import {ref} from "vue";

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
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/subscribe`, {
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
  <div class="w-full mt-[128px]">
    <div class="hidden md:block relative mt-8 h-[320px] md:h-[400px] w-full overflow-hidden">
      <!-- Image 1 - Far Left (5% margin) -->
      <img :src="lechieng" alt="Lechieng" class="les-chiengs absolute top-20 left-[5%] w-[25%] h-auto rotate-[-6deg] z-10" />

      <!-- Image 2 -->
      <img :src="lechieng2" alt="Lechieng" class="les-chiengs absolute top-20 left-[19%] w-[25%] h-auto rotate-[4deg] z-20" />

      <!-- Image 3 -->
      <img :src="lechieng3" alt="Lechieng" class="les-chiengs absolute top-20 left-[33%] w-[25%] h-auto rotate-[-3deg] z-30" />

      <!-- Image 4 -->
      <img :src="lechieng4" alt="Lechieng" class="les-chiengs absolute top-20 left-[47%] w-[25%] h-auto rotate-[5deg] z-40" />

      <!-- Image 5 -->
      <img :src="lechieng5" alt="Lechieng" class="les-chiengs absolute top-20 left-[61%] w-[25%] h-auto rotate-[-4deg] z-50" />

      <!-- Image 6 - Far Right -->
      <img :src="lechieng6" alt="Lechieng" class="les-chiengs absolute top-20 left-[75%] w-[25%] h-auto rotate-[3deg] z-50" />
    </div>

    <div class="max-w-7xl mx-auto px-6 pt-12 pb-8">
      <!-- Title -->
      <h2 class="text-3xl md:text-5xl font-bold text-left md:text-monochrome-900 mb-16">
        La balade sans compromis.
      </h2>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        <!-- Navigation -->
        <div class="flex flex-col gap-4">
          <h3 class="text-monochrome-900 font-bold mb-2">Navigation</h3>
          <a href="#" class="text-monochrome-500 hover:text-monochrome-900">Solution</a>
          <a href="#" class="text-monochrome-500 hover:text-monochrome-900">Future</a>
          <a href="#" class="text-monochrome-500 hover:text-monochrome-900">Tarifs</a>
        </div>

        <!-- Legal -->
        <div class="flex flex-col gap-4">
          <h3 class="text-monochrome-900 font-bold mb-2">Légal</h3>
          <a href="#" class="text-monochrome-500 hover:text-monochrome-900">Mentions légales</a>
          <a href="#" class="text-monochrome-500 hover:text-monochrome-900">Politique de confidentialité</a>
          <a href="#" class="text-monochrome-500 hover:text-monochrome-900">C.G.U</a>
          <a href="#" class="text-monochrome-500 hover:text-monochrome-900">C.G.V</a>
          <a href="#" class="text-monochrome-500 hover:text-monochrome-900">Cookies</a>
        </div>

        <!-- Contact -->
        <div class="flex flex-col gap-4">
          <h3 class="text-monochrome-900 font-bold mb-2">Contact</h3>
          <a href="mailto:contact@Pawpy.fr" class="text-monochrome-500 hover:text-monochrome-900">Mail</a>
          <a href="#" class="hidden text-monochrome-500 hover:text-monochrome-900">Linkedin</a>
          <a href="#" class="hidden text-monochrome-500 hover:text-monochrome-900">Instagram</a>
          <a href="#" class="hidden text-monochrome-500 hover:text-monochrome-900">X</a>
          <a href="#" class="hidden text-monochrome-500 hover:text-monochrome-900">Youtube</a>
        </div>

        <!-- Newsletter -->
        <div class="flex flex-col gap-4">
          <h3 class="text-monochrome-900 font-bold mb-2">Newsletter</h3>
          <div class="relative">
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
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="flex flex-col md:flex-row justify-between items-center text-xs text-monochrome-400 border-t border-monochrome-200 pt-8">
        <p>© 2024 - Pawpy inc. All rights reserved.</p>
        <div class="flex gap-4 mt-4 md:mt-0">
          <a href="#" class="hover:text-monochrome-500">Termes & Conditions</a>
          <a href="#" class="hover:text-monochrome-500">Politique de confidentialité</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.les-chiengs {
  transform: translateY(70px);
  transition: transform 0.5s ease;
}
.les-chiengs:hover {
  transform: translateY(-70px);
  transition: transform 0.5s ease;
}
</style>