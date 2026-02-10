<script setup>
import { onMounted, ref } from 'vue';
import sadDog from '@/assets/sad_dog.png';

const params = new URLSearchParams(window.location.search);
const email = params.get('email') || '';
const loading = ref(true);
const success = ref(false);
const error = ref('');

onMounted(async () => {
  if (!email) {
    error.value = 'Lien de désinscription invalide';
    loading.value = false;
    return;
  }

  try {
    const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}`,
        { method: 'POST' }
    );

    if (response.ok) {
      success.value = true;
    } else {
      error.value = 'Échec de la désinscription';
    }
  } catch (err) {
    console.error('Unsubscribe error:', err);
    error.value = 'Erreur réseau';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="scroll-mt-24 mx-auto max-w-7xl px-4 mt-44 sm:px-6 lg:px-8 py-8 md:py-0">
    <div v-if="loading" class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
      <p class="text-lg text-monochrome-900">Désinscription en cours...</p>
    </div>

    <div v-else-if="error" class="text-center">
      <div class="text-red-600 text-xl mb-4">❌</div>
      <h1 class="text-lg md:text-2xl text-red-600 mb-4">{{ error }}</h1>
    </div>

    <div v-else-if="success" class="text-center">
      <img :src="sadDog" alt="Chien triste" class="w-80 h-80 mx-auto mb-6" />
      <h1 class="text-lg md:text-3xl text-monochrome-900 mb-4">
        Nous sommes désolés de vous voir partir &#128546 Nous espérons que vous reviendrez bientôt !
      </h1>
      <p class="text-lg text-gray-600 mb-4">
        Vous ne recevrez plus nos emails sur votre mail : {{ email }}
      </p>
      <h2 class="text-lg text-monochrome-900">Vous pouvez maintenant fermer cette page</h2>
    </div>
  </div>
</template>