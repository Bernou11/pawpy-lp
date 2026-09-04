<script setup>
import { RouterView } from 'vue-router'
import TheCursor from './components/TheCursor.vue'
import ManifestOverlay from './components/ManifestOverlay.vue'
import TeamOverlay from './components/TeamOverlay.vue'
</script>

<template>
  <RouterView />

  <!-- Modales de page (/manifest, /auto-mode-setup) : posées par-dessus
       l'accueil, hors du RouterView. -->
  <ManifestOverlay />
  <TeamOverlay />

  <!-- Curseur « patte » : hors du RouterView pour survivre aux changements de page. -->
  <TheCursor />
</template>