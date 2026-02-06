<script setup>
import Header from '../components/Header.vue'
import Presentation from "../components/Presentation.vue";
import AvantApres from "@/components/AvantApres.vue";
import Discover from "@/components/Discover.vue";
import Avis from "@/components/Avis.vue";
import Soutien from "@/components/Soutien.vue";
import Faq from "@/components/Faq.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <header msg="Header">
    <div class="wrapper">
      <Header msg="Header" />
    </div>
  </header>

  <main>
    <div class="content pt-16">
      <Presentation msg="Presentation" />
      <AvantApres msg="AvantApres" />
      <Discover msg="Discover" />
      <Avis msg="Avis" />
      <Soutien msg="Soutien" />
      <Faq msg="Faq" />
    </div>
  </main>

  <footer>
    <div class="wrapper">
      <Footer msg="Footer" />
    </div>
  </footer>
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
