// components/admin/projects/ProjectList.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Star,
  Copy,
  MoreVertical
} from 'lucide-react'
import { toast } from 'sonner'

interface Project {
  id: string
  title: string
  slug: string
  published: boolean
  featured: boolean
  createdAt: string
  technologies: string[]
}

interface ProjectListProps {
  projects: Project[]
  onDelete: (id: string) => void
  onTogglePublish: (id: string, published: boolean) => void
  onToggleFeatured: (id: string, featured: boolean) => void
}

export default function ProjectList({ 
  projects, 
  onDelete, 
  onTogglePublish,
  onToggleFeatured 
}: ProjectListProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'status'>('date')
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  const filteredProjects = projects.filter(project => {
    if (filter === 'published') return project.published
    if (filter === 'draft') return !project.published
    return true
  }).sort((a, b) => {
    if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    return 0
  })

  const handleCopyLink = (slug: string) => {
    const link = `${window.location.origin}/projects/${slug}`
    navigator.clipboard.writeText(link)
    toast.success('Lien copié dans le presse-papier')
  }

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      onDelete(id)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
      {/* En-tête avec filtres */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === f
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {f === 'all' && 'Tous'}
                {f === 'published' && 'Publiés'}
                {f === 'draft' && 'Brouillons'}
              </button>
            ))}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border rounded-lg text-sm bg-white dark:bg-gray-700"
          >
            <option value="date">Date (récent)</option>
            <option value="title">Nom (A-Z)</option>
            <option value="status">Statut</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          {selected.length > 0 && (
            <button
              onClick={() => setSelected([])}
              className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
            >
              Supprimer {selected.length} sélectionné(s)
            </button>
          )}
          
          <Link
            href="/admin/projects/new"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm font-medium"
          >
            + Nouveau projet
          </Link>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selected.length === filteredProjects.length}
                  onChange={(e) => {
                    setSelected(
                      e.target.checked 
                        ? filteredProjects.map(p => p.id)
                        : []
                    )
                  }}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Projet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Technologies
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(project.id)}
                    onChange={(e) => {
                      setSelected(prev =>
                        e.target.checked
                          ? [...prev, project.id]
                          : prev.filter(id => id !== project.id)
                      )
                    }}
                    className="rounded border-gray-300"
                  />
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {project.featured && (
                      <Star className="h-4 w-4 text-yellow-500 mr-2 fill-current" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {project.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        /projects/{project.slug}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <button
                    onClick={() => onTogglePublish(project.id, !project.published)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.published
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {project.published ? 'Publié' : 'Brouillon'}
                  </button>
                </td>
                
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopyLink(project.slug)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      title="Copier le lien"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      title="Voir en ligne"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    
                    <button
                      onClick={() => onToggleFeatured(project.id, !project.featured)}
                      className={`p-1 rounded ${
                        project.featured
                          ? 'text-yellow-500 hover:bg-yellow-50'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={project.featured ? 'Retirer des vedettes' : 'Mettre en vedette'}
                    >
                      <Star className={`h-4 w-4 ${project.featured ? 'fill-current' : ''}`} />
                    </button>
                    
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      title="Éditer"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredProjects.length} projet(s)
        </div>
        
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-lg text-sm">Précédent</button>
          <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm">Suivant</button>
        </div>
      </div>
    </div>
  )
}