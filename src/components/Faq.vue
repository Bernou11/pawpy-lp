<script setup>
import { ref } from 'vue';
import plus from '@/assets/plus.svg';
import minus from '@/assets/minus.svg';

const faqItems = ref([
  {
    question: "Qu'est-ce qu'Anomi",
    answer: "RoadmapHero est une plateforme collaborative conçue pour aider les équipes à créer, gérer et partager leurs feuilles de route produit avec clarté et simplicité. Elle centralise votre backlog, vos priorités et votre progression, facilitant ainsi l’alignement de tous.",
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
  <div class="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
    <div class="relative max-w-4xl mx-auto ml-8 h-40">
      <!-- Top left -->
      <h1 class="absolute top-0 left-0 font-bold text-3xl">
        Vous avez une question ?<br>Nous avons la réponse !
      </h1>

      <!-- Bottom right -->
      <a href="#" class="absolute mt-12 right-0 text-xs text-monochrome-500 hover:underline -mr-2">
        Poser une question
      </a>
    </div>

    <!-- FAQ Accordion Items -->
    <div class="space-y-4 max-w-7xl mx-auto ml-6">
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