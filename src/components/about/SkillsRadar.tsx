// components/about/SkillsRadar.tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Code2, Palette, Server, Database, Cloud, Layers } from 'lucide-react'

const skills = [
  { category: 'Frontend', level: 90, icon: Code2, color: '#3B82F6' },
  { category: 'Backend', level: 85, icon: Server, color: '#10B981' },
  { category: 'Base de données', level: 80, icon: Database, color: '#8B5CF6' },
  { category: 'DevOps', level: 75, icon: Cloud, color: '#F59E0B' },
  { category: 'UI/UX', level: 70, icon: Palette, color: '#EC4899' },
  { category: 'Architecture', level: 85, icon: Layers, color: '#06B6D4' },
]

export default function SkillsRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) * 0.7
    const angleStep = (2 * Math.PI) / skills.length

    // Draw grid
    ctx.strokeStyle = '#E5E7EB'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 3])

    for (let i = 1; i <= 5; i++) {
      const currentRadius = (radius * i) / 5
      ctx.beginPath()
      for (let j = 0; j <= skills.length; j++) {
        const angle = j * angleStep
        const x = centerX + Math.cos(angle) * currentRadius
        const y = centerY + Math.sin(angle) * currentRadius
        if (j === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.stroke()
    }

    ctx.setLineDash([])

    // Draw axes
    ctx.strokeStyle = '#9CA3AF'
    ctx.lineWidth = 1
    skills.forEach((_, i) => {
      const angle = i * angleStep
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    })

    // Draw radar data
    ctx.beginPath()
    skills.forEach((skill, i) => {
      const angle = i * angleStep
      const skillRadius = (radius * skill.level) / 100
      const x = centerX + Math.cos(angle) * skillRadius
      const y = centerY + Math.sin(angle) * skillRadius
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.closePath()
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'
    ctx.fill()
    ctx.strokeStyle = '#3B82F6'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw points
    skills.forEach((skill, i) => {
      const angle = i * angleStep
      const skillRadius = (radius * skill.level) / 100
      const x = centerX + Math.cos(angle) * skillRadius
      const y = centerY + Math.sin(angle) * skillRadius

      ctx.beginPath()
      ctx.arc(x, y, 6, 0, 2 * Math.PI)
      ctx.fillStyle = skill.color
      ctx.fill()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Draw labels
    ctx.fillStyle = '#374151'
    ctx.font = 'bold 12px Inter'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    skills.forEach((skill, i) => {
      const angle = i * angleStep
      const labelRadius = radius + 30
      const x = centerX + Math.cos(angle) * labelRadius
      const y = centerY + Math.sin(angle) * labelRadius

      ctx.fillText(skill.category, x, y)
    })
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <Code2 className="h-5 w-5 mr-3 text-primary" />
        Compétences Techniques
      </h3>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full h-auto"
        />
        
        {/* Légende */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50"
              >
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: skill.color }}
                  />
                  <span className="font-medium">{skill.category}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                  <span className="ml-3 text-sm font-bold w-8">{skill.level}%</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
        <p>Niveau évalué sur la base de projets réalisés et de certifications obtenues.</p>
      </div>
    </div>
  )
}