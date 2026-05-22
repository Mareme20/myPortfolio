'use client'

import { motion } from 'framer-motion'
import { 
  ExternalLink, Github, ArrowUpRight, Star, 
  GitFork, Clock, Tag, Layers, Sparkles 
} from 'lucide-react'
import { Project } from '@/lib/data'
import Link from 'next/link'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ y: -8 }}
      className={styles.card}
    >
      {/* Effet de brillance au survol */}
      <div className={styles.cardGlow} />
      
      {/* Bordure animée */}
      <div className={styles.cardBorder} />

      {/* En-tête de la carte */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <motion.span 
            className={styles.category}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Tag className="h-3.5 w-3.5" />
            {project.category}
          </motion.span>
          
          {project.features && (
            <motion.span 
              className={styles.featured}
              animate={{ 
                boxShadow: [
                  '0 0 10px rgba(250, 204, 21, 0.3)',
                  '0 0 20px rgba(250, 204, 21, 0.5)',
                  '0 0 10px rgba(250, 204, 21, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="h-3 w-3" />
              Vedette
            </motion.span>
          )}
        </div>
        
        <div className={styles.headerRight}>
          <Clock className="h-3.5 w-3.5" />
          <span className={styles.year}>{project.year}</span>
        </div>
      </div>

      {/* Titre du projet */}
      <motion.h3 
        className={styles.title}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Link href={`/projects/${project.id}`} className={styles.titleLink}>
          {project.title}
        </Link>
      </motion.h3>

      {/* Description */}
      <p className={styles.description}>
        {project.description}
      </p>

      {/* Statistiques rapides */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <GitFork className="h-3.5 w-3.5" />
          <span>12 commits</span>
        </div>
        <div className={styles.stat}>
          <Layers className="h-3.5 w-3.5" />
          <span>{project.technologies.length} technos</span>
        </div>
        <div className={styles.stat}>
          <Sparkles className="h-3.5 w-3.5" />
          <span>{project.features.length} features</span>
        </div>
      </div>

      {/* Technologies */}
      <div className={styles.technologies}>
        {project.technologies.slice(0, 4).map((tech, techIndex) => (
          <motion.span
            key={tech}
            className={styles.tech}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + techIndex * 0.05 }}
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
          >
            {tech}
          </motion.span>
        ))}
        {project.technologies.length > 4 && (
          <span className={styles.techMore}>
            +{project.technologies.length - 4}
          </span>
        )}
      </div>

      {/* Fonctionnalités */}
      <ul className={styles.features}>
        {project.features.slice(0, 2).map((feature, featureIndex) => (
          <motion.li
            key={feature}
            className={styles.feature}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + featureIndex * 0.05 }}
          >
            <span className={styles.featureDot} />
            {feature}
          </motion.li>
        ))}
      </ul>

      {/* Actions */}
      <div className={styles.actions}>
        <div className={styles.links}>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Code source"
          >
            <Github className="h-4 w-4" />
            <span>Code</span>
          </motion.a>
          
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Démo en ligne"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Démo</span>
            </motion.a>
          )}
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href={`/projects/${project.id}`} 
            className={styles.detailsLink}
          >
            <span>Détails</span>
            <ArrowUpRight className="h-4 w-4" />
            <span className={styles.detailsGlow} />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  )
}