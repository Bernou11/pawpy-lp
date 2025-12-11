<script setup>
import { ref } from 'vue';
import plus from '@/assets/plus.svg';
import minus from '@/assets/minus.svg';

const faqItems = ref([
  {
    question: "Qu'est-ce qu'Anomi?",
    answer: "Anomi est une application qui met en relation les propriétaires de chiens avec des promeneurs certifiés et qualifiés, spécialisés dans le bien-être animal. Notre priorité est de garantir des sorties sécurisées, adaptées aus spécificités de chaque chien.",
    isOpen: false
  },
  {
    question: "Quelles infos fournir sur mon animal ?",
    answer: "Pour utiliser Anomi, il suffit de...",
    isOpen: false
  },
  {
    question: "Puis‑je rencontrer le sitter avant ?",
    answer: "Les principaux avantages sont...",
    isOpen: false
  },
  {
    question: "Comment sont fixés les prix ?",
    answer: "Oui, Anomi propose une version gratuite avec...",
    isOpen: false
  },
  {
    question: "Puis‑je refuser une mission ?",
    answer: "Vous pouvez nous contacter via...",
    isOpen: false
  }
]);

const toggleItem = (index) => {
  faqItems.value[index].isOpen = !faqItems.value[index].isOpen;
};
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
    <div class="relative max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12">
      <!-- Title -->
      <h1 class="font-bold text-2xl md:text-3xl mb-4 md:mb-0">
        Vous avez une question ?<br>Nous avons la réponse !
      </h1>

      <!-- Link -->
      <a href="#" class="text-sm md:text-xs text-monochrome-500 hover:underline">
        Poser une question
      </a>
    </div>

    <!-- FAQ Accordion Items -->
    <div class="space-y-4 max-w-7xl mx-auto md:ml-6">
      <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="relative"
      >
        <!-- Question Header -->
        <div
            class="flex flex-row relative h-8 bg-monochrome-200 cursor-pointer hover:bg-monochrome-300 transition-colors rounded"
            @click="toggleItem(index)"
        >
          <h2 class="font-bold text-base mt-1 ml-4">{{ item.question }}</h2>
          <button
              class="absolute mt-2 right-0 mr-2 transition-opacity duration-200"
          >
            <img
                :src="item.isOpen ? minus : plus"
                :alt="item.isOpen ? 'minus' : 'plus'"
                class="w-4 h-4"
            />
          </button>
        </div>

        <!-- Answer Content (Expandable) -->
        <div
            class="overflow-hidden transition-all duration-300 ease-in-out bg-monochrome-200"
            :style="{ maxHeight: item.isOpen ? '500px' : '0' }"
        >
          <div class="p-4 text-sm text-gray-700">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>