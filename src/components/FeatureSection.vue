<script setup>
import BaseButton from './BaseButton.vue'

/**
 * Section « texte + image » du Figma (deux colonnes de 618px, gouttière de 64px).
 * Les quatre occurrences de la page partagent ce composant ; `reversed` place
 * l'image à gauche.
 */
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, default: '' },
  items: { type: Array, required: true },
  reversed: { type: Boolean, default: false },
})
</script>

<template>
  <!-- 320px = 64 (marge basse du bloc précédent) + 128 (écart) + 128 (retrait haut du texte). -->
  <section class="shell pt-[320px]">
    <div class="flex items-center gap-[64px]">
      <!-- Colonne texte -->
      <div class="flex-1" :class="reversed ? 'order-2' : 'order-1'">
        <p class="eyebrow">{{ eyebrow }}</p>

        <h2 class="mt-[16px] text-title">{{ title }}</h2>

        <ul class="mt-[16px] flex flex-col gap-[16px]">
          <li
            v-for="item in items"
            :key="item.label"
            class="flex items-center gap-[8px]"
          >
            <span class="flex h-[24px] w-[24px] shrink-0 items-center justify-center overflow-clip">
              <img :src="item.icon" alt="" class="h-full w-full object-contain" />
            </span>
            <span class="font-sans text-base text-ink-60">{{ item.label }}</span>
          </li>
        </ul>

        <div class="mt-[64px] flex items-center gap-[24px]">
          <BaseButton href="#newsletter">Rejoindre la beta</BaseButton>
          <BaseButton variant="outline" href="#newsletter">Suivre le projet</BaseButton>
        </div>
      </div>

      <!-- Colonne image (618×618 dans la maquette) -->
      <div class="flex-1" :class="reversed ? 'order-1' : 'order-2'">
        <img
          :src="image"
          :alt="imageAlt"
          class="aspect-square w-full object-cover"
        />
      </div>
    </div>
  </section>
</template>
