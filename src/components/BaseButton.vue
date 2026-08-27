<script setup>
/**
 * Bouton du Figma : rectangle à angles droits, Sora 14px.
 * La paire « noir plein + blanc bordé » revient dix fois dans la page
 * (hero, stats, et les quatre sections features).
 *
 * Les deux tailles reprennent celles de la maquette : 54px de haut avec de
 * larges marges dans le hero, 50px de haut et des marges serrées ailleurs.
 */
defineProps({
  variant: {
    type: String,
    default: 'solid',
    validator: (v) => ['solid', 'outline'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['md', 'lg'].includes(v),
  },
  href: {
    type: String,
    default: null,
  },
})

const isExternal = (href) => Boolean(href) && href.startsWith('http')
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="isExternal(href) ? '_blank' : null"
    :rel="isExternal(href) ? 'noopener noreferrer' : null"
    class="inline-flex items-center justify-center whitespace-nowrap font-body text-label transition-colors"
    :class="[
      size === 'lg' ? 'px-[43px] py-[16px]' : 'px-[14px] py-[14px]',
      variant === 'solid'
        ? 'bg-ink text-surface hover:bg-ink-soft'
        : 'border border-stroke bg-surface text-ink hover:bg-surface-muted',
    ]"
  >
    <slot />
  </component>
</template>
