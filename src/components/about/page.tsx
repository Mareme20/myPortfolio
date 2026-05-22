// app/about/page.tsx
import FadeIn from '@/components/animations/FadeIn'
import Timeline from '@/components/about/Timeline'
import SkillsRadar from '@/components/about/SkillsRadar'
import EducationCard from '@/components/about/EducationCard'
import InterestsGrid from '@/components/about/InterestsGrid'
import { motion, type Variants } from 'framer-motion'
import styles from './About.module.css'
import { 
  GraduationCap, 
  Briefcase, 
  Target, 
  Heart,
  Code2,
  Globe,
  BookOpen,
  Sparkles,
  ArrowRight,
  Send,
  FileText,
  Star,
  Zap,
  Coffee,
  GitBranch,
  Terminal,
  Smile
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Éléments décoratifs */}
        <div className={styles.backgroundDecor}>
          <div className={styles.gradientOrb1} />
          <div className={styles.gradientOrb2} />
          <div className={styles.gridPattern} />
        </div>

        <div className={styles.container}>
          <FadeIn>
            <div className={styles.heroContent}>
              <motion.div 
                className={styles.heroBadge}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
              >
                <Sparkles className={styles.badgeIcon} />
                <span className={styles.badgeText}>Étudiante en Génie Logiciel Passionnée</span>
                <span className={styles.badgeDot} />
              </motion.div>
              
              <h1 className={styles.heroTitle}>
                Enchantée, je suis{' '}
                <span className={styles.heroName}>
                  Marième Ndiaye
                </span>
              </h1>
              
              <p className={styles.heroDescription}>
                Développeuse full-stack en formation, passionnée par la création d'applications 
                web innovantes et l'optimisation des performances. Toujours à la recherche de 
                nouveaux défis techniques et d'opportunités d'apprentissage.
              </p>
              
              <div className={styles.heroStats}>
                {[
                  { icon: Code2, label: "+3 ans d'expérience", color: "var(--brand)" },
                  { icon: Target, label: "Spécialisée React/Next.js", color: "var(--accent)" },
                  { icon: Globe, label: "Français & Anglais", color: "#3b82f6" },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      className={styles.statItem}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                    >
                      <span 
                        className={styles.statIcon}
                        style={{ background: `${stat.color}20`, color: stat.color }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline & Skills Grid */}
      <section className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.mainGrid}>
            {/* Timeline - 2/3 de largeur */}
            <div className={styles.timelineColumn}>
              <FadeIn delay={0.2}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIcon}>
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className={styles.sectionTitle}>Mon Parcours</h2>
                    <p className={styles.sectionDescription}>
                      De mes débuts en programmation à mon parcours académique et professionnel, 
                      chaque étape a contribué à façonner ma passion pour le développement logiciel.
                    </p>
                  </div>
                </div>
              </FadeIn>
              <Timeline />
            </div>

            {/* Skills & Education - 1/3 de largeur */}
            <div className={styles.sideColumn}>
              <SkillsRadar />
              <EducationCard />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Interests */}
      <section className={styles.philosophySection}>
        <div className={styles.container}>
          <div className={styles.philosophyGrid}>
            {/* Philosophie */}
            <FadeIn>
              <div className={styles.philosophyCard}>
                <div className={styles.philosophyHeader}>
                  <div className={styles.philosophyIcon}>
                    <Heart className="h-6 w-6" />
                  </div>
                  <h2 className={styles.philosophyTitle}>Ma Philosophie</h2>
                </div>
                
                <div className={styles.philosophyItems}>
                  {[
                    {
                      icon: Zap,
                      title: "Innovation & Apprentissage",
                      description: "Je crois que la technologie évolue constamment, et avec elle, notre façon de résoudre les problèmes. Je m'engage à apprendre et à m'adapter continuellement.",
                      gradient: "from-blue-500 to-cyan-500",
                      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
                    },
                    {
                      icon: Star,
                      title: "Qualité & Best Practices",
                      description: "Un code propre, maintenable et bien testé n'est pas une option mais une nécessité. J'adopte les principes SOLID et les meilleures pratiques de développement.",
                      gradient: "from-emerald-500 to-teal-500",
                      bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
                    },
                    {
                      icon: Target,
                      title: "Collaboration & Communication",
                      description: "Les meilleurs produits naissent de la collaboration. Je valorise la communication claire et le travail d'équipe pour atteindre des objectifs communs.",
                      gradient: "from-purple-500 to-pink-500",
                      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
                    },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.title}
                        className={`${styles.philosophyItem} bg-gradient-to-br ${item.bgGradient}`}
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                      >
                        <div className={`${styles.philosophyItemIcon} bg-gradient-to-br ${item.gradient}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className={styles.philosophyItemTitle}>{item.title}</h3>
                          <p className={styles.philosophyItemDescription}>{item.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </FadeIn>

            {/* Centres d'intérêt */}
            <FadeIn delay={0.3}>
              <div>
                <div className={styles.interestsHeader}>
                  <div className={styles.sectionIcon}>
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h2 className={styles.sectionTitle}>Au-delà du code</h2>
                </div>
                <InterestsGrid />
                
                {/* Fun Facts */}
                <motion.div 
                  className={styles.funFacts}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                >
                  <h3 className={styles.funFactsTitle}>💡 Fun Facts</h3>
                  <div className={styles.funFactsGrid}>
                    {[
                      { icon: Coffee, label: 'Cafés par jour', value: '3 ☕' },
                      { icon: GitBranch, label: 'Projets GitHub', value: '24+' },
                      { icon: Terminal, label: 'Stack préférée', value: 'Next.js' },
                      { icon: Smile, label: 'Animal de code', value: 'Octocat 🐙' },
                    ].map((fact) => {
                      const Icon = fact.icon
                      return (
                        <motion.div
                          key={fact.label}
                          className={styles.funFactItem}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                        >
                          <Icon className={styles.funFactIcon} />
                          <div className={styles.funFactValue}>{fact.value}</div>
                          <div className={styles.funFactLabel}>{fact.label}</div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <FadeIn>
            <motion.div 
              className={styles.ctaCard}
              whileHover={{ y: -8 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
            >
              <div className={styles.ctaGlow} />
              <h2 className={styles.ctaTitle}>
                Intéressé(e) par mon profil ?
              </h2>
              <p className={styles.ctaDescription}>
                Que ce soit pour un stage, un projet collaboratif ou simplement échanger 
                sur la tech, je serais ravie de discuter avec vous !
              </p>
              <div className={styles.ctaActions}>
                <motion.a
                  href="/contact"
                  className={styles.ctaPrimary}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                >
                  <Send className="h-5 w-5" />
                  <span>Me contacter</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  download
                  className={styles.ctaSecondary}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                >
                  <FileText className="h-5 w-5" />
                  <span>Télécharger mon CV</span>
                </motion.a>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}