<script setup>
import { RouterLink } from 'vue-router'
import logo from '@/assets/figma/logo-pawpy.svg'

// `to` désigne une vraie page (l'équipe, le manifeste), `href` une ancre dans
// l'accueil : le gabarit ci-dessous choisit la balise en conséquence, et lie
// l'un ou l'autre par un `v-bind` conditionnel — `:href="undefined"` posé à
// côté de `:to` remonterait jusqu'à la racine du RouterLink et effacerait l'URL
// qu'il calcule, laissant un <a> sans href (ni clic milieu, ni nouvel onglet).
//
// Les deux liaisons s'excluent (`v-bind` conditionnel) : un `:href` posé de
// l'extérieur, même valant `undefined`, écraserait celui que RouterLink calcule
// — le lien perdrait son URL (clic milieu, « ouvrir dans un onglet »…).
const links = [
  { label: 'Features', href: '#features' },
  { label: 'Équipe', to: '/auto-mode-setup' },
  { label: 'Manifest', to: '/manifest' },
  { label: 'FAQ', href: '#faq' },
]
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-surface">
    <div class="flex h-[102px] items-center gap-[10px] px-[98px]">
      <a v-reveal.fade href="#" class="h-[24px] w-[110px] shrink-0">
        <img :src="logo" alt="Pawpy" class="h-full w-full object-contain object-left" />
      </a>

      <nav class="flex flex-1 items-center justify-end gap-[32px]">
        <component
          :is="link.to ? RouterLink : 'a'"
          v-for="(link, index) in links"
          v-reveal="{ delay: 80 + index * 60, from: 'fade' }"
          :key="link.label"
          v-bind="link.to ? { to: link.to } : { href: link.href }"
          class="whitespace-nowrap font-sans text-base leading-[1.2] tracking-[-0.01em] text-ink-soft transition-opacity hover:opacity-60"
        >
          {{ link.label }}
        </component>

        <a
          v-reveal="{ delay: 320, from: 'fade' }"
          href="#newsletter"
          class="flex items-center justify-center bg-ink px-[14px] py-[10px] font-body text-label text-surface transition-colors hover:bg-ink-soft"
        >
          S’inscrire
        </a>
      </nav>
    </div>
  </header>
</template>
