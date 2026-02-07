<script setup>
import dogWithHat from '@/assets/dog_hat.svg';

const params = new URLSearchParams(window.location.search);
const email = params.get('email') || '';
</script>

<template>
    <div class="scroll-mt-24 mx-auto max-w-7xl px-4 mt-44 sm:px-6 lg:px-8 py-8 md:py-0">
      <img :src="dogWithHat" alt="Chien avec chapeau" class="w-80 h-80 mx-auto mb-6" />
      <h1 class="text-lg md:text-3xl text-monochrome-900 mb-4 text-center">
        Merci pour votre soutien ! Vous recevrez toutes nos informations sur votre mail : {{email}} !
      </h1>
      <h2 class="text-lg md:text-lg text-monochrome-900 mb-4 text-center">Vous pouvez maintenant fermer cette page</h2>
    </div>
</template>

<style scoped>

</style>