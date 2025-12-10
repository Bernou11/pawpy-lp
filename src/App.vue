<script setup>
import Header from './components/Header.vue'
import Presentation from "./components/Presentation.vue";
import AvantApres from "@/components/AvantApres.vue";
</script>

<template>
  <header msg="Header">
    <div class="wrapper">
      <Header msg="Header" />
    </div>
  </header>

  <main>
    <div class="content">
      <Presentation msg="Presentation" />
      <AvantApres msg="AvantApres" />
    </div>
  </main>
</template>

<style scoped>
  html, body {
    height: 100vh;
    overflow: hidden;
  }

  /* ✅ GOOD - Allows scrolling */
  html, body {
    min-height: 100vh;
    overflow-y: auto; /* or just remove overflow property */
  }

  #app {
    min-height: 100vh;
    /* NOT height: 100vh */
  }
</style>
