// app/about/page.tsx
'use client'

import { motion, type Variants } from 'framer-motion'
import { 
  Sparkles, GraduationCap, Rocket, Globe, ArrowRight,
  Star, Zap, Target, Heart, Send, FileText,
  ChevronRight, Award, BookOpen, Coffee
} from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'
import Link from 'next/link'
import styles from './About.module.css'

const milestones = [
  {
    period: '2024',
    title: 'Stage Full-stack',
    detail: 'Développement de fonctionnalités produit, routes API et tableaux de bord analytiques avec Next.js et Prisma.',
    icon: Rocket,
    color: '#3b82f6',
  },
  {
    period: '2023 - 2024',
    title: 'Diplôme Génie Logiciel',
    detail: 'Spécialisation en architecture, stratégies de test, maintenabilité et discipline de livraison.',
    icon: GraduationCap,
    color: '#10b981',
  },
  {
    period: '2022',
    title: 'Projet SaaS Personnel',
    detail: 'Conception et réalisation complète : UX, frontend, backend et déploiement.',
    icon: Star,
    color: '#8b5cf6',
  },
]

const strengths = [
  {
    text: 'Décisions d\'ingénierie orientées produit',
    icon: Target,
    color: '#3b82f6',
  },
  {
    text: 'Architecture claire et code propre',
    icon: Zap,
    color: '#10b981',
  },
  {
    text: 'Exécution frontend avec accessibilité',
    icon: Sparkles,
    color: '#8b5cf6',
  },
  {
    text: 'Conception backend fiable et APIs robustes',
    icon: Rocket,
    color: '#f59e0b',
  },
]

const stats = [
  { value: '3+', label: 'Années d\'expérience', icon: Award },
  { value: '10+', label: 'Projets réalisés', icon: Rocket },
  { value: '5+', label: 'Technologies maîtrisées', icon: Zap },
  { value: '∞', label: 'Cafés consommés', icon: Coffee },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Éléments décoratifs */}
      <div className={styles.backgroundDecor}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridPattern} />
      </div>

      <div className={styles.container}>
        {/* Hero Section */}
        <FadeIn>
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <motion.div 
                className={styles.heroBadge}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
              >
                <Sparkles className={styles.badgeIcon} />
                <span>Profil Professionnel</span>
                <span className={styles.badgeDot} />
              </motion.div>
              
              <h1 className={styles.heroTitle}>
                Ingénierie avec structure,
                <span className={styles.heroHighlight}> rapidité et intention.</span>
              </h1>
              
              <p className={styles.heroDescription}>
                Je transforme des exigences complexes en expériences utilisateur claires 
                et en systèmes maintenables. Mon approche allie rigueur technique et 
                sensibilité produit.
              </p>

              {/* Statistiques rapides */}
              <motion.div 
                className={styles.stats}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      className={styles.statItem}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                    >
                      <Icon className={styles.statIcon} />
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </section>
        </FadeIn>

        {/* Parcours & Style de travail */}
        <div className={styles.grid}>
          {/* Parcours */}
          <FadeIn delay={0.1}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderIcon}>
                  <BookOpen className="h-5 w-5" />
                </div>
                <h2 className={styles.cardTitle}>Mon Parcours</h2>
              </div>
              
              <div className={styles.milestones}>
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon
                  return (
                    <motion.div
                      key={milestone.title}
                      className={styles.milestone}
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                    >
                      <div className={styles.milestoneTimeline}>
                        <div 
                          className={styles.milestoneDot}
                          style={{ backgroundColor: milestone.color }}
                        />
                        {index < milestones.length - 1 && (
                          <div className={styles.milestoneLine} />
                        )}
                      </div>
                      
                      <div className={styles.milestoneContent}>
                        <div className={styles.milestoneHeader}>
                          <span 
                            className={styles.milestonePeriod}
                            style={{ color: milestone.color }}
                          >
                            {milestone.period}
                          </span>
                          <Icon 
                            className={styles.milestoneIcon}
                            style={{ color: milestone.color }}
                          />
                        </div>
                        <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                        <p className={styles.milestoneDescription}>{milestone.detail}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </article>
          </FadeIn>

          {/* Style de travail */}
          <FadeIn delay={0.2}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderIcon}>
                  <Heart className="h-5 w-5" />
                </div>
                <h2 className={styles.cardTitle}>Style de Travail</h2>
              </div>
              
              <motion.div 
                className={styles.strengths}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {strengths.map((strength) => {
                  const Icon = strength.icon
                  return (
                    <motion.div
                      key={strength.text}
                      className={styles.strength}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { type: "spring" as const, stiffness: 400, damping: 10 }
                      }}
                    >
                      <div 
                        className={styles.strengthIcon}
                        style={{ 
                          background: `${strength.color}15`,
                          color: strength.color,
                        }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className={styles.strengthText}>{strength.text}</span>
                      <ChevronRight className={styles.strengthArrow} />
                    </motion.div>
                  )
                })}
              </motion.div>

              <motion.div 
                className={styles.quote}
                whileHover={{ y: -2 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
              >
                <Sparkles className={styles.quoteIcon} />
                <p className={styles.quoteText}>
                  Je valorise la qualité, l'appropriation et la communication d'équipe 
                  autant que la rapidité de livraison.
                </p>
              </motion.div>
            </article>
          </FadeIn>
        </div>

        {/* CTA Section */}
        <FadeIn delay={0.3}>
          <motion.section 
            className={styles.cta}
            whileHover={{ y: -4 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
          >
            <div className={styles.ctaContent}>
              <div className={styles.ctaInfo}>
                <div className={styles.ctaHeader}>
                  <Globe className={styles.ctaHeaderIcon} />
                  <span className={styles.ctaBadge}>Disponible</span>
                </div>
                <h2 className={styles.ctaTitle}>
                  Ouverte aux stages, à l'alternance et aux équipes produit.
                </h2>
                <p className={styles.ctaDescription}>
                  Prête à contribuer avec rigueur et enthousiasme sur des projets ambitieux.
                </p>
              </div>
              
              <div className={styles.ctaActions}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact" className={styles.ctaPrimary}>
                    <Send className="h-5 w-5" />
                    <span>Me contacter</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="/resume.pdf" download className={styles.ctaSecondary}>
                    <FileText className="h-5 w-5" />
                    <span>Télécharger CV</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </FadeIn>
      </div>
    </div>
  )
}