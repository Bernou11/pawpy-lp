<script setup>
import { ref } from 'vue'
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
import logo from '@/assets/logo.svg'

const isMobileMenuOpen = ref(false)
</script>

<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button 
            type="button" 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-monochrome-500"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg v-else class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <img :src="logo" alt="Pawpy" class="h-8 w-auto" />
          </div>
          <div class="hidden sm:ml-auto sm:block">
            <div class="flex space-x-4">
              <a href="#presentation" class="rounded-md px-3 py-2 text-sm font-medium text-monochrome-800 hover:bg-monochrome-400 hover:text-monochrome-800">Présentation</a>
              <a href="#avant-apres" class="rounded-md px-3 py-2 text-sm font-medium text-monochrome-800 hover:bg-monochrome-400 hover:text-monochrome-800">Avant/Après</a>
              <a href="#application" class="rounded-md px-3 py-2 text-sm font-medium text-monochrome-800 hover:bg-monochrome-400 hover:text-monochrome-800">Notre application</a>
              <a href="#avis" class="rounded-md px-3 py-2 text-sm font-medium text-monochrome-800 hover:bg-monochrome-400 hover:text-monochrome-800">Avis</a>
              <a href="#soutien" class="rounded-md px-3 py-2 text-sm font-medium text-monochrome-800 hover:bg-monochrome-400 hover:text-monochrome-800">Nous soutenir</a>
              <a href="#faq" class="rounded-md px-3 py-2 text-sm font-medium text-monochrome-800 hover:bg-monochrome-400 hover:text-monochrome-800">FAQ</a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button class="hidden sm:block relative flex rounded-full justify-center items-center gap-2.5 px-4 py-2 bg-monochrome-900 text-monochrome-100 hover:text-monochrome-800 hover:bg-monochrome-400 text-sm font-medium">
            Suivez le mouvement !
          </button>
          <!-- Mobile CTA (Icon only or smaller) -->
          <button class="sm:hidden block p-2 bg-monochrome-900 text-monochrome-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu backdrop -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-black/5 z-40 sm:hidden"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Mobile menu -->
    <div v-show="isMobileMenuOpen" class="sm:hidden absolute top-16 left-0 w-full bg-white shadow-lg border-t border-gray-100 z-50">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <a href="#presentation" class="block rounded-md px-3 py-2 text-base font-medium text-monochrome-800 hover:bg-monochrome-100" @click="isMobileMenuOpen = false">Présentation</a>
        <a href="#avant-apres" class="block rounded-md px-3 py-2 text-base font-medium text-monochrome-800 hover:bg-monochrome-100" @click="isMobileMenuOpen = false">Avant/Après</a>
        <a href="#application" class="block rounded-md px-3 py-2 text-base font-medium text-monochrome-800 hover:bg-monochrome-100" @click="isMobileMenuOpen = false">Notre application</a>
        <a href="#avis" class="block rounded-md px-3 py-2 text-base font-medium text-monochrome-800 hover:bg-monochrome-100" @click="isMobileMenuOpen = false">Avis</a>
        <a href="#soutien" class="block rounded-md px-3 py-2 text-base font-medium text-monochrome-800 hover:bg-monochrome-100" @click="isMobileMenuOpen = false">Nous soutenir</a>
        <a href="#faq" class="block rounded-md px-3 py-2 text-base font-medium text-monochrome-800 hover:bg-monochrome-100" @click="isMobileMenuOpen = false">FAQ</a>
        <a href="#" class="block rounded-md bg-monochrome-900 px-3 py-2 text-base font-medium text-white text-center mt-4">
          Suivez le mouvement !
        </a>
      </div>
    </div>
  </nav>
</template>
