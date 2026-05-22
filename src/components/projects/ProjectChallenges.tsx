'use client'

import { useState } from 'react'
import type { ComponentType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, Lightbulb, BookOpen, Zap, Shield, 
  Sparkles, TrendingUp, CheckCircle2, ArrowRight 
} from 'lucide-react'
import type { Project } from '@/lib/data'
import styles from './ProjectChallenges.module.css'

interface ProjectChallengesProps {
  project: Project
}

const content = {
  challenges: [
    {
      text: 'Maintenir une architecture propre tout en livrant rapidement.',
      icon: Shield,
      metric: 'Complexité réduite de 40%',
    },
    {
      text: 'Équilibrer qualité visuelle et performances optimales.',
      icon: Zap,
      metric: 'Score Lighthouse 95+',
    },
    {
      text: 'Anticiper la scalabilité pour les fonctionnalités futures.',
      icon: TrendingUp,
      metric: 'Prêt pour 10x utilisateurs',
    },
  ],
  solutions: [
    {
      text: 'Structure orientée composants avec des frontières explicites.',
      icon: Sparkles,
      metric: 'Temps de développement -30%',
    },
    {
      text: 'Amélioration progressive et interactions légères.',
      icon: Zap,
      metric: 'Temps de chargement < 2s',
    },
    {
      text: 'Flux de données conçu pour la maintenabilité et la testabilité.',
      icon: Shield,
      metric: 'Couverture de tests 90%',
    },
  ],
  learnings: [
    {
      text: 'Des décisions de cadrage précises réduisent les risques de livraison.',
      icon: Target,
      metric: 'Respect des délais +50%',
    },
    {
      text: 'La cohérence du design améliore considérablement la confiance utilisateur.',
      icon: Sparkles,
      metric: 'Satisfaction utilisateur 4.8/5',
    },
    {
      text: 'Les systèmes simples évoluent mieux que les solutions trop complexes.',
      icon: Lightbulb,
      metric: 'Maintenance -60%',
    },
  ],
}

type Tab = keyof typeof content

const tabs: Array<{ 
  id: Tab; 
  label: string; 
  icon: ComponentType<{ className?: string }>;
  color: string;
  description: string;
}> = [
  { 
    id: 'challenges', 
    label: 'Défis', 
    icon: Target,
    color: '#ef4444',
    description: 'Les obstacles techniques surmontés',
  },
  { 
    id: 'solutions', 
    label: 'Solutions', 
    icon: Lightbulb,
    color: '#f59e0b',
    description: 'Les approches mises en œuvre',
  },
  { 
    id: 'learnings', 
    label: 'Apprentissages', 
    icon: BookOpen,
    color: '#10b981',
    description: 'Les leçons clés retenues',
  },
]

const tabContentVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      staggerChildren: 0.1,
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2 }
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export default function ProjectChallenges({ project }: ProjectChallengesProps) {
  const [tab, setTab] = useState<Tab>('challenges')
  const activeTab = tabs.find(t => t.id === tab)!

  return (
    <section className={styles.section}>
      {/* En-tête */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <Target className="h-6 w-6" />
          </div>
          <div>
            <h2 className={styles.title}>Notes d'exécution</h2>
            <p className={styles.subtitle}>
              Points clés d'implémentation de {project.title} et ce qui a fait la plus grande différence.
            </p>
          </div>
        </div>
        
        {/* Indicateur de progression */}
        <div className={styles.progressIndicator}>
          <div className={styles.progressBar}>
            <motion.div 
              className={styles.progressFill}
              initial={{ width: '33%' }}
              animate={{ 
                width: tab === 'challenges' ? '33%' : tab === 'solutions' ? '66%' : '100%' 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>
      </div>

      {/* Onglets de navigation */}
      <div className={styles.tabs}>
        {tabs.map((item) => {
          const Icon = item.icon
          const active = tab === item.id
          return (
            <motion.button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`${styles.tab} ${active ? styles.tabActive : ''}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span 
                className={styles.tabIcon}
                style={{ 
                  background: active ? `${item.color}20` : 'transparent',
                  color: active ? item.color : 'inherit',
                }}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className={styles.tabContent}>
                <span className={styles.tabLabel}>{item.label}</span>
                <span className={styles.tabDescription}>{item.description}</span>
              </div>
              {active && (
                <motion.div
                  className={styles.tabIndicator}
                  layoutId="activeTab"
                  style={{ background: item.color }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Contenu des onglets */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={styles.content}
        >
          {content[tab].map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.text}
                variants={itemVariants}
                className={styles.item}
                whileHover={{ 
                  x: 8,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <div 
                      className={styles.itemIcon}
                      style={{ background: `${activeTab.color}15`, color: activeTab.color }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className={styles.itemNumber}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div className={styles.itemBody}>
                    <p className={styles.itemText}>{item.text}</p>
                    
                    <div className={styles.itemMetric}>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{item.metric}</span>
                    </div>
                  </div>
                </div>

                <motion.div 
                  className={styles.itemArrow}
                  whileHover={{ x: 4 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </motion.div>
            )
          })}

          {/* Résumé de l'onglet */}
          <motion.div 
            className={styles.summary}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div 
              className={styles.summaryBadge}
              style={{ background: `${activeTab.color}15`, borderColor: `${activeTab.color}30` }}
            >
              <Sparkles className="h-4 w-4" style={{ color: activeTab.color }} />
              <span style={{ color: activeTab.color }}>
                {tab === 'challenges' && 'Chaque défi relevé renforce l\'architecture'}
                {tab === 'solutions' && 'Des solutions pragmatiques pour un impact maximal'}
                {tab === 'learnings' && 'L\'expérience transforme les obstacles en opportunités'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}