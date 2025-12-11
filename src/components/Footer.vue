<script setup>
import lechieng from '@/assets/lechiengnumero1.svg';
import lechieng2 from '@/assets/lechiengnumero2.svg';
import lechieng3 from '@/assets/lechiengnumero3.svg';
import lechieng4 from '@/assets/lechiengnumero4.svg';
import lechieng5 from '@/assets/lechiengnumero5.svg';
import lechieng6 from '@/assets/lechiengnumero6.svg';
</script>

<template>
  <div class="w-full">
    <div class="hidden md:block relative mt-8 h-[320px] md:h-[400px] w-full overflow-hidden">
      <!-- Image 1 - Far Left (5% margin) -->
      <img :src="lechieng" alt="Lechieng" class="absolute top-4 left-[5%] w-[25%] h-auto shadow-lg rotate-[-6deg] z-10" />

      <!-- Image 2 -->
      <img :src="lechieng2" alt="Lechieng" class="absolute top-12 left-[19%] w-[25%] h-auto shadow-lg rotate-[4deg] z-20" />

      <!-- Image 3 -->
      <img :src="lechieng3" alt="Lechieng" class="absolute top-8 left-[33%] w-[25%] h-auto shadow-lg rotate-[-3deg] z-30" />

      <!-- Image 4 -->
      <img :src="lechieng4" alt="Lechieng" class="absolute top-14 left-[47%] w-[25%] h-auto shadow-lg rotate-[5deg] z-40" />

      <!-- Image 5 -->
      <img :src="lechieng5" alt="Lechieng" class="absolute top-6 left-[61%] w-[25%] h-auto shadow-lg rotate-[-4deg] z-50" />

      <!-- Image 6 - Far Right -->
      <img :src="lechieng6" alt="Lechieng" class="absolute top-14 left-[75%] w-[25%] h-auto shadow-lg rotate-[3deg] z-50" />
    </div>

    <div class="max-w-7xl mx-auto px-6 pt-12 pb-8">
      <!-- Title -->
      <h2 class="text-3xl md:text-5xl font-bold text-left md:text-center text-monochrome-900 mb-16">
        Transformez vos roadmaps<br />en succès !
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
          <h3 class="text-monochrome-900 font-bold mb-2">Pied de page</h3>
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
          <a href="#" class="text-monochrome-500 hover:text-monochrome-900">Linkedin</a>
          <a href="#" class="text-monochrome-500 hover:text-monochrome-900">Instagram</a>
          <a href="#" class="text-monochrome-500 hover:text-monochrome-900">X</a>
          <a href="#" class="text-monochrome-500 hover:text-monochrome-900">Youtube</a>
        </div>

        <!-- Newsletter -->
        <div class="flex flex-col gap-4">
          <h3 class="text-monochrome-900 font-bold mb-2">Newsletter</h3>
          <div class="relative">
            <input 
              type="email" 
              placeholder="Votre email" 
              class="w-full px-4 py-2 rounded-full border border-monochrome-200 focus:outline-none focus:border-monochrome-500"
            />
            <button class="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-monochrome-900 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
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