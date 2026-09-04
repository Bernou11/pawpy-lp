<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import pawCursor from '@/assets/figma/mouse.svg'

/**
 * Curseur « patte » — remplace le pointeur système sur tout le site.
 *
 * Un calque suit le pointeur (mouse.svg du Figma) pendant que le curseur natif
 * est masqué par `cursor: none` (voir main.css). Le calque est préféré à
 * `cursor: url(mouse.svg)` pour deux raisons :
 *   • Safari n'accepte pas les SVG comme curseur CSS ;
 *   • le grossissement au survol s'anime, ce qu'un curseur CSS ne permet pas
 *     (il aurait fallu deux fichiers et un saut sec).
 *
 * Le positionnement est écrit à la main dans un rAF (`transform` sur le
 * conteneur, sans transition : le curseur doit coller au pointeur) ; le
 * grossissement vit sur l'image intérieure, qui elle est animée. Sans ces deux
 * niveaux, la transition du `scale` freinerait aussi le déplacement.
 */

// Largeur d'affichage de la patte, en px. mouse.svg est exporté en 55×57 :
// à sa taille naturelle il écrase le curseur système, on le réduit donc ici.
// C'est la seule valeur à retoucher pour changer la taille au repos ; le
// survol (×1,5) et le clic (×0,75) restent relatifs à celle-ci.
const WIDTH = 32

// Rapport entre l'affichage et le fichier d'origine, pour convertir les
// coordonnées lues dans le SVG.
const RATIO = WIDTH / 55

// Point de l'image qui remplace la pointe de la flèche système : le coussinet
// haut-gauche de la patte (16, 8 dans le repère du SVG). Il sert d'origine au
// `scale` (voir main.css) pour que le curseur grossisse sans que ce point ne
// bouge.
const HOTSPOT_X = 16 * RATIO
const HOTSPOT_Y = 8 * RATIO

// Zones « cliquables » : le curseur y grossit de moitié. `.cursor-pointer`
// couvre les éléments rendus interactifs en JS sans balise dédiée.
const CLICKABLE = [
  'a[href]',
  'button',
  'summary',
  'select',
  'label[for]',
  '[role="button"]',
  '[role="tab"]',
  'input[type="button"]',
  'input[type="submit"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
  '.cursor-pointer',
].join(',')

// Champs de saisie : on y rend la main au curseur natif (barre de texte), la
// patte masquerait le point d'insertion.
const TEXT_FIELD = [
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"])',
  'textarea',
  '[contenteditable="true"]',
].join(',')

const media = '(hover: hover) and (pointer: fine)'

const root = ref(null)
// Souris (ou trackpad) uniquement : au doigt il n'y a pas de pointeur à suivre.
const enabled = ref(false)
const visible = ref(false)
const active = ref(false)
const pressed = ref(false)
// Zones qui gardent le curseur système : champs de saisie et iframes (le
// formulaire beehiiv, dont on ne reçoit aucun événement).
const native = ref(false)

let query = null
let frame = 0
let pointerX = 0
let pointerY = 0

const place = () => {
  frame = 0
  if (root.value) {
    root.value.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
  }
}

const onPointerMove = (event) => {
  if (event.pointerType === 'touch') return

  pointerX = event.clientX
  pointerY = event.clientY

  // Première apparition : on place le calque tout de suite, sinon il traverse
  // l'écran depuis le coin haut-gauche pendant son fondu d'entrée. C'est aussi
  // le moment où le curseur système s'efface : avant le premier mouvement, sa
  // position est inconnue, et le masquer plus tôt laisserait la page sans
  // aucun curseur jusqu'au premier geste.
  if (!visible.value) {
    visible.value = true
    place()
    document.documentElement.classList.add('has-paw-cursor')
    return
  }

  if (!frame) frame = window.requestAnimationFrame(place)
}

/**
 * `pointerover` plutôt que `pointermove` pour l'état de survol : il ne se
 * déclenche qu'au changement d'élément sous le pointeur, là où `pointermove`
 * relancerait un `closest()` soixante fois par seconde.
 */
const onPointerOver = (event) => {
  const target = event.target

  if (!(target instanceof Element)) return

  if (target.tagName === 'IFRAME' || target.closest(TEXT_FIELD)) {
    native.value = true
    active.value = false
    return
  }

  native.value = false

  const hit = target.closest(CLICKABLE)
  active.value = Boolean(hit) && !hit.disabled && hit.getAttribute('aria-disabled') !== 'true'
}

// Bouton enfoncé : la patte se rétracte, y compris au-dessus d'une zone
// cliquable (l'état « clic » prime sur le grossissement, voir main.css).
const onPointerDown = (event) => {
  if (event.pointerType === 'touch') return
  pressed.value = true
}

const release = () => {
  pressed.value = false
}

const hide = () => {
  visible.value = false
  active.value = false
  pressed.value = false
}

const bind = () => {
  document.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('pointerover', onPointerOver, { passive: true })
  document.addEventListener('pointerdown', onPointerDown, { passive: true })
  // Sur `window` et en phase de capture : un relâchement hors de la fenêtre ou
  // avalé par un `stopPropagation()` doit malgré tout détendre la patte.
  window.addEventListener('pointerup', release, { capture: true, passive: true })
  window.addEventListener('pointercancel', release, { capture: true, passive: true })
  // Sortie de la fenêtre, ou passage dans une iframe (qui prend le focus) :
  // le calque resterait figé à sa dernière position.
  document.addEventListener('pointerleave', hide)
  window.addEventListener('blur', hide)
}

const unbind = () => {
  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerover', onPointerOver)
  document.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('pointerup', release, { capture: true })
  window.removeEventListener('pointercancel', release, { capture: true })
  document.removeEventListener('pointerleave', hide)
  window.removeEventListener('blur', hide)
}

const apply = () => {
  enabled.value = query.matches

  if (enabled.value) {
    bind()
  } else {
    unbind()
    hide()
    document.documentElement.classList.remove('has-paw-cursor')
  }
}

onMounted(() => {
  query = window.matchMedia(media)
  query.addEventListener('change', apply)
  apply()
})

onBeforeUnmount(() => {
  query?.removeEventListener('change', apply)
  unbind()
  window.cancelAnimationFrame(frame)
  document.documentElement.classList.remove('has-paw-cursor')
})
</script>

<template>
  <div
    v-if="enabled"
    ref="root"
    class="paw-cursor"
    :class="{
      'paw-cursor-on': visible && !native,
      'paw-cursor-active': active,
      'paw-cursor-press': pressed,
    }"
    aria-hidden="true"
  >
    <img
      :src="pawCursor"
      alt=""
      class="paw-cursor-glyph"
      :style="{
        width: `${WIDTH}px`,
        margin: `${-HOTSPOT_Y}px 0 0 ${-HOTSPOT_X}px`,
        transformOrigin: `${HOTSPOT_X}px ${HOTSPOT_Y}px`,
      }"
    />
  </div>
</template>
