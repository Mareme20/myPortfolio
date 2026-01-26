// components/ui/ProjectCard.tsx
'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { Project } from '@/lib/data'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        
        {/* Tech Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">
              {project.category}
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {project.year}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
          {project.description}
        </p>

        {/* Features List */}
        <ul className="mb-6 space-y-2">
          {project.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex space-x-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              aria-label="Code source"
            >
              <Github className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Code</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                aria-label="Live demo"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Démo</span>
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.id}`}
            className="flex items-center text-primary hover:text-primary-dark font-medium group"
          >
            <span className="mr-2">Voir détails</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
    </motion.article>
  )
}