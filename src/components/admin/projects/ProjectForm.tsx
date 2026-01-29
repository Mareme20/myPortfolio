// components/admin/projects/ProjectForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { 
  Save, 
  Upload, 
  X, 
  Plus,
  Image as ImageIcon
} from 'lucide-react'
import { projectSchema, type ProjectFormData } from '@/lib/validations/project'
import ImageUpload from '@/components/admin/ui/ImageUpload'
import TagsInput from '@/components/admin/ui/TagsInput'

interface ProjectFormProps {
  project?: any
  onSuccess?: () => void
}

const defaultTechnologies = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS',
  'Node.js', 'MongoDB', 'PostgreSQL', 'Docker'
]

export default function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const [uploading, setUploading] = useState(false)
  const [gallery, setGallery] = useState<string[]>(project?.gallery || [])
  const [selectedImage, setSelectedImage] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || '',
      slug: project?.slug || '',
      description: project?.description || '',
      content: project?.content || '',
      technologies: project?.technologies || [],
      githubUrl: project?.githubUrl || '',
      liveUrl: project?.liveUrl || '',
      featured: project?.featured || false,
      published: project?.published || false,
      order: project?.order || 0,
    }
  })

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSelectedImage(data.url)
        toast.success('Image téléchargée avec succès')
      }
    } catch (error) {
      toast.error('Erreur lors du téléchargement')
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const url = project 
        ? `/api/admin/projects/${project.id}`
        : '/api/admin/projects'
      
      const method = project ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          image: selectedImage || project?.image,
          gallery
        }),
      })

      if (!response.ok) throw new Error('Erreur')

      toast.success(
        project 
          ? 'Projet mis à jour avec succès'
          : 'Projet créé avec succès'
      )
      
      onSuccess?.()
    } catch (error) {
      toast.error('Une erreur est survenue')
    }
  }

  const addToGallery = (url: string) => {
    if (!gallery.includes(url)) {
      setGallery([...gallery, url])
    }
  }

  const removeFromGallery = (url: string) => {
    setGallery(gallery.filter(img => img !== url))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Informations de base */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Titre *
          </label>
          <input
            {...register('title')}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Nom du projet"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Slug *
          </label>
          <input
            {...register('slug')}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="url-du-projet"
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Description courte *
        </label>
        <textarea
          {...register('description')}
          rows={2}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Description concise du projet"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Technologies
        </label>
        <TagsInput
          value={watch('technologies')}
          onChange={(tags) => setValue('technologies', tags)}
          suggestions={defaultTechnologies}
        />
      </div>

      {/* URLs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            GitHub URL
          </label>
          <input
            {...register('githubUrl')}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="https://github.com/username/project"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Live Demo URL
          </label>
          <input
            {...register('liveUrl')}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="https://demo.com"
          />
        </div>
      </div>

      {/* Image principale */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Image principale
        </label>
        <ImageUpload
          currentImage={selectedImage || project?.image}
          onUpload={handleImageUpload}
          uploading={uploading}
        />
      </div>

      {/* Galerie */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">
            Galerie d'images
          </label>
          <button
            type="button"
            onClick={() => selectedImage && addToGallery(selectedImage)}
            className="text-sm text-primary hover:underline"
          >
            <Plus className="h-4 w-4 inline mr-1" />
            Ajouter l'image principale
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {gallery.map((url) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt="Gallery"
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeFromGallery(url)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          
          {gallery.length < 8 && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-24">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => document.getElementById('gallery-upload')?.click()}
              >
                <Upload className="h-6 w-6 mx-auto" />
                <span className="text-sm">Ajouter</span>
              </button>
              <input
                id="gallery-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
              />
            </div>
          )}
        </div>
      </div>

      {/* Contenu détaillé */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Contenu détaillé
        </label>
        <textarea
          {...register('content')}
          rows={10}
          className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
          placeholder="Détails du projet, défis, solutions..."
        />
      </div>

      {/* Options */}
      <div className="flex items-center space-x-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('featured')}
            className="rounded border-gray-300"
          />
          <span className="ml-2">Projet en vedette</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('published')}
            className="rounded border-gray-300"
          />
          <span className="ml-2">Publier immédiatement</span>
        </label>

        <div className="flex items-center">
          <label className="mr-2">Ordre :</label>
          <input
            type="number"
            {...register('order', { valueAsNumber: true })}
            className="w-20 px-2 py-1 border rounded"
            min="0"
          />
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          onClick={() => window.history.back()}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center"
        >
          {isSubmitting ? (
            'Enregistrement...'
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {project ? 'Mettre à jour' : 'Créer le projet'}
            </>
          )}
        </button>
      </div>
    </form>
  )
}