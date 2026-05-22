'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight, BadgeCheck, Sparkles, ChevronDown } from 'lucide-react'
import { socialLinks } from '@/lib/data'
import FadeIn from '@/components/animations/FadeIn'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Éléments décoratifs d'arrière-plan */}
      <div className={styles.backgroundDecor}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridPattern} />
      </div>

      <div className={styles.container}>
        <div className={styles.glassPanel}>
          <div className={styles.grid}>
            {/* Colonne principale */}
            <div className={styles.mainContent}>
              <FadeIn delay={0.1}>
                <motion.div 
                  className={styles.badge}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className={styles.badgeDot} />
                  <BadgeCheck className={styles.badgeIcon} />
                  <span>Étudiante en génie logiciel</span>
                </motion.div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className={styles.title}>
                  Je crée des produits numériques
                  <span className={styles.titleHighlight}>
                    {" "}clairs, modernes et fiables.
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.32}>
                <p className={styles.description}>
                  Spécialisée en Next.js, TypeScript et ingénierie produit. 
                  Je transforme les besoins métier en interfaces fluides et systèmes maintenables, 
                  avec une attention particulière à l'expérience utilisateur.
                </p>
              </FadeIn>

              <FadeIn delay={0.42}>
                <div className={styles.actions}>
                  <motion.a 
                    href="#projects" 
                    className={styles.primaryButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={styles.buttonText}>Voir mes projets</span>
                    <ArrowRight className={styles.buttonIcon} />
                    <span className={styles.buttonGlow} />
                  </motion.a>
                  
                  <motion.a 
                    href="/contact" 
                    className={styles.secondaryButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={styles.secondaryButtonText}>Me contacter</span>
                    <span className={styles.secondaryButtonBorder} />
                  </motion.a>
                </div>
              </FadeIn>

              {/* Stats rapides */}
              <FadeIn delay={0.6}>
                <div className={styles.stats}>
                  {[
                    { number: '5+', label: 'Projets réalisés' },
                    { number: '3', label: 'Technologies maîtrisées' },
                    { number: '100%', label: 'Satisfaction client' },
                  ].map((stat) => (
                    <motion.div 
                      key={stat.label} 
                      className={styles.statItem}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className={styles.statNumber}>{stat.number}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Colonne latérale */}
            <FadeIn delay={0.5} direction="left">
              <motion.aside 
                className={styles.sidePanel}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className={styles.sidePanelContent}>
                  <div className={styles.focusHeader}>
                    <Sparkles className={styles.focusIcon} />
                    <p className={styles.focusLabel}>Focus actuel</p>
                  </div>
                  
                  <h2 className={styles.focusTitle}>
                    Développement Full-stack
                  </h2>
                  
                  <p className={styles.focusDescription}>
                    Architecture propre, APIs robustes et qualité UI premium, 
                    du concept jusqu'au déploiement.
                  </p>

                  <div className={styles.skills}>
                    {[
                      { name: 'Next.js + Prisma', level: 90 },
                      { name: 'Design Systems', level: 85 },
                      { name: 'Performance & DX', level: 88 },
                    ].map((skill) => (
                      <div key={skill.name} className={styles.skillItem}>
                        <div className={styles.skillHeader}>
                          <span className={styles.skillName}>{skill.name}</span>
                          <span className={styles.skillLevel}>{skill.level}%</span>
                        </div>
                        <div className={styles.skillBar}>
                          <motion.div 
                            className={styles.skillProgress}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.socialLinks}>
                    {[
                      { icon: Github, href: socialLinks.github, label: 'GitHub' },
                      { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
                      { icon: Mail, href: `mailto:${socialLinks.email}`, label: 'Email' },
                    ].map((item) => {
                      const Icon = item.icon
                      return (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          target={item.label !== 'Email' ? '_blank' : undefined}
                          rel={item.label !== 'Email' ? 'noopener noreferrer' : undefined}
                          className={styles.socialButton}
                          whileHover={{ y: -3, scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={item.label}
                        >
                          <Icon className={styles.socialIcon} />
                        </motion.a>
                      )
                    })}
                  </div>

                  <motion.div
                    className={styles.availability}
                    animate={{ 
                      boxShadow: [
                        '0 0 20px hsla(250, 85%, 65%, 0.3)',
                        '0 0 40px hsla(250, 85%, 65%, 0.5)',
                        '0 0 20px hsla(250, 85%, 65%, 0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className={styles.availabilityDot} />
                    Disponible pour un stage
                  </motion.div>
                </div>
              </motion.aside>
            </FadeIn>
          </div>
        </div>

        {/* Indicateur de défilement */}
        <motion.div 
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className={styles.scrollIcon} />
        </motion.div>
      </div>
    </section>
  )
}