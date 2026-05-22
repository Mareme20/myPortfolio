'use client'

import { useState, useCallback, useEffect } from 'react'
import { 
  ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  Image, Layout, Smartphone, Cpu, X, ZoomIn,
  Grid3X3, Play, Pause
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ScreenshotGallery.module.css'

interface ScreenshotGalleryProps {
  projectId: string
}

const frames = [
  { 
    id: 'overview', 
    title: 'Vue d\'ensemble', 
    subtitle: 'Interface principale du produit',
    icon: Image,
    color: '#6366f1',
  },
  { 
    id: 'flow', 
    title: 'Parcours utilisateur', 
    subtitle: 'Structure et navigation',
    icon: Layout,
    color: '#8b5cf6',
  },
  { 
    id: 'mobile', 
    title: 'Version mobile', 
    subtitle: 'Comportement responsive',
    icon: Smartphone,
    color: '#06b6d4',
  },
  { 
    id: 'system', 
    title: 'Architecture', 
    subtitle: 'Composants et système',
    icon: Cpu,
    color: '#f59e0b',
  },
]

export default function ScreenshotGallery({ projectId }: ScreenshotGalleryProps) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [direction, setDirection] = useState(0)

  const previous = useCallback(() => {
    setDirection(-1)
    setActive((value) => (value - 1 + frames.length) % frames.length)
  }, [])

  const next = useCallback(() => {
    setDirection(1)
    setActive((value) => (value + 1) % frames.length)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(next, 3000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, next])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'ArrowLeft') previous()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, previous, next])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    }),
  }

  const ActiveIcon = frames[active].icon

  return (
    <>
      <section className={styles.section}>
        {/* En-tête */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerIcon}>
              <Grid3X3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className={styles.title}>Aperçus visuels</h2>
              <p className={styles.subtitle}>
                {frames[active].title} • Image {active + 1} sur {frames.length}
              </p>
            </div>
          </div>
          
          <div className={styles.headerActions}>
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`${styles.iconButton} ${isAutoPlaying ? styles.iconButtonActive : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isAutoPlaying ? 'Arrêter le défilement' : 'Défilement automatique'}
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </motion.button>
            
            <motion.button
              onClick={() => setOpen(true)}
              className={styles.expandButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Maximize2 className="h-4 w-4" />
              <span>Agrandir</span>
            </motion.button>
          </div>
        </div>

        {/* Visionneuse principale */}
        <div className={styles.viewer}>
          <div className={styles.viewerBackground}>
            <div className={styles.viewerGlow} style={{ background: frames[active].color }} />
            <div className={styles.gridOverlay} />
          </div>
          
          {/* Badge du projet */}
          <div className={styles.projectBadge}>
            <span className={styles.projectBadgeDot} />
            {projectId}
          </div>

          {/* Indicateur de progression */}
          <div className={styles.progress}>
            {frames.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > active ? 1 : -1)
                  setActive(index)
                }}
                className={`${styles.progressDot} ${index === active ? styles.progressDotActive : ''}`}
                style={{ 
                  background: index === active ? frames[active].color : undefined,
                }}
              />
            ))}
          </div>

          {/* Image/Contenu principal */}
          <div className={styles.viewerContent}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={frames[active].id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.slide}
              >
                <div className={styles.slideContent}>
                  <motion.div 
                    className={styles.slideIcon}
                    style={{ color: frames[active].color }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <ActiveIcon className="h-12 w-12" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className={styles.slideTitle}>{frames[active].title}</h3>
                    <p className={styles.slideSubtitle}>{frames[active].subtitle}</p>
                  </motion.div>
                </div>

                {/* Détails techniques simulés */}
                <div className={styles.slideDetails}>
                  {[
                    'Interface optimisée',
                    'Performance maximale',
                    'Design responsive',
                  ].map((detail, i) => (
                    <motion.div
                      key={detail}
                      className={styles.detailItem}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <span 
                        className={styles.detailDot}
                        style={{ background: frames[active].color }}
                      />
                      {detail}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Boutons de navigation */}
          <motion.button
            onClick={previous}
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            onClick={next}
            className={`${styles.navButton} ${styles.navButtonRight}`}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Image suivante"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>

          {/* Compteur */}
          <div className={styles.counter}>
            <span className={styles.counterCurrent}>
              {String(active + 1).padStart(2, '0')}
            </span>
            <span className={styles.counterSeparator}>/</span>
            <span className={styles.counterTotal}>
              {String(frames.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Miniatures de navigation */}
        <div className={styles.thumbnails}>
          {frames.map((frame, index) => {
            const Icon = frame.icon
            const isActive = active === index
            return (
              <motion.button
                key={frame.id}
                onClick={() => {
                  setDirection(index > active ? 1 : -1)
                  setActive(index)
                }}
                className={`${styles.thumbnail} ${isActive ? styles.thumbnailActive : ''}`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div 
                  className={styles.thumbnailIcon}
                  style={{ 
                    background: isActive ? `${frame.color}20` : 'transparent',
                    color: isActive ? frame.color : 'inherit',
                  }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className={styles.thumbnailInfo}>
                  <span className={styles.thumbnailTitle}>{frame.title}</span>
                  <span className={styles.thumbnailSubtitle}>{frame.subtitle}</span>
                </div>
                {isActive && (
                  <motion.div
                    className={styles.thumbnailIndicator}
                    layoutId="activeThumbnail"
                    style={{ background: frame.color }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </section>

      {/* Modal plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.modal}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* En-tête du modal */}
              <div className={styles.modalHeader}>
                <div className={styles.modalHeaderInfo}>
                  <span 
                    className={styles.modalBadge}
                    style={{ background: `${frames[active].color}20`, color: frames[active].color }}
                  >
                    <ActiveIcon className="h-4 w-4" />
                    {frames[active].title}
                  </span>
                  <span className={styles.modalCounter}>
                    {active + 1} / {frames.length}
                  </span>
                </div>
                
                <div className={styles.modalActions}>
                  <motion.button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={styles.modalIconButton}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setOpen(false)}
                    className={styles.modalIconButton}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minimize2 className="h-4 w-4" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setOpen(false)}
                    className={styles.modalCloseButton}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {/* Contenu du modal */}
              <div className={styles.modalViewer}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={frames[active].id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={styles.modalSlide}
                  >
                    <motion.div 
                      className={styles.modalSlideIcon}
                      style={{ color: frames[active].color }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <ActiveIcon className="h-20 w-20" />
                    </motion.div>
                    
                    <motion.h2 
                      className={styles.modalSlideTitle}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {frames[active].subtitle}
                    </motion.h2>
                    
                    <motion.p 
                      className={styles.modalSlideDescription}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Capture d'écran détaillée de {frames[active].title.toLowerCase()} 
                      du projet {projectId}. Cette vue montre les éléments clés de l'interface 
                      et l'expérience utilisateur.
                    </motion.p>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation du modal */}
                <motion.button
                  onClick={previous}
                  className={`${styles.modalNavButton} ${styles.modalNavButtonLeft}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>
                
                <motion.button
                  onClick={next}
                  className={`${styles.modalNavButton} ${styles.modalNavButtonRight}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Miniatures du modal */}
              <div className={styles.modalThumbnails}>
                {frames.map((frame, index) => {
                  const Icon = frame.icon
                  return (
                    <motion.button
                      key={frame.id}
                      onClick={() => {
                        setDirection(index > active ? 1 : -1)
                        setActive(index)
                      }}
                      className={`${styles.modalThumbnail} ${index === active ? styles.modalThumbnailActive : ''}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon 
                        className="h-4 w-4" 
                        style={{ color: index === active ? frame.color : undefined }}
                      />
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}