// app/projects/[id]/page.tsx
import { notFound } from 'next/navigation'
import { projects } from '@/lib/data'
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Calendar, 
  Tag, 
  Code2,
  CheckCircle,
  Cpu
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ProjectChallenges from '@/components/projects/ProjectChallenges'
import TechnologyStack from '@/components/projects/TechnologyStack'
import ScreenshotGallery from '@/components/projects/ScreenshotGallery'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find(p => p.id === id)
  
  if (!project) {
    return {
      title: 'Projet non trouvé',
    }
  }
  
  return {
    title: `${project.title} - Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find(p => p.id === id)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Header avec image hero */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20" />
        <div className="container relative mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <Link
              href="/projects"
              className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-primary mb-8 group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Retour aux projets
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 rounded-full text-sm font-medium">
                {project.category === 'web' && '🌐 Application Web'}
                {project.category === 'mobile' && '📱 Application Mobile'}
                {project.category === 'backend' && '⚙️ Backend API'}
                {project.category === 'fullstack' && '🚀 Full-Stack'}
                {project.category === 'ai' && '🤖 Intelligence Artificielle'}
              </span>
              <span className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {project.year}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {project.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
              {project.longDescription}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors inline-flex items-center"
              >
                <Github className="h-5 w-5 mr-2" />
                Code source
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Voir la démo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-12 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-12">
            {/* Aperçu du projet */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Code2 className="h-6 w-6 mr-3 text-primary" />
                Aperçu du projet
              </h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Ce projet a été développé dans le cadre {project.year === 2024 ? 'de mes études en génie logiciel' : 'd\'un projet académique/personnel'}. 
                  L'objectif était de créer une solution {project.category === 'web' ? 'web moderne et performante' : 'robuste et scalable'} 
                  en mettant en pratique les meilleures pratiques de développement.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 my-8">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                    🎯 Objectifs principaux
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Screenshots */}
            <ScreenshotGallery projectId={project.id} />

            {/* Défis et solutions */}
            <ProjectChallenges project={project} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Stack technique */}
            <TechnologyStack technologies={project.technologies} />

            {/* Détails du projet */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Cpu className="h-5 w-5 mr-3 text-primary" />
                Détails du projet
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm mb-1">
                    Catégorie
                  </h4>
                  <p className="font-medium">
                    {project.category === 'web' && 'Application Web'}
                    {project.category === 'mobile' && 'Application Mobile'}
                    {project.category === 'backend' && 'API Backend'}
                    {project.category === 'fullstack' && 'Application Full-Stack'}
                    {project.category === 'ai' && 'Projet IA/ML'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm mb-1">
                    Statut
                  </h4>
                  <span className="inline-flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    <span className="font-medium">Terminé & Déployé</span>
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm mb-1">
                    Durée de développement
                  </h4>
                  <p className="font-medium">4-6 semaines</p>
                </div>
              </div>
            </div>

            {/* Liens rapides */}
            <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 dark:from-primary/20 dark:to-purple-600/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">Liens rapides</h3>
              <div className="space-y-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                >
                  <span className="font-medium">Repository GitHub</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <span className="font-medium">Application en ligne</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <Link
                  href="/contact"
                  className="flex items-center justify-between p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <span className="font-medium">Discuter de ce projet</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Projets similaires */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Projets similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects
              .filter(p => p.id !== project.id && p.category === project.category)
              .slice(0, 3)
              .map((similarProject) => (
                <Link
                  key={similarProject.id}
                  href={`/projects/${similarProject.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors"
                >
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {similarProject.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {similarProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {similarProject.technologies.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}