// components/about/Timeline.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  ChevronRight,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Filter,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react'
import styles from './Timeline.module.css'

const timelineEvents = [
  {
    id: 1,
    year: '2024',
    title: 'Stage Développeur Full-Stack',
    company: 'Startup Tech, Paris',
    description: 'Développement d\'une application SaaS avec React, Node.js et PostgreSQL. Mise en place de tests unitaires et d\'une CI/CD.',
    type: 'work' as const,
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    icon: Briefcase,
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
  },
  {
    id: 2,
    year: '2023 - Présent',
    title: 'Licence Génie Logiciel',
    company: 'Université de Technologie',
    description: 'Spécialisation en développement web et architecture logicielle. Projets notables : application e-commerce, API REST, application mobile.',
    type: 'education' as const,
    tags: ['Java', 'Python', 'Web', 'Mobile'],
    icon: GraduationCap,
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    id: 3,
    year: '2023',
    title: 'Projet Personnel - Plateforme de Quiz',
    company: 'Projet Open Source',
    description: 'Développement full-stack d\'une plateforme de quiz interactive avec classement en temps réel et mode multijoueur.',
    type: 'project' as const,
    tags: ['Next.js', 'Socket.io', 'MongoDB', 'Tailwind'],
    icon: Code2,
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
  },
  {
    id: 4,
    year: '2022',
    title: 'Certification AWS Cloud Practitioner',
    company: 'Amazon Web Services',
    description: 'Compréhension des services cloud AWS et des concepts fondamentaux du cloud computing.',
    type: 'certification' as const,
    tags: ['AWS', 'Cloud', 'DevOps'],
    icon: Award,
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    id: 5,
    year: '2021',
    title: 'Premiers Pas en Développement',
    company: 'Auto-formation',
    description: 'Apprentissage des bases de la programmation avec Python et JavaScript. Création de premiers projets personnels.',
    type: 'learning' as const,
    tags: ['Python', 'JavaScript', 'HTML/CSS'],
    icon: Code2,
    color: '#EC4899',
    bgColor: 'rgba(236, 72, 153, 0.1)',
  },
]

type FilterType = 'all' | 'work' | 'education' | 'project'

const filters = [
  { id: 'all' as const, label: 'Tout voir', count: timelineEvents.length, icon: Sparkles },
  { id: 'work' as const, label: 'Expérience', count: timelineEvents.filter(e => e.type === 'work').length, icon: Briefcase },
  { id: 'education' as const, label: 'Éducation', count: timelineEvents.filter(e => e.type === 'education').length, icon: GraduationCap },
  { id: 'project' as const, label: 'Projets', count: timelineEvents.filter(e => e.type === 'project').length, icon: Code2 },
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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState(timelineEvents[0])
  const [activeType, setActiveType] = useState<FilterType>('all')

  const filteredEvents = timelineEvents.filter(event => 
    activeType === 'all' || event.type === activeType
  )

  return (
    <div className={styles.container}>
      {/* Filtres */}
      <div className={styles.filters}>
        <div className={styles.filtersHeader}>
          <Filter className="h-4 w-4" />
          <span className={styles.filtersTitle}>Filtrer par</span>
        </div>
        
        <div className={styles.filtersList}>
          {filters.map((filter) => {
            const Icon = filter.icon
            const isActive = activeType === filter.id
            
            return (
              <motion.button
                key={filter.id}
                onClick={() => setActiveType(filter.id)}
                className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ''}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? styles.filterIconActive : styles.filterIcon}`} />
                <span>{filter.label}</span>
                <span className={`${styles.filterCount} ${isActive ? styles.filterCountActive : ''}`}>
                  {filter.count}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className={styles.timeline}>
        {/* Ligne verticale avec dégradé */}
        <div className={styles.timelineLine}>
          <div className={styles.timelineLineGlow} />
        </div>
        
        {/* Événements */}
        <motion.div 
          className={styles.events}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredEvents.map((event) => {
            const Icon = event.icon
            const isSelected = selectedEvent.id === event.id
            
            return (
              <motion.div
                key={event.id}
                className={styles.eventWrapper}
                variants={itemVariants}
              >
                {/* Point sur la timeline */}
                <div className={styles.eventPoint}>
                  <motion.button
                    onClick={() => setSelectedEvent(event)}
                    className={`${styles.point} ${isSelected ? styles.pointActive : ''}`}
                    style={{ 
                      backgroundColor: event.color,
                      boxShadow: isSelected ? `0 0 20px ${event.color}60` : undefined,
                    }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                    aria-label={`Voir les détails de ${event.title}`}
                  />
                  {isSelected && (
                    <motion.div
                      className={styles.pointRing}
                      style={{ borderColor: event.color }}
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </div>

                {/* Carte d'événement */}
                <motion.div
                  className={`${styles.card} ${isSelected ? styles.cardActive : ''}`}
                  onClick={() => setSelectedEvent(event)}
                  whileHover={{ 
                    x: 6,
                    transition: { type: "spring" as const, stiffness: 400, damping: 10 }
                  }}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIconWrapper}>
                      <div 
                        className={styles.cardIcon}
                        style={{ 
                          background: `linear-gradient(135deg, ${event.color}, ${event.color}dd)`,
                          boxShadow: `0 4px 12px ${event.color}40`,
                        }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      
                      {/* Barre de connexion */}
                      <div className={styles.cardConnector}>
                        <div className={styles.cardConnectorDot} style={{ backgroundColor: event.color }} />
                        <div className={styles.cardConnectorLine} />
                        <div className={styles.cardConnectorDot} style={{ backgroundColor: event.color }} />
                      </div>
                    </div>
                    
                    <div className={styles.cardInfo}>
                      <div className={styles.cardMeta}>
                        <span className={styles.cardYear}>
                          <Clock className="h-3 w-3" />
                          {event.year}
                        </span>
                        <span className={styles.cardLocation}>
                          <MapPin className="h-3 w-3" />
                          {event.company}
                        </span>
                      </div>
                      
                      <h3 className={styles.cardTitle}>{event.title}</h3>
                      
                      <motion.div
                        className={styles.cardChevron}
                        animate={{ rotate: isSelected ? 90 : 0 }}
                        transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                      >
                        <ChevronRight className={`h-5 w-5 ${isSelected ? 'text-primary' : ''}`} />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                        className={styles.cardContent}
                      >
                        <p className={styles.cardDescription}>
                          {event.description}
                        </p>
                        
                        <div className={styles.cardTags}>
                          {event.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              className={styles.tag}
                              style={{ 
                                backgroundColor: event.bgColor,
                                color: event.color,
                                borderColor: `${event.color}30`,
                              }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}