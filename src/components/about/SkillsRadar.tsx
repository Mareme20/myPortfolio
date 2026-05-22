// components/about/SkillsRadar.tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Code2, Palette, Server, Database, Cloud, Layers, Sparkles, TrendingUp, Award } from 'lucide-react'
import styles from './SkillsRadar.module.css'

const skills = [
  { category: 'Frontend', level: 90, icon: Code2, color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.1)' },
  { category: 'Backend', level: 85, icon: Server, color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)' },
  { category: 'Base de données', level: 80, icon: Database, color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.1)' },
  { category: 'DevOps', level: 75, icon: Cloud, color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.1)' },
  { category: 'UI/UX', level: 70, icon: Palette, color: '#EC4899', bgColor: 'rgba(236, 72, 153, 0.1)' },
  { category: 'Architecture', level: 85, icon: Layers, color: '#06B6D4', bgColor: 'rgba(6, 182, 212, 0.1)' },
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
      damping: 10,
    },
  },
}

export default function SkillsRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configuration du canvas pour le responsive
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const width = rect.width
    const height = rect.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) * 0.6
    const angleStep = (2 * Math.PI) / skills.length

    // Effacer le canvas
    ctx.clearRect(0, 0, width, height)

    // Dessiner les grilles de fond
    for (let i = 1; i <= 5; i++) {
      const currentRadius = (radius * i) / 5
      ctx.beginPath()
      
      for (let j = 0; j <= skills.length; j++) {
        const angle = j * angleStep - Math.PI / 2
        const x = centerX + Math.cos(angle) * currentRadius
        const y = centerY + Math.sin(angle) * currentRadius
        
        if (j === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      
      ctx.closePath()
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.2)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Dessiner les axes
    skills.forEach((_, i) => {
      const angle = i * angleStep - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.3)'
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Dessiner le radar rempli
    ctx.beginPath()
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2
      const skillRadius = (radius * skill.level) / 100
      const x = centerX + Math.cos(angle) * skillRadius
      const y = centerY + Math.sin(angle) * skillRadius
      
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.closePath()
    
    // Remplissage avec dégradé
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
    gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)')
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0.1)')
    ctx.fillStyle = gradient
    ctx.fill()
    
    // Contour
    ctx.strokeStyle = '#3B82F6'
    ctx.lineWidth = 2
    ctx.stroke()

    // Dessiner les points et les valeurs
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2
      const skillRadius = (radius * skill.level) / 100
      const x = centerX + Math.cos(angle) * skillRadius
      const y = centerY + Math.sin(angle) * skillRadius

      // Point principal
      ctx.beginPath()
      ctx.arc(x, y, 7, 0, 2 * Math.PI)
      ctx.fillStyle = skill.color
      ctx.fill()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 3
      ctx.stroke()
      
      // Effet de lueur
      ctx.beginPath()
      ctx.arc(x, y, 12, 0, 2 * Math.PI)
      ctx.fillStyle = skill.color.replace(')', ', 0.2)').replace('rgb', 'rgba')
      ctx.fill()

      // Pourcentage
      ctx.fillStyle = '#1F2937'
      ctx.font = 'bold 10px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${skill.level}%`, x, y)
    })

    // Dessiner les labels
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2
      const labelRadius = radius + 35
      const x = centerX + Math.cos(angle) * labelRadius
      const y = centerY + Math.sin(angle) * labelRadius

      // Fond du label
      const textWidth = ctx.measureText(skill.category).width
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.fillRect(x - textWidth / 2 - 10, y - 10, textWidth + 20, 20)
      
      // Texte
      ctx.fillStyle = '#374151'
      ctx.font = 'bold 11px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(skill.category, x, y)
    })
  }, [])

  const averageLevel = Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)

  return (
    <div className={styles.card}>
      {/* Effet de fond */}
      <div className={styles.backgroundGlow} />
      
      {/* En-tête */}
      <div className={styles.header}>
        <motion.div 
          className={styles.headerIcon}
          whileHover={{ rotate: 15 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
        >
          <Code2 className="h-5 w-5" />
        </motion.div>
        <div>
          <h3 className={styles.title}>Compétences Techniques</h3>
          <p className={styles.subtitle}>
            Niveau moyen : {averageLevel}%
          </p>
        </div>
        
        <motion.div 
          className={styles.averageBadge}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
        >
          <Award className="h-3.5 w-3.5" />
          <span>{averageLevel}%</span>
        </motion.div>
      </div>
      
      {/* Canvas Radar */}
      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
        />
      </div>

      {/* Légende avec barres de progression */}
      <motion.div 
        className={styles.legend}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((skill) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.category}
              className={styles.skillItem}
              variants={itemVariants}
              whileHover={{ 
                x: 4,
                transition: { type: "spring" as const, stiffness: 400, damping: 10 }
              }}
            >
              <div className={styles.skillHeader}>
                <div className={styles.skillInfo}>
                  <div 
                    className={styles.skillDot}
                    style={{ backgroundColor: skill.color }}
                  />
                  <div 
                    className={styles.skillIcon}
                    style={{ backgroundColor: skill.bgColor, color: skill.color }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className={styles.skillName}>{skill.category}</span>
                </div>
                <span className={styles.skillLevel}>{skill.level}%</span>
              </div>
              
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.3,
                    type: "spring" as const,
                    stiffness: 100,
                    damping: 15,
                  }}
                  style={{ 
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                    boxShadow: `0 0 10px ${skill.color}40`,
                  }}
                />
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Pied de carte */}
      <motion.div 
        className={styles.footer}
        whileHover={{ y: -2 }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
      >
        <TrendingUp className="h-4 w-4" />
        <p className={styles.footerText}>
          Niveau évalué sur la base de projets réalisés et de certifications obtenues.
        </p>
      </motion.div>
    </div>
  )
}