<script setup>
import BaseButton from './BaseButton.vue'

const stats = [
  { value: '102', label: 'Bêta testeurs' },
  { value: '04', label: 'niveaux de certifications' },
  { value: '205', label: 'abonnés à la newsletter' },
  { value: '05', label: 'fondateurs passionnés' },
]
</script>

<template>
  <!-- 256px = 64 (marge basse de la citation) + 128 (écart entre blocs) + 64 (marge haute). -->
  <section id="solution" class="shell pt-[256px]">
    <div class="flex flex-col items-center text-center">
      <!-- Pastille « Live » (Frame 38097) -->
      <span
        class="inline-flex items-center gap-[4px] rounded-full bg-surface-muted px-[12px] py-[7px] font-sans text-label text-ink-60"
      >
        <span class="h-[6px] w-[6px] rounded-full bg-ink" aria-hidden="true"></span>
        Live
      </span>

      <!-- Le surlignage rose reprend brand/accent-500 (deux rectangles dans la maquette). -->
      <h2 class="mt-[24px] max-w-[538px] text-title">
        Pas juste <span class="bg-accent">bien noté.</span>
        Vraiment <span class="bg-accent">certifié.</span>
      </h2>

      <!-- Chiffres séparés par des filets verticaux (Frame 38102) -->
      <dl class="mt-[56px] flex w-full items-start justify-center">
        <template v-for="(stat, index) in stats" :key="stat.label">
          <div
            v-if="index > 0"
            class="mx-[32px] mt-[40px] h-[64px] w-px shrink-0 bg-stroke"
            aria-hidden="true"
          ></div>
          <div class="flex flex-col items-center">
            <dd class="font-display text-numeral font-semibold">{{ stat.value }}</dd>
            <dt class="mt-[8px] whitespace-nowrap font-sans text-base text-ink-60">
              {{ stat.label }}
            </dt>
          </div>
        </template>
      </dl>

      <div class="mt-[88px] flex items-center gap-[24px]">
        <BaseButton size="lg" href="#newsletter">Devenir bêta testeur</BaseButton>
        <BaseButton size="lg" variant="outline" href="#newsletter">
          S’abonner à la newsletter
        </BaseButton>
      </div>
    </div>
  </section>
</template>
