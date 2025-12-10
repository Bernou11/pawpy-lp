<script setup>
  import dogWithHat from '@/assets/dog_hat.svg';
</script>

<template>
  <!-- Newsletter section with overlapping dog -->
  <div class="relative -top-8 z-20">
    <div class="max-w-6xl mx-auto px-8 py-16">
      <div class="bg-monochrome-400 rounded-lg p-12 flex items-start justify-between gap-12">
        <!-- Left: Newsletter content -->
        <div class="flex-1 ml-5">
          <h2 class="text-3xl font-bold mb-4">Soutenez-nous !</h2>

          <p class="mb-6">
            En vous abonnant à notre newsletter,<br>
            vous serez <strong>tenu au courant des avancées</strong>.
          </p>

          <p class="text-sm text-gray-600">
            Il vous sera même proposz de <strong>faire partie de la version béta</strong>
            en cours de développement
          </p>
        </div>

        <!-- Right: Input + Button + Dog -->
        <div class="flex flex-col items-end gap-4 relative">

          <!-- Email input -->
          <input
              type="email"
              placeholder="exemple@gmail.com"
              class="px-6 py-3 rounded-full bg-monochrome-200 text-white w-80 mr-52 text-center border border-monochrome-500 mt-5"
          />

          <!-- Button below input -->
          <button class="px-6 py-2 bg-monochrome-900 text-monochrome-100 rounded-full text-sm whitespace-nowrap mr-80 hover:bg-monochrome-400 hover:text-monochrome-900">
            S'abonner
          </button>

          <!-- Dog image overlapping from top -->
          <img :src="dogWithHat"
               alt="Dog with yellow hat"
               class="absolute -top-[165px] -right-8 w-60 h-96" />
        </div>
      </div>
    </div>
  </div>
</template>