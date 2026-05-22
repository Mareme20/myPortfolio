'use client'

import { motion } from 'framer-motion'
import ProjectCard from '@/components/animations/ui/ProjectCard'
import { projects } from '@/lib/data'
import { ArrowRight, Sparkles, FolderGit2, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import FadeIn from '@/components/animations/FadeIn'
import styles from './Projects.module.css'

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      {/* Éléments décoratifs */}
      <div className={styles.backgroundDecor}>
        <div className={styles.gradientOrb} />
        <div className={styles.gridPattern} />
      </div>

      <div className={styles.container}>
        {/* En-tête de section */}
        <FadeIn>
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.headerTop}>
                <motion.div 
                  className={styles.iconWrapper}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FolderGit2 className={styles.headerIcon} />
                </motion.div>
                <span className={styles.badge}>
                  <Sparkles className={styles.badgeIcon} />
                  Projets Sélectionnés
                </span>
              </div>
              
              <h2 className={styles.title}>
                Des projets conçus pour des
                <span className={styles.titleHighlight}> résultats concrets.</span>
              </h2>
              
              <p className={styles.description}>
                Une sélection de produits où la qualité UX, la structure technique 
                et la rapidité de livraison sont essentielles. Chaque projet reflète 
                mon engagement envers l'excellence.
              </p>

              {/* Statistiques rapides */}
              <div className={styles.stats}>
                {[
                  { icon: TrendingUp, label: 'Projets livrés', value: '10+' },
                  { icon: Sparkles, label: 'Technologies', value: '8+' },
                  { icon: FolderGit2, label: 'En production', value: '5+' },
                ].map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div 
                      key={stat.label} 
                      className={styles.statItem}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Icon className={styles.statIcon} />
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/projects" className={styles.viewAllButton}>
                <span className={styles.viewAllText}>Voir tous les projets</span>
                <ArrowRight className={styles.viewAllIcon} />
                <span className={styles.viewAllGlow} />
              </Link>
            </motion.div>
          </header>
        </FadeIn>

        {/* Grille de projets */}
        <div className={styles.grid}>
          {projects.slice(0, 3).map((project, index) => (
            <FadeIn key={project.id} delay={0.1 * (index + 1)}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Indicateur de navigation */}
        <motion.div 
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className={styles.scrollDots}>
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className={styles.scrollDot}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: dot * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}