// components/about/InterestsGrid.tsx
'use client'

import { motion, type Variants } from 'framer-motion'
import { 
  Coffee, Music, Book, Gamepad2, Camera, Plane, 
  Utensils, Palette, Cpu, Headphones, 
  Sparkles, Heart, Star 
} from 'lucide-react'
import styles from './InterestsGrid.module.css'

const interests = [
  { 
    icon: Coffee, 
    name: 'Café & Café', 
    description: 'Exploratrice de cafés artisanaux et torréfacteurs locaux',
    color: '#f59e0b',
  },
  { 
    icon: Music, 
    name: 'Playlists Coding', 
    description: 'Lofi hip-hop, synthwave et ambiance focus',
    color: '#8b5cf6',
  },
  { 
    icon: Book, 
    name: 'Tech Books', 
    description: 'Clean Code, Design Patterns & Architecture',
    color: '#3b82f6',
  },
  { 
    icon: Gamepad2, 
    name: 'Jeux Indés', 
    description: 'Hollow Knight, Celeste & expériences narratives',
    color: '#10b981',
  },
  { 
    icon: Camera, 
    name: 'Photographie', 
    description: 'Street photography & architecture minimaliste',
    color: '#ec4899',
  },
  { 
    icon: Plane, 
    name: 'Voyages', 
    description: 'Japon 🇯🇵, prochaine destination en 2025',
    color: '#06b6d4',
  },
  { 
    icon: Utensils, 
    name: 'Cuisine', 
    description: 'Pâtisserie française & cuisine asiatique',
    color: '#f97316',
  },
  { 
    icon: Palette, 
    name: 'Design', 
    description: 'UI/UX, design systems & interfaces modernes',
    color: '#ef4444',
  },
  { 
    icon: Cpu, 
    name: 'Tech Gadgets', 
    description: 'Hardware, périphériques & nouvelles technologies',
    color: '#6366f1',
  },
  { 
    icon: Headphones, 
    name: 'Podcasts', 
    description: 'Syntax.fm, Ladybug Podcast & Changelog',
    color: '#14b8a6',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  },
}

export default function InterestsGrid() {
  return (
    <div className={styles.container}>
      {/* En-tête décoratif */}
      <div className={styles.header}>
        <motion.div 
          className={styles.headerIcon}
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart className="h-5 w-5" />
        </motion.div>
        <div>
          <h3 className={styles.headerTitle}>Centres d'intérêt</h3>
          <p className={styles.headerSubtitle}>
            Ce qui m'inspire au quotidien ✨
          </p>
        </div>
      </div>

      {/* Grille d'intérêts */}
      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {interests.map((interest, index) => {
          const Icon = interest.icon
          
          return (
            <motion.div
              key={interest.name}
              className={styles.card}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -6,
                transition: { type: "spring" as const, stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Effet de brillance au survol */}
              <div 
                className={styles.cardGlow} 
                style={{ background: interest.color }} 
              />
              
              {/* Contenu de la carte */}
              <div className={styles.cardContent}>
                <motion.div 
                  className={styles.iconWrapper}
                  style={{ 
                    background: `${interest.color}15`,
                    borderColor: `${interest.color}30`,
                  }}
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  <Icon 
                    className={styles.icon} 
                    style={{ color: interest.color }}
                  />
                </motion.div>
                
                <h4 className={styles.name}>
                  {interest.name}
                </h4>
                
                <p className={styles.description}>
                  {interest.description}
                </p>
              </div>
              
              {/* Badge "Favori" pour le premier élément */}
              {index === 0 && (
                <motion.div 
                  className={styles.favoriteBadge}
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                  }}
                >
                  <Star className="h-3 w-3" />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </motion.div>
      
      {/* Citation inspirante */}
      <motion.div 
        className={styles.quote}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        whileHover={{ y: -4 }}
      >
        <Sparkles className={styles.quoteIcon} />
        <p className={styles.quoteText}>
          "La créativité naît de la diversité des passions. Chaque centre d'intérêt 
          nourrit ma vision du développement et enrichit mes projets."
        </p>
      </motion.div>
    </div>
  )
}