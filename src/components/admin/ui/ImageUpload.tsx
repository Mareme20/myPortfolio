'use client'

import { Upload } from 'lucide-react'

interface ImageUploadProps {
  currentImage?: string
  uploading?: boolean
  onUpload: (file: File) => void
}

export default function ImageUpload({ currentImage, uploading = false, onUpload }: ImageUploadProps) {
  return (
    <div className="space-y-3">
      {currentImage ? (
        <img src={currentImage} alt="Apercu" className="h-44 w-full rounded-lg object-cover" />
      ) : (
        <div className="flex h-44 w-full items-center justify-center rounded-lg border border-dashed border-gray-300 text-sm text-gray-500">
          Aucune image selectionnee
        </div>
      )}

      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
        <Upload className="h-4 w-4" />
        {uploading ? 'Telechargement...' : 'Choisir une image'}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) {
              onUpload(file)
            }
          }}
        />
      </label>
    </div>
  )
}
