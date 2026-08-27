<script setup>
import TheHeader from '@/components/TheHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import QuoteSection from '@/components/QuoteSection.vue'
import StatsSection from '@/components/StatsSection.vue'
import FeatureSection from '@/components/FeatureSection.vue'
import NewsletterCta from '@/components/NewsletterCta.vue'
import FaqSection from '@/components/FaqSection.vue'
import TheFooter from '@/components/TheFooter.vue'
import { features } from '@/data/features'
</script>

<template>
  <TheHeader />

  <main>
    <HeroSection />
    <QuoteSection />
    <StatsSection />

    <FeatureSection
      v-for="feature in features"
      :key="feature.id"
      :eyebrow="feature.eyebrow"
      :title="feature.title"
      :image="feature.image"
      :image-alt="feature.imageAlt"
      :items="feature.items"
      :reversed="feature.reversed"
    />

    <NewsletterCta />
    <FaqSection />
  </main>

  <TheFooter />
</template>
