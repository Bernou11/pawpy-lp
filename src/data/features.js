import featureConfiance from '@/assets/figma/feature-confiance.png'
import featureBalade from '@/assets/figma/feature-balade.png'
import featurePaiement from '@/assets/figma/feature-paiement.png'
import featureStats from '@/assets/figma/feature-stats.png'

import iconCertification from '@/assets/figma/icons/certification.png'
import iconFormation from '@/assets/figma/icons/formation.png'
import iconMessage from '@/assets/figma/icons/message.png'
import iconInterlocuteur from '@/assets/figma/icons/interlocuteur.png'
import iconPaiementCard from '@/assets/figma/icons/paiement-card.png'
import iconGpsPin from '@/assets/figma/icons/gps-pin.png'
import iconClock from '@/assets/figma/icons/clock.png'
import iconBell from '@/assets/figma/icons/bell.png'
import iconMap from '@/assets/figma/icons/map.png'
import iconShield from '@/assets/figma/icons/shield.png'
import iconCalendar from '@/assets/figma/icons/calendar.png'
import iconRefresh from '@/assets/figma/icons/refresh.png'
import iconTransfer from '@/assets/figma/icons/transfer.png'
import iconStopwatch from '@/assets/figma/icons/stopwatch.png'
import iconChart from '@/assets/figma/icons/chart.png'
import iconReport from '@/assets/figma/icons/report.png'
import iconPaw from '@/assets/figma/icons/paw.png'

/**
 * Les quatre sections « texte + image » du Figma. Elles partagent la même
 * structure : intitulé, titre, liste à icônes et deux boutons. Seul le côté de
 * l'image alterne (`reversed`).
 */
export const features = [
  {
    id: 'confiance',
    eyebrow: 'Confiance',
    title: 'Une entrée filtrée avec promeneurs certifiés.',
    image: featureConfiance,
    imageAlt: 'Écran Pawpy d’import ou de passage de la certification ACACED',
    reversed: false,
    items: [
      { icon: iconCertification, label: 'Entrée sur certification' },
      { icon: iconFormation, label: 'Formation incluses' },
      { icon: iconMessage, label: 'Messagerie privée encrypté' },
      { icon: iconInterlocuteur, label: 'Choix complet de votre interlocuteur' },
      { icon: iconPaiementCard, label: 'Paiement intégrés & sécurisés' },
    ],
  },
  {
    id: 'balade',
    eyebrow: 'Balade',
    title: 'Une promenade d’exception, sans concessions.',
    image: featureBalade,
    imageAlt: 'Notification Pawpy et tracé GPS d’une promenade en cours',
    reversed: true,
    items: [
      { icon: iconGpsPin, label: 'Tracking GPS en temps réel' },
      { icon: iconClock, label: 'Promenade d’une heure minimum' },
      { icon: iconBell, label: 'Notifications automatiques' },
      { icon: iconMap, label: 'Cartographie des zones de balade' },
    ],
  },
  {
    id: 'paiement',
    eyebrow: 'Paiement',
    title: 'Votre tranquillité commence avant même la balade.',
    image: featurePaiement,
    imageAlt: 'Écran Pawpy de paiement et de réservation d’une promenade',
    reversed: false,
    items: [
      { icon: iconShield, label: 'Paiement 100% sécurisé' },
      { icon: iconCalendar, label: 'Réservez directement dans Pawpy' },
      { icon: iconRefresh, label: 'Historique de vos transactions' },
      { icon: iconTransfer, label: 'Transfère d’argent' },
    ],
  },
  {
    id: 'stats',
    eyebrow: 'Stats & suivis',
    title: 'La promenade canine devient une science mesurable.',
    image: featureStats,
    imageAlt: 'Écran Pawpy de statistiques et de suivi des promenades',
    reversed: true,
    items: [
      { icon: iconStopwatch, label: 'Tracé GPS & chronomètre' },
      { icon: iconChart, label: 'Statistiques de promenades' },
      { icon: iconReport, label: 'Rapports mensuels des performances' },
      { icon: iconPaw, label: 'Accompagnement canin complet' },
    ],
  },
]
