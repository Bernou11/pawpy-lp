<script setup>
import logo from '@/assets/figma/logo-pawpy.png'

// Le Figma répète volontairement « Process » : copie littérale de la maquette.
const links = [
  { label: 'Problème', href: '#probleme' },
  { label: 'Solution', href: '#solution' },
  { label: 'Process', href: '#process' },
  { label: 'Process', href: '#process' },
]
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-surface">
    <div class="flex h-[102px] items-center gap-[10px] px-[98px]">
      <a href="#" class="h-[32px] w-[107px] shrink-0">
        <img :src="logo" alt="Pawpy" class="h-full w-full object-contain object-left" />
      </a>

      <nav class="flex flex-1 items-center justify-end gap-[32px]">
        <a
          v-for="(link, index) in links"
          :key="`${link.label}-${index}`"
          :href="link.href"
          class="whitespace-nowrap font-sans text-base leading-[1.2] tracking-[-0.01em] text-ink-soft transition-opacity hover:opacity-60"
        >
          {{ link.label }}
        </a>

        <a
          href="#newsletter"
          class="flex items-center justify-center bg-ink px-[14px] py-[10px] font-body text-label text-surface transition-colors hover:bg-ink-soft"
        >
          S’inscrire
        </a>
      </nav>
    </div>
  </header>
</template>
