'use client'

import { motion } from 'framer-motion'
import { 
  Code2, Server, Database, Cloud, Palette, Workflow, 
  CheckCircle2, Zap, Brain, Target, Sparkles, Award 
} from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'
import styles from './Skills.module.css'

const skills = [
  { category: 'Frontend', level: 90, icon: Code2, color: '#6366f1', description: 'React, Next.js, TypeScript' },
  { category: 'Backend', level: 84, icon: Server, color: '#8b5cf6', description: 'Node.js, Python, APIs REST' },
  { category: 'Base de données', level: 80, icon: Database, color: '#06b6d4', description: 'PostgreSQL, MongoDB, Prisma' },
  { category: 'Cloud & DevOps', level: 74, icon: Cloud, color: '#3b82f6', description: 'AWS, Docker, CI/CD' },
  { category: 'Design UI/UX', level: 72, icon: Palette, color: '#ec4899', description: 'Figma, Design Systems' },
  { category: 'Architecture', level: 86, icon: Workflow, color: '#f59e0b', description: 'Microservices, Clean Architecture' },
]

const softSkills = [
  { name: 'Communication claire', icon: Target },
  { name: 'Résolution de problèmes', icon: Zap },
  { name: 'Esprit d\'équipe', icon: Brain },
  { name: 'Autonomie', icon: Award },
  { name: 'Adaptabilité', icon: Sparkles },
  { name: 'Curiosité technique', icon: Zap },
  { name: 'Pensée critique', icon: Brain },
  { name: 'Discipline d\'exécution', icon: Target },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
    visible: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 100,
      damping: 10,
    },
  },
}

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      {/* Éléments décoratifs */}
      <div className={styles.backgroundDecor}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridPattern} />
      </div>

      <div className={styles.container}>
        {/* En-tête */}
        <FadeIn>
          <header className={styles.header}>
            <motion.div 
              className={styles.headerBadge}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Sparkles className={styles.headerBadgeIcon} />
              <span>Compétences Techniques</span>
            </motion.div>
            
            <h2 className={styles.title}>
              Expertise technique avec
              <span className={styles.titleHighlight}> sens du produit.</span>
            </h2>
            
            <p className={styles.description}>
              Un équilibre entre qualité d'interface, fiabilité backend et architecture scalable. 
              Des compétences forgées par la pratique et la passion du code bien fait.
            </p>
          </header>
        </FadeIn>

        {/* Grille de compétences */}
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.article
                key={skill.category}
                className={styles.skillCard}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <div className={styles.skillCardGlow} />
                
                <div className={styles.skillHeader}>
                  <div className={styles.skillIconWrapper}>
                    <span 
                      className={styles.skillIcon}
                      style={{ 
                        background: `linear-gradient(135deg, ${skill.color}, ${skill.color}dd)`,
                        boxShadow: `0 4px 15px ${skill.color}40`
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    
                    {/* Barre de progression circulaire */}
                    <svg className={styles.progressRing} width="56" height="56">
                      <circle
                        className={styles.progressRingBg}
                        cx="28"
                        cy="28"
                        r="24"
                      />
                      <motion.circle
                        className={styles.progressRingFill}
                        cx="28"
                        cy="28"
                        r="24"
                        stroke={skill.color}
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: skill.level / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                  
                  <div className={styles.skillInfo}>
                    <h3 className={styles.skillName}>{skill.category}</h3>
                    <p className={styles.skillDescription}>{skill.description}</p>
                  </div>
                  
                  <div className={styles.skillLevel}>
                    <span className={styles.skillLevelNumber}>{skill.level}</span>
                    <span className={styles.skillLevelSymbol}>%</span>
                  </div>
                </div>

                {/* Barre de progression linéaire */}
                <div className={styles.progressBar}>
                  <motion.div
                    className={styles.progressBarFill}
                    style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  />
                  <div className={styles.progressBarGlow} style={{ background: skill.color }} />
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* Soft Skills */}
        <FadeIn delay={0.3}>
          <motion.div 
            className={styles.softSkillsPanel}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className={styles.softSkillsHeader}>
              <div className={styles.softSkillsIconWrapper}>
                <Brain className={styles.softSkillsIcon} />
              </div>
              <div>
                <h3 className={styles.softSkillsTitle}>Compétences Humaines</h3>
                <p className={styles.softSkillsSubtitle}>
                  Les qualités qui font la différence dans une équipe
                </p>
              </div>
            </div>
            
            <motion.div 
              className={styles.softSkillsGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {softSkills.map((skill, index) => {
                const Icon = skill.icon
                return (
                  <motion.div
                    key={skill.name}
                    className={styles.softSkillItem}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                  >
                    <span className={styles.softSkillCheck}>
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <Icon className={styles.softSkillItemIcon} />
                    <span className={styles.softSkillName}>{skill.name}</span>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}