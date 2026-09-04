<script setup>
import FooterDog from './FooterDog.vue'

const links = [
  { label: 'Demander une démo', href: 'mailto:contact@pawpy.fr' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Formulaire', href: 'https://clementsainthilaire.notion.site/2c3299f1bb4d804db2acdeaaddd997c1?pvs=105' },
  { label: 'Devenir bêta testeur', href: '#newsletter' },
]

const isExternal = (href) => href.startsWith('http')
</script>

<template>
  <footer class="w-full pt-[256px]">
    <div class="shell">
      <!--
        Les quatre liens et l'illustration se répartissent sur une seule ligne.
        Un simple justify-between reproduit les positions de la maquette
        (0 / 299 / centre / 911 / 1125 sur 1300px).
      -->
      <div class="flex h-[398px] items-center justify-between">
        <a
          v-for="(link, index) in links.slice(0, 2)"
          v-reveal="index * 80"
          :key="link.label"
          :href="link.href"
          :target="isExternal(link.href) ? '_blank' : null"
          :rel="isExternal(link.href) ? 'noopener noreferrer' : null"
          class="whitespace-nowrap font-sans text-base text-ink-60 transition-colors hover:text-ink"
        >
          {{ link.label }}
        </a>

        <!-- Le chien se dessine trait par trait à l'entrée dans l'écran. -->
        <FooterDog />

        <a
          v-for="(link, index) in links.slice(2)"
          v-reveal="240 + index * 80"
          :key="link.label"
          :href="link.href"
          :target="isExternal(link.href) ? '_blank' : null"
          :rel="isExternal(link.href) ? 'noopener noreferrer' : null"
          class="whitespace-nowrap font-sans text-base text-ink-60 transition-colors hover:text-ink"
        >
          {{ link.label }}
        </a>
      </div>

      <p v-reveal="400" class="mt-[4px] text-center font-display text-[22px] font-semibold">
        Offrez la première classe à votre chien.
      </p>
    </div>

    <!-- Bandeau de crédits, aligné sur les bords de la page (50px de marge). -->
    <div
      v-reveal.fade
      class="mx-auto flex max-w-[1400px] items-center justify-between px-[50px] pb-[32px] pt-[128px]"
    >
      <p class="font-sans text-caption text-ink-40">© 2026 Pawpy. Tous droits réservés</p>
      <a href="#" class="font-sans text-caption text-ink-40 transition-colors hover:text-ink">Légal</a>
    </div>
  </footer>
</template>
