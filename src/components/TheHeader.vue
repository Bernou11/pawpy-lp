<script setup>
import logo from '@/assets/figma/logo-pawpy.svg'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Témoignages', href: '#temoignages' },
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
        <a
          v-for="(link, index) in links"
          v-reveal="{ delay: 80 + index * 60, from: 'fade' }"
          :key="link.href"
          :href="link.href"
          class="whitespace-nowrap font-sans text-base leading-[1.2] tracking-[-0.01em] text-ink-soft transition-opacity hover:opacity-60"
        >
          {{ link.label }}
        </a>

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
