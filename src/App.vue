<script setup>
import Header from './components/Header.vue'
import Presentation from "./components/Presentation.vue";
import AvantApres from "@/components/AvantApres.vue";
import Discover from "@/components/Discover.vue";
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
      <Discover msg="Discover" />
    </div>
  </main>
</template>

<style scoped>
  html, body {
    height: 100vh;
    overflow: hidden;
  }

  html, body {
    min-height: 100vh;
    overflow-y: auto;
  }

  #app {
    min-height: 100vh;
  }
</style>
