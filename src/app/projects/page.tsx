// app/projects/page.tsx
import ProjectCard from '@/components/animations/ui/ProjectCard'
import { projects } from '@/lib/data'
import { Filter } from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Mes <span className="text-primary">Projets</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Une sélection de mes réalisations techniques, du développement frontend aux APIs backend.
          </p>
        </div>
      </FadeIn>

      {/* Filtres */}
      <FadeIn delay={0.2}>
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium">
            Tous
          </button>
          {['web', 'mobile', 'backend', 'fullstack'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              {category === 'web' && 'Web'}
              {category === 'mobile' && 'Mobile'}
              {category === 'backend' && 'Backend'}
              {category === 'fullstack' && 'Full-Stack'}
            </button>
          ))}
          <button className="flex items-center px-4 py-2 border-2 border-primary text-primary dark:text-white rounded-lg hover:bg-primary/10 transition-colors font-medium">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </button>
        </div>
      </FadeIn>

      {/* Grille de projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Stats */}
      <FadeIn delay={0.4}>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Projets réalisés', value: projects.length },
            { label: 'Technologies', value: 15 },
            { label: 'Commits GitHub', value: '500+' },
            { label: 'Satisfaction', value: '100%' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  )
}