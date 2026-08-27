<script setup>
import { useNewsletter } from '@/composables/useNewsletter'
import ctaPaw from '@/assets/figma/cta-paw.png'
import iconSend from '@/assets/figma/icons/send.png'

const { email, isSubmitting, showSuccess, showError, submit } = useNewsletter()
</script>

<template>
  <!-- 158px : le bloc gris porte lui-même 94px de marge haute (voir py ci-dessous). -->
  <section id="newsletter" class="shell pt-[158px]">
    <div class="relative flex min-h-[418px] items-center overflow-hidden bg-surface-muted px-[128px] py-[94px]">
      <div class="relative z-10 max-w-[490px]">
        <h2 class="text-title">Offrez la première classe à votre chien.</h2>

        <p class="mt-[16px] font-sans text-label text-ink-60">
          Pawpy se déploie progressivement pour garantir à chaque membre une
          expérience attentive et de qualité. Si vous souhaitez faire partie des
          premiers à nous rejoindre, vous pouvez vous inscrire à la newsletter.
        </p>

        <form class="mt-[32px]" @submit="submit">
          <div class="flex items-center gap-[12px]">
            <input
              v-model="email"
              type="email"
              name="email"
              placeholder="exemple@email.com"
              required
              :disabled="isSubmitting"
              class="h-[49px] w-[209px] border border-stroke bg-surface px-[16px] font-sans text-label text-ink placeholder:text-ink-40 focus:outline-none focus:ring-1 focus:ring-ink disabled:opacity-50"
            />

            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex h-[49px] w-[49px] shrink-0 items-center justify-center bg-ink transition-colors hover:bg-ink-soft disabled:opacity-50"
              aria-label="S’inscrire à la newsletter"
            >
              <svg
                v-if="isSubmitting"
                class="h-[20px] w-[20px] animate-spin text-surface"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span v-else class="flex h-[24px] w-[24px] items-center justify-center overflow-clip">
                <img :src="iconSend" alt="" class="h-full w-full object-contain" />
              </span>
            </button>
          </div>

          <transition name="fade">
            <p v-if="showSuccess" class="mt-[12px] font-sans text-label text-ink">
              Votre demande a bien été prise en compte. Vérifiez votre boîte mail
              pour valider votre inscription.
            </p>
          </transition>

          <transition name="fade">
            <p v-if="showError" class="mt-[12px] font-sans text-label text-ink">
              Un problème est survenu, veuillez réessayer.
            </p>
          </transition>
        </form>
      </div>

      <!-- Illustration au trait. L'export reprend déjà le recadrage du Figma
           (374×418, l'image d'origine débordant du bloc) : à poser tel quel. -->
      <img
        :src="ctaPaw"
        alt=""
        class="pointer-events-none absolute left-[823px] top-0 w-[374px] max-w-none"
      />
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
