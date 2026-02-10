<script setup>
import { ref } from 'vue';

const title = ref('');
const content = ref('');
const subject = ref('');
const preheader = ref('');
const isSubmitting = ref(false);
const showSuccess = ref(false);
const showError = ref(false);

const handleSubmit = async (event) => {
  event.preventDefault();

  isSubmitting.value = true;
  showSuccess.value = false;
  showError.value = false;

  try {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/createCampaign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title.value,
        subject: subject.value,
        preheader: preheader.value,
        content: content.value
      }),
    });

    if (response.ok) {
      showSuccess.value = true;
      // Clear form
      title.value = '';
      subject.value = '';
      preheader.value = '';
      content.value = '';

      setTimeout(() => {
        showSuccess.value = false;
      }, 5000);
    } else {
      throw new Error("La campagne n'a pas pu être créée");
    }
  } catch (error) {
    console.error("La campagne n'a pas pu être créée: ", error);
    showError.value = true;

    setTimeout(() => {
      showError.value = false;
    }, 5000);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="w-full max-w-3xl mx-auto p-4">
    <!-- Success Message (positioned at top) -->
    <transition name="fade">
      <div v-if="showSuccess" class="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-800 rounded shadow-sm">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>
    </transition>

    <!-- Error Message -->
    <transition name="fade">
      <div v-if="showError" class="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-800 rounded shadow-sm">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          <span>Un problème est survenu. Veuillez réessayer.</span>
        </div>
      </div>
    </transition>

    <!-- Email Form Card -->
    <div class="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <!-- Form Header -->
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">Nouvelle campagne email</h2>
        <p class="text-sm text-gray-600 mt-1">Créez et envoyez votre campagne marketing</p>
      </div>

      <!-- Form Body -->
      <form @submit="handleSubmit" class="p-6 space-y-4">
        <!-- Campaign Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            Titre de la campagne
          </label>
          <input
              id="title"
              v-model="title"
              type="text"
              name="title"
              placeholder="Ex: Newsletter Février 2024"
              required
              :disabled="isSubmitting"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
          />
        </div>

        <!-- Email Subject -->
        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
            <svg class="inline w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Objet de l'email
          </label>
          <input
              id="subject"
              v-model="subject"
              type="text"
              name="subject"
              placeholder="L'objet qui apparaîtra dans la boîte de réception"
              required
              :disabled="isSubmitting"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
          />
        </div>

        <!-- Preheader -->
        <div>
          <label for="preheader" class="block text-sm font-medium text-gray-700 mb-2">
            Message de prévisualisation
            <span class="text-xs text-gray-500 font-normal ml-1">(optionnel)</span>
          </label>
          <input
              id="preheader"
              v-model="preheader"
              type="text"
              name="preheader"
              placeholder="Texte court affiché après l'objet"
              required
              :disabled="isSubmitting"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
          />
        </div>

        <!-- Email Content -->
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
            Contenu de l'email
          </label>
          <textarea
              id="content"
              v-model="content"
              name="content"
              placeholder="Rédigez le contenu de votre email ici..."
              required
              :disabled="isSubmitting"
              rows="8"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-y transition-all"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2 shadow-sm"
          >
            <span v-if="!isSubmitting">Créer la campagne</span>
            <span v-else>Création en cours...</span>

            <!-- Loading spinner -->
            <svg v-if="isSubmitting" class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>

            <!-- Send icon -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>