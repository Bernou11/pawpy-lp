<script setup>
import Header from './components/Header.vue'
import Presentation from "./components/Presentation.vue";
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
    </div>
  </main>
</template>
