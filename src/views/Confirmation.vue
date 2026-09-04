<script setup>
import {onMounted, ref} from "vue";

const params = new URLSearchParams(window.location.search);
const email = params.get('email') || '';
const token = params.get('token') || '';
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  if (!token) {
    error.value = 'Invalid confirmation link';
    loading.value = false;
    return;
  }

  try {
    // Call backend with token for validation
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/confirm?token=${token}`);

    if (!response.ok) {
      const text = await response.text();
      error.value = text || 'Confirmation failed';
    }
  } catch (err) {
    error.value = 'Network error';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="scroll-mt-24 mx-auto max-w-7xl px-4 mt-44 sm:px-6 lg:px-8 py-8 md:py-0">
    <div v-if="loading">
      Confirmation en cours...
    </div>
    <div v-else-if="error" class="text-red-600">
      {{ error }}
    </div>
    <div v-else class="text-center">
      <h1 class="text-lg md:text-3xl text-monochrome-900 mb-4 text-center">
        Merci pour votre soutien ! Vous recevrez toutes nos informations sur votre mail : {{email}} !
      </h1>
      <h2 class="text-lg md:text-lg text-monochrome-900 mb-4 text-center">Vous pouvez maintenant fermer cette page</h2>
    </div>
  </div>
</template>