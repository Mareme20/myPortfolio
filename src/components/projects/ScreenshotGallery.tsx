// components/projects/ScreenshotGallery.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScreenshotGalleryProps {
  projectId: string
}

const mockScreenshots = [
  { id: 1, src: '/images/projects/portfolio-dashboard.png', alt: 'Dashboard du portfolio' },
  { id: 2, src: '/images/projects/portfolio-mobile.png', alt: 'Version mobile' },
  { id: 3, src: '/images/projects/portfolio-darkmode.png', alt: 'Mode sombre' },
  { id: 4, src: '/images/projects/portfolio-code.png', alt: 'Code source' },
]

export default function ScreenshotGallery({ projectId }: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % mockScreenshots.length)
  }

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + mockScreenshots.length) % mockScreenshots.length)
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Captures d'écran</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center text-primary hover:text-primary-dark"
          >
            <Maximize2 className="h-5 w-5 mr-2" />
            Voir en grand
          </button>
        </div>

        {/* Image principale */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <Image
            src={mockScreenshots[selectedIndex].src}
            alt={mockScreenshots[selectedIndex].alt}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          
          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Miniatures */}
        <div className="grid grid-cols-4 gap-4">
          {mockScreenshots.map((screenshot, index) => (
            <button
              key={screenshot.id}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-24 rounded-lg overflow-hidden transition-all ${
                selectedIndex === index
                  ? 'ring-2 ring-primary scale-105'
                  : 'hover:scale-102'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="text-xs font-medium">
                  {index === 0 && '🖥️ Desktop'}
                  {index === 1 && '📱 Mobile'}
                  {index === 2 && '🌙 Dark'}
                  {index === 3 && '💻 Code'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal plein écran */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white hover:text-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            
            <div className="relative w-full max-w-6xl h-5/6" onClick={(e) => e.stopPropagation()}>
              <Image
                src={mockScreenshots[selectedIndex].src}
                alt={mockScreenshots[selectedIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
              
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4">
                <button
                  onClick={prevImage}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white">
                  {selectedIndex + 1} / {mockScreenshots.length}
                </div>
                <button
                  onClick={nextImage}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}