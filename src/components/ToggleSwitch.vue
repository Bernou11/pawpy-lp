<template>
  <div class="space-y-4">
    <div v-for="item in features" :key="item.id" class="flex items-center justify-center gap-6">
      <!-- Left text - grayed out when enabled -->
      <span
          class="font-medium text-right w-80 transition-colors whitespace-nowrap"
          :class="item.enabled ? 'text-monochrome-400' : 'text-monochrome-900'"
      >
        {{ item.before }}
      </span>

      <label class="toggle-switch flex-shrink-0">
        <input type="checkbox" v-model="item.enabled">
        <span class="toggle-slider"></span>
      </label>

      <!-- Right text - highlighted when enabled -->
      <span
          class="text-left w-80 transition-colors whitespace-nowrap"
          :class="item.enabled ? 'text-monochrome-900 font-semibold' : 'text-monochrome-400'"
      >
        {{ item.after }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const features = ref([
  { id: 1, before: 'Chien en fuite', after: 'Suivi GPS', enabled: false },
  { id: 2, before: 'Balades de 10 minutes', after: 'Promenade complète d\'1h', enabled: false },
  { id: 3, before: 'Recrutement complexe', after: 'Suggestion de profils personnalisée', enabled: false },
  { id: 4, before: 'Promeneurs non-expérimentés', after: 'Promeneurs certifiés', enabled: false },
  { id: 5, before: 'Balades répétitives', after: 'Cartographie des zones de balades', enabled: false },
  { id: 6, before: 'Chien en manque de stimulation', after: 'Accompagnement personnalisé', enabled: false },
  { id: 7, before: 'Communication complexe', after: 'Messagerie sécurisée', enabled: false },
  { id: 8, before: 'Paiement incertain', after: 'Paiement transparent & sécurisé', enabled: false },
  { id: 9, before: 'Chiens incompris', after: 'Profils complets personnalisé', enabled: false },
])
</script>

<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ef4444;
  transition: 0.3s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #34C759;
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}
</style>