<script setup>
import BaseButton from './BaseButton.vue'
import avatar1 from '@/assets/figma/avatar-1.png'
import avatar2 from '@/assets/figma/avatar-2.png'
import avatar3 from '@/assets/figma/avatar-3.png'
import heroPhone from '@/assets/figma/hero-phone.png'
import heroDog from '@/assets/figma/hero-dog.png'
import heroBadges from '@/assets/figma/hero-badges.png'

const avatars = [avatar1, avatar2, avatar3]
</script>

<template>
  <!-- pt : le contenu du hero commence à y=128 dans la maquette, sous l'en-tête de 102px. -->
  <section id="probleme" class="shell pt-[26px]">
    <!-- Bloc de texte centré (Hero Text Container, 1300×380) -->
    <div class="flex flex-col items-center text-center">
      <!-- Bandeau communauté : trois avatars superposés + intitulé -->
      <div class="flex items-center gap-[8px]">
        <div class="flex">
          <img
            v-for="(avatar, index) in avatars"
            :key="index"
            :src="avatar"
            alt=""
            class="h-[32px] w-[32px] rounded-full object-cover"
            :class="index > 0 ? '-ml-[12px]' : ''"
          />
        </div>
        <span class="font-sans text-label text-ink-60">Communautée certifiée</span>
      </div>

      <!-- Les retours à la ligne sont ceux de la maquette : pas de largeur maximale,
           sinon la police de repli, plus large que Coconat, ajoute une troisième ligne. -->
      <h1 class="mt-[32px] text-display uppercase">
        Votre chic à du chien.<br />
        Et si votre chien avait du chic ?
      </h1>

      <p class="mt-[12px] max-w-[682px] text-base text-ink-60">
        Pawpy réunit promeneur certifiés et propriétaires de chiens en région parisienne.
        Confiance, transparence, sécurité, tout est pensé pour le bien être de votre chiens.
      </p>

      <div class="mt-[76px] flex items-center gap-[24px]">
        <BaseButton size="lg" href="#newsletter">Rejoindre la beta</BaseButton>
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
    -->
    <div class="relative mx-auto mt-[64px] h-[800px] w-[1300px] max-w-full">
      <img
        :src="heroPhone"
        alt="L’application Pawpy : promenade en cours, profil du promeneur et formations"
        class="absolute left-[453px] top-0 w-[389px] max-w-none"
      />
      <img
        :src="heroDog"
        alt=""
        class="pointer-events-none absolute left-[845px] top-[116px] w-[265px] max-w-none"
      />
      <img
        :src="heroBadges"
        alt="Niveaux de certification : Pawpy P1, P2, P3 et ACACED"
        class="absolute left-[235px] top-[472px] w-[162px] max-w-none"
      />
    </div>
  </section>
</template>
