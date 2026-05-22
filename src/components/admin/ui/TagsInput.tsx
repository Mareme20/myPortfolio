'use client'

import { KeyboardEvent, useState } from 'react'
import { X } from 'lucide-react'

interface TagsInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  suggestions?: string[]
}

export default function TagsInput({ value, onChange, suggestions = [] }: TagsInputProps) {
  const [input, setInput] = useState('')

  const addTag = (rawTag: string) => {
    const tag = rawTag.trim()
    if (!tag || value.includes(tag)) {
      return
    }
    onChange([...value, tag])
    setInput('')
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTag(input)
    }
    if (event.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} aria-label={`Supprimer ${tag}`}>
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={onKeyDown}
        className="w-full rounded-lg border px-4 py-2"
        placeholder="Ajouter une technologie et appuyer sur Entree"
      />

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions
            .filter((suggestion) => !value.includes(suggestion))
            .slice(0, 8)
            .map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addTag(suggestion)}
                className="rounded-full border border-gray-300 px-3 py-1 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                {suggestion}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
