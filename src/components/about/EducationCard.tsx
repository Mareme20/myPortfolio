// components/about/EducationCard.tsx
'use client'

import { motion } from 'framer-motion'
import { 
  GraduationCap, Calendar, MapPin, Award, BookOpen,
  Star, Trophy, Zap, Sparkles, ArrowRight, CheckCircle2,
  ExternalLink, Clock
} from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'
import styles from './EducationCard.module.css'

const educationData = {
  current: {
    degree: 'Licence en Génie Logiciel',
    school: 'Université de Technologie',
    period: '2021 - 2024',
    location: 'Paris, France',
    gpa: '15.8/20',
    description: 'Spécialisation en développement web, architecture logicielle et gestion de projet avec une approche pratique et orientée résultats.',
    courses: [
      'Développement Web Avancé',
      'Base de données',
      'Algorithmique',
      'Architecture Logicielle',
      'UX/UI Design',
      'DevOps & Cloud',
    ],
    achievements: [
      { text: 'Mention Bien', icon: Star },
      { text: 'Projet de fin d\'études : Plateforme e-learning', icon: Trophy },
      { text: '3 hackathons et 2 prix d\'innovation', icon: Zap },
    ],
    progress: 85,
  },
  certifications: [
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023',
      icon: Award,
      color: '#f59e0b',
    },
    {
      name: 'React Developer',
      issuer: 'Meta',
      date: '2022',
      icon: Award,
      color: '#6366f1',
    },
    {
      name: 'JavaScript Algorithms',
      issuer: 'freeCodeCamp',
      date: '2022',
      icon: Award,
      color: '#10b981',
    },
  ],
}

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

export default function EducationCard() {
  return (
    <div className={styles.card}>
      {/* Effet de fond */}
      <div className={styles.backgroundGlow} />
      
      {/* En-tête */}
      <div className={styles.header}>
        <motion.div 
          className={styles.headerIcon}
          whileHover={{ rotate: 15 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <GraduationCap className="h-6 w-6" />
        </motion.div>
        <div>
          <h3 className={styles.title}>Formation</h3>
          <p className={styles.subtitle}>Parcours académique et certifications</p>
        </div>
      </div>

      {/* Formation actuelle */}
      <FadeIn>
        <motion.div 
          className={styles.currentEducation}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className={styles.degreeHeader}>
            <div>
              <h4 className={styles.degree}>{educationData.current.degree}</h4>
              <div className={styles.degreeInfo}>
                <span className={styles.school}>
                  <BookOpen className="h-3.5 w-3.5" />
                  {educationData.current.school}
                </span>
              </div>
            </div>
            
            <motion.span 
              className={styles.status}
              animate={{ 
                boxShadow: [
                  '0 0 10px rgba(16, 185, 129, 0.3)',
                  '0 0 20px rgba(16, 185, 129, 0.5)',
                  '0 0 10px rgba(16, 185, 129, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className={styles.statusDot} />
              En cours
            </motion.span>
          </div>

          {/* Détails */}
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <Calendar className="h-4 w-4" />
              <span>{educationData.current.period}</span>
            </div>
            <div className={styles.detailItem}>
              <MapPin className="h-4 w-4" />
              <span>{educationData.current.location}</span>
            </div>
            <div className={styles.detailItem}>
              <Award className="h-4 w-4" />
              <span>Moyenne: {educationData.current.gpa}</span>
            </div>
          </div>

          {/* Barre de progression */}
          <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Progression</span>
              <span className={styles.progressValue}>{educationData.current.progress}%</span>
            </div>
            <div className={styles.progressBar}>
              <motion.div 
                className={styles.progressFill}
                initial={{ width: 0 }}
                whileInView={{ width: `${educationData.current.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
              <div className={styles.progressGlow} />
            </div>
          </div>

          <p className={styles.description}>
            {educationData.current.description}
          </p>

          {/* Cours */}
          <div className={styles.coursesSection}>
            <h5 className={styles.sectionTitle}>
              <BookOpen className="h-4 w-4" />
              Matières principales
            </h5>
            <div className={styles.courses}>
              {educationData.current.courses.map((course, index) => (
                <motion.span
                  key={course}
                  className={styles.course}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Réalisations */}
          <div className={styles.achievementsSection}>
            <h5 className={styles.sectionTitle}>
              <Trophy className="h-4 w-4" />
              Réalisations
            </h5>
            <motion.div
              className={styles.achievements}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {educationData.current.achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={achievement.text}
                    className={styles.achievement}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{achievement.text}</span>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
      </FadeIn>

      {/* Certifications */}
      <div className={styles.certificationsSection}>
        <div className={styles.certificationsHeader}>
          <Award className="h-5 w-5" />
          <h4 className={styles.certificationsTitle}>Certifications</h4>
          <span className={styles.certificationsCount}>
            {educationData.certifications.length}
          </span>
        </div>
        
        <div className={styles.certifications}>
          {educationData.certifications.map((cert, index) => {
            const Icon = cert.icon
            return (
              <FadeIn key={cert.name} delay={index * 0.1}>
                <motion.div 
                  className={styles.certification}
                  whileHover={{ 
                    x: 8,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  <div 
                    className={styles.certificationIcon}
                    style={{ background: `${cert.color}20`, color: cert.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className={styles.certificationInfo}>
                    <div className={styles.certificationName}>{cert.name}</div>
                    <div className={styles.certificationIssuer}>
                      {cert.issuer}
                      <span className={styles.certificationDot}>•</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                  <motion.div 
                    className={styles.certificationArrow}
                    whileHover={{ x: 4 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </motion.div>
                </motion.div>
              </FadeIn>
            )
          })}
        </div>
      </div>

      {/* Pied de carte */}
      <FadeIn delay={0.4}>
        <motion.div 
          className={styles.footer}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Sparkles className="h-4 w-4" />
          <p className={styles.footerText}>
            Toujours en apprentissage actif via des cours en ligne, 
            des projets personnels et des contributions open source.
          </p>
        </motion.div>
      </FadeIn>
    </div>
  )
}