<script setup>
import { RouterView } from 'vue-router'
import TheCursor from './components/TheCursor.vue'
</script>

<template>
  <RouterView />

  <!-- Curseur « patte » : hors du RouterView pour survivre aux changements de page. -->
  <TheCursor />
</template>