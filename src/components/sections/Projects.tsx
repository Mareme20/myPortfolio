// components/sections/Projects.tsx
'use client'

import ProjectCard from '@/components/animations/ui/ProjectCard'
import { projects } from '@/lib/data'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Projects() {
  const featuredProjects = projects.slice(0, 3)

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mes <span className="text-primary">Projets</span> Récents
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Une sélection de mes réalisations techniques les plus significatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary dark:text-white rounded-lg hover:bg-primary/10 transition-colors font-medium"
          >
            Voir tous les projets
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}