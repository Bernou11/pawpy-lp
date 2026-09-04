import { ref } from 'vue'

/**
 * Inscription à la newsletter.
 *
 * Le contrat réseau est celui d'origine (POST {VITE_APP_URL}/subscribe avec un
 * corps { email }) : le backend n'a pas été touché. Cette logique était
 * dupliquée à l'identique dans Soutien.vue et Footer.vue avant la refonte.
 */
export function useNewsletter() {
  const email = ref('')
  const isSubmitting = ref(false)
  const showSuccess = ref(false)
  const showError = ref(false)

  const submit = async (event) => {
    event?.preventDefault()

    isSubmitting.value = true
    showSuccess.value = false
    showError.value = false

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value }),
      })

      if (!response.ok) throw new Error('Subscription failed')

      showSuccess.value = true
      email.value = ''
      setTimeout(() => { showSuccess.value = false }, 5000)
    } catch (error) {
      console.error('Subscription error:', error)
      showError.value = true
      setTimeout(() => { showError.value = false }, 5000)
    } finally {
      isSubmitting.value = false
    }
  }

  return { email, isSubmitting, showSuccess, showError, submit }
}
