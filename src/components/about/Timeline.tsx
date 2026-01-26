// components/about/Timeline.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  ChevronRight,
  GraduationCap,
  Briefcase,
  Code2,
  Award
} from 'lucide-react'

const timelineEvents = [
  {
    id: 1,
    year: '2024',
    title: 'Stage Développeur Full-Stack',
    company: 'Startup Tech, Paris',
    description: 'Développement d\'une application SaaS avec React, Node.js et PostgreSQL. Mise en place de tests unitaires et d\'une CI/CD.',
    type: 'work',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    icon: Briefcase,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    year: '2023 - Présent',
    title: 'Licence Génie Logiciel',
    company: 'Université de Technologie',
    description: 'Spécialisation en développement web et architecture logicielle. Projets notables : application e-commerce, API REST, application mobile.',
    type: 'education',
    tags: ['Java', 'Python', 'Web', 'Mobile'],
    icon: GraduationCap,
    color: 'bg-green-500'
  },
  {
    id: 3,
    year: '2023',
    title: 'Projet Personnel - Plateforme de Quiz',
    company: 'Projet Open Source',
    description: 'Développement full-stack d\'une plateforme de quiz interactive avec classement en temps réel et mode multijoueur.',
    type: 'project',
    tags: ['Next.js', 'Socket.io', 'MongoDB', 'Tailwind'],
    icon: Code2,
    color: 'bg-purple-500'
  },
  {
    id: 4,
    year: '2022',
    title: 'Certification AWS Cloud Practitioner',
    company: 'Amazon Web Services',
    description: 'Compréhension des services cloud AWS et des concepts fondamentaux du cloud computing.',
    type: 'certification',
    tags: ['AWS', 'Cloud', 'DevOps'],
    icon: Award,
    color: 'bg-orange-500'
  },
  {
    id: 5,
    year: '2021',
    title: 'Premiers Pas en Développement',
    company: 'Auto-formation',
    description: 'Apprentissage des bases de la programmation avec Python et JavaScript. Création de premiers projets personnels.',
    type: 'learning',
    tags: ['Python', 'JavaScript', 'HTML/CSS'],
    icon: Code2,
    color: 'bg-pink-500'
  }
]

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState(timelineEvents[0])
  const [activeType, setActiveType] = useState<'all' | 'work' | 'education' | 'project'>('all')

  const filteredEvents = timelineEvents.filter(event => 
    activeType === 'all' || event.type === activeType
  )

  return (
    <div className="relative">
      {/* Timeline Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { id: 'all', label: 'Tout voir', count: timelineEvents.length },
          { id: 'work', label: 'Expérience', count: timelineEvents.filter(e => e.type === 'work').length },
          { id: 'education', label: 'Éducation', count: timelineEvents.filter(e => e.type === 'education').length },
          { id: 'project', label: 'Projets', count: timelineEvents.filter(e => e.type === 'project').length },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveType(filter.id as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeType === filter.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {filter.label}
            <span className="ml-2 text-xs opacity-75">({filter.count})</span>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Ligne verticale */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-blue-500" />
        
        {/* Événements */}
        <div className="space-y-12">
          {filteredEvents.map((event, index) => {
            const Icon = event.icon
            const isSelected = selectedEvent.id === event.id
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Point sur la timeline */}
                <div className="absolute left-4 top-6 -translate-x-1/2">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className={`relative z-10 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 transition-all ${
                      isSelected ? 'scale-125 ring-4 ring-primary/30' : ''
                    } ${event.color}`}
                    aria-label={`Voir les détails de ${event.title}`}
                  />
                </div>

                {/* Carte d'événement */}
                <div
                  className={`ml-16 p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${event.color} text-white mr-3`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.year}
                          <MapPin className="h-3 w-3 mx-2" />
                          {event.company}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 transition-transform ${
                      isSelected ? 'rotate-90 text-primary' : 'text-gray-400'
                    }`} />
                  </div>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}