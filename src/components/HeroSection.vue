<script setup>
import BaseButton from './BaseButton.vue'
import avatar1 from '@/assets/figma/avatar-1.png'
import avatar2 from '@/assets/figma/avatar-2.png'
import avatar3 from '@/assets/figma/avatar-3.png'
import heroPhone from '@/assets/figma/hero-phone.png'
import heroDog from '@/assets/figma/hero-dog.png'
import badgeP1 from '@/assets/figma/icons/badge-p1.png'
import badgeP2 from '@/assets/figma/icons/badge-p2.png'
import badgeP3 from '@/assets/figma/icons/badge-p3.png'
import badgeAcaced from '@/assets/figma/icons/badge-acaced.png'

const avatars = [avatar1, avatar2, avatar3]

// Pastilles de certification (Figma node 3203:2683) : la vignette figée a été
// remplacée par quatre éléments distincts, seul moyen de les faire apparaître
// l'une après l'autre.
const badges = [
  { label: 'Pawpy\u00a0 P1', icon: badgeP1 },
  { label: 'Pawpy\u00a0 P2', icon: badgeP2 },
  { label: 'Pawpy\u00a0 P3', icon: badgeP3 },
  { label: 'Acaced', icon: badgeAcaced },
]
</script>

<template>
  <!-- pt : le contenu du hero commence à y=128 dans la maquette, sous l'en-tête de 102px. -->
  <section id="probleme" class="shell pt-[26px]">
    <!-- Bloc de texte centré (Hero Text Container, 1300×380) -->
    <div class="flex flex-col items-center text-center">
      <!-- Bandeau communauté : trois avatars superposés + intitulé -->
      <div v-reveal class="flex items-center gap-[8px]">
        <div class="flex">
          <img
            v-for="(avatar, index) in avatars"
            :key="index"
            :src="avatar"
            alt=""
            class="avatar-bob h-[32px] w-[32px] rounded-full object-cover"
            :class="[index > 0 ? '-ml-[12px]' : '', `avatar-bob-${index + 1}`]"
          />
        </div>
        <span class="font-sans text-label text-ink-60">Communautée certifiée</span>
      </div>

      <!-- Les retours à la ligne sont ceux de la maquette : pas de largeur maximale,
           sinon la police de repli, plus large que Coconat, ajoute une troisième ligne. -->
      <h1 v-reveal="100" class="mt-[32px] text-display font-normal uppercase">
        Votre chic à du chien.<br />
        Et si votre chien avait du chic ?
      </h1>

      <p v-reveal="200" class="mt-[12px] max-w-[682px] text-base text-ink-60">
        Pawpy réunit promeneur certifiés et propriétaires de chiens en région parisienne.
        Confiance, transparence, sécurité, tout est pensé pour le bien être de votre chiens.
      </p>

      <!-- inline-grid + colonnes 1fr : les deux boutons prennent la largeur du plus large. -->
      <div v-reveal="300" class="mt-[76px] inline-grid grid-cols-2 items-center gap-[24px]">
        <BaseButton size="lg" href="mailto:contact@pawpy.fr?subject=demande%20de%20beta%20test">Rejoindre la beta</BaseButton>
        <BaseButton
          size="lg"
          variant="outline"
          href="https://clementsainthilaire.notion.site/2c3299f1bb4d804db2acdeaaddd997c1?pvs=105"
        >
          Répondre au formulaire
        </BaseButton>
      </div>
    </div>

    <!--
      Composition du Figma (Frame 3, 1300×800) : mockup au centre, chien au trait
      à droite, pastilles de certification en bas à gauche. Les coordonnées sont
      celles de la maquette, mesurées sur son rendu.

      L'ordre du DOM porte la mise en scène : le chien et les badges sont écrits
      avant le mockup, donc empilés dessous. Ils démarrent leur apparition cachés
      derrière lui (`--reveal-shift`) et en ressortent, le chien vers la droite,
      les badges vers la gauche l'un après l'autre.
    -->
    <div class="relative mx-auto mt-[64px] h-[800px] w-[1300px] max-w-full">
      <img
        v-reveal="{ delay: 560, from: 'left' }"
        style="--reveal-shift: 320px"
        :src="heroDog"
        alt=""
        class="pointer-events-none absolute left-[813px] top-[116px] w-[290px] max-w-none"
      />

      <!-- Position de la maquette (bloc de pastilles à 235;472) corrigée du
           débord que la rotation ajoute autour de chaque pastille. L'espacement
           reconstitue le pas de 58px entre deux pastilles. -->
      <ul class="absolute left-[237px] top-[482px] space-y-[12px]">
        <li
          v-for="(badge, index) in badges"
          :key="badge.label"
          v-reveal="{ delay: 700 + index * 110, from: 'right' }"
          style="--reveal-shift: 260px"
        >
          <!-- La rotation vit sur un enfant : la directive remet `transform` à
               `none` en fin d'apparition et l'effacerait sinon. -->
          <div
            class="inline-flex rotate-[-8deg] items-center gap-[8px] rounded-full bg-surface-muted p-[12px]"
          >
            <img :src="badge.icon" alt="" class="h-[20px] w-[20px] shrink-0" />
            <span class="whitespace-nowrap font-display text-lead uppercase tracking-[-0.36px]">
              {{ badge.label }}
            </span>
          </div>
        </li>
      </ul>

      <img
        v-reveal="{ delay: 400, from: 'scale' }"
        :src="heroPhone"
        alt="L’application Pawpy : promenade en cours, profil du promeneur et formations"
        class="phone-shadow absolute left-[453px] top-0 w-[389px] max-w-none"
      />
    </div>
  </section>
</template>
