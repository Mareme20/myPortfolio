'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Send, Sparkles, MessageSquare, FileText, Star, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import FadeIn from '@/components/animations/FadeIn'
import styles from './ContactCTA.module.css'

export default function ContactCTA() {
  return (
    <section className={styles.section}>
      {/* Éléments décoratifs */}
      <div className={styles.backgroundDecor}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.dotsPattern} />
      </div>

      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={styles.card}
        >
          {/* Effet de bordure animée */}
          <div className={styles.animatedBorder} />
          
          {/* Particules décoratives */}
          <div className={styles.particles}>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                animate={{
                  y: [-20, -60],
                  x: [0, Math.sin(i) * 30],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}
          </div>

          <div className={styles.content}>
            <FadeIn>
              <motion.div 
                className={styles.badge}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Sparkles className={styles.badgeIcon} />
                <span className={styles.badgeText}>Ouverte aux opportunités</span>
                <span className={styles.badgeDot} />
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className={styles.title}>
                Construisons quelque chose
                <span className={styles.titleHighlight}> d'exceptionnel</span> ensemble.
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className={styles.description}>
                Que ce soit pour un stage, une collaboration en freelance ou simplement 
                pour échanger sur un projet, je suis prête à m'investir avec rigueur, 
                créativité et réactivité.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className={styles.features}>
                {[
                  { icon: Star, text: 'Expertise technique' },
                  { icon: MessageSquare, text: 'Communication fluide' },
                  { icon: Sparkles, text: 'Résultats garantis' },
                ].map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.text}
                      className={styles.featureItem}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Icon className={styles.featureIcon} />
                      <span>{feature.text}</span>
                    </motion.div>
                  )
                })}
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className={styles.actions}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/contact" className={styles.primaryButton}>
                    <span className={styles.primaryButtonContent}>
                      <Send className={styles.buttonIcon} />
                      <span>M'envoyer un message</span>
                      <ChevronRight className={styles.buttonArrow} />
                    </span>
                    <span className={styles.primaryButtonGlow} />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a href="/resume.pdf" download className={styles.secondaryButton}>
                    <span className={styles.secondaryButtonContent}>
                      <FileText className={styles.buttonIcon} />
                      <span>Télécharger mon CV</span>
                      <ArrowRight className={styles.buttonArrow} />
                    </span>
                    <span className={styles.secondaryButtonBorder} />
                  </a>
                </motion.div>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <motion.p 
                className={styles.availability}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(255, 255, 255, 0.1)',
                    '0 0 40px rgba(255, 255, 255, 0.2)',
                    '0 0 20px rgba(255, 255, 255, 0.1)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className={styles.availabilityDot} />
                Disponible immédiatement • Réponse sous 24h
              </motion.p>
            </FadeIn>
          </div>
        </motion.div>
      </div>
    </section>
  )
}