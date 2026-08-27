<script setup>
import quoteAvatar from '@/assets/figma/quote-avatar.png'
</script>

<template>
  <!--
    Section citation (Frame 38042). Le texte est le Lorem ipsum de la maquette :
    conservé tel quel, en attente du témoignage définitif.
  -->
  <!-- 192px = 128 (écart entre blocs) + 64 (marge haute du bloc). -->
  <section class="shell pt-[192px]">
    <figure class="flex flex-col items-center text-center">
      <blockquote class="max-w-[800px] font-display text-title font-semibold">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor
      </blockquote>

      <figcaption class="mt-[32px] flex items-center gap-[8px]">
        <img :src="quoteAvatar" alt="" class="h-[64px] w-[44px] object-cover" />
        <span class="font-sans text-label text-ink-60">—Steve Travail</span>
      </figcaption>
    </figure>
  </section>
</template>
