// components/projects/TechnologyStack.tsx
'use client'

import { motion } from 'framer-motion'
import { 
  Database, 
  Palette, 
  Server, 
  Globe, 
  Smartphone,
  Cpu
} from 'lucide-react'

interface TechnologyStackProps {
  technologies: string[]
}

const getTechIcon = (tech: string) => {
  const techLower = tech.toLowerCase()
  
  if (techLower.includes('react') || techLower.includes('next')) {
    return Globe
  }
  if (techLower.includes('mongodb') || techLower.includes('postgres') || techLower.includes('sql')) {
    return Database
  }
  if (techLower.includes('node') || techLower.includes('express') || techLower.includes('api')) {
    return Server
  }
  if (techLower.includes('css') || techLower.includes('tailwind') || techLower.includes('design')) {
    return Palette
  }
  if (techLower.includes('mobile') || techLower.includes('react native') || techLower.includes('flutter')) {
    return Smartphone
  }
  return Cpu
}

const getTechColor = (tech: string) => {
  const techLower = tech.toLowerCase()
  
  if (techLower.includes('react') || techLower.includes('next')) {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
  }
  if (techLower.includes('typescript') || techLower.includes('javascript')) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
  }
  if (techLower.includes('node') || techLower.includes('express')) {
    return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
  }
  if (techLower.includes('mongodb') || techLower.includes('postgres')) {
    return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
  }
  if (techLower.includes('docker') || techLower.includes('aws')) {
    return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
  }
  if (techLower.includes('tailwind') || techLower.includes('css')) {
    return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
  }
  return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
}

export default function TechnologyStack({ technologies }: TechnologyStackProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <Cpu className="h-5 w-5 mr-3 text-primary" />
        Stack technique
      </h3>
      
      <div className="space-y-4">
        {technologies.map((tech, index) => {
          const Icon = getTechIcon(tech)
          const colorClass = getTechColor(tech)
          
          return (
            <motion.div
              key={tech}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${colorClass} mr-3`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="font-medium">{tech}</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(90, 70 + index * 5)}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-3 w-8">
                  {Math.min(90, 70 + index * 5)}%
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Niveau de maîtrise</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className="w-2 h-2 rounded-full bg-primary"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}