 // app/projects/page.tsx
'use client'

import { useMemo, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import ProjectCard from '@/components/animations/ui/ProjectCard'
import { projects } from '@/lib/data'
import FadeIn from '@/components/animations/FadeIn'
import { 
  Sparkles, 
  Globe, 
  Smartphone, 
  Server, 
  Layers, 
  Brain,
  Filter,
  Zap,
  Star,
  Layout
} from 'lucide-react'
import styles from './Projects.module.css'

const categories = [
  { id: 'all', label: 'Tous les projets', icon: Layout, count: projects.length },
  { id: 'web', label: 'Web', icon: Globe, count: projects.filter(p => p.category === 'web').length },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, count: projects.filter(p => p.category === 'mobile').length },
  { id: 'backend', label: 'Backend', icon: Server, count: projects.filter(p => p.category === 'backend').length },
  { id: 'fullstack', label: 'Fullstack', icon: Layers, count: projects.filter(p => p.category === 'fullstack').length },
  { id: 'ai', label: 'IA', icon: Brain, count: projects.filter(p => p.category === 'ai').length },
] as const

type Category = typeof categories[number]['id']

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
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

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects
    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  const activeCategoryData = categories.find(c => c.id === activeCategory)

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
          <header className={styles.hero}>
            <motion.div 
              className={styles.heroBadge}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
            >
              <Sparkles className={styles.badgeIcon} />
              <span>Portfolio Projets</span>
              <span className={styles.badgeDot} />
            </motion.div>
            
            <h1 className={styles.heroTitle}>
              Un portfolio
              <span className={styles.heroHighlight}> orienté produit.</span>
            </h1>
            
            <p className={styles.heroDescription}>
              Construit pour démontrer la qualité d'exécution à travers l'interface, 
              l'architecture et la fiabilité. Chaque projet reflète mon engagement 
              envers l'excellence technique.
            </p>

            {/* Statistiques rapides */}
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <Layout className={styles.statIcon} />
                <span className={styles.statValue}>{projects.length}</span>
                <span className={styles.statLabel}>Projets</span>
              </div>
              <div className={styles.statItem}>
                <Star className={styles.statIcon} />
                <span className={styles.statValue}>
                  {projects.filter(p => p.features).length}
                </span>
                <span className={styles.statLabel}>En vedette</span>
              </div>
              <div className={styles.statItem}>
                <Zap className={styles.statIcon} />
                <span className={styles.statValue}>
                  {categories.length - 1}
                </span>
                <span className={styles.statLabel}>Catégories</span>
              </div>
            </div>
          </header>
        </FadeIn>

        {/* Filtres */}
        <FadeIn delay={0.1}>
          <div className={styles.filters}>
            <div className={styles.filtersHeader}>
              <Filter className="h-4 w-4" />
              <span className={styles.filtersTitle}>Filtrer par catégorie</span>
              {activeCategoryData && activeCategory !== 'all' && (
                <motion.span 
                  className={styles.activeFilter}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {activeCategoryData.label}
                  <span className={styles.activeFilterCount}>
                    {activeCategoryData.count}
                  </span>
                </motion.span>
              )}
            </div>
            
            <div className={styles.filtersList}>
              {categories.map((category) => {
                const Icon = category.icon
                const isActive = activeCategory === category.id
                
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ''}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isActive ? styles.filterIconActive : styles.filterIcon}`} />
                    <span>{category.label}</span>
                    <span className={`${styles.filterCount} ${isActive ? styles.filterCountActive : ''}`}>
                      {category.count}
                    </span>
                    {isActive && (
                      <motion.div
                        className={styles.filterIndicator}
                        layoutId="activeFilter"
                        transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </FadeIn>

        {/* Grille de projets */}
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeCategory}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Message si aucun projet */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className={styles.empty}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Brain className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>Aucun projet trouvé</h3>
            <p className={styles.emptyDescription}>
              Aucun projet ne correspond à la catégorie sélectionnée. 
              Essayez de modifier votre filtre.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className={styles.emptyButton}
            >
              Voir tous les projets
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}